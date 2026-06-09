/** Site configuration and content. */

export const COMPANY = {
  name: 'Shri Nirmal Logistics',
  altName: '& DN Transport',
  tagline: 'Chouhan Brothers',
  legalName: 'Chouhan Logistics (Shri Nirmal & DN Transport)',
};

export const CONTACT = {
  // FIX: business inbox, env-overridable - was the developer's address in the legacy form.
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'shreenirmaldntransport@gmail.com',
  phoneDisplay: '+91-88176-70032',
  phoneHref: 'tel:+918817670032',
  address: '111/6, S. R. Compound, Rathi Transport Ke Samne, Indore.',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Network', href: '#network' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Get Quote', href: '#quote' },
];

/** Bento stats - `span` controls grid footprint on large screens. */
export const STATS = [
  { value: '10+', label: 'Years in Service', sub: 'Trusted since inception', span: 'lg:col-span-2' },
  { value: '30+', label: 'Active Routes', sub: 'Daily departures' },
  { value: '500+', label: 'Happy Clients', sub: 'B2B & retail' },
  { value: '99%', label: 'On-Time Delivery', sub: 'SLA-backed' },
  { value: '50+', label: 'Fleet Strength', sub: 'Owned & attached', span: 'lg:col-span-2' },
];

export const CORE_VALUES = [
  {
    icon: 'ShieldCheck',
    title: 'Cargo Safety First',
    desc: 'Insured consignments, sealed containers and trained handling crews on every route.',
    span: 'md:col-span-2',
  },
  { icon: 'Clock', title: 'Daily Departures', desc: 'Fixed daily schedules across the network.' },
  { icon: 'Radar', title: 'Live Tracking', desc: 'Bilty-level status, end to end.' },
  { icon: 'Network', title: 'Pan-India Reach', desc: 'Indore hub feeding national trade routes.' },
  {
    icon: 'Headset',
    title: '24x7 Support',
    desc: 'A dedicated desk for bookings, tracking and escalations - any hour, any day.',
    span: 'md:col-span-2',
  },
];

export const SHRI_NIRMAL_NETWORK = [
  'Shajapur', 'Sarangpur', 'Pachore', 'Byawara', 'Shujalpur', 'Akodiya Mandi',
  'Narsinghgarh', 'Berchha', 'Gulana', 'Kalapipal', 'Kura Var',
  'Kalisindh Arniya Kala', 'Suthaliya', 'Talen', 'Boda',
];

export const DN_TRANSPORT_NETWORK = [
  'Pat (Tarana)', 'Dhabli Khurd', 'Tanodiya', 'Piplon Kalan', 'Badod',
  'Agra-Malva', 'Susner', 'Nalkheda', 'Jirapur', 'Khilchipur', 'Khujner',
  'Chapiheda', 'Machalpur', 'Kanad', 'Modi',
];

/** Quote-builder hub options (origin/destination selects). */
export const QUOTE_HUBS = [
  'Indore', 'Bhopal', 'Ujjain', 'Dewas', 'Ratlam', 'Delhi', 'Mumbai',
  'Ahmedabad', 'Jaipur', 'Nagpur', 'Pune', 'Surat', 'Raipur', 'Kanpur',
];
