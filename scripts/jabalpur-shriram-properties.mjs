/**
 * Five listings near Shri Ram Institute of Technology (SRIT), Jabalpur.
 * Campus: Near ITI Madhotal, Madhotal, Jabalpur 482002 (~2 km from Kachnar City).
 */

export const SRIT_COLLEGE = 'Shri Ram Institute of Technology (SRIT)';
export const SRIT_CAMPUS_ADDRESS = 'Near ITI Madhotal, Madhotal, Jabalpur, MP 482002';

const CITY = 'Jabalpur';

// Room / hostel / PG style images (multiple per listing)
const IMG = {
  room1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  room2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  room3: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  bed: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  building: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556909212-d5b604d0f954?w=800&q=80',
  exterior: 'https://images.unsplash.com/photo-1570129474767-8255b7f9386e?w=800&q=80',
};

export function getJabalpurShriRamProperties(Timestamp) {
  const now = Date.now();

  return [
    {
      title: 'Boys PG on ITI Madhotal Road — 2 min from SRIT',
      description:
        'Walking distance to Shri Ram Institute of Technology. Located on ITI Madhotal Road, same stretch as the SRIT campus (Near ITI Madhotal). Veg mess, Wi-Fi, study table in every room. Popular with SRIT & ITI students.',
      property_type: 'pg',
      gender: 'boys',
      city: CITY,
      area: 'ITI Madhotal Road',
      address: 'ITI Madhotal Road, Opposite ITI Campus Gate, Madhotal, Jabalpur 482002',
      nearest_college: SRIT_COLLEGE,
      distance_from_college: '0.2 km',
      price_per_month: 7200,
      deposit: 6000,
      sharing_options: ['Double', 'Triple'],
      facilities: ['Wi-Fi', 'Food', 'Security', 'Study Room', 'Power Backup', 'Laundry'],
      images: [IMG.building, IMG.room1, IMG.kitchen],
      contact_phone: '+919310223401',
      contact_whatsapp: '+919310223401',
      owner_name: 'Rajesh Tiwari',
      is_verified: true,
      is_featured: true,
      rating: 4.6,
      total_reviews: 41,
      food_included: true,
      ac_available: false,
      created_at: Timestamp.fromMillis(now),
    },
    {
      title: 'Girls Hostel — Madhotal, beside SRIT campus lane',
      description:
        'Girls-only hostel in Madhotal — the same locality as SRIT (Shri Ram Institute of Technology). 3–4 minute walk to college gate via Madhotal main lane. Warden, CCTV, geyser, and home-style meals.',
      property_type: 'hostel',
      gender: 'girls',
      city: CITY,
      area: 'Madhotal',
      address: 'Madhotal Main Lane, Near SRIT Campus, Madhotal, Jabalpur 482002',
      nearest_college: SRIT_COLLEGE,
      distance_from_college: '0.3 km',
      price_per_month: 8000,
      deposit: 7000,
      sharing_options: ['Single', 'Double'],
      facilities: ['Wi-Fi', 'Food', 'Security', 'CCTV', 'Hot Water', 'Laundry'],
      images: [IMG.exterior, IMG.room2, IMG.bed],
      contact_phone: '+919310223402',
      contact_whatsapp: '+919310223402',
      owner_name: 'Sunita Verma',
      is_verified: true,
      rating: 4.5,
      total_reviews: 26,
      food_included: true,
      created_at: Timestamp.fromMillis(now - 86400000),
    },
    {
      title: 'SRIT Student PG — Madhotal (behind college block)',
      description:
        'PG run especially for SRIT engineering students. Address in Madhotal behind the Shri Ram Institute campus side — not Civil Lines or city centre. AC rooms available; power backup for study hours.',
      property_type: 'pg',
      gender: 'boys',
      city: CITY,
      area: 'Madhotal (Near SRIT Campus)',
      address: 'Lane behind SRIT, Madhotal, Near ITI Madhotal, Jabalpur 482002',
      nearest_college: SRIT_COLLEGE,
      distance_from_college: '0.4 km',
      price_per_month: 9500,
      deposit: 8000,
      sharing_options: ['Single', 'Double'],
      facilities: ['Wi-Fi', 'AC', 'Food', 'Security', 'Power Backup', 'Parking'],
      images: [IMG.room3, IMG.bed, IMG.building],
      contact_phone: '+919310223403',
      contact_whatsapp: '+919310223403',
      owner_name: 'Mohit Jain',
      is_verified: true,
      is_featured: true,
      rating: 4.4,
      total_reviews: 19,
      food_included: true,
      ac_available: true,
      created_at: Timestamp.fromMillis(now - 172800000),
    },
    {
      title: 'Budget rooms — Kachnar City (SRIT bus route)',
      description:
        'Affordable rooms in Kachnar City — the main student locality ~2 km from SRIT Madhotal campus (shared autos/buses run daily for SRIT students). Furnished rooms; ideal if you want slightly lower rent near college belt.',
      property_type: 'room',
      gender: 'co-ed',
      city: CITY,
      area: 'Kachnar City',
      address: 'Kachnar City, Near Water Tank Chowk, Jabalpur 482002',
      nearest_college: SRIT_COLLEGE,
      distance_from_college: '1.8 km',
      price_per_month: 5500,
      deposit: 4500,
      sharing_options: ['Single', 'Double'],
      facilities: ['Wi-Fi', 'Power Backup'],
      images: [IMG.room1, IMG.room2, IMG.kitchen],
      contact_phone: '+919310223404',
      contact_whatsapp: '+919310223404',
      owner_name: 'Anil Yadav',
      rating: 4.2,
      total_reviews: 14,
      created_at: Timestamp.fromMillis(now - 259200000),
    },
    {
      title: 'Co-ed PG at ITI Madhotal Chowk — closest to SRIT',
      description:
        'Right at ITI Madhotal Chowk — the junction nearest to Shri Ram Institute of Technology & ITI Madhotal. Shortest commute to SRIT (under 500 m). Food, laundry, and bike parking for students.',
      property_type: 'pg',
      gender: 'co-ed',
      city: CITY,
      area: 'ITI Madhotal Chowk',
      address: 'ITI Madhotal Chowk, Madhotal, Jabalpur 482002 (SRIT campus road)',
      nearest_college: SRIT_COLLEGE,
      distance_from_college: '0.5 km',
      price_per_month: 6800,
      deposit: 5500,
      sharing_options: ['Double', 'Triple', 'Quad'],
      facilities: ['Wi-Fi', 'Food', 'Security', 'Laundry', 'Parking'],
      images: [IMG.building, IMG.room3, IMG.exterior],
      contact_phone: '+919310223405',
      contact_whatsapp: '+919310223405',
      owner_name: 'Kavita Singh',
      is_verified: true,
      rating: 4.3,
      total_reviews: 22,
      food_included: true,
      created_at: Timestamp.fromMillis(now - 345600000),
    },
  ];
}
