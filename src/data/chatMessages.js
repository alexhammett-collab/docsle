export const members = [
  { id: 1,  name: 'Marco Bianchi',    initials: 'MB', colour: '#CC0000', bike: 'Panigale V4S',    status: 'online' },
  { id: 2,  name: 'Sarah Okonkwo',    initials: 'SO', colour: '#e85d04', bike: 'Monster 937',     status: 'online' },
  { id: 3,  name: 'James Whitfield',  initials: 'JW', colour: '#6a0572', bike: 'Multistrada V4',  status: 'away'   },
  { id: 4,  name: 'Priya Sharma',     initials: 'PS', colour: '#0077b6', bike: 'Scrambler Icon',  status: 'online' },
  { id: 5,  name: 'Dan Kowalski',     initials: 'DK', colour: '#2d6a4f', bike: 'Streetfighter V4',status: 'offline'},
  { id: 6,  name: 'Kat Reynolds',     initials: 'KR', colour: '#b5838d', bike: 'Hypermotard 950', status: 'online' },
];

export const seedMessages = [
  { id: 1,  memberId: 1, text: "Morning all! Anyone joining the Surrey Hills blast on Saturday? 🏍️",                        ts: Date.now() - 1000 * 60 * 47 },
  { id: 2,  memberId: 4, text: "I'm in! What time are we meeting at Clacket Lane?",                                          ts: Date.now() - 1000 * 60 * 44 },
  { id: 3,  memberId: 1, text: "09:00 sharp. Bring a layer — it'll be cold on the hills in the morning.",                    ts: Date.now() - 1000 * 60 * 43 },
  { id: 4,  memberId: 2, text: "Count me in too. Just had new Pirelli Supercorsas fitted so I'm ready 😁",                   ts: Date.now() - 1000 * 60 * 38 },
  { id: 5,  memberId: 3, text: "Can't make Saturday but hoping to join the Goodwood run next month.",                        ts: Date.now() - 1000 * 60 * 30 },
  { id: 6,  memberId: 6, text: "Has anyone ridden the A272 lately? Heard it's in great condition after resurfacing.",         ts: Date.now() - 1000 * 60 * 22 },
  { id: 7,  memberId: 1, text: "Yes! Rode it two weeks ago — genuinely one of the best stretches in the south east right now.", ts: Date.now() - 1000 * 60 * 20 },
  { id: 8,  memberId: 2, text: "Adding it to the route intel wishlist 👌",                                                   ts: Date.now() - 1000 * 60 * 15 },
  { id: 9,  memberId: 4, text: "Reminder: track day deposits due by end of this month for Brands Hatch 🏁",                  ts: Date.now() - 1000 * 60 * 8  },
  { id: 10, memberId: 6, text: "Already paid mine. Gutted I missed the last one — not missing this one!",                    ts: Date.now() - 1000 * 60 * 3  },
];
