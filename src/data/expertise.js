/**
 * Technical expertise / skills data.
 * All Tailwind class strings are written in full so the JIT scanner picks them up.
 * Icons are inline SVG markup strings (no emoji).
 */
export const expertise = [
  {
    category: 'Languages & AI',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    description: 'Core languages & ML tools',
    headerColor: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    cardHoverShadow: 'hover:shadow-violet-100 dark:hover:shadow-violet-900/20',
    tagBg: 'bg-violet-50 dark:bg-violet-950/40',
    tagText: 'text-violet-700 dark:text-violet-300',
    tagBorder: 'border-violet-200 dark:border-violet-700/40',
    tagHoverBg: 'hover:bg-violet-100 dark:hover:bg-violet-900/50',
    skills: ['C/C++', 'Java', 'Python', 'Pandas & NumPy', 'Scikit-learn'],
  },
  {
    category: 'Full-Stack Web',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>',
    description: 'Web development & databases',
    headerColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-600',
    cardHoverShadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/20',
    tagBg: 'bg-blue-50 dark:bg-blue-950/40',
    tagText: 'text-blue-700 dark:text-blue-300',
    tagBorder: 'border-blue-200 dark:border-blue-700/40',
    tagHoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
    skills: ['HTML & CSS', 'Tailwind', 'React', 'Vue', 'Node.js', 'Express', 'PHP', 'MySQL', 'MongoDB'],
  },
  {
    category: 'DevOps & Design',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    description: 'DevOps, Cloud & visual tools',
    headerColor: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    cardHoverShadow: 'hover:shadow-rose-100 dark:hover:shadow-rose-900/20',
    tagBg: 'bg-rose-50 dark:bg-rose-950/40',
    tagText: 'text-rose-700 dark:text-rose-300',
    tagBorder: 'border-rose-200 dark:border-rose-700/40',
    tagHoverBg: 'hover:bg-rose-100 dark:hover:bg-rose-900/50',
    skills: ['Docker', 'Microsoft Azure', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
  },
]
