// 300sun — small, no dependencies.
(function () {
  var html = document.documentElement;
  var es = html.lang === "es";
  var PHONE = "34615858017";

  // Travel advisor links (?ref=agency-name), remembered while the visitor browses the site
  var ref = (location.search.match(/[?&]ref=([a-z0-9-]{2,40})/i) || [])[1];
  try { if (ref) sessionStorage.setItem("ref", ref); else ref = sessionStorage.getItem("ref"); } catch (e) {}
  if (ref && !/^[a-z0-9-]{2,40}$/i.test(ref)) ref = null;

  // Header border once you leave the top
  var top = document.querySelector(".top");
  function onScroll() { if (top) top.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Photos not uploaded yet: keep the frame, show the caption instead of a broken image
  document.querySelectorAll("figure[data-caption] img").forEach(function (img) {
    function empty() { img.closest("figure").classList.add("empty"); }
    if (img.complete && img.naturalWidth === 0) empty();
    img.addEventListener("error", empty);
  });

  // Fade things in as they reach the screen
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".rise").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".rise").forEach(function (el) { el.classList.add("in"); });
  }

  // Today's sun in Valencia (sunrise equation, good to about a minute)
  var sunEl = document.getElementById("sun-today");
  if (sunEl) {
    var LAT = 39.4699, LNG = -0.3763, rad = Math.PI / 180;
    var jd = Date.now() / 864e5 + 2440587.5;
    var n = Math.round(jd - 2451545 + 0.0008);
    var Jstar = n - LNG / 360;
    var M = (357.5291 + 0.98560028 * Jstar) % 360;
    var C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
    var L = (M + C + 180 + 102.9372) % 360;
    var Jt = 2451545 + Jstar + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
    var dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad));
    var w0 = Math.acos((Math.sin(-0.833 * rad) - Math.sin(LAT * rad) * Math.sin(dec)) / (Math.cos(LAT * rad) * Math.cos(dec))) / rad;
    function toDate(j) { return new Date((j - 2440587.5) * 864e5); }
    var rise = toDate(Jt - w0 / 360), set = toDate(Jt + w0 / 360);
    var fmt = function (d) { return d.toLocaleTimeString(es ? "es-ES" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }); };
    var mins = Math.round((set - rise) / 6e4);
    var light = Math.floor(mins / 60) + " h " + String(mins % 60).padStart(2, "0") + " min";
    sunEl.innerHTML = es
      ? "<span>Hoy en Valencia</span><span>Amanece <b>" + fmt(rise) + "</b></span><span>Anochece <b>" + fmt(set) + "</b></span><span><b>" + light + "</b> de luz</span>"
      : "<span>Today in Valencia</span><span>Sunrise <b>" + fmt(rise) + "</b></span><span>Sunset <b>" + fmt(set) + "</b></span><span><b>" + light + "</b> of daylight</span>";
  }

  // Service buttons pre-select the form
  document.querySelectorAll("[data-service]").forEach(function (a) {
    a.addEventListener("click", function () {
      var sel = document.querySelector("form.ask select[name=service]");
      if (sel) sel.value = a.getAttribute("data-service");
    });
  });

  // Enquiry form → WhatsApp with everything already written
  var form = document.querySelector("form.ask");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var f = form.elements;
      var details = [
        (es ? "Me interesa: " : "Interested in: ") + f.service.options[f.service.selectedIndex].text,
        f.date.value && (es ? "Fecha: " : "Date: ") + f.date.value,
        f.people.value && (es ? "Personas: " : "People: ") + f.people.value,
        f.ship.value && (es ? "Barco / alojamiento: " : "Ship / hotel: ") + f.ship.value
      ].filter(Boolean).join("\n");
      var msg = (es ? "Hola Nicolás, te escribo desde la web de 300sun." : "Hi Nicolás, I found you on the 300sun website.") +
        "\n\n" + details + (f.notes.value ? "\n\n" + f.notes.value : "") + "\n\n— " + f.name.value;
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  // Plan your walk (/plan/) → WhatsApp with the answers as a short summary for the guide.
  // Every question carries its summary name in data-q; scales (1–5) go on one line.
  var plan = document.querySelector("form.plan");
  if (plan) {
    plan.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var lines = [], scales = [];
      plan.querySelectorAll("[data-q]").forEach(function (q) {
        var v = q.tagName === "FIELDSET"
          ? Array.prototype.map.call(q.querySelectorAll("input:checked"), function (i) { return i.value; }).join(", ")
          : q.value.trim();
        if (!v) return;
        if (q.classList.contains("scale")) scales.push(q.getAttribute("data-q") + " " + v);
        else lines.push(q.getAttribute("data-q") + ": " + v);
      });
      if (scales.length) lines.push("\n" + plan.getAttribute("data-scales") + "\n" + scales.join("\n"));
      var notes = plan.elements.notes.value.trim();
      var msg = plan.getAttribute("data-hello") + "\n\n" + lines.join("\n") +
        (notes ? "\n\n" + notes : "") + "\n\n— " + plan.elements.name.value.trim();
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  // Walk bookings — Cal.com event link ("username/event-slug").
  // Leave empty until the Cal.com account exists; the WhatsApp fallback shows instead.
  var CAL_LINK = "300-sun/old-town-walk";

  var frame = document.querySelector(".booking .cal-frame");
  if (frame) {
    var booking = frame.closest(".booking");
    if (!CAL_LINK) {
      booking.querySelector(".booking-note").hidden = true;
      frame.hidden = true;
      booking.querySelector(".book-fallback").hidden = false;
    } else {
      var loaded = false;
      var loadCal = function (minutes) {
        if (loaded) return;
        loaded = true;
        frame.innerHTML = "";
        frame.classList.add("is-open");
        // Cal.com's standard embed loader
        (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "walk", { origin: "https://cal.com" });
        // Pass the ad's utm_* tags on to Cal.com so each booking shows where it came from
        var utm = location.search.match(/utm_[a-z]+=[^&]*/g) || [];
        // Advisor bookings: tag them and write the agency in the notes
        if (ref) {
          ref = ref.toLowerCase();
          utm = utm.filter(function (p) { return !/^utm_(source|campaign)=/.test(p); });
          utm.push("utm_source=advisor", "utm_campaign=" + ref, "notes=" + encodeURIComponent("Referred by travel advisor: " + ref));
        }
        // The length picked on our cards opens the calendar on that length (Cal.com event with 3 / 4 / 6 h)
        if (minutes) utm.push("duration=" + minutes);
        Cal.ns.walk("inline", { elementOrSelector: "#cal-walk", calLink: CAL_LINK + (utm.length ? "?" + utm.join("&") : ""), config: { layout: "month_view", theme: "light" } });
        // Site colours inside the calendar: paper ground, ink for the chosen day, sun for today
        Cal.ns.walk("ui", { theme: "light", layout: "month_view", cssVarsPerTheme: { light: {
          "cal-brand": "#1a1a1a", "cal-brand-emphasis": "#000000", "cal-brand-text": "#f5f5f3",
          "cal-bg": "#f5f5f3", "cal-bg-muted": "#ecebe6", "cal-bg-subtle": "#ecebe6", "cal-bg-emphasis": "#d9d7d0",
          "cal-border": "#d9d7d0", "cal-border-subtle": "#d9d7d0", "cal-border-booker": "#d9d7d0",
          "cal-text": "#1a1a1a", "cal-text-emphasis": "#1a1a1a", "cal-text-subtle": "#5b5a56", "cal-text-muted": "#5b5a56"
        } } });
      };
      // Nothing from Cal.com loads until the visitor asks for it (privacy: no third-party requests or cookies before that)
      var privacyHref = es ? "/es/legal/#cookies" : "/legal/#cookies";
      // Step 1 on our side: choose the length, then the calendar opens on it
      var lengths = es ? [
        [180, "3 horas", "150 €", "El paseo por el centro"],
        [240, "4 horas", "200 €", "Personalizado: la ruta la montamos juntos"],
        [360, "6 horas", "300 €", "Personalizado, con tiempo para todo"]
      ] : [
        [180, "3 hours", "€150", "The old town walk"],
        [240, "4 hours", "€200", "Personalised: we build the route together"],
        [360, "6 hours", "€300", "Personalised, with time for everything"]
      ];
      frame.innerHTML = '<div class="cal-gate">' +
        '<p class="label">' + (es ? "1 · Elige la duración" : "1 · Choose how long") + '</p>' +
        '<div class="cal-pick">' + lengths.map(function (l) {
          return '<button type="button" data-min="' + l[0] + '"><b>' + l[1] + '</b><span class="cal-price">' + l[2] + '</span><span class="cal-what">' + l[3] + '</span><span class="cal-go">' + (es ? "Ver días →" : "See days →") + '</span></button>';
        }).join("") + '</div>' +
        '<p class="fine">' + (es ? "Hasta 4 personas. Luego eliges día y hora. Se abre el calendario de Cal.com. " : "Up to 4 people. Next you pick the day and time, in a calendar provided by Cal.com. ") +
        '<a href="' + privacyHref + '">' + (es ? "Privacidad y cookies" : "Privacy &amp; cookies") + '</a></p></div>';
      frame.querySelectorAll(".cal-pick button").forEach(function (b) {
        b.addEventListener("click", function () { loadCal(b.getAttribute("data-min")); });
      });
    }
  }

  // Presentation mode: P to toggle, arrows / space to move, Esc to leave
  var slides = function () { return Array.prototype.slice.call(document.querySelectorAll(".hero, section.block, .foot")); };
  var hint = document.createElement("div");
  hint.className = "present-hint";
  hint.textContent = es ? "Modo presentación · ← → · Esc para salir" : "Presentation · ← → · Esc to exit";
  document.body.appendChild(hint);

  function setPresent(on) {
    html.classList.toggle("present", on);
    if (on) { hint.classList.add("show"); setTimeout(function () { hint.classList.remove("show"); }, 2600); }
  }
  function go(dir) {
    var s = slides(), y = window.scrollY + 4, i = 0;
    for (var k = 0; k < s.length; k++) if (s[k].offsetTop <= y) i = k;
    var next = s[Math.max(0, Math.min(s.length - 1, i + dir))];
    next.scrollIntoView({ behavior: "smooth" });
  }
  document.addEventListener("keydown", function (e) {
    var t = e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "p" || e.key === "P") { setPresent(!html.classList.contains("present")); return; }
    if (!html.classList.contains("present")) return;
    if (e.key === "Escape") setPresent(false);
    else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); go(-1); }
  });
  document.querySelectorAll("[data-present]").forEach(function (b) {
    b.addEventListener("click", function () { setPresent(true); window.scrollTo(0, 0); });
  });
  if (/[?&]present\b/.test(location.search)) setPresent(true);
})();
