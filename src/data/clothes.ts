export interface DayOutfit {
  date: string;
  dayLabel: string;
  city: string;
  ayushman: string;
  dhwani: string;
  note?: string;
}

export const OUTFITS: DayOutfit[] = [
  { date: "2026-05-16", dayLabel: "16 May", city: "London",    ayushman: "Fancy Pyjama + Tshirt (home) + Peanuts Jumper",          dhwani: "Yoga pants + black tshirt + overshirt" },
  { date: "2026-05-17", dayLabel: "17 May", city: "London",    ayushman: "White Jumper + Blue Jeans",                              dhwani: "black skirt + brown top + brown sweater" },
  { date: "2026-05-18", dayLabel: "18 May", city: "London",    ayushman: "Check Shirt + Black Trouser + Zara Jacket",              dhwani: "Brown lace skirt + black top + blue blazer" },
  { date: "2026-05-19", dayLabel: "19 May", city: "London",    ayushman: "Oxford Shirt + Black Jeans + Zara Jacket",               dhwani: "black frill skirt + brown top + brown cardigan" },
  { date: "2026-05-20", dayLabel: "20 May", city: "London",    ayushman: "Black Shirt + Blue Jeans + H&M Jacket",                  dhwani: "brown skirt + black top (peplum) + grey blazer" },
  { date: "2026-05-21", dayLabel: "21 May", city: "London",    ayushman: "White Shirt + Light Blue Jeans + H&M Jacket",            dhwani: "stripes dress + blue blazer",                    note: "Potential Laundry Day" },
  { date: "2026-05-22", dayLabel: "22 May", city: "London",    ayushman: "Black Jumper + Black Trouser + Zara Jacket",              dhwani: "uniqlo skirt + black top + grey blazer",         note: "Potential Laundry Day" },
  { date: "2026-05-23", dayLabel: "23 May", city: "Manchester",ayushman: "Man City Tshirt + Light Blue Jeans + Zara Jacket",        dhwani: "oxford shirt + jeans + jacket" },
  { date: "2026-05-24", dayLabel: "24 May", city: "Inverness", ayushman: "Peanuts Jumper + Black Jeans + Grey Jacket",              dhwani: "black pant + westside tshirt + jacket" },
  { date: "2026-05-25", dayLabel: "25 May", city: "Inverness", ayushman: "Special H&M Shirt + Cargo Pants + Grey Jacket",           dhwani: "blue jeans + brown top + jacket" },
  { date: "2026-05-26", dayLabel: "26 May", city: "Inverness", ayushman: "Oxford Shirt + Cargo Pants + Grey Jacket",                dhwani: "blue jeans + white h&m top + jacket" },
  { date: "2026-05-27", dayLabel: "27 May", city: "Edinburgh", ayushman: "Black Shirt + Black Trouser + H&M Jacket",                dhwani: "black skirt and + brown top + grey blazer" },
  { date: "2026-05-28", dayLabel: "28 May", city: "Edinburgh", ayushman: "Special H&M Shirt + Cargo Pants + Zara Jacket",           dhwani: "brown skirt + black top (peplum) + grey blazer" },
  { date: "2026-05-29", dayLabel: "29 May", city: "Cotswolds", ayushman: "White Shirt + Light Blue Jeans + H&M Jacket",              dhwani: "orange skirt + white embroidery top + blazer / jacket" },
  { date: "2026-05-30", dayLabel: "30 May", city: "Cotswolds", ayushman: "Check Shirt + Blue Jeans + H&M Jacket",                   dhwani: "green skirt + green top + blazer/jacket/sweater" },
  { date: "2026-05-31", dayLabel: "31 May", city: "Flight",    ayushman: "Fancy Pyjamas + Tshirt (home) + Peanuts Jumper",           dhwani: "yoga pants + black tshirt + overshirt" },
];
