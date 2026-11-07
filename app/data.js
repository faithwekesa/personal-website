export const PROFILE = {
  name: 'Faith Wekesa',
  role: 'Software Engineer',
  base: 'Nairobi, Kenya',
  github: 'https://github.com/faithwekesa',
  linkedin: 'https://www.linkedin.com/in/faith-nasimiyu-wekesa/',
  email: 'faithwekesanas@gmail.com',
  phone: '254115305173',
  cv: '/faith-wekesa-cv.pdf',
};

export const WHATSAPP = `https://wa.me/${PROFILE.phone}?text=${encodeURIComponent('Hi Faith, I saw your portfolio')}`;

export const PROJECTS = [
  {
    id: 'safari',
    title: 'Safari Atlas',
    host: 'safari-atlas.vercel.app',
    text: 'Shows what a trip to 15 places in Africa will cost for your days and group before you book anything.',
    role: 'Design and development',
    year: '2026',
    problem: 'A slider of beautiful places does not help someone decide where they can actually afford to go. The question that decides a trip is what it will cost.',
    built: [
      'A budget planner for 15 places in Africa. You enter your budget and days and group size and travel style and it shows what fits.',
      'A cost model that adds the stay per room per night and food and transport per person per day and park fees with a season multiplier.',
      'A Plan your visit panel on every place with the best time to go and a cost breakdown and a clear verdict on whether it fits.',
      'Booking links for stays and flights and tours and a compare view. Prices are estimates and the page shows when they were last checked.',
    ],
    tags: ['React', 'Vite', 'JavaScript', 'Responsive design', 'CSS animation', 'Budget estimates', 'Booking links', 'Vercel'],
    live: 'https://safari-atlas.vercel.app',
    repo: 'https://github.com/faithwekesa/safari-atlas',
  },
  {
    id: 'bake',
    title: 'Hearth and Honey',
    host: 'hearth-and-honey.vercel.app',
    text: 'A bakery website where customers browse the menu and send their order straight to WhatsApp.',
    role: 'Design and development',
    year: '2026',
    problem: 'I built this as a practice project to show what a bakery website could do. The goal was a clean menu that makes ordering simple for the customer and for the owner.',
    built: [
      'A clean white responsive website with the menu and photos of the bakes.',
      'A basket where customers add items and send the whole order to the bakery on WhatsApp.',
      'Text and menu sizes tuned for phones since most customers browse on mobile.',
    ],
    tags: ['React', 'Vite', 'CSS', 'Responsive design', 'WhatsApp orders', 'GitHub', 'Vercel'],
    live: 'https://hearth-and-honey.vercel.app',
    repo: 'https://github.com/faithwekesa/hearth-and-honey',
  },
  {
    id: 'nail',
    title: 'Gloss Nail Studio',
    host: 'nailshop-website-seven.vercel.app',
    text: 'Lets salon clients pick a service and a time while the owner gets a WhatsApp alert for every booking.',
    role: 'Design and development',
    year: '2026',
    problem: 'A Nairobi nail studio took bookings by phone and messages. The owner needed clients to choose a style and a time themselves and to hear about every booking quickly.',
    built: [
      'A booking flow where clients pick a service and a time on a calendar and can add a custom style request.',
      'A Supabase PostgreSQL database with authentication and row-level security. Each phone number is limited to 2 bookings and each booking is pending or confirmed or declined.',
      'WhatsApp alerts so the owner gets every new booking in one tap since a nail technician rarely checks email.',
      'A private owner dashboard with a Today view plus a gallery and a mobile menu on the public site.',
    ],
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Row-level security', 'WhatsApp alerts', 'Responsive design', 'Vercel'],
    live: 'https://nailshop-website-seven.vercel.app',
    repo: 'https://github.com/faithwekesa/nailshop-website',
  },
];

export const ABOUT = [
  { label: 'Based in', items: ['Nairobi, Kenya'] },
  { label: 'Build', items: ['React', 'Next.js', 'JavaScript', 'TypeScript'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'Supabase', 'Postman'] },
  { label: 'Design', items: ['Figma', 'User flows', 'Research'] },
  { label: 'Also studied', items: ['Product management', 'Cyber security'] },
];

export const DOING = [
  { n: '01', title: 'Build', text: 'Responsive web apps in React and Next.js. When a product needs data and sign-in I back it with FastAPI or Supabase.' },
  { n: '02', title: 'Design', text: 'User research and flows and screens in Figma so what I build starts from what people actually need.' },
  { n: '03', title: 'Ship with care', text: 'Authentication and role-based access and written test cases and Postman checks and deployment on Vercel through GitHub.' },
];
