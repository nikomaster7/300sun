// Model for a client's route sheet. Copy this file to /clients/<name>.js (that folder stays off GitHub),
// change the details, then run: tools/itinerary/make.sh <name>
// *word* in the title becomes italic. Leave out "note", "bonus" or "booking" to hide that box.
var TRIP = {
  kicker: "Your private walk in Valencia",
  title: "The Example family, *Tuesday 14 April*",
  who: "4 people · about 4 hours · we meet at 9:00 am at Torres de Serranos",

  // ticket: what one person pays at the door. free: true shows "free". optional: true marks a stop we only do with time.
  route: [
    { time: "9:00", name: "Torres de Serranos", note: "We meet here, at the old city gate." },
    { time: "9:15", name: "Coffee at Pasaje 94", note: "A relaxed start to the day." },
    { time: "9:45", name: "El Carmen", note: "A stroll through the old quarter." },
    { time: "10:30", name: "San Nicolás", note: "You go in with the audio guide. I wait at the door.", ticket: "€16" },
    { time: "11:15", name: "Plaza de la Virgen and the Basilica", note: "The heart of the old town.", free: true },
    { time: "11:45", name: "Mercado Central", note: "We walk through for the atmosphere, and a bite." },
    { time: "12:15", name: "La Lonja de la Seda", note: "The silk exchange. A short visit inside.", ticket: "€2" },
    { time: "12:45", name: "The Cathedral", note: "Only if we are ahead of schedule.", ticket: "€9", optional: true },
    { time: "1:00", name: "Back to El Carmen", note: "In good time for your paella." }
  ],

  note: { title: "Important", text: "We are back in El Carmen by 1:10 pm, for your 1:30 pm paella reservation at Restaurante Yuso." },

  ticketNote: "Prices per person, checked in October 2026. They can change with the season.",

  bonus: ["City Hall square", "North Station", "Plaza del Negrito"],

  booking: [
    ["Private walk, up to 4 people", "€200"],
    ["Deposit paid", "€30"],
    ["To pay at the end of the walk", "€170"]
  ],

  art: ["horchata", "market"],   // two drawings for the bottom corner: ship, taxi, towers, paella, shipback, horchata, market
  bye: "See you in Valencia."
};
