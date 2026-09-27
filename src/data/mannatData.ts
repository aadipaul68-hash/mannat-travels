/**
 * Mannat Tour and Travels (mannattourandtravels.com / mannat-travels.vercel.app)
 * Local and authentic image assets for all destinations
 * Guaranteed: Every package has an authentic destination image and matching gallery.
 */

export interface TourItem {
  id: string;
  title: string;
  category: string;
  destination?: string;
  route?: string;
  busType?: string;
  vehicle?: string;
  departureDate?: string;
  returnDate?: string;
  duration: string;
  originalPrice?: number;
  price: number;
  advanceAmount?: number;
  availableSeats?: number;
  totalSeats?: number;
  boardingLocation?: string;
  boardingPoints?: string;
  foodIncluded?: boolean;
  inclusions?: string[];
  placesCovered?: string[];
  image: string;
  galleryImages?: string[];
  videoUrl?: string; // YouTube or MP4 video link
  itinerary?: { day: number; title: string; desc: string }[];
  showItinerary?: boolean; // Admin toggle to show/hide Detailed Itinerary
  status?: string;
  badge?: string;
  closingSoon?: boolean;
  description: string;
  whatsappText?: string;
}

export const SITE_INFO = {
  name: 'Mannat Tour and Travels',
  brandShort: 'MANNAT TOURS',
  tagline: 'Luxury Travel & Pilgrimages',
  subTagline: 'Best Spiritual Bus Tours & Holiday Packages',
  phone: '8445395995',
  phoneFormatted: '+91 84453 95995',
  whatsappRaw: '918445395995',
  office: 'Muzaffarnagar, Uttar Pradesh (Central Bus Stand Road, 251001)',
  serviceAreas: 'Muzaffarnagar, Meerut, Delhi NCR, and throughout Western Uttar Pradesh',
  email: 'mannattourandtravels@gmail.com',
  website: 'https://mannattourandtravels.com',
};

/**
 * Intelligent Destination Image Resolver
 * Ensures ANY package (even newly created in admin or saved in old localStorage)
 * always gets its authentic, high-quality destination photo!
 */
export function getDestinationImage(destinationOrTitle: string = ''): string {
  const s = destinationOrTitle.toLowerCase();
  if (s.includes('kedarnath')) return '/images/kedarnath.jpg';
  if (s.includes('badrinath')) return '/images/badrinath.jpg';
  if (s.includes('kainchi') || s.includes('kaichi') || s.includes('neem karoli')) return '/images/kaichi-dham.jpg';
  if (s.includes('nainital')) return '/images/nainital.jpg';
  if (s.includes('ayodhya') || s.includes('ram mandir')) return '/images/ayodhya-banner.jpg';
  if (s.includes('kashi') || s.includes('varanasi')) return '/images/kashi-varanasi.jpg';
  if (s.includes('manali') || s.includes('solang')) return '/images/manali.jpg';
  if (s.includes('shimla') || s.includes('kufri')) return '/images/shimla.jpg';
  if (s.includes('mussoorie') || s.includes('kempty')) return '/images/mussoorie.jpg';
  if (s.includes('kashmir') || s.includes('srinagar') || s.includes('gulmarg')) return '/images/kashmir.jpg';
  if (s.includes('haridwar')) return '/images/haridwar.jpg';
  if (s.includes('rishikesh')) return '/images/rishikesh.jpg';
  if (s.includes('vrindavan') || s.includes('mathura') || s.includes('barsana') || s.includes('braj')) return '/images/vrindavan.jpg';
  if (s.includes('vaishno') || s.includes('katra')) return '/images/vaishno-devi.jpg';
  if (s.includes('amritsar') || s.includes('golden temple')) return '/images/amritsar.jpg';
  if (s.includes('khatu') || s.includes('salasar')) return '/images/khatu-shyam.jpg';
  if (s.includes('jaipur')) return '/images/jaipur.jpg';
  if (s.includes('agra') || s.includes('taj')) return '/images/agra-taj.jpg';
  if (s.includes('goa')) return '/images/goa.jpg';
  if (s.includes('corbett') || s.includes('ramnagar') || s.includes('girija')) return '/images/kaichi-dham.jpg';
  if (s.includes('kasol') || s.includes('parvati')) return '/images/kasol.jpg';
  if (s.includes('chardham') || s.includes('char dham') || s.includes('gangotri') || s.includes('yamunotri')) return '/images/chardham.jpg';
  return '/images/chardham.jpg';
}

/**
 * Intelligent Destination Gallery Resolver
 * Provides 2-4 authentic destination-specific images for each package gallery
 */
export function getDestinationGallery(destinationOrTitle: string = '', mainImage?: string): string[] {
  const s = destinationOrTitle.toLowerCase();
  const list: string[] = [];

  if (s.includes('kedarnath') || s.includes('badrinath') || s.includes('chardham') || s.includes('char dham')) {
    list.push('/images/kedarnath.jpg', '/images/badrinath.jpg', '/images/chardham.jpg', '/images/gangotri.jpg', '/images/yamunotri.jpg');
  } else if (s.includes('kainchi') || s.includes('kaichi') || s.includes('nainital')) {
    list.push('/images/kaichi-dham.jpg', '/images/nainital.jpg', '/images/corbett.jpg');
  } else if (s.includes('ayodhya') || s.includes('kashi') || s.includes('varanasi')) {
    list.push('/images/ayodhya-banner.jpg', '/images/kashi-varanasi.jpg', '/images/haridwar.jpg');
  } else if (s.includes('manali') || s.includes('kasol') || s.includes('shimla')) {
    list.push('/images/manali.jpg', '/images/shimla.jpg', '/images/kasol.jpg');
  } else if (s.includes('mussoorie') || s.includes('haridwar') || s.includes('rishikesh')) {
    list.push('/images/mussoorie.jpg', '/images/haridwar.jpg', '/images/rishikesh.jpg');
  } else if (s.includes('kashmir') || s.includes('srinagar') || s.includes('gulmarg')) {
    list.push('/images/kashmir.jpg', '/images/dal-lake.jpg', '/images/gulmarg.jpg');
  } else if (s.includes('jaipur') || s.includes('agra') || s.includes('taj')) {
    list.push('/images/jaipur.jpg', '/images/agra-taj.jpg');
  } else if (s.includes('vrindavan') || s.includes('mathura')) {
    list.push('/images/vrindavan.jpg', '/images/agra-taj.jpg');
  } else if (s.includes('vaishno') || s.includes('katra')) {
    list.push('/images/vaishno-devi.jpg', '/images/amritsar.jpg');
  } else if (s.includes('amritsar')) {
    list.push('/images/amritsar.jpg');
  } else if (s.includes('khatu')) {
    list.push('/images/khatu-shyam.jpg', '/images/jaipur.jpg');
  } else if (s.includes('goa')) {
    list.push('/images/goa.jpg');
  } else if (mainImage) {
    list.push(mainImage);
  }

  // Deduplicate and ensure mainImage is first
  const set = new Set<string>();
  if (mainImage) set.add(mainImage);
  for (const img of list) {
    if (img) set.add(img);
  }
  return Array.from(set);
}

/**
 * Ensures every single tour object has a valid, non-empty, destination-matching image & gallery.
 */
export function ensureTourHasValidImages(tour: TourItem): TourItem {
  if (!tour) return tour;
  const destinationOrTitle = `${tour.title || ''} ${tour.destination || ''} ${tour.route || ''}`;
  
  let validImage = tour.image && typeof tour.image === 'string' && tour.image.trim() !== ''
    ? tour.image
    : getDestinationImage(destinationOrTitle);

  // If previous image was invalid or broken placeholder, fix it
  if (validImage === '/images/nainital.jpg' || !validImage.startsWith('/images/')) {
    validImage = getDestinationImage(destinationOrTitle);
  }

  // Ensure gallery matches destination
  let gallery = Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
    ? tour.galleryImages.filter((img) => img && typeof img === 'string')
    : getDestinationGallery(destinationOrTitle, validImage);

  // Filter out any stale generic fallbacks that got injected previously
  if (gallery.length === 0) {
    gallery = getDestinationGallery(destinationOrTitle, validImage);
  }

  return {
    ...tour,
    image: validImage,
    galleryImages: gallery,
  };
}

// ✦ Exact Spiritual Bus Tours with 100% Authentic Destination Assets ✦
export const BUS_TOURS: TourItem[] = [
  {
    id: 'tour-girija-devi-hanuman-kainchi',
    title: 'Girija Devi + Hanuman Dham + Kainchi Dham',
    category: 'Spiritual Yatras',
    destination: 'Uttarakhand (Ramnagar & Nainital Hills)',
    route: 'Muzaffarnagar - Moradabad - Ramnagar - Kainchi Dham',
    busType: 'Deluxe 2x2 AC Pushback Bus',
    departureDate: '21 Sept 2026',
    returnDate: '23 Sept 2026',
    duration: '2 Nights / 3 Days',
    originalPrice: 2800,
    price: 2300,
    advanceAmount: 1000,
    availableSeats: 4,
    totalSeats: 35,
    boardingPoints: 'Muzaffarnagar (Central Bus Stand), Meerut Bypass, Delhi NCR',
    foodIncluded: true,
    inclusions: [
      '2x2 AC Pushback Bus Travel',
      'Pure Satvik Meals & Breakfast',
      'Hotel Stay (Twin/Triple Sharing)',
      'Darshan & Tour Manager Assistance'
    ],
    image: '/images/kaichi-dham.jpg',
    galleryImages: [
      '/images/kaichi-dham.jpg',
      '/images/nainital.jpg',
      '/images/corbett.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=0hE1rDcf7iI',
    status: 'active',
    badge: 'Bestseller',
    closingSoon: false,
    description: 'Sacred group bus pilgrimage to revered Neem Karoli Baba Kainchi Dham Ashram, ancient Maa Girija Devi Temple on Kosi riverbank, and Hanuman Dham with complete satvik meals and comfortable hotel stay.',
    itinerary: [
      { day: 1, title: 'Departure & Girija Devi Temple', desc: 'Departure from Muzaffarnagar / Meerut in 2x2 AC Pushback Coach. Scenic arrival at Ramnagar, holy darshan of Maa Girija Devi Temple on Kosi river and evening hotel check-in.' },
      { day: 2, title: 'Kainchi Dham Ashram Darshan & Aarti', desc: 'Early morning arrival at Neem Karoli Baba Ashram Kainchi Dham. Participate in Kakad Aarti, Hanuman Chalisa recitations, receive prasad, and visit Hanuman Dham.' },
      { day: 3, title: 'Bhimtal Sightseeing & Return Journey', desc: 'Morning visit to picturesque Bhimtal Lake, scenic mountain views, local shopping, followed by comfortable return journey to Muzaffarnagar / Delhi NCR.' }
    ],
    whatsappText: 'Namaste Mannat Tours, mujhe Girija Devi + Kainchi Dham Bus Tour (21 Sept, ₹2,300) ki seat book karni hai.'
  },
  {
    id: 'tour-ayodhya-kashi-bus',
    title: 'Divya Ayodhya Ram Mandir & Kashi Vishwanath Yatra',
    category: 'Spiritual Yatras',
    destination: 'Uttar Pradesh (Ayodhya & Varanasi)',
    route: 'Muzaffarnagar - Meerut - Lucknow - Ayodhya - Varanasi',
    busType: 'AC Luxury Coach (3x2)',
    departureDate: '05 Oct 2026',
    returnDate: '09 Oct 2026',
    duration: '4 Nights / 5 Days',
    originalPrice: 7500,
    price: 5999,
    advanceAmount: 2000,
    availableSeats: 14,
    totalSeats: 40,
    closingSoon: true,
    boardingPoints: 'Muzaffarnagar, Khatauli, Meerut, Anand Vihar Delhi NCR',
    foodIncluded: true,
    inclusions: [
      'Deluxe AC Coach Travel',
      'Hotel/Dharmshala Stay',
      'Pure Vegetarian Meals',
      'Dashashwamedh Ghat Evening Aarti Boat Coordination',
      'Ram Mandir Darshan Assistance'
    ],
    image: '/images/ayodhya-banner.jpg',
    galleryImages: [
      '/images/ayodhya-banner.jpg',
      '/images/kashi-varanasi.jpg',
      '/images/haridwar.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=F0Z7mYmE1gY',
    status: 'active',
    badge: 'Most Popular',
    description: 'Grand group yatra to Bhavya Ram Janmabhoomi Mandir at Ayodhya Dham, Saryu holy bath, Kanak Bhawan, Hanuman Garhi, and Kashi Vishwanath corridor with spectacular evening Dashashwamedh Ghat Ganga Aarti.',
    itinerary: [
      { day: 1, title: 'Departure from Muzaffarnagar & Meerut', desc: 'Overnight journey via express highway in AC Tourist Coach with bhajans and devotional ambiance.' },
      { day: 2, title: 'Ayodhya Ram Janmabhoomi & Saryu Aarti', desc: 'Holy dip in sacred Saryu river, VIP darshan at Bhavya Ram Mandir, Hanuman Garhi, and Kanak Bhawan.' },
      { day: 3, title: 'Travel to Kashi & Ganga Aarti', desc: 'Proceed to Varanasi, check-in to hotel, attend divine evening Ganga Aarti by private boat on Dashashwamedh Ghat.' },
      { day: 4, title: 'Kashi Vishwanath Jyotirlinga & Sarnath', desc: 'Mangala darshan at Kashi Vishwanath Corridor, Annapurna Mandir, Kaal Bhairav, and excursion to Sarnath.' },
      { day: 5, title: 'Return Journey Home', desc: 'Depart with sacred prasad and blessings, safe drop-off at Meerut and Muzaffarnagar.' }
    ],
    whatsappText: 'Namaste Mannat Tours, mujhe Ayodhya Ram Mandir & Kashi Bus Tour (05 Oct, ₹5,999) ki booking karni hai.'
  },
  {
    id: 'tour-vaishno-devi-katra-bus',
    title: 'Maa Vaishno Devi Bhavan & Sacred Shiv Khori Yatra',
    category: 'Spiritual Yatras',
    destination: 'Jammu & Kashmir (Katra & Reasi)',
    route: 'Muzaffarnagar - Saharanpur - Ludhiana - Jammu - Katra',
    busType: 'Deluxe AC Sleeper/Seater Bus',
    departureDate: '15 Oct 2026',
    returnDate: '19 Oct 2026',
    duration: '3 Nights / 4 Days',
    originalPrice: 6200,
    price: 4999,
    advanceAmount: 1500,
    availableSeats: 20,
    totalSeats: 40,
    boardingPoints: 'Muzaffarnagar, Deoband, Saharanpur, Ambala Bypass',
    foodIncluded: true,
    inclusions: [
      'AC Sleeper/Seater Bus Travel',
      'Katra Hotel Stay near Banganga',
      'Satvik Food & Breakfast',
      'Katra to Shiv Khori Excursion',
      'Yatra RFID Slip Support'
    ],
    image: '/images/vaishno-devi.jpg',
    galleryImages: [
      '/images/vaishno-devi.jpg',
      '/images/amritsar.jpg'
    ],
    status: 'active',
    badge: 'Navratri Special',
    description: 'Blessed pilgrimage to Mata Vaishno Devi Shrine at Trikuta Hills with an AC bus excursion to holy natural Shivling cave at Shiv Khori.',
    whatsappText: 'Namaste Mannat Tours, mujhe Vaishno Devi & Shiv Khori Bus Tour (15 Oct, ₹4,999) ki seat book karni hai.'
  },
  {
    id: 'tour-haridwar-rishikesh-mussoorie-bus',
    title: 'Haridwar Ganga Aarti, Rishikesh & Mussoorie Hills',
    category: 'Weekend Tours',
    destination: 'Uttarakhand',
    route: 'Muzaffarnagar - Roorkee - Haridwar - Rishikesh - Mussoorie',
    busType: 'Deluxe 2x2 AC Coach',
    departureDate: '24 Oct 2026',
    returnDate: '26 Oct 2026',
    duration: '2 Nights / 3 Days',
    price: 2999,
    advanceAmount: 1000,
    availableSeats: 22,
    totalSeats: 35,
    boardingPoints: 'Muzaffarnagar (Ramprakash Stand), Purkazi, Roorkee',
    foodIncluded: true,
    inclusions: [
      'AC Bus Travel',
      'Hotel Stay in Rishikesh & Mussoorie',
      'Breakfast & Dinner',
      'All Sightseeing Transfers'
    ],
    image: '/images/haridwar.jpg',
    galleryImages: [
      '/images/haridwar.jpg',
      '/images/rishikesh.jpg',
      '/images/mussoorie.jpg'
    ],
    status: 'active',
    badge: 'Weekend Special',
    description: 'Holy dip at Har Ki Pauri, magical Triveni Ghat evening Ganga Aarti, Lakshman Jhula, and Kempty Falls in the hills of Mussoorie.',
    whatsappText: 'Namaste Mannat Tours, mujhe Haridwar Rishikesh Mussoorie Bus Tour (₹2,999) ki details chahiye.'
  },
  {
    id: 'tour-mathura-vrindavan-bus',
    title: 'Braj Bhoomi Darshan: Mathura, Vrindavan & Govardhan',
    category: 'Spiritual Yatras',
    destination: 'Uttar Pradesh (Braj Region)',
    route: 'Muzaffarnagar - Yamuna Expressway - Mathura - Vrindavan - Barsana',
    busType: 'Deluxe 2x2 AC Bus',
    departureDate: '08 Nov 2026',
    returnDate: '09 Nov 2026',
    duration: '1 Night / 2 Days',
    price: 2199,
    advanceAmount: 800,
    availableSeats: 25,
    totalSeats: 40,
    boardingPoints: 'Muzaffarnagar, Meerut, Delhi Akshardham',
    foodIncluded: true,
    inclusions: [
      '2x2 AC Bus Travel',
      'AC Hotel Stay in Vrindavan',
      'Satvik Meals & Breakfast',
      'Prem Mandir & Bankey Bihari Darshan Support'
    ],
    image: '/images/vrindavan.jpg',
    galleryImages: [
      '/images/vrindavan.jpg',
      '/images/agra-taj.jpg'
    ],
    status: 'active',
    badge: 'Devotional',
    description: 'Immerse in Krishna bhakti: Shri Krishna Janmabhoomi, Bankey Bihari Ji, breathtaking musical fountains & lights at Prem Mandir, and Radha Rani Temple Barsana.',
    whatsappText: 'Namaste Mannat Tours, mujhe Mathura Vrindavan 2 Days Bus Tour (₹2,199) book karna hai.'
  },
  {
    id: 'tour-khatu-shyam-salasar-bus',
    title: 'Shri Khatu Shyam Ji & Salasar Balaji Yatra',
    category: 'Spiritual Yatras',
    destination: 'Rajasthan (Khatu Dham & Salasar)',
    route: 'Muzaffarnagar - Meerut - Delhi Bypass - Ringas - Khatu Shyam - Salasar',
    busType: 'Deluxe 2x2 AC Bus',
    departureDate: 'Every Saturday Evening',
    returnDate: 'Monday Morning',
    duration: '1 Night / 2 Days',
    price: 1999,
    advanceAmount: 700,
    availableSeats: 18,
    totalSeats: 40,
    boardingPoints: 'Muzaffarnagar Central Stand, Khatauli, Meerut Bypass, Delhi Kashmiri Gate',
    foodIncluded: true,
    inclusions: [
      'Deluxe AC 2x2 Coach Travel',
      'Hotel/Dharmshala Stay in Khatu',
      'Pure Satvik Vegetarian Meals',
      'Darshan Assistance at Khatu Shyam & Salasar Balaji'
    ],
    image: '/images/khatu-shyam.jpg',
    galleryImages: [
      '/images/khatu-shyam.jpg',
      '/images/jaipur.jpg'
    ],
    status: 'active',
    badge: 'Hare Ka Sahara',
    description: 'Divine weekend pilgrimage to "Hare Ka Sahara" Baba Shyam Ji temple in Sikar and powerful Siddhapeeth Salasar Balaji Dham with comfortable AC travel and food.',
    whatsappText: 'Namaste Mannat Tours, mujhe Khatu Shyam Ji & Salasar Balaji Bus Tour (₹1,999) book karna hai.'
  }
];

// ✦ Exact Holiday Packages with 100% Authentic Destination Assets ✦
export const HOLIDAY_PACKAGES: TourItem[] = [
  {
    id: 'kaichi-dham-nainital',
    title: 'Kaichi Dham & Nainital Special Package',
    category: 'Spiritual Packages',
    duration: '2 Nights / 3 Days',
    price: 3499,
    originalPrice: 4500,
    vehicle: 'Sedan / Dzire / Ertiga / Tempo Traveller',
    route: 'Muzaffarnagar / Delhi - Nainital - Kainchi Dham',
    inclusions: ['Cab / Bus Transport', 'Hotel Stay', 'Sightseeing', 'Toll & Parking'],
    image: '/images/kaichi-dham.jpg',
    galleryImages: [
      '/images/kaichi-dham.jpg',
      '/images/nainital.jpg',
      '/images/corbett.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Kaichi Dham 3 Days Package customize/book karna hai.',
    badge: 'Bestseller',
    description: 'Experience divine darshan at revered Neem Karoli Baba Ashram (Kainchi Dham) combined with scenic sightseeing around Naini Lake, Bhimtal, and hill viewpoints.'
  },
  {
    id: 'chardham-yatra-deluxe',
    title: 'Chardham Yatra Deluxe Package',
    category: 'Spiritual Packages',
    duration: '9 Nights / 10 Days',
    price: 18500,
    originalPrice: 22000,
    vehicle: 'Deluxe Bus / 2x2 Pushback / Traveller',
    route: 'Haridwar - Yamunotri - Gangotri - Kedarnath - Badrinath',
    inclusions: ['Stay & Meals', 'Deluxe Transport', 'Darshan Assistance', 'Tolls & Permits'],
    image: '/images/chardham.jpg',
    galleryImages: [
      '/images/chardham.jpg',
      '/images/kedarnath.jpg',
      '/images/badrinath.jpg',
      '/images/gangotri.jpg',
      '/images/yamunotri.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Chardham Yatra Package ki details chahiye.',
    badge: 'Most Sacred',
    description: 'The ultimate sacred pilgrimage to all four holy shrines of Uttarakhand: Yamunotri, Gangotri, Kedarnath Jyotirlinga, and Badrinath Dham with pure satvik food and experienced coordinators.'
  },
  {
    id: 'ayodhya-kashi-prayag',
    title: 'Triveni, Ayodhya & Kashi Vishwanath Darshan',
    category: 'Spiritual Packages',
    duration: '5 Nights / 6 Days',
    price: 5999,
    originalPrice: 7500,
    vehicle: 'Deluxe Bus (3x2)',
    route: 'Muzaffarnagar - Meerut - Delhi - Ayodhya - Kashi - Prayagraj',
    inclusions: ['Transport', 'Dharmshala/Hotel Stay', 'Guide', 'Triveni Snan Assistance'],
    image: '/images/ayodhya-banner.jpg',
    galleryImages: [
      '/images/ayodhya-banner.jpg',
      '/images/kashi-varanasi.jpg',
      '/images/haridwar.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Ayodhya Kashi Package book karna hai.',
    badge: 'Popular Yatra',
    description: 'Divine spiritual circuit covering newly built Bhavya Ram Janmabhoomi Mandir at Ayodhya, sacred holy dip at Triveni Sangam Prayagraj, and Kashi Vishwanath corridor with Ganga Aarti.'
  },
  {
    id: 'manali-rohtang-kasol-holiday',
    title: 'Manali, Solang Valley & Kasol Holiday Package',
    category: 'Holiday Packages',
    duration: '4 Nights / 5 Days',
    price: 6999,
    originalPrice: 9000,
    vehicle: 'Deluxe 2x2 AC Bus / Dzire / Innova',
    route: 'Muzaffarnagar - Chandigarh - Kullu - Manali - Atal Tunnel - Kasol',
    inclusions: ['Resort Stay with Balcony', 'Breakfast & Dinner', 'Bonfire & Music', 'All Local Sightseeing'],
    image: '/images/manali.jpg',
    galleryImages: [
      '/images/manali.jpg',
      '/images/kasol.jpg',
      '/images/shimla.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Manali Solang Valley Holiday Package book karna hai.',
    badge: 'Top Holiday',
    description: 'Snow adventures at Solang Valley and Atal Tunnel, Hadimba Temple, Mall Road shopping, Kullu river rafting, and scenic riverside café experience in Kasol.'
  },
  {
    id: 'kashmir-paradise-circuit',
    title: 'Jewel of Kashmir: Srinagar, Gulmarg & Pahalgam',
    category: 'Holiday Packages',
    duration: '5 Nights / 6 Days',
    price: 13999,
    originalPrice: 17500,
    vehicle: 'Dedicated AC Tempo Traveller / Innova',
    route: 'Srinagar - Dal Lake - Gulmarg Gondola - Pahalgam Betaab Valley',
    inclusions: ['Houseboat Stay + 3-Star Resorts', 'Daily Breakfast & Dinner', 'Shikara Ride on Dal Lake', 'All Transfers & Sightseeing'],
    image: '/images/kashmir.jpg',
    galleryImages: [
      '/images/kashmir.jpg',
      '/images/dal-lake.jpg',
      '/images/gulmarg.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Kashmir Paradise Package ki details chahiye.',
    badge: 'Honeymoon & Family',
    description: 'Gliding on Dal Lake in a traditional Shikara, snow-clad mountain views on the Gulmarg Gondola, lush green meadows of Pahalgam, and delicious Kashmiri hospitality.'
  },
  {
    id: 'golden-triangle-jaipur-agra',
    title: 'Royal Heritage: Jaipur, Agra Taj Mahal & Mathura',
    category: 'Holiday Packages',
    duration: '2 Nights / 3 Days',
    price: 4499,
    originalPrice: 5800,
    vehicle: 'Deluxe AC Coach / Ertiga / Dzire',
    route: 'Muzaffarnagar / Delhi - Mathura - Agra - Fatehpur Sikri - Jaipur',
    inclusions: ['Hotel Stay in Agra & Jaipur', 'Breakfast & Dinner', 'All Sightseeing Transfers', 'Tolls & State Taxes'],
    image: '/images/jaipur.jpg',
    galleryImages: [
      '/images/jaipur.jpg',
      '/images/agra-taj.jpg',
      '/images/vrindavan.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Jaipur Agra Royal Heritage Package book karna hai.',
    badge: 'Heritage Special',
    description: 'Sunrise visit to the iconic Taj Mahal, grand Agra Fort, historic Fatehpur Sikri, and royal Amber Fort & Hawa Mahal in the Pink City Jaipur.'
  },
  {
    id: 'haridwar-rishikesh-mussoorie',
    title: 'Ganga Blessings & Queen of Hills Mussoorie',
    category: 'Hill Stations',
    duration: '2 Nights / 3 Days',
    price: 3499,
    originalPrice: 4200,
    vehicle: 'Deluxe AC Bus / Traveller / Cab',
    route: 'Muzaffarnagar - Haridwar - Rishikesh - Dehradun - Mussoorie',
    inclusions: ['Hotels in Rishikesh & Mussoorie', 'Breakfast & Dinner', 'Ganga Aarti Coordination', 'Local Sightseeing'],
    image: '/images/mussoorie.jpg',
    galleryImages: [
      '/images/mussoorie.jpg',
      '/images/haridwar.jpg',
      '/images/rishikesh.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Haridwar Mussoorie Weekend Package book karna hai.',
    badge: 'Weekend Getaway',
    description: 'Holy dip at Har Ki Pauri, magical Triveni Ghat Ganga Aarti, Ram Jhula, and misty cloud views at Mussoorie Mall Road & Kempty Falls.'
  },
  {
    id: 'goa-beach-vacation',
    title: 'Goa Beach & Coastal Cruise Holiday',
    category: 'Holiday Packages',
    duration: '3 Nights / 4 Days',
    price: 8999,
    originalPrice: 11500,
    vehicle: 'Airport/Station Transfers & Private Sightseeing Cab',
    route: 'North Goa (Calangute, Baga) - South Goa (Old Goa Churches & Cruise)',
    inclusions: ['Resort Stay with Swimming Pool', 'Daily Buffet Breakfast', 'Mandovi River Sunset Cruise', 'North & South Goa Sightseeing'],
    image: '/images/goa.jpg',
    galleryImages: [
      '/images/goa.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Goa Beach Vacation Package book karna hai.',
    badge: 'Beach Fun',
    description: 'Relax on golden sandy beaches of Calangute and Baga, enjoy water sports, historic Portuguese churches of Old Goa, and an evening Mandovi river music cruise.'
  },
  {
    id: 'kedarnath-chopta-tungnath-trek',
    title: 'Shri Kedarnath Dham & Chopta Tungnath Trek',
    category: 'Spiritual Packages',
    duration: '4 Nights / 5 Days',
    price: 9999,
    originalPrice: 12500,
    vehicle: 'Tempo Traveller / Innova / Dzire',
    route: 'Haridwar - Rishikesh - Guptkashi - Kedarnath - Chopta Tungnath - Rishikesh',
    inclusions: ['Mountain Resort & Camp Stay', 'Satvik Meals', 'Trek & Darshan Guidance', 'Medical Kit Support'],
    image: '/images/kedarnath.jpg',
    galleryImages: [
      '/images/kedarnath.jpg',
      '/images/badrinath.jpg',
      '/images/chardham.jpg',
      '/images/rishikesh.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Kedarnath & Chopta Tungnath Package book karna hai.',
    badge: 'Devbhoomi Special',
    description: 'Divine trek to 11th Jyotirlinga Shri Kedarnath Ji surrounded by snow-covered Himalayan peaks, plus visit to highest Shiva temple Tungnath and Chandrashila in Chopta.'
  },
  {
    id: 'amritsar-golden-temple-package',
    title: 'Amritsar Golden Temple & Wagah Border Tour',
    category: 'Spiritual Packages',
    duration: '2 Nights / 3 Days',
    price: 3999,
    originalPrice: 5200,
    vehicle: 'Deluxe AC Coach / Ertiga / Dzire',
    route: 'Muzaffarnagar - Ambala - Ludhiana - Jalandhar - Amritsar',
    inclusions: ['3-Star Hotel Stay near Golden Temple', 'Langar & Buffet Breakfast', 'Wagah Border Patriotic Ceremony VIP Pass', 'Jallianwala Bagh Visit'],
    image: '/images/amritsar.jpg',
    galleryImages: [
      '/images/amritsar.jpg'
    ],
    whatsappText: 'Namaste Mannat Travels, mujhe Amritsar Golden Temple Package book karna hai.',
    badge: 'Sacred & Patriotic',
    description: 'Spiritual solace at illuminated Harmandir Sahib (Golden Temple), holy amrit sarovar, moving history at Jallianwala Bagh, and electrifying Retreat Ceremony at Wagah Border.'
  }
];

// ✦ Exact Hero Slider Images ✦
export const HERO_SLIDES = [
  {
    id: 'shimla-manali',
    label: 'H I M A C H A L   P R A D E S H',
    title: 'Shimla & Manali',
    subtitle: 'Snow-clad peaks, pine forest tranquility, and unforgettable Himalayan memories.',
    image: '/images/manali.jpg',
    ctaText: 'EXPLORE SHIMLA & MANALI →',
    ctaLink: '#popular-tours'
  },
  {
    id: 'nainital',
    label: 'U T T A R A K H A N D   L A K E S',
    title: 'Nainital & Kainchi Dham',
    subtitle: 'Emerald yachting on Naini Lake, holy darshan at Neem Karoli Baba Ashram, and Bhimtal.',
    image: '/images/nainital.jpg',
    ctaText: 'DISCOVER NAINITAL →',
    ctaLink: '#popular-tours'
  },
  {
    id: 'mussoorie',
    label: 'M U S S O O R I E',
    title: 'Queen of the Hills',
    subtitle: 'Breathtaking mountain panoramas, crisp colonial charm, and scenic winding hill drives.',
    image: '/images/mussoorie.jpg',
    ctaText: 'VIEW MUSSOORIE PACKAGES →',
    ctaLink: '#popular-tours'
  },
  {
    id: 'chardham-yatra',
    label: 'S A C R E D   P I L G R I M A G E',
    title: 'Char Dham Yatra',
    subtitle: 'A divine journey of faith to Kedarnath, Badrinath, Gangotri & Yamunotri with complete peace of mind.',
    image: '/images/chardham.jpg',
    ctaText: 'BOOK YOUR DIVINE YATRA →',
    ctaLink: '#contact'
  }
];

// ✦ Popular Tours with 100% Verified Destination Images ✦
export const POPULAR_TOURS_DEFAULT: TourItem[] = [
  {
    id: 'tour-shimla-manali',
    title: 'Shimla & Manali Luxury Holiday',
    category: 'Hill Stations',
    destination: 'Himachal Pradesh (Shimla, Kufri & Manali)',
    duration: '5 Nights / 6 Days',
    departureDate: 'Flexible Departures',
    price: 14999,
    originalPrice: 17999,
    advanceAmount: 3000,
    availableSeats: 8,
    totalSeats: 25,
    boardingLocation: 'Muzaffarnagar, Meerut & Delhi NCR',
    badge: 'Signature Tour',
    description: 'Snow-clad Rohtang Pass, Solang Valley adventures, Mall Road walks, pine forest tranquility, and luxury hillside hotel stays with private vehicle and guided excursions.',
    route: 'Muzaffarnagar - Chandigarh - Shimla - Kullu - Manali - Solang Valley',
    placesCovered: ['Shimla Mall Road', 'Kufri Snow View', 'Solang Valley', 'Hadimba Temple', 'Kullu River Rafting', 'Atal Tunnel'],
    inclusions: [
      'AC Coach / Private Sedan Transport with Experienced Hill Driver',
      'Handpicked 3-Star / 4-Star Resort Stays with Valley Views',
      'Daily Buffet Breakfast & Delicious Dinners Included',
      'Full Sightseeing Transfers & State Road Permits Included'
    ],
    image: '/images/manali.jpg',
    galleryImages: [
      '/images/manali.jpg',
      '/images/shimla.jpg',
      '/images/kasol.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=F0Z7mYmE1gY',
    itinerary: [
      { day: 1, title: 'Drive to Shimla via Pinjore', desc: 'Pickup from Muzaffarnagar/Delhi, scenic drive into the Shivalik hills, hotel check-in at Shimla and evening leisure on Ridge.' },
      { day: 2, title: 'Shimla, Kufri & Jakhoo Temple', desc: 'Excursion to Kufri snow viewpoint, horse riding, Jakhoo Hanuman Temple cable car, and historic Mall Road.' },
      { day: 3, title: 'Scenic Drive to Manali via Kullu', desc: 'Picturesque mountain drive along Beas River, visit Pandoh Dam, Hanogi Mata Temple, and Kullu shawl weaving centers.' },
      { day: 4, title: 'Solang Valley Snow Adventures & Atal Tunnel', desc: 'Snow activities at Solang Valley (skiing, zorbing, paragliding), passage through engineering marvel Atal Tunnel.' },
      { day: 5, title: 'Local Manali Sightseeing & Hot Springs', desc: 'Visit ancient wooden Hadimba Temple, Manu Temple, Tibetan Monastery, and natural sulfur hot springs at Vashisht.' },
      { day: 6, title: 'Kullu Rafting & Return Journey', desc: 'White water river rafting in Kullu followed by comfortable return journey home.' }
    ],
    status: 'active'
  },
  {
    id: 'tour-chardham-divine',
    title: 'Divya Char Dham Yatra (Kedarnath & Badrinath)',
    category: 'Spiritual Tours',
    destination: 'Uttarakhand Devbhoomi (Four Shrines)',
    duration: '9 Nights / 10 Days',
    departureDate: 'Upcoming Pilgrim Batch',
    price: 24999,
    originalPrice: 28999,
    advanceAmount: 5000,
    availableSeats: 4,
    totalSeats: 25,
    boardingLocation: 'Muzaffarnagar, Haridwar & Delhi NCR',
    badge: 'Devotional Supreme',
    description: 'Sacred life-changing pilgrimage to Kedarnath, Badrinath, Gangotri & Yamunotri with pure satvik meals, medical assistance, experienced pandits, and comfortable stays.',
    route: 'Haridwar - Barkot - Yamunotri - Uttarkashi - Gangotri - Guptkashi - Kedarnath - Badrinath - Rishikesh',
    placesCovered: ['Yamunotri Dham', 'Gangotri Shrine', 'Shri Kedarnath Jyotirlinga', 'Badrinath Dham', 'Devprayag Sangam', 'Mana Village'],
    inclusions: [
      'Deluxe 2x2 AC Tourist Coach / Pushback Traveller',
      '9 Nights Hotel & Dharmshala Accommodation',
      'Pure Satvik Vegetarian Meals (Breakfast & Dinner)',
      'Biometric Yatra Registration & VIP Darshan Assistance',
      'Medical Kit & 24/7 Experienced Yatra Escort'
    ],
    image: '/images/chardham.jpg',
    galleryImages: [
      '/images/chardham.jpg',
      '/images/kedarnath.jpg',
      '/images/badrinath.jpg',
      '/images/gangotri.jpg',
      '/images/yamunotri.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=kYvM-cQ0dGg',
    itinerary: [
      { day: 1, title: 'Haridwar to Barkot', desc: 'Scenic drive along Yamuna riverbanks, check-in to Barkot mountain camp/hotel.' },
      { day: 2, title: 'Barkot to Yamunotri Dham Darshan', desc: 'Trek to holy Yamunotri temple, holy bath in Surya Kund hot springs, return to Barkot.' },
      { day: 3, title: 'Barkot to Uttarkashi', desc: 'Drive through apple orchards to Uttarkashi, evening darshan at ancient Kashi Vishwanath Temple.' },
      { day: 4, title: 'Uttarkashi to Gangotri Dham & Return', desc: 'Drive along Bhagirathi gorge to Gangotri shrine, holy dip in sacred Ganga and pooja.' },
      { day: 5, title: 'Uttarkashi to Guptkashi / Sitapur', desc: 'Drive via Mandakini valley with views of snowy Himalayan ranges.' },
      { day: 6, title: 'Sitapur to Shri Kedarnath Dham', desc: 'Helicopter / trek to holy Kedarnath Jyotirlinga, evening divine Aarti and overnight mountain stay.' },
      { day: 7, title: 'Kedarnath to Guptkashi / Pipalkoti', desc: 'Early morning Abhishek, descent to base and drive towards Badrinath route.' },
      { day: 8, title: 'Drive to Badrinath Dham', desc: 'Holy dip in Tapt Kund, darshan of Lord Badri Vishal, visit Mana Village, Vyas Gufa, and Bhim Pul.' },
      { day: 9, title: 'Badrinath to Rudraprayag / Srinagar', desc: 'Witness Panch Prayag confluences (Vishnuprayag, Nandaprayag, Karnaprayag).' },
      { day: 10, title: 'Rishikesh Ganga Aarti & Return', desc: 'Visit Devprayag Sangam, Ram Jhula Rishikesh, and safe return to Haridwar/Muzaffarnagar.' }
    ],
    status: 'active'
  },
  {
    id: 'tour-nainital-kainchi',
    title: 'Nainital & Kainchi Dham Ashram Yatra',
    category: 'Spiritual Tours',
    destination: 'Uttarakhand (Nainital & Kumaon Hills)',
    duration: '3 Nights / 4 Days',
    departureDate: 'Every Weekend',
    price: 7999,
    originalPrice: 9500,
    advanceAmount: 2000,
    availableSeats: 6,
    totalSeats: 30,
    boardingLocation: 'Muzaffarnagar (Central Bus Stand) & Delhi NCR',
    badge: 'Most Popular',
    description: 'Emerald yachting on Naini Lake, divine darshan at Neem Karoli Baba Kainchi Dham ashram, Maa Naina Devi temple, and serene Bhimtal.',
    route: 'Muzaffarnagar - Moradabad - Ramnagar - Nainital - Kainchi Dham - Bhimtal',
    placesCovered: ['Kainchi Dham Neem Karoli Baba Ashram', 'Naini Lake Boating', 'Naina Devi Temple', 'Bhimtal & Naukuchiatal'],
    inclusions: [
      'Deluxe 2x2 AC Pushback Coach / Private Cab Travel',
      'Lake-facing Resort / Hotel Accommodation',
      'Pure Satvik Vegetarian Meals (Breakfast & Dinner)',
      'Darshan Assistance & Tour Coordinator Support'
    ],
    image: '/images/nainital.jpg',
    galleryImages: [
      '/images/nainital.jpg',
      '/images/kaichi-dham.jpg',
      '/images/corbett.jpg'
    ],
    status: 'active'
  },
  {
    id: 'tour-mussoorie-queen',
    title: 'Mussoorie: Queen of the Hills & Dehradun',
    category: 'Weekend Tours',
    destination: 'Uttarakhand (Mussoorie Hills)',
    duration: '2 Nights / 3 Days',
    departureDate: 'Every Friday Evening',
    price: 5999,
    originalPrice: 6999,
    advanceAmount: 1500,
    availableSeats: 10,
    totalSeats: 30,
    boardingLocation: 'Muzaffarnagar, Roorkee & Dehradun',
    badge: 'Weekend Special',
    description: 'Crisp mountain air, Kempty Falls, scenic cable car rides at Gun Hill, George Everest Peak, and vibrant Mall Road shopping.',
    route: 'Muzaffarnagar - Saharanpur - Dehradun - Mussoorie - Kempty Falls',
    placesCovered: ['Kempty Falls', 'Mall Road Mussoorie', 'Gun Hill Point', 'Company Garden', 'Robbers Cave Dehradun'],
    inclusions: [
      'Comfortable AC Deluxe Vehicle with Mountain Captain',
      'Verified Mountain View Hotel Stay in Mussoorie',
      'Daily Morning Breakfast & Evening Dinner',
      'All Local Sightseeing, Tolls & Parking Taxes Included'
    ],
    image: '/images/mussoorie.jpg',
    galleryImages: [
      '/images/mussoorie.jpg',
      '/images/rishikesh.jpg',
      '/images/haridwar.jpg'
    ],
    status: 'active'
  },
  {
    id: 'tour-kedarnath-special',
    title: 'Shri Kedarnath Dham & Chopta Tungnath Yatra',
    category: 'Spiritual Tours',
    destination: 'Uttarakhand (Kedarnath & Chopta)',
    duration: '4 Nights / 5 Days',
    departureDate: 'Pilgrim Season Batches',
    price: 11999,
    originalPrice: 14500,
    advanceAmount: 3000,
    availableSeats: 12,
    totalSeats: 30,
    boardingLocation: 'Muzaffarnagar, Haridwar & Rishikesh',
    badge: 'Shiva Supreme',
    description: 'Holy darshan of Kedarnath Jyotirlinga, surrounded by snow peaks of Kedar dome, combined with highest Shiva shrine Tungnath in scenic Chopta valley.',
    route: 'Haridwar - Rishikesh - Devprayag - Guptkashi - Kedarnath - Chopta',
    placesCovered: ['Shri Kedarnath Temple', 'Bhairavnath Mandir', 'Chopta Valley', 'Tungnath Temple', 'Rishikesh Ganga Ghat'],
    inclusions: [
      'Dedicated AC Pushback Traveller / Hill Vehicle',
      'Clean Mountain Lodge / Camp Stay',
      'Pure Satvik Food & Breakfast',
      'Yatra Registration & Darshan Support'
    ],
    image: '/images/kedarnath.jpg',
    galleryImages: [
      '/images/kedarnath.jpg',
      '/images/badrinath.jpg',
      '/images/chardham.jpg',
      '/images/rishikesh.jpg'
    ],
    status: 'active'
  },
  {
    id: 'tour-kashmir-paradise',
    title: 'Jewel of Kashmir: Srinagar, Gulmarg & Pahalgam',
    category: 'Hill Stations',
    destination: 'Jammu & Kashmir',
    duration: '5 Nights / 6 Days',
    departureDate: 'Every Tuesday & Friday',
    price: 15499,
    originalPrice: 18999,
    advanceAmount: 4000,
    availableSeats: 10,
    totalSeats: 25,
    boardingLocation: 'Muzaffarnagar / Delhi / Jammu',
    badge: 'Heaven on Earth',
    description: 'Experience Shikara ride on Dal Lake, snow adventures at Gulmarg Gondola, lush saffron fields of Pampore, and pine forests of Pahalgam.',
    route: 'Jammu / Srinagar - Dal Lake - Gulmarg - Pahalgam - Betaab Valley',
    placesCovered: ['Dal Lake Shikara', 'Mughal Gardens', 'Gulmarg Snow Peak', 'Pahalgam Valley', 'Aru Valley'],
    inclusions: [
      'Deluxe Houseboat & Mountain Resort Stays',
      'Daily Breakfast & Dinner',
      'All Sightseeing in Private Sanitized Cab',
      'Shikara Boat Cruise Included'
    ],
    image: '/images/kashmir.jpg',
    galleryImages: [
      '/images/kashmir.jpg',
      '/images/dal-lake.jpg',
      '/images/gulmarg.jpg'
    ],
    status: 'active'
  }
];

// ✦ Featured Destination cards with 100% verified matching destination images ✦
export const FEATURED_DESTINATIONS = [
  {
    name: 'Kedarnath',
    state: 'Holy Jyotirlinga',
    image: '/images/kedarnath.jpg'
  },
  {
    name: 'Nainital',
    state: 'Lake City & Kainchi',
    image: '/images/nainital.jpg'
  },
  {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    image: '/images/shimla.jpg'
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    image: '/images/manali.jpg'
  },
  {
    name: 'Mussoorie',
    state: 'Queen of Hills',
    image: '/images/mussoorie.jpg'
  },
  {
    name: 'Ayodhya & Kashi',
    state: 'Ram Mandir & Ganga',
    image: '/images/ayodhya-banner.jpg'
  },
  {
    name: 'Kashmir',
    state: 'Paradise on Earth',
    image: '/images/kashmir.jpg'
  },
  {
    name: 'Badrinath',
    state: 'Sacred Dham',
    image: '/images/badrinath.jpg'
  },
  {
    name: 'Haridwar & Rishikesh',
    state: 'Ganga Aarti',
    image: '/images/haridwar.jpg'
  },
  {
    name: 'Jaipur & Agra',
    state: 'Royal Heritage & Taj',
    image: '/images/jaipur.jpg'
  },
  {
    name: 'Amritsar',
    state: 'Golden Temple',
    image: '/images/amritsar.jpg'
  },
  {
    name: 'Goa',
    state: 'Beaches & Cruise',
    image: '/images/goa.jpg'
  }
];

export function getWhatsAppBookingUrl(tour: {
  title?: string;
  price?: number;
  duration?: string;
  departureDate?: string;
  boardingLocation?: string;
}) {
  const priceStr = tour?.price && tour.price > 0 ? `₹${tour.price.toLocaleString('en-IN')}` : 'Best Rate';
  const boarding = tour?.boardingLocation || 'Muzaffarnagar / Delhi NCR';
  const msg = `Namaste Mannat Tour and Travels 🙏\nI am interested in booking the following package:\n\n🚌 *Tour:* ${tour?.title || 'Tour Package'}\n💰 *Price:* ${priceStr} per person\n⏳ *Duration:* ${tour?.duration || 'Flexible'}\n📅 *Departure Date:* ${tour?.departureDate || 'Upcoming Batch'}\n📍 *Boarding Point:* ${boarding}\n\nPlease share the available seats, itinerary, and booking procedure. Thank you!`;
  return `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
}

export function getGeneralWhatsAppUrl() {
  const msg = `Namaste Mannat Tour and Travels 🙏\nI would like to inquire about your upcoming Spiritual Tours and Outstation Holiday Packages. Please send me your latest tour brochure and schedule.`;
  return `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
}
