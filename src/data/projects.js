/**
 * Portfolio projects data.
 * `techColor` is used to look up a color class map in ProjectsSection.vue.
 * `gradient` is the card overlay gradient (full Tailwind class strings for JIT scanning).
 */
export const projects = [
  {
    title: 'CampusBite',
    description:
      'A functional canteen management platform and pre-order system designed to solve the canteen rush problem. Optimized menu handling and order systems for real-time university traffic.',
    extendedDescription:
      'CampusBite is a full-featured pre-ordering and canteen queue mitigation system. It allows university students to browse food offerings, pre-order meals to fit their schedule, and enables canteen operators to manage inventory, track orders, and forecast demand to prevent congestion.',
    category: 'web',
    tech: ['Vue.js', 'Node.js', 'MySQL'],
    techColor: 'emerald',
    link: '#',
    sourceLink: 'https://github.com/theniyazkhan',
    image: '/campusbite.jpg',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Real-time order queue monitoring and system status updates',
      'Secure pre-ordering system with scheduled pickup times',
      'Canteen vendor dashboard for inventory and menu configuration',
      'Integration with UptimeRobot for service reliability tracking'
    ],
    challenges: 'Ensuring correct synchronization of real-time queues and handling high concurrent order volume during peak lunchtime hours.',
    solution: 'Designed an optimized database schema using transactional locks in MySQL and built a responsive state-management queue in Vue.js to gracefully handle live updates.'
  },
  {
    title: 'HealthBridge',
    description:
      'Web application One stop solution for appointment booking, donor management, pharmacy inventory handling, and more. A database-centric team project.',
    extendedDescription:
      'HealthBridge serves as a unified digital ecosystem connecting doctors, patients, blood donors, and pharmacists. Built on top of a highly optimized relational database, it facilitates rapid donor search, doctor scheduling, and pharmacy stock control.',
    category: 'web',
    tech: ['HTML', 'CSS', 'PHP', 'MySQL'],
    techColor: 'cyan',
    link: 'https://github.com/theniyazkhan/HealthBridge',
    sourceLink: 'https://github.com/theniyazkhan/HealthBridge',
    image: '/healthbridge.jpg',
    gradient: 'from-cyan-500 to-blue-600',
    features: [
      'Real-time donor location searching and matching mechanism',
      'Doctor appointment slots booking with auto-confirmation',
      'Comprehensive pharmacist stock alert and inventory manager',
      'Robust SQL relational structure with normalized tables'
    ],
    challenges: 'Creating a highly responsive search query that searches donors by location and blood group while avoiding slow response times on large tables.',
    solution: 'Created composite database indexes on (blood_group, location) in MySQL and implemented a debounced search frontend to prevent server hammering.'
  },
  {
    title: 'Parlor Management System',
    description:
      'A Java Swing-based desktop application for managing customer data, treatment suggestions, admin functionalities, and a modern dark-themed interface.',
    extendedDescription:
      'A robust, local management software for salons and beauty parlors. It implements full customer relationship tracking, treatments customization, appointment history, pricing structures, and secure administrative controls through a polished, custom Swing user interface.',
    category: 'desktop',
    tech: ['Java', 'Java Swing', 'MySQL'],
    techColor: 'amber',
    link: 'https://github.com/theniyazkhan/parlourmanagementsysyem',
    sourceLink: 'https://github.com/theniyazkhan/parlourmanagementsysyem',
    image: '/parlour.jpg',
    gradient: 'from-amber-500 to-orange-600',
    features: [
      'Tailored Java Swing interface with a custom modern dark theme styling',
      'Personalized customer treatment recommendations engine based on historical data',
      'Administrative analytics dashboard showing revenue charts and popular services',
      'Local database replication for reliable offline usage capabilities'
    ],
    challenges: 'Designing a smooth, modern dark theme within standard Java Swing, which has historically outdated default Look & Feel skins.',
    solution: 'Leveraged customized graphic rendering overrides and built a modular UI class system mapping component colors programmatically.'
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Responsive, high-performance portfolio website built with modern front-end practices. Fully modularized, using Tailwind CSS, features scroll-reveal animations.',
    extendedDescription:
      'An interactive, rich web portfolio built to present personal coding history, publications, and current exploration items. Includes scroll-revealing animations, automatic system theme synchronization, and an interactive digital pet.',
    category: 'web',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    techColor: 'violet',
    link: 'https://github.com/theniyazkhan',
    sourceLink: 'https://github.com/theniyazkhan',
    image: '/portfolio.jpg',
    gradient: 'from-violet-500 to-indigo-600',
    features: [
      'Fully custom navigation built using dynamic scroll spy observers',
      'Vibrant animated glassmorphism styling and custom background floating orbs',
      'Interactive vector kitten companion companion with cursor tracking physics',
      'Complete build environment configurations compiled using Vite and PostCSS'
    ],
    challenges: 'Making the kitten companion follow the cursor smoothly across all screens without performance lag or battery drain.',
    solution: 'Utilized requestAnimationFrame for calculations, throttled cursor tracking, and optimized inline SVG transforms to reduce reflow operations.'
  },
]

/**
 * Full Tailwind class strings for each techColor key.
 * Defined here (not interpolated) so Tailwind's content scanner picks them up.
 */
export const techColorClasses = {
  emerald:
    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40',
  violet:
    'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/40',
  rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/40',
  amber:
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/40',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700/40',
  sky: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/40',
}
