// Model for a client's route sheet. Copy this file to /clients/<name>.js (that folder stays off GitHub),
// change the details, then run: tools/itinerary/make.sh <name>
// *word* in the title becomes italic. Leave out "note", "bonus" or "booking" to hide that box.
//
// For each stop:
//   img      the drawing beside it, a file name from marketing/illustrations without ".png":
//            sketch-towers, stop-coffee, stop-street, stop-church, stop-fountain, sketch-market,
//            stop-lonja, stop-cathedral, stop-cityhall, stop-station, sketch-paella, sketch-horchata
//   pin      where its number goes on the map: towers, carmen, sannicolas, basilica, market, lonja,
//            cathedral, cityhall, station. Leave it out for a stop that isn't on the map.
//   ticket   what one person pays at the door.  free: true shows "free".
//   optional true marks a stop we only do with time.
var TRIP = {
  kicker: "Your private walk in Valencia",
  title: "The Example family, *Tuesday 14 April*",
  who: "4 people · about 4 hours · we meet at 9:00 am at Torres de Serranos",

  route: [
    { time: "9:00", name: "Torres de Serranos", note: "We meet here, at the old city gate.", img: "sketch-towers", pin: "towers" },
    { time: "9:15", name: "Coffee at Pasaje 94", note: "A relaxed start to the day.", img: "stop-coffee" },
    { time: "9:45", name: "El Carmen", note: "A stroll through the old quarter.", img: "stop-street", pin: "carmen" },
    { time: "10:30", name: "San Nicolás", note: "You go in with the audio guide. I wait at the door.", ticket: "€16", img: "stop-church", pin: "sannicolas" },
    { time: "11:15", name: "Plaza de la Virgen", note: "The heart of the old town, and the Basilica.", free: true, img: "stop-fountain", pin: "basilica" },
    { time: "11:45", name: "Mercado Central", note: "We walk through for the atmosphere, and a bite.", img: "sketch-market", pin: "market" },
    { time: "12:15", name: "La Lonja de la Seda", note: "The silk exchange. A short visit inside.", ticket: "€2", img: "stop-lonja", pin: "lonja" },
    { time: "12:45", name: "The Cathedral", note: "Only if we are ahead of schedule.", ticket: "€9", optional: true, img: "stop-cathedral", pin: "cathedral" },
    { time: "1:00", name: "Back to El Carmen", note: "In good time for your paella.", img: "sketch-paella" }
  ],

  note: { title: "Important", text: "We are back in El Carmen by 1:10 pm, for your 1:30 pm paella reservation at Restaurante Yuso." },

  ticketNote: "Per person, checked in October 2026. Prices can change.",

  bonus: ["City Hall square", "North Station", "Plaza del Negrito"],

  booking: [
    ["Private walk, up to 4 people", "€200"],
    ["Deposit paid", "€30"],
    ["To pay at the end of the walk", "€170"]
  ],

  bye: "See you in Valencia."
};
