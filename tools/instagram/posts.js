// Instagram posts for 300sun. One entry per post; each slide becomes a 1080 x 1350 image.
// Slide types: photo (real photo on top, text on a dark band), text, end (closing slide with 300sun.com).
// Every fact here is already on the site. *word* becomes italic. Real photos only (see CLAUDE.md).
var POSTS = [
  { id: "01-300-days", slides: [
    { t: "photo", img: "valencia/300sun-nico-ciudad-artes-ciencias-1280.jpg", pos: "58% center", k: "Valencia, Spain", h: "About 300 days of sun a year. *Let’s use a few.*", p: "Private walks with a local. Just your group." },
    { t: "text", k: "How it works", h: "You pick a day. *It’s yours.*", p: "No strangers, no umbrella to follow, no fixed script." },
    { t: "end", k: "Book direct", h: "No booking platform *in the middle.*", p: "You message me, I answer." } ] },
  { id: "02-back-on-time", slides: [
    { t: "text", k: "For cruise passengers", h: "See Valencia. *Get back to your ship on time.*", p: "A private walk through the old town, planned backwards from your all-aboard." },
    { t: "text", k: "My promise", h: "Running tight? *I pay the taxi.*", p: "If we’re ever short of time, I put you in a taxi to the terminal and pay the fare." },
    { t: "end", k: "Book direct", h: "Pick your port day. *It’s yours.*", p: "Only the days I’m free show up." } ] },
  { id: "03-look-up", slides: [
    { t: "photo", img: "valencia/300sun-valencia-iglesia-san-nicolas-1280.jpg", pos: "center 30%", k: "Valencia · old town", h: "A few hours in Valencia? *Look up.*", p: "San Nicolás, in the old town." },
    { t: "text", k: "Private walk with a local", h: "The old town, on foot, *at your pace.*", p: "We start where you like, stop when you’re hungry and skip whatever doesn’t interest you." },
    { t: "end", k: "Book direct", h: "Pick a day. *It’s yours.*", p: "No booking platform in the middle." } ] },
  { id: "04-one-price", slides: [
    { t: "text", k: "Private walk with a local", h: "One price for the group, *not per head.*", p: "One person or four pay the same." },
    { t: "text", k: "Up to 4 people", h: "3 h €150 · 4 h €200 · *6 h €300*", p: "Each extra person is €10 an hour, up to 8. Prices are in euros." },
    { t: "end", k: "Book direct", h: "A €30 deposit *holds the day.*", p: "The rest at the end of the walk." } ] },
  { id: "05-old-town-facts", slides: [
    { t: "text", k: "Valencia · the Micalet", h: "*207 steps* up the bell tower.", p: "And a cup inside the cathedral that Valencia insists is the Holy Grail." },
    { t: "text", k: "Thursdays at noon", h: "A court that has met for *over a thousand years.*", p: "The Water Tribunal still meets at the cathedral door. Farmers settle irrigation fights there." },
    { t: "text", k: "La Lonja de la Seda", h: "Look up at the gargoyles. *Some of them are rude.*", p: "The silk exchange, UNESCO-listed since 1996." },
    { t: "end", k: "Private walk with a local", h: "I’ll show you *where to look.*", p: "Book direct." } ] },
  { id: "06-eat-something-real", slides: [
    { t: "photo", img: "valencia/300sun-valencia-paella-marisco-almuerzo-1280.jpg", k: "After the walk", h: "If you’re hungry: *seafood paella* in the old town.", p: "You see the good parts and eat something real." },
    { t: "text", k: "Mercado Central", h: "Around *300 stalls* under one modernist roof.", p: "We eat something here." },
    { t: "text", k: "Plaza Redonda", h: "Horchata. *With fartons to dunk in it.*", p: "Tiger-nut milk, the way Valencia drinks it." },
    { t: "end", k: "Book direct", h: "Pick a day. *It’s yours.*", p: "No booking platform in the middle." } ] },
  { id: "07-your-route", slides: [
    { t: "text", k: "Personalised walk", h: "Four or six hours? *We build the route together.*", p: "Message me and tell me what you like." },
    { t: "text", k: "Flat city, easy walk", h: "Fine for kids *and grandparents.*", p: "Valencia is flat. We can go slower, sit down more and skip the 207 steps." },
    { t: "end", k: "Book direct", h: "Tell me what you’d like *to see.*", p: "You message me, I answer." } ] },
  { id: "08-groups", slides: [
    { t: "photo", img: "hostels/300sun-valencia-hostel-villa-1280.jpg", k: "Group stays", h: "Beds for *your whole group.*", p: "Three partner hostels, 200+ beds." },
    { t: "photo", img: "hostels/300sun-valencia-hostel-terraza-1280.jpg", k: "Schools · study abroad · church trips", h: "Walks and paella *in the same chat.*", p: "Send dates and numbers and I’ll tell you what’s free." },
    { t: "end", k: "Groups", h: "A group of 120? *Not too many.*", p: "Ask for a quote." } ] }
];
