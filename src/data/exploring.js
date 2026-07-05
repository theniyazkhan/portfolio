/**
 * "Currently Exploring" items — what you're actively learning.
 * `progress` is a percentage (0–100) used for the SVG ring animation.
 * `svgPath` is the d-attribute of a 24x24 viewBox SVG icon.
 */
export const exploringItems = [
  {
    name: 'AI & Machine Learning',
    description: 'Exploring neural networks, NLP fundamentals, and integrating AI APIs into web applications.',
    category: 'Deep Dive',
    progress: 35,
    svgPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    name: 'TypeScript',
    description: 'Adding type safety to Vue.js and Node.js projects for better DX and fewer runtime bugs.',
    category: 'Deep Dive',
    progress: 55,
    svgPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    name: 'Docker & DevOps',
    description: 'Containerizing applications, CI/CD pipelines, and cloud deployment workflows.',
    category: 'Getting Started',
    progress: 25,
    svgPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  },
  {
    name: 'Three.js & WebGL',
    description: 'Creating immersive 3D web experiences and interactive visual elements.',
    category: 'Getting Started',
    progress: 15,
    svgPath: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5',
  },
  {
    name: 'System Design',
    description: 'Learning scalable architecture patterns, database design, and distributed systems fundamentals.',
    category: 'Deep Dive',
    progress: 40,
    svgPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    name: 'Next.js & SSR',
    description: 'Server-side rendering, static generation, and edge functions for production React apps.',
    category: 'Getting Started',
    progress: 20,
    svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

/**
 * Category badge classes.
 */
export const categoryClasses = {
  'Deep Dive': 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/40',
  'Getting Started': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
}

export const defaultCategoryClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/40'
