/**
 * 300sun · Cal.com → Google Sheets (commission sheet)
 *
 * Paste this into the commission sheet: Extensions → Apps Script.
 * Every Cal.com booking made through an agency link (300sun.com/cruise/?ref=agency-name)
 * adds a row to the "Reservas" tab. Cancellations and reschedules update that row.
 * Bookings without an agency are ignored.
 *
 * Setup steps (in Spanish): docs/agencias/google-sheets-setup.md
 */

// 1) Change this to a long secret word of your own. Put the same word at the end of the
//    webhook address in Cal.com: .../exec?key=YOUR-WORD
const SECRET = 'CAMBIA-ESTO-por-una-palabra-larga';

const SHEET = 'Reservas';
const FIRST_ROW = 2;
const COL = { date: 1, ref: 2, client: 4, service: 5, people: 6, notes: 14, id: 15 };
const REF_NOTE = /Referred by travel advisor:\s*([a-z0-9-]{2,40})/i;

function doPost(e) {
  if (!e || !e.parameter || e.parameter.key !== SECRET) return reply_('forbidden');
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return reply_('bad json'); }

  const booking = parseBooking_(body);
  if (!booking) return reply_('ignored');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET);
    const row = findRowById_(sheet, booking.id);
    if (booking.event === 'BOOKING_CREATED') {
      if (row) return reply_('already there');
      writeNew_(sheet, booking);
    } else if (row) {
      updateExisting_(sheet, row, booking);
    }
  } finally {
    lock.releaseLock();
  }
  return reply_('ok');
}

/** Turns a Cal.com webhook into what the sheet needs, or null if it's not an agency booking. */
function parseBooking_(body) {
  const event = body && body.triggerEvent;
  const p = body && body.payload;
  if (!p || ['BOOKING_CREATED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED'].indexOf(event) < 0) return null;

  const responses = p.responses || {};
  const answer = function (k) { const v = responses[k]; return v && typeof v === 'object' && 'value' in v ? v.value : v; };

  // The agency: from the booking notes written by the website, or from the utm tag
  let ref = null;
  const notes = String(answer('notes') || p.additionalNotes || p.description || '');
  const m = notes.match(REF_NOTE);
  if (m) ref = m[1].toLowerCase();
  const meta = p.metadata || {};
  const tracking = p.tracking || meta.tracking || {};
  if (!ref && (meta.utm_source === 'advisor' || tracking.utm_source === 'advisor')) {
    ref = String(meta.utm_campaign || tracking.utm_campaign || '').toLowerCase() || null;
  }
  if (!ref) return null;

  // Number of people: the first booking question whose name mentions people/personas/group
  let people = null;
  Object.keys(responses).forEach(function (k) {
    if (people === null && /people|personas|group|grupo|pax|number/i.test(k)) {
      const n = parseInt(answer(k), 10);
      if (!isNaN(n)) people = n;
    }
  });

  const attendee = (p.attendees && p.attendees[0]) || {};
  return {
    event: event,
    id: String(p.uid || p.bookingId || ''),
    oldId: String(p.rescheduleUid || p.fromReschedule || ''),
    ref: ref,
    start: p.startTime ? new Date(p.startTime) : null,
    client: String(answer('name') || attendee.name || ''),
    people: people,
  };
}

function writeNew_(sheet, b) {
  const row = firstEmptyRow_(sheet);
  sheet.getRange(row, COL.date).setValue(b.start);
  sheet.getRange(row, COL.ref).setValue(b.ref);
  sheet.getRange(row, COL.client).setValue(b.client);
  sheet.getRange(row, COL.service).setValue('Paseo privado 3 h');
  if (b.people !== null) sheet.getRange(row, COL.people).setValue(b.people);
  sheet.getRange(row, COL.notes).setValue('Añadida sola desde Cal.com. Falta el importe.');
  sheet.getRange(row, COL.id).setValue(b.id);
}

function updateExisting_(sheet, row, b) {
  if (b.event === 'BOOKING_CANCELLED') {
    sheet.getRange(row, COL.notes).setValue('CANCELADA en Cal.com. Si no se pagó nada, borra la fila o deja el importe vacío.');
  } else if (b.event === 'BOOKING_RESCHEDULED') {
    if (b.start) sheet.getRange(row, COL.date).setValue(b.start);
    sheet.getRange(row, COL.notes).setValue('Cambio de fecha en Cal.com.');
    if (b.id) sheet.getRange(row, COL.id).setValue(b.id);
  }
}

function findRowById_(sheet, id) {
  if (!id) return 0;
  const last = sheet.getLastRow();
  if (last < FIRST_ROW) return 0;
  const ids = sheet.getRange(FIRST_ROW, COL.id, last - FIRST_ROW + 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return FIRST_ROW + i;
  return 0;
}

// The sheet has formulas already filled down, so "the end" is the first row with no date and no agency
function firstEmptyRow_(sheet) {
  const last = Math.max(sheet.getMaxRows(), FIRST_ROW);
  const vals = sheet.getRange(FIRST_ROW, COL.date, last - FIRST_ROW + 1, 2).getValues();
  for (let i = 0; i < vals.length; i++) if (vals[i][0] === '' && vals[i][1] === '') return FIRST_ROW + i;
  sheet.insertRowAfter(last);
  return last + 1;
}

function reply_(text) {
  return ContentService.createTextOutput(text);
}

/** Run this once from the Apps Script editor to check everything works (adds a test row). */
function testWithFakeBooking() {
  const fake = {
    triggerEvent: 'BOOKING_CREATED',
    payload: {
      uid: 'test-' + Date.now(),
      startTime: new Date(Date.now() + 7 * 864e5).toISOString(),
      attendees: [{ name: 'Test client' }],
      responses: { name: { value: 'Test client' }, notes: { value: 'Referred by travel advisor: test-agency' }, people: { value: '3' } },
    },
  };
  const out = doPost({ parameter: { key: SECRET }, postData: { contents: JSON.stringify(fake) } });
  Logger.log(out.getContent());
}

// Lets the parser be tested outside Google (node tools/google-sheets/test.js)
if (typeof module !== 'undefined') module.exports = { parseBooking_: parseBooking_ };
