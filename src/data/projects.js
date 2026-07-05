/**
 * Portfolio projects data.
 * `techColor` is used to look up a color class map in ProjectsSection.vue.
 * `gradient` is the card overlay gradient (full Tailwind class strings for JIT scanning).
 */
export const projects = [
  {
    title: 'CampusBite',
    description:
      'A functional canteen management platform and pre-order system designed to solve the canteen rush problem. The system includes comprehensive modules for menu management and ordering systems. Deployed via Vercel with UptimeRobot monitoring, optimizing menu handling and order systems for real-time university traffic.',
    tech: ['Vue.js', 'Node.js', 'MySQL'],
    techColor: 'emerald',
    link: '#',
    image: '/campusbite.jpg',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'HealthBridge',
    description:
      'Web application One stop solution for appointment booking, donor management, pharmacy inventory handling, and more. It was a team project highly associated with databases.',
    tech: ['HTML', 'CSS', 'PHP', 'MySQL'],
    techColor: 'cyan',
    link: 'https://github.com/theniyazkhan/HealthBridge',
    image: '/healthbridge.jpg',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Parlor Management System',
    description:
      'A Java Swing-based desktop application for managing customer data and services in a parlor environment. The system includes user registration, login, treatment suggestions, admin functionalities, and a modern dark-themed interface.',
    tech: ['Java', 'Java Swing', 'MySQL'],
    techColor: 'amber',
    link: 'https://github.com/theniyazkhan/parlourmanagementsysyem',
    image: '/parlour.jpg',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Responsive, high-performance portfolio website built with modern front-end practices. Fully modularized, using Tailwind CSS, featuring scroll-reveal animations and theme synchronization.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    techColor: 'violet',
    link: 'https://github.com/theniyazkhan',
    image: '/portfolio.jpg',
    gradient: 'from-violet-500 to-indigo-600',
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
