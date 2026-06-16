/**
 * Generates sample properties for every city in RoomRadar.
 * Keeps in sync with src/lib/cityCollegeData.js
 */

import { getJabalpurShriRamProperties } from './jabalpur-shriram-properties.mjs';

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal', 'Indore', 'Nagpur', 'Kochi', 'Coimbatore',
  'Thiruvananthapuram', 'Visakhapatnam', 'Patna', 'Ranchi', 'Guwahati', 'Dehradun',
  'Noida', 'Gurgaon', 'Mysore', 'Mangalore', 'Vadodara', 'Surat', 'Nashik', 'Aurangabad',
  'Jodhpur', 'Udaipur', 'Varanasi', 'Allahabad', 'Kanpur', 'Agra', 'Meerut', 'Faridabad',
  'Amritsar', 'Ludhiana', 'Raipur', 'Bhubaneswar', 'Vijayawada', 'Madurai', 'Salem',
  'Tiruchirappalli', 'Warangal', 'Guntur', 'Hubli', 'Belgaum', 'Siliguri', 'Jalandhar', 'Jabalpur',
];

export const COLLEGES_BY_CITY = {
  Mumbai: ['IIT Bombay', 'VJTI Mumbai', 'NMIMS Mumbai', 'Mumbai University'],
  Delhi: ['IIT Delhi', 'DTU', 'Delhi University', 'JNU'],
  Bangalore: ['IISc Bangalore', 'RVCE', 'Christ University', 'PES University'],
  Hyderabad: ['IIT Hyderabad', 'IIIT Hyderabad', 'Osmania University'],
  Chennai: ['IIT Madras', 'Anna University', 'SRM University'],
  Kolkata: ['Jadavpur University', 'Presidency University', 'Calcutta University'],
  Pune: ['COEP', 'MIT Pune', 'Symbiosis', 'Pune University'],
  Ahmedabad: ['Nirma University', 'Gujarat University', 'CEPT University'],
  Jaipur: ['MNIT Jaipur', 'Manipal Jaipur', 'Jaipur National University'],
  Lucknow: ['IIT Lucknow', 'Lucknow University', 'Amity Lucknow'],
  Chandigarh: ['PEC Chandigarh', 'Panjab University', 'Chitkara University'],
  Noida: ['Amity University', 'JIIT Noida', 'Bennett University'],
  Gurgaon: ['GD Goenka', 'Sushant University', 'IILM University'],
  Kochi: ['CUSAT', 'Amrita Vishwa Vidyapeetham'],
  Coimbatore: ['PSG Tech', 'Amrita Coimbatore', 'Bharathiar University'],
  Indore: ['IIT Indore', 'IIM Indore', 'DAVV Indore'],
  Bhopal: ['MANIT Bhopal', 'LNCT', 'Barkatullah University'],
  Jabalpur: ['Shri Ram Institute of Technology (SRIT)', 'JEC Jabalpur', 'IIITDM Jabalpur', 'GGITS'],
};

const FEATURED_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'];

const IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1572793084479-a2fdd73c5b89?w=800&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
];

const PROPERTY_TYPES = ['pg', 'hostel', 'room', 'flat'];
const GENDERS = ['boys', 'girls', 'co-ed'];
const SHARING = [['Single', 'Double'], ['Double', 'Triple'], ['Triple', 'Quad'], ['Single']];
const FACILITY_SETS = [
  ['Wi-Fi', 'Food', 'Security', 'Laundry'],
  ['Wi-Fi', 'AC', 'Security', 'Power Backup'],
  ['Wi-Fi', 'Food', 'Study Room', 'Hot Water'],
  ['Wi-Fi', 'Security', 'Parking', 'CCTV'],
];

const TITLE_PREFIX = {
  pg: ['Spacious PG', 'Premium PG', 'Budget PG', 'Student PG'],
  hostel: ['Girls Hostel', 'Boys Hostel', 'Campus Hostel', 'Student Hostel'],
  room: ['Private Room', 'Furnished Room', 'Budget Room', 'Campus Room'],
  flat: ['Shared Flat', 'Student Flat', '2BHK Flat', 'Premium Flat'],
};

function getCollege(city, index) {
  const list = COLLEGES_BY_CITY[city];
  if (list?.length) return list[index % list.length];
  return `${city} University`;
}

function getArea(city) {
  const areas = {
    Mumbai: 'Andheri West',
    Delhi: 'Hauz Khas',
    Bangalore: 'Koramangala',
    Hyderabad: 'Gachibowli',
    Chennai: 'Adyar',
    Kolkata: 'Salt Lake',
    Pune: 'Shivajinagar',
    Ahmedabad: 'SG Highway',
    Noida: 'Sector 62',
    Gurgaon: 'DLF Phase 3',
    Jabalpur: 'Madhotal',
  };
  return areas[city] || `${city} Central`;
}

/**
 * @param {typeof import('firebase/firestore').Timestamp} Timestamp
 */
export function buildAllSampleProperties(Timestamp) {
  const samples = [];
  let dayOffset = 0;

  for (let cityIndex = 0; cityIndex < CITIES.length; cityIndex++) {
    const city = CITIES[cityIndex];
    const isFeatured = FEATURED_CITIES.includes(city);
    const countPerCity = isFeatured ? 4 : 2;

    for (let i = 0; i < countPerCity; i++) {
      const type = PROPERTY_TYPES[(cityIndex + i) % PROPERTY_TYPES.length];
      const gender = GENDERS[i % GENDERS.length];
      const college = getCollege(city, i);
      const area = getArea(city);
      const prefix = TITLE_PREFIX[type][i % TITLE_PREFIX[type].length];
      const basePrice = 5500 + (cityIndex * 193) % 9000 + i * 400;
      const price = Math.min(Math.round(basePrice / 100) * 100, 22000);

      samples.push({
        title: `${prefix} near ${college}`,
        description: `Well-maintained ${type} for students in ${area}, ${city}. Close to campus with essential amenities and flexible sharing options.`,
        property_type: type,
        gender,
        city,
        area,
        address: `${area}, ${city}`,
        nearest_college: college,
        distance_from_college: `${(0.4 + i * 0.3).toFixed(1)} km`,
        price_per_month: price,
        deposit: Math.round(price * 0.8),
        sharing_options: SHARING[i % SHARING.length],
        facilities: FACILITY_SETS[(cityIndex + i) % FACILITY_SETS.length],
        images: [IMAGES[(cityIndex + i) % IMAGES.length]],
        contact_phone: `+919${String(100000000 + cityIndex * 1000 + i * 111).slice(0, 9)}`,
        contact_whatsapp: `+919${String(200000000 + cityIndex * 1000 + i * 222).slice(0, 9)}`,
        owner_name: ['Rahul Sharma', 'Priya Nair', 'Amit Patil', 'Sneha Mehta'][i % 4],
        is_verified: i === 0,
        is_featured: isFeatured && i === 0,
        rating: Number((3.8 + (cityIndex % 10) * 0.1).toFixed(1)),
        total_reviews: 5 + cityIndex + i * 3,
        food_included: type === 'pg' || type === 'hostel',
        ac_available: type === 'flat' || (type === 'pg' && i % 2 === 0),
        created_at: Timestamp.fromMillis(Date.now() - dayOffset * 43200000),
      });
      dayOffset++;
    }
  }

  return [...samples, ...getJabalpurShriRamProperties(Timestamp)];
}

export function getCityPropertyCounts(samples) {
  return samples.reduce((acc, p) => {
    acc[p.city] = (acc[p.city] || 0) + 1;
    return acc;
  }, {});
}
