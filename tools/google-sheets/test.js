// Checks the Cal.com webhook parser without Google: node tools/google-sheets/test.js
const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync(__dirname + '/cal-webhook.gs', 'utf8');
const ctx = { module: { exports: {} } };
vm.runInNewContext(src, ctx);
const parse = ctx.module.exports.parseBooking_;
const assert = require('assert');

const created = {
  triggerEvent: 'BOOKING_CREATED',
  payload: {
    uid: 'abc123', startTime: '2026-11-20T08:30:00Z',
    attendees: [{ name: 'Jane Smith' }],
    responses: { name: { value: 'Jane Smith' }, notes: { value: 'Referred by travel advisor: Sunny-Cruises' }, 'number-of-people': { value: '4' } },
  },
};
let b = parse(created);
assert.strictEqual(b.ref, 'sunny-cruises');
assert.strictEqual(b.client, 'Jane Smith');
assert.strictEqual(b.people, 4);
assert.strictEqual(b.id, 'abc123');
assert.strictEqual(b.start.toISOString(), '2026-11-20T08:30:00.000Z');

// No agency → ignored
assert.strictEqual(parse({ triggerEvent: 'BOOKING_CREATED', payload: { uid: 'x', responses: { notes: { value: 'Allergic to nuts' } } } }), null);

// Agency only in the utm tags
b = parse({ triggerEvent: 'BOOKING_CREATED', payload: { uid: 'y', metadata: { utm_source: 'advisor', utm_campaign: 'test-agency' }, responses: {} } });
assert.strictEqual(b.ref, 'test-agency');
assert.strictEqual(b.people, null);

// Cancellation keeps the id
b = parse({ triggerEvent: 'BOOKING_CANCELLED', payload: { uid: 'abc123', responses: { notes: { value: 'Referred by travel advisor: sunny-cruises' } } } });
assert.strictEqual(b.event, 'BOOKING_CANCELLED');

// Other events ignored
assert.strictEqual(parse({ triggerEvent: 'MEETING_ENDED', payload: {} }), null);

console.log('all good');
