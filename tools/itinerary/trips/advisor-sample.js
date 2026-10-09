// The sample route sheet shown to travel advisors: "this is what your client receives".
// An invented cruise family on the usual 3-hour route. Build: tools/itinerary/make.sh advisor-sample,
// then copy clients/out/advisor-sample.pdf to site/advisors/sample-route.pdf.
var TRIP = {
  kicker: "Sample · what your clients receive before their walk",
  title: "The Miller family, *Thursday 13 May*",
  who: "4 people · 3 hours · your ship is in port from 8:00 am, all aboard 4:30 pm",

  route: [
    { time: "9:00", name: "Taxi from the cruise terminal", note: "A driver I trust, booked by me. A short ride.", img: "sketch-taxi" },
    { time: "9:30", name: "Torres de Serranos", note: "We meet here, at the old city gate.", img: "sketch-towers", pin: "towers" },
    { time: "9:55", name: "Plaza de la Virgen", note: "At noon on Thursdays the Water Tribunal meets here.", free: true, img: "stop-fountain", pin: "basilica" },
    { time: "10:15", name: "The Cathedral and the Micalet", note: "207 steps up the bell tower, if you like.", ticket: "€9", optional: true, img: "stop-cathedral", pin: "cathedral" },
    { time: "10:50", name: "La Lonja de la Seda", note: "The silk exchange. Look up at the gargoyles.", ticket: "€2", img: "stop-lonja", pin: "lonja" },
    { time: "11:20", name: "Mercado Central", note: "Around 300 stalls. We eat something here.", img: "sketch-market", pin: "market" },
    { time: "12:00", name: "Horchata at Plaza Redonda", note: "Tiger-nut milk, with fartons to dunk in it.", img: "sketch-horchata" },
    { time: "12:30", name: "Taxi back to your ship", note: "On board by 1:00 pm, hours before all aboard.", img: "sketch-shipback" }
  ],

  note: { title: "Back on board", text: "The walk is planned backwards from your all-aboard time. If we are ever running tight, I put you in a taxi to the terminal and pay the fare." },

  ticketNote: "Per person, checked in October 2026. Prices can change.",

  booking: [
    ["Private walk, up to 4 people", "€150"],
    ["Deposit paid", "€30"],
    ["To pay at the end of the walk", "€120"]
  ],

  bye: "See you in Valencia."
};
