export interface TourPackage {
  id: string;
  title: string;
  category: 'spiritual' | 'hill-station' | 'adventure' | 'weekend';
  duration: string;
  pickupDrop: string;
  pricePerPerson: number;
  vehiclePrice: number;
  highlight: string;
  overview: string;
  bestTime: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; desc: string; halt: string }[];
  tagColor: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  category: 'sedan' | 'suv' | 'luxury-suv' | 'tempo' | 'coach';
  seats: string;
  luggage: string;
  ac: string;
  perKmRate: number;
  localPerDayRate: number;
  outstationPerDayRate: number;
  idealFor: string;
  features: string[];
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  durationHours: string;
  sedanFare: number;
  ertigaFare: number;
  innovaFare: number;
  tempoFare: number;
}

export interface SpiritualBusTour {
  id: string;
  title: string;
  hindiTitle: string;
  duration: string;
  busType: string;
  seatsTotal: number;
  pickupPoints: string[];
  departureSchedule: string;
  pricePerSeat: number;
  highlights: string[];
  keyTemples: string[];
  overview: string;
  includedAmenities: string[];
  nextDepartureDates: string[];
  badgeText: string;
}

export const SPIRITUAL_BUS_TOURS: SpiritualBusTour[] = [
  {
    id: 'char-dham-bus-deluxe',
    title: 'Complete Char Dham Yatra AC Pushback Bus Tour',
    hindiTitle: 'सम्पूर्ण चार धाम यात्रा - 2x2 डीलक्स पुष्बैक बस',
    duration: '10 Days / 9 Nights',
    busType: '2x2 AC Luxury Pushback Tourist Coach (27/35 Seater)',
    seatsTotal: 27,
    pickupPoints: ['Delhi (Kashmere Gate / Akshardham)', 'Haridwar (Near Railway Station)', 'Rishikesh (ISBT)'],
    departureSchedule: 'Every Tuesday & Friday (May - Oct)',
    pricePerSeat: 16500,
    highlights: [
      'Yamunotri, Gangotri, Kedarnath & Badrinath all 4 Dhams',
      'Accompanied by Devotional Tour Guide / Yatra Manager',
      'Daily morning-evening Bhajan/Kirtan audio & Satvik Meals stay',
      'VIP Darshan assistance & Biometric Yatra Pass registration'
    ],
    keyTemples: ['Yamunotri Dham', 'Gangotri Dham', 'Shri Kedarnath Jyotirlinga', 'Badrinath Vishal', 'Kashi Vishwanath (Uttarkashi)', 'Triveni Ghat Aarti'],
    overview: 'The ideal affordable yet deeply comfortable pilgrimage experience. Perfect for senior citizens, solo devotees, and families wishing to travel together in a spiritual, prayerful atmosphere with dedicated staff and satvik meals.',
    includedAmenities: [
      'Reserved 2x2 luxury pushback reclining seat with armrests',
      '9 Nights hotel accommodation (double/triple sharing)',
      'Pure satvik pure-veg breakfast and dinner everyday',
      'Toll tax, state permits, green cess, and parking charges',
      'Dedicated mountain bus captain + assistant staff + tour escort',
      'Emergency medical kit & complimentary packaged drinking water'
    ],
    nextDepartureDates: ['12 May 2026', '16 May 2026', '22 May 2026', '29 May 2026', '05 June 2026'],
    badgeText: 'Most Popular Yatra'
  },
  {
    id: 'do-dham-kedar-badri-bus',
    title: 'Do Dham Yatra: Kedarnath & Badrinath Deluxe Coach',
    hindiTitle: 'दो धाम यात्रा (केदारनाथ - बद्रीनाथ धाम)',
    duration: '6 Days / 5 Nights',
    busType: '2x2 Air Suspension AC Tourist Coach',
    seatsTotal: 30,
    pickupPoints: ['Haridwar Railway Station', 'Rishikesh ISBT / Tapovan', 'Dehradun ISBT'],
    departureSchedule: 'Every Monday, Wednesday & Saturday',
    pricePerSeat: 10999,
    highlights: [
      'Direct comfortable transfer till Sonprayag (Kedarnath Base)',
      'Drive via Devprayag & Rudraprayag Sangams to Badrinath',
      'Dedicated assistance for Kedarnath biometric queue & Doli/Pony booking',
      'Darshan at Mana Village (Last Indian Village) & Vyas Gufa'
    ],
    keyTemples: ['Kedarnath Jyotirlinga', 'Badrinath Mandir', 'Devprayag Sangam', 'Dhari Devi Temple', 'Rudraprayag Sangam'],
    overview: 'Specifically curated 6-day spiritual group tour for pilgrims seeking darshan of Lord Shiva at Kedarnath and Lord Vishnu at Badrinath with zero travel hassle.',
    includedAmenities: [
      'Air suspension smooth ride coach for winding mountain curves',
      '5 Nights hotel stay with hot water facility',
      'Daily satvik morning tea, breakfast and hearty dinner',
      'All toll, mountain permits, and parking charges included',
      'Tour coordinator available throughout the yatra'
    ],
    nextDepartureDates: ['10 May 2026', '15 May 2026', '18 May 2026', '24 May 2026', '31 May 2026'],
    badgeText: 'Fast-Filling'
  },
  {
    id: 'panch-prayag-rishikesh-bus',
    title: 'Panch Kedar & Panch Prayag Spiritual Darshan Tour',
    hindiTitle: 'पवित्र पंच प्रयाग एवं ऋषिकेश-हरिद्वार तीर्थ यात्रा',
    duration: '4 Days / 3 Nights',
    busType: 'Mini Luxury AC Bus (20 Seater)',
    seatsTotal: 20,
    pickupPoints: ['Haridwar', 'Rishikesh', 'Dehradun Airport (Jolly Grant)'],
    departureSchedule: 'Every Weekend (Friday to Monday)',
    pricePerSeat: 7499,
    highlights: [
      'Holy confluences: Vishnuprayag, Nandaprayag, Karnaprayag, Rudraprayag, Devprayag',
      'Famous Ganga Aarti at Parmarth Niketan & Har Ki Pauri',
      'Scenic stops at ancient riverside shrines with historical narration',
      'Comfortable small-group travel with fellow spiritual seekers'
    ],
    keyTemples: ['Vishnuprayag', 'Nandaprayag', 'Karnaprayag', 'Rudraprayag', 'Devprayag', 'Raghunath Temple', 'Mansadevi & Chandidevi'],
    overview: 'A spiritually enriching journey along the sacred Alaknanda and Bhagirathi rivers, witnessing all five sacred sangams (Panch Prayag) where rivers merge to form Holy Ganga.',
    includedAmenities: [
      'Comfortable 20-seater pushback AC coach',
      '3 Nights deluxe riverside/valley stay',
      'Breakfast and dinner included',
      'Guided priest/acharya assistance at major holy prayags'
    ],
    nextDepartureDates: ['08 May 2026', '15 May 2026', '22 May 2026', '29 May 2026'],
    badgeText: 'Weekend Special'
  },
  {
    id: 'haridwar-rishikesh-neelkanth-bus',
    title: 'Haridwar, Rishikesh & Neelkanth Mahadev Daily Sightseeing Bus',
    hindiTitle: 'हरिद्वार - ऋषिकेश - नीलकंठ महादेव दैनिक दर्शन बस',
    duration: 'Full Day (Morning 7 AM to Evening 8:30 PM)',
    busType: 'Deluxe AC City Sightseeing Coach',
    seatsTotal: 35,
    pickupPoints: ['Haridwar Railway Station', 'Har Ki Pauri', 'Shantikunj', 'Rishikesh Bus Stand'],
    departureSchedule: 'Daily Departures (365 Days)',
    pricePerSeat: 850,
    highlights: [
      'Visit Neelkanth Mahadev deep in the Manikoot mountain forests',
      'Ram Jhula, Laxman Jhula, Gita Bhawan, Swarg Ashram',
      'Reserved VIP seating for evening Har Ki Pauri Ganga Aarti',
      'Air-conditioned comfortable city & hill bus ride'
    ],
    keyTemples: ['Neelkanth Mahadev Mandir', 'Mansa Devi Temple (Ropeway point)', 'Chandi Devi Temple', 'Bharat Mandir', 'Triveni Ghat'],
    overview: 'The most popular daily group bus tour covering all prominent temples and ghats of holy Haridwar and Rishikesh in a single well-coordinated day.',
    includedAmenities: [
      'Full-day AC tourist coach transport with guide commentary',
      'Neelkanth hill forest road toll and entry charges',
      'Pickup and drop at convenient city locations',
      'Mineral water bottle provided'
    ],
    nextDepartureDates: ['Daily Departures Available (Morning 7:00 AM)'],
    badgeText: 'Daily Guaranteed'
  }
];

export const COMPANY_INFO = {
  name: 'Mannat Tour N Travels',
  tagline: 'Premier Uttarakhand Taxi & Char Dham Yatra Specialists',
  phone1: '+91 95826 78085',
  phone2: '+91 97614 33755',
  phoneRaw1: '919582678085',
  phoneRaw2: '919761433755',
  email: 'tourtravelmannat@gmail.com',
  address: 'BM Plaza, Vyom Prasth Phase 1, GMS Road, Dehradun, Uttarakhand - 248001',
  experienceYears: 10,
  authorizedBy: 'Authorized by Department of Tourism, Govt of Uttarakhand',
  whatsappMessage: 'Hello Mannat Travels, I would like to inquire about taxi and tour booking in Uttarakhand.',
};

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'char-dham-deluxe',
    title: 'Complete Char Dham Yatra (Deluxe)',
    category: 'spiritual',
    duration: '9 Nights / 10 Days',
    pickupDrop: 'Haridwar / Dehradun / Delhi',
    pricePerPerson: 18500,
    vehiclePrice: 42000,
    highlight: 'Yamunotri, Gangotri, Kedarnath & Badrinath with VIP Darshan Assistance',
    overview: 'Experience the most sacred circuit in the Himalayas with seasoned mountain drivers, comfortable deluxe hotels, daily breakfast & dinner, and seamless pilgrimage permits.',
    bestTime: 'May to June & September to November',
    inclusions: [
      'Dedicated AC vehicle with expert hill driver throughout',
      '9 Nights accommodation in deluxe mountain hotels',
      'Daily breakfast and dinner (pure vegetarian satvik food)',
      'Toll taxes, state permits, parking & driver night allowances',
      'Yatra registration and VIP darshan assistance',
      'Pick up and drop at Dehradun / Haridwar'
    ],
    exclusions: [
      'Helicopter tickets for Kedarnath (available on advance request)',
      'Pony, Doli, or Kandi charges at Yamunotri/Kedarnath',
      'Personal expenses, laundry, and camera fees'
    ],
    itinerary: [
      { day: 1, title: 'Haridwar/Dehradun to Barkot', desc: 'Scenic mountain drive via Mussoorie and Kempty Falls to Barkot valley.', halt: 'Barkot' },
      { day: 2, title: 'Barkot to Yamunotri Dham & return', desc: 'Early morning drive to Janki Chatti. Trek 6 km to Yamunotri Temple, take holy dip in Surya Kund, return to Barkot.', halt: 'Barkot' },
      { day: 3, title: 'Barkot to Uttarkashi', desc: 'Drive along Bhagirathi river to Uttarkashi. Visit Kashi Vishwanath Temple and Shakti Temple.', halt: 'Uttarkashi' },
      { day: 4, title: 'Uttarkashi to Gangotri Dham & return', desc: 'Excursion to Gangotri Temple via picturesque Harsil valley. Darshan and holy dip in Bhagirathi.', halt: 'Uttarkashi' },
      { day: 5, title: 'Uttarkashi to Guptkashi / Sonprayag', desc: 'Drive via Mandakini valley with views of snow-clad Chaukhamba peaks to Guptkashi.', halt: 'Guptkashi' },
      { day: 6, title: 'Sonprayag to Kedarnath Dham', desc: 'Transfer to Gaurikund. Trek or take helicopter to Kedarnath. Evening Aarti at Shri Kedarnath Temple.', halt: 'Kedarnath Base' },
      { day: 7, title: 'Kedarnath to Guptkashi / Rudraprayag', desc: 'Morning Temple Darshan and descent down to Gaurikund. Drive to Rudraprayag.', halt: 'Rudraprayag' },
      { day: 8, title: 'Rudraprayag to Badrinath Dham', desc: 'Drive to holy Badrinath via Joshimath. Visit Mana Village (Last Indian Village) and evening Aarti.', halt: 'Badrinath' },
      { day: 9, title: 'Badrinath to Rudraprayag / Srinagar', desc: 'Morning holy bath in Tapt Kund and Darshan. Return drive witnessing Vishnuprayag & Nandaprayag.', halt: 'Rudraprayag' },
      { day: 10, title: 'Return to Haridwar / Dehradun via Rishikesh', desc: 'Visit Devprayag (Sangam of Alaknanda & Bhagirathi), Ram Jhula, Laxman Jhula in Rishikesh, drop at station/airport.', halt: 'Departure' }
    ],
    tagColor: 'amber'
  },
  {
    id: 'do-dham-kedar-badri',
    title: 'Do Dham Yatra (Kedarnath & Badrinath)',
    category: 'spiritual',
    duration: '5 Nights / 6 Days',
    pickupDrop: 'Haridwar / Rishikesh / Dehradun',
    pricePerPerson: 12500,
    vehiclePrice: 28000,
    highlight: 'The Two Most Sacred Dhams with Dedicated Mountain Cab',
    overview: 'A tailored pilgrimage covering the divine shrines of Kedarnath and Badrinath, crafted for families and working professionals seeking an optimal spiritual journey.',
    bestTime: 'May to June & September to November',
    inclusions: [
      'Private AC Cab (Ertiga / Innova / Dzire) with hill-certified chauffeur',
      '5 Nights hotel stay with breakfast and dinner',
      'All toll taxes, state permits, and driver food/stay charges',
      'Assistance with Kedarnath biometric token & helicopter guidance'
    ],
    exclusions: ['Helicopter tickets, pony/palki charges, personal pooja items'],
    itinerary: [
      { day: 1, title: 'Haridwar/Dehradun to Guptkashi', desc: 'Picturesque drive along river Mandakini. Evening rest at hotel.', halt: 'Guptkashi' },
      { day: 2, title: 'Guptkashi to Kedarnath', desc: 'Drop at Sonprayag/Helipad. Ascend to Kedarnath and attend the transcendental evening Aarti.', halt: 'Kedarnath' },
      { day: 3, title: 'Kedarnath to Pipalkoti / Joshimath', desc: 'Morning darshan at temple. Descend to Sonprayag and drive to Pipalkoti.', halt: 'Pipalkoti' },
      { day: 4, title: 'Pipalkoti to Badrinath Dham', desc: 'Drive through Joshimath to Badrinath. Visit Tapt Kund, Mana Village, and Badrinath temple.', halt: 'Badrinath' },
      { day: 5, title: 'Badrinath to Srinagar / Rudraprayag', desc: 'Morning darshan, drive back through scenic confluences.', halt: 'Srinagar Garhwal' },
      { day: 6, title: 'Srinagar to Rishikesh & Dehradun Drop', desc: 'Enroute visit Devprayag and Rishikesh ghats before departure drop.', halt: 'Departure' }
    ],
    tagColor: 'emerald'
  },
  {
    id: 'mussoorie-dhanaulti-getaway',
    title: 'Queen of Hills: Mussoorie & Dhanaulti',
    category: 'hill-station',
    duration: '2 Nights / 3 Days',
    pickupDrop: 'Dehradun Airport / Railway Station',
    pricePerPerson: 6500,
    vehiclePrice: 9500,
    highlight: 'Mall Road, Kempty Falls, George Everest & Eco Park Dhanaulti',
    overview: 'Unwind amidst the misty pines and cedar forests of Mussoorie. Perfect for weekend getaways, couples, and family holidays in the lap of nature.',
    bestTime: 'Round the Year (Snowfall: Dec-Feb)',
    inclusions: [
      'Exclusive private sedan or SUV for 3 days sightseeing',
      '2 Nights stay in Mussoorie hotel with valley views',
      'Daily breakfast included',
      'Dehradun airport/railway station pickup and drop'
    ],
    exclusions: ['Entry tickets to ropeway, adventure parks, lunch and personal shopping'],
    itinerary: [
      { day: 1, title: 'Dehradun to Mussoorie', desc: 'Pickup from Dehradun, drive to Mussoorie. Check-in, evening stroll at Mall Road and Gun Hill.', halt: 'Mussoorie' },
      { day: 2, title: 'Mussoorie Sightseeing & Kempty Falls', desc: 'Visit Kempty Falls, Company Garden, Dalai Hills, and sunset at George Everest Peak.', halt: 'Mussoorie' },
      { day: 3, title: 'Dhanaulti Excursion & Dehradun Drop', desc: 'Drive to scenic Dhanaulti, visit Eco Park and Surkanda Devi Temple, return drop to Dehradun.', halt: 'Departure' }
    ],
    tagColor: 'sky'
  },
  {
    id: 'nainital-corbett-wildlife',
    title: 'Nainital Lakes & Jim Corbett Safari',
    category: 'adventure',
    duration: '3 Nights / 4 Days',
    pickupDrop: 'Kathgodam / Delhi / Dehradun',
    pricePerPerson: 10800,
    vehiclePrice: 19500,
    highlight: 'Boating on Naini Lake, Bhimtal, and Corbett Jungle Jeep Safari',
    overview: 'Combine the calm waters and pine hills of Kumaon with the thrill of spotting Royal Bengal Tigers in India’s oldest national park.',
    bestTime: 'October to June',
    inclusions: [
      'Private dedicated cab for all 4 days',
      '2 Nights Nainital + 1 Night Jim Corbett Resort',
      'Daily breakfast and dinner',
      'Sightseeing of Naini Lake, Bhimtal, Naukuchiatal, Snow View Point'
    ],
    exclusions: ['Corbett Jeep Safari entry permit (can be arranged separately)', 'Boating fees'],
    itinerary: [
      { day: 1, title: 'Arrival & Nainital Sightseeing', desc: 'Transfer to Nainital. Check-in and enjoy boating in Naini Lake and visit Naina Devi Temple.', halt: 'Nainital' },
      { day: 2, title: 'Lake Tour Excursion', desc: 'Explore Bhimtal, Sattal, Naukuchiatal, and enjoy paragliding/water zorbing.', halt: 'Nainital' },
      { day: 3, title: 'Nainital to Jim Corbett Park', desc: 'Drive to Jim Corbett. Visit Corbett Falls and Garjiya Devi Temple. Evening resort bonfire.', halt: 'Jim Corbett' },
      { day: 4, title: 'Corbett Jungle Safari & Departure', desc: 'Early morning 4x4 open Gypsy safari into Corbett tiger reserve. Return transfer to Kathgodam/Delhi.', halt: 'Departure' }
    ],
    tagColor: 'orange'
  },
  {
    id: 'rishikesh-haridwar-yoga',
    title: 'Rishikesh Spiritual & Ganga River Rafting',
    category: 'adventure',
    duration: '2 Nights / 3 Days',
    pickupDrop: 'Dehradun Airport / Haridwar Railway Station',
    pricePerPerson: 5800,
    vehiclePrice: 8500,
    highlight: 'Parmarth Niketan Ganga Aarti, White Water Rafting & Shivpuri Camp',
    overview: 'Rejuvenate your soul with the world capital of yoga, thrilling Ganga white-water rapids, cliff jumping, and tranquil evening arti at Triveni Ghat.',
    bestTime: 'September to June',
    inclusions: [
      'Private vehicle for transfers & local sightseeing',
      '1 Night riverside luxury camp + 1 Night boutique hotel in Rishikesh',
      '16 km rafting expedition with certified river guides & safety gear',
      'All meals at camp (breakfast, lunch, dinner, evening tea snacks)'
    ],
    exclusions: ['Bungee jumping / flying fox tickets, personal transport outside itinerary'],
    itinerary: [
      { day: 1, title: 'Haridwar Darshan to Rishikesh', desc: 'Pickup and visit Har Ki Pauri for holy dip. Drive to Rishikesh, attend Parmarth Niketan Ganga Aarti.', halt: 'Rishikesh' },
      { day: 2, title: 'White Water Rafting & Camping', desc: 'Experience thrilling grade III rapids from Shivpuri to Rishikesh. Evening musical bonfire at riverside camp.', halt: 'Shivpuri' },
      { day: 3, title: 'Beatles Ashram, Neer Waterfall & Drop', desc: 'Visit the historic Beatles Ashram, trek to Neer Gaddu waterfall, drop at Jolly Grant Airport/Haridwar.', halt: 'Departure' }
    ],
    tagColor: 'teal'
  },
  {
    id: 'auli-chopta-tungnath',
    title: 'Auli Skiing, Chopta & Highest Shiva Temple',
    category: 'adventure',
    duration: '4 Nights / 5 Days',
    pickupDrop: 'Rishikesh / Haridwar / Dehradun',
    pricePerPerson: 13900,
    vehiclePrice: 26000,
    highlight: 'Auli Ropeway, Nanda Devi Views & Tungnath-Chandrashila Trek',
    overview: 'Trek to the highest Shiva shrine on earth at Tungnath (3,680m), summit Chandrashila for a 360-degree Himalayan panorama, and behold Auli’s alpine meadows.',
    bestTime: 'April to June (Spring/Summer) & Dec to March (Snow & Skiing)',
    inclusions: [
      'Robust 4x4 or high-clearance mountain cab (Innova/Ertiga/Bolero)',
      '4 Nights hotel/Swiss tent accommodation with meals',
      'Trek guide assistance for Tungnath & Chandrashila',
      'Sightseeing of Joshimath, Auli, Chopta mini-Switzerland'
    ],
    exclusions: ['Auli cable car tickets, snow equipment hire, personal tips'],
    itinerary: [
      { day: 1, title: 'Rishikesh to Chopta Valley', desc: 'Drive along Alaknanda and Mandakini rivers through Devprayag to Chopta alpine meadows.', halt: 'Chopta' },
      { day: 2, title: 'Tungnath Temple & Chandrashila Peak Trek', desc: 'Moderate 4 km trek to divine Tungnath Temple, further 1 km to Chandrashila for 360° Himalayan views.', halt: 'Chopta' },
      { day: 3, title: 'Chopta to Joshimath & Auli', desc: 'Scenic transfer to Joshimath. Take the famous ropeway to Auli ski slopes and artificial lake.', halt: 'Auli / Joshimath' },
      { day: 4, title: 'Auli Alpine Day to Rudraprayag', desc: 'Morning photography with Nanda Devi peak backdrop. Drive towards Rudraprayag.', halt: 'Rudraprayag' },
      { day: 5, title: 'Rudraprayag to Rishikesh & Departure', desc: 'Scenic descent back to Rishikesh/Haridwar for onward journey.', halt: 'Departure' }
    ],
    tagColor: 'purple'
  }
];

export const VEHICLE_FLEET: VehicleOption[] = [
  {
    id: 'sedan-dzire',
    name: 'Maruti Suzuki Dzire / Toyota Etios',
    category: 'sedan',
    seats: '4 Passengers',
    luggage: '2 Medium Bags',
    ac: 'Air Conditioned / Heater',
    perKmRate: 11,
    localPerDayRate: 1800,
    outstationPerDayRate: 2500,
    idealFor: 'Couples, small families, Dehradun airport transfers, Mussoorie & Rishikesh day trips',
    features: ['Clean sanitized interiors', 'Experienced mountain chauffeur', 'Music system & phone charging', 'GPS enabled vehicle']
  },
  {
    id: 'ertiga-suv',
    name: 'Maruti Ertiga (New Gen)',
    category: 'suv',
    seats: '6 Passengers',
    luggage: '3 Large Bags + Carrier',
    ac: 'Front & Rear Dual AC',
    perKmRate: 14,
    localPerDayRate: 2500,
    outstationPerDayRate: 3500,
    idealFor: 'Families & small groups, Char Dham Yatra, budget-friendly mountain travel',
    features: ['Ample legroom & luggage space', 'Heavy duty roof luggage carrier', 'High ground clearance for hills', 'Verified hill certified driver']
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'luxury-suv',
    seats: '7 Passengers',
    luggage: '4 Large Bags + Carrier',
    ac: 'Tri-zone Climate Control',
    perKmRate: 18,
    localPerDayRate: 4000,
    outstationPerDayRate: 4800,
    idealFor: 'VIP Pilgrims, seniors, executive corporate travel, supreme mountain stability',
    features: ['Plush captain chairs', 'Unmatched mountain suspension', 'First-aid kit & emergency toolkit', 'Highly experienced senior driver']
  },
  {
    id: 'tempo-12',
    name: 'Force Tempo Traveller (12 Seater)',
    category: 'tempo',
    seats: '12 Passengers',
    luggage: '10 Bags Dedicated Boot',
    ac: 'Powerful High-Roof AC',
    perKmRate: 24,
    localPerDayRate: 6500,
    outstationPerDayRate: 7500,
    idealFor: 'Group yatras, extended families, student & corporate outings',
    features: ['1x1 pushback luxury bucket seats', 'Individual reading lamps & charging points', 'LED TV & premium sound system', 'Spacious aisle & ample headroom']
  },
  {
    id: 'tempo-17',
    name: 'Force Tempo Traveller (17/20 Seater)',
    category: 'tempo',
    seats: '17-20 Passengers',
    luggage: 'Large Carrier & Rear Storage',
    ac: 'Heavy Duty Multi-Vents AC',
    perKmRate: 28,
    localPerDayRate: 7800,
    outstationPerDayRate: 9000,
    idealFor: 'Large pilgrimage groups, wedding parties, school/college excursions',
    features: ['High-comfort reclining seats', 'Dedicated mountain crew (driver + helper)', 'Dual step entry for senior pilgrims', 'Robust Himalayan permit certified']
  },
  {
    id: 'luxury-coach',
    name: 'Luxury Mini Bus / Volvo Coach (27-35 Seater)',
    category: 'coach',
    seats: '27-35 Passengers',
    luggage: 'Massive Underbelly Storage',
    ac: 'Central Climate Control',
    perKmRate: 42,
    localPerDayRate: 12000,
    outstationPerDayRate: 15000,
    idealFor: 'Corporate retreats, community sangha yatras, convention delegates',
    features: ['Air suspension for smooth ride', 'Mic system for tour guide/bhajans', 'Curtains & wide panoramic tinted windows', '24/7 backup vehicle guarantee']
  }
];

export const POPULAR_ROUTES: PopularRoute[] = [
  { id: '1', from: 'Dehradun Airport (Jolly Grant)', to: 'Rishikesh', distanceKm: 22, durationHours: '40 mins', sedanFare: 1100, ertigaFare: 1500, innovaFare: 2200, tempoFare: 3500 },
  { id: '2', from: 'Dehradun Airport', to: 'Mussoorie', distanceKm: 60, durationHours: '2.5 hrs', sedanFare: 2400, ertigaFare: 3200, innovaFare: 4200, tempoFare: 6500 },
  { id: '3', from: 'Haridwar', to: 'Sonprayag (Kedarnath Base)', distanceKm: 235, durationHours: '8 hrs', sedanFare: 6500, ertigaFare: 8500, innovaFare: 11500, tempoFare: 16500 },
  { id: '4', from: 'Haridwar / Rishikesh', to: 'Badrinath Dham', distanceKm: 315, durationHours: '10 hrs', sedanFare: 8500, ertigaFare: 10800, innovaFare: 14500, tempoFare: 21000 },
  { id: '5', from: 'Delhi Airport', to: 'Haridwar / Rishikesh', distanceKm: 240, durationHours: '4.5 hrs', sedanFare: 3800, ertigaFare: 5200, innovaFare: 7200, tempoFare: 11500 },
  { id: '6', from: 'Delhi', to: 'Dehradun', distanceKm: 260, durationHours: '5 hrs', sedanFare: 4200, ertigaFare: 5500, innovaFare: 7500, tempoFare: 12000 },
  { id: '7', from: 'Dehradun', to: 'Nainital', distanceKm: 280, durationHours: '7.5 hrs', sedanFare: 5500, ertigaFare: 7200, innovaFare: 9800, tempoFare: 15000 },
  { id: '8', from: 'Haridwar', to: 'Gangotri Dham', distanceKm: 285, durationHours: '9.5 hrs', sedanFare: 7800, ertigaFare: 9800, innovaFare: 13000, tempoFare: 18500 }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rajesh Sharma',
    city: 'New Delhi',
    destination: 'Complete Char Dham Yatra (9 Nights)',
    rating: 5,
    date: 'June 2025',
    vehicle: 'Toyota Innova Crysta',
    quote: 'Our family undertook the sacred Char Dham with Mannat Travels. Driver Surendra ji was exceptionally polite, possessed immense mountain driving skill, and navigated treacherous terrain with zero stress. Clean car, fair transparent billing with zero hidden costs!'
  },
  {
    id: 't2',
    name: 'Anita & Dr. Suresh Kulkarni',
    city: 'Pune, Maharashtra',
    destination: 'Kedarnath & Badrinath Do Dham',
    rating: 5,
    date: 'September 2025',
    vehicle: 'Maruti Ertiga',
    quote: 'Being senior citizens, we were apprehensive about the steep climbs and road conditions. Mannat Travels handled our token registration, hotel check-ins, and kept a constant check on our well-being. Truly grateful for their warmth and reliability.'
  },
  {
    id: 't3',
    name: 'Vikramaditya Oberoi',
    city: 'Chandigarh',
    destination: 'Mussoorie & Dhanaulti Weekend',
    rating: 5,
    date: 'December 2025',
    vehicle: 'Swift Dzire',
    quote: 'Booked a 3-day round trip from Dehradun airport to Mussoorie. The cab arrived 15 minutes before landing time. The driver was local and showed us secluded sunset spots in George Everest away from tourist crowds. Superb service!'
  },
  {
    id: 't4',
    name: 'Gaurav Aggarwal (Group of 14)',
    city: 'Jaipur, Rajasthan',
    destination: 'Auli Skiing & Rishikesh Rafting',
    rating: 5,
    date: 'January 2026',
    vehicle: '17 Seater Tempo Traveller',
    quote: 'Took a 17-seater tempo traveller for our college reunion trip to Auli and Chopta. The vehicle had high-end pushback seats, top-notch sound system, and powerful heating. The driver handled ice-covered snowy curves effortlessly.'
  }
];

export const FAQS = [
  {
    question: 'How do I book a cab or tour with Mannat Travels?',
    answer: 'You can book instantly through our website fare calculator, call our 24/7 hotline at +91 95826 78085, or tap the WhatsApp button. We provide instant quote confirmation with vehicle details and driver number.'
  },
  {
    question: 'Are toll taxes, parking, and driver allowances included in outstation rates?',
    answer: 'Yes! We believe in 100% transparent pricing. Our standard outstation quotes clearly specify toll taxes, state road taxes, parking fees, and driver night food/stay allowances so there are zero surprises at the end of the trip.'
  },
  {
    question: 'Do you help with Char Dham Yatra registration and helicopter tickets?',
    answer: 'Absolutely. We guide all our pilgrims through the mandatory Uttarakhand Tourist Care biometric registration and provide advisory support for IRCTC Kedarnath helicopter booking windows.'
  },
  {
    question: 'Are your mountain drivers certified and vehicles fit for hill roads?',
    answer: 'Every driver in our fleet has a minimum of 5 to 10 years of Himalayan driving experience with clean track records. All vehicles undergo strict pre-trip mechanical inspections, tire tread checks, and emergency brake tests.'
  },
  {
    question: 'Can I customize an itinerary for senior citizens or young children?',
    answer: 'Yes, we specialize in tailor-made flexible itineraries with additional rest stops, gentle driving pace, oxygen support arrangements, and wheelchair-accessible vehicle options upon request.'
  }
];
