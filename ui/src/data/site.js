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

// Anchors are prefixed with "/" so they resolve to the home-page section from
// any route (e.g. the Privacy or 404 page), not just the home page itself.
export const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'Fleet', href: '/#fleet' },
  { label: 'Network', href: '/#network' },
  { label: 'Coverage', href: '/#coverage' },
  { label: 'Get Quote', href: '/#quote' },
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
  {
    icon: 'Radar',
    title: 'Consignment Visibility',
    desc: 'Bilty-level status on request today, with a live tracking portal launching soon.',
  },
  { icon: 'Network', title: 'Regional Network Reach', desc: 'Indore hub serving towns across central Madhya Pradesh.' },
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

/** How It Works - 4 steps. icon = lucide-react component NAME string. */
export const PROCESS_STEPS = [
  {
    icon: 'FileText',
    title: 'Request a Quote',
    desc: 'Share your route, load type and weight. Our desk replies with a custom rate, usually within a few hours.',
  },
  {
    icon: 'PackageCheck',
    title: 'Pickup',
    desc: 'We schedule the right vehicle and collect your consignment from the Indore hub or your doorstep.',
  },
  {
    icon: 'Truck',
    title: 'In Transit',
    desc: 'Your goods move on our daily departures across the network, handled by trained crews.',
  },
  {
    icon: 'MapPinned',
    title: 'Delivered',
    desc: 'Goods reach the destination on schedule, with bilty-level handover at every step.',
  },
];

/** FAQ - truthful Q&A for FTL/LTL road transport from Indore. */
export const FAQS = [
  {
    q: 'Which areas do you serve?',
    a: 'We run daily road transport from our Indore hub to towns across Indore and the nearby districts of Madhya Pradesh - our regular network includes routes such as Shajapur, Sarangpur, Narsinghgarh, Nalkheda, Susner and Agar-Malwa, among many others (see the Network section for the full map). If you do not see your location, ask us - we can often arrange transport for new routes and special cases.',
  },
  {
    q: 'What is the difference between FTL and LTL (part load)?',
    a: 'Full Truck Load (FTL) dedicates an entire vehicle to your consignment - best for large or time-sensitive shipments. Part / Less-than-Truck-Load (LTL) shares vehicle space across consignments, so you share the cost - ideal for smaller loads.',
  },
  {
    q: 'How do I get a transport quote?',
    a: 'Use the quote builder on this page - pick your load type, route, weight and contact details. There is no payment required up front; our desk responds with a custom rate, usually within a few hours.',
  },
  {
    q: 'What types of vehicles do you operate?',
    a: 'Our fleet covers close-body containers, multi-axle trailers, open-body trucks and light commercial vehicles - capacity ranging from under a ton up to 40 tons - so we can match the right vehicle to your cargo.',
  },
  {
    q: 'Is my cargo insured during transit?',
    a: 'Yes. Consignments move insured, in sealed bodies where applicable, and are handled by trained crews across every route.',
  },
  {
    q: 'How can I reach your team?',
    a: 'Call our desk at +91-88176-70032 or email shreenirmaldntransport@gmail.com. We operate from our Indore head office and branch network office - both are mapped in the Network section.',
  },
];

/** Final CTA band copy. */
export const CTA = {
  headline: 'Ready to move your goods?',
  subcopy:
    'Get a custom rate for your next FTL or LTL shipment from Indore. No payment up front - just a fast, fair quote from our transport desk.',
};
