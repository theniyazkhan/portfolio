/**
 * Levenshtein distance helper to measure spelling differences between words.
 */
function getLevenshteinDistance(a, b) {
  const tmp = []
  const alen = a.length
  const blen = b.length

  if (alen === 0) return blen
  if (blen === 0) return alen

  for (let i = 0; i <= alen; i++) tmp[i] = [i]
  for (let j = 0; j <= blen; j++) tmp[0][j] = j

  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
  }
  return tmp[alen][blen]
}

/**
 * FAQ Knowledge Base containing Niyaz's professional information.
 */
export const faqDatabase = {
  profile: {
    keywords: ['who', 'about', 'niyaz', 'introduce', 'profile', 'identity', 'creator', 'person', 'background'],
    answer: "Niyaz Ahmad Khan is a B.Sc. student in Computer Science and Engineering at Metropolitan University, Sylhet, Bangladesh (2023 - 2026).\n\nHe is a GTM & Full-Stack Engineer and a published machine learning researcher. He bridges software development, conversion tracking engineering, and visual design to create polished and performant web products."
  },
  gtm: {
    keywords: ['gtm', 'go-to-market', 'marketing', 'conversion', 'analytics', 'strategy', 'launch'],
    answer: "Niyaz is a Go-To-Market (GTM) Engineer specializing in optimizing product launches, marketing operations, conversion tracking, and tech stack configurations. He builds client-facing dashboards, configures analytics tools, and integrates conversion tags to align engineering updates with market success."
  },
  skills: {
    keywords: ['skills', 'technologies', 'stack', 'languages', 'frameworks', 'tools', 'database', 'libraries', 'coding', 'programming'],
    answer: "Niyaz's technical stack spans:\n\n- Languages & AI: C/C++, Java, Python, Pandas, NumPy, Scikit-learn\n- Frontend: HTML & CSS, Tailwind CSS, React, Vue.js\n- Backend: Node.js, Express, PHP, MySQL, MongoDB\n- DevOps & Design: Docker, Microsoft Azure, Figma, Photoshop, Illustrator"
  },
  education: {
    keywords: ['education', 'university', 'degree', 'bsc', 'college', 'academic', 'metropolitan', 'study'],
    answer: "Niyaz is pursuing a B.Sc. in Computer Science and Engineering at Metropolitan University, Sylhet (2023 - 2026).\n\nHis academic focus is on database optimization, machine learning, and full-stack web applications. He is a double board scholarship recipient and active in robotics and coding societies."
  },
  experience: {
    keywords: ['experience', 'work', 'job', 'history', 'career', 'employment', 'intelligency', 'dominos', 'iom', 'company'],
    answer: "Niyaz's professional history:\n\n1. GTM (Go-To-Market) Engineer at IntelliGency Solutions (Oct 2025 - Present): Leading development of client-facing platforms, conversion analytics setups, and tech pipelines to optimize product strategy and operations.\n2. GDA at Domino's Pizza Bangladesh (Oct 2024 - Apr 2025): Team scheduling, logistics coordination, and customer resolution.\n3. Senior Visual Designer at IOM (Jan 2020 - Jan 2022): Marketing visual designs, digital assets, and brand layout systems."
  },
  projects: {
    keywords: ['projects', 'campusbite', 'healthbridge', 'parlor', 'portfolio', 'code', 'repos', 'github'],
    answer: "Key projects developed by Niyaz:\n\n- CampusBite: A Vue.js/Node.js/MySQL canteen pre-order queue platform helping mitigate peak cafeteria rushes.\n- HealthBridge: A Doctor appointment slots booker, blood donor matching tool, and pharmacy stock tracker (HTML/CSS/PHP/MySQL).\n- Parlor Management System: A desktop customer dashboard in Java Swing featuring dark themed styling.\n- Personal Portfolio: The responsive Vue.js/Vite portfolio website you are currently exploring!"
  },
  research: {
    keywords: ['research', 'publications', 'papers', 'generative', 'synthetic', 'efast', 'nicsdg', 'thesis', 'study'],
    answer: "Niyaz is active in academic research with publications in machine learning and student productivity:\n\n1. *Can Synthetic Data Replace Real Data?* (Accepted at EFAST 2026): Explores CTGAN generative limits on tabular clinical data and details the Synthetic Label Trustworthiness Estimation (SLTE) framework.\n2. *Impact of Social Media on Student Productivity* (Abstract Accepted at NICSDG-2026): A behavioral economics review using nudge theory.\n3. *Student Prediction Model* (Thesis 2025): Classification modeling of final scores based on class attendance, demographics, and internet accessibility."
  },
  achievements: {
    keywords: ['achievements', 'awards', 'contest', 'fest', 'champion', 'scholarship', 'scholar', 'won'],
    answer: "Honors and achievements:\n\n- Champion: MU CSE FEST 2024 Design Category (1st place out of 50+ entries).\n- Finalist: Intra MU Programming Contest 2025.\n- Scholar: Double Board Scholarships from the government for board exam accomplishments."
  },
  certifications: {
    keywords: ['certifications', 'certificates', 'credential', 'dsa', 'docker', 'azure'],
    answer: "Niyaz holds certifications including:\n\n- *DSA From Fundamentals to Advanced* (Progsity)\n- *Introduction to Docker for Java* (LinkedIn)\n- *Microsoft Azure Fundamentals* (Microsoft)\n- *Imminent Health Risk* (Jubilant FoodWorks)"
  },
  contact: {
    keywords: ['contact', 'email', 'hire', 'reach', 'gmail', 'socials', 'linkedin', 'github', 'phone'],
    answer: "You can reach Niyaz at ahmadkhanniyaz@gmail.com.\n\nYou can also browse his projects on [GitHub](https://github.com/theniyazkhan) or download his CV using the CV button in the navbar."
  },
  kitten: {
    keywords: ['kitten', 'cat', 'companion', 'pet', 'meow'],
    answer: "The portfolio includes an interactive Kitten Companion at the bottom of the page! It has physics-based tracking that follows your cursor, reacts to click movements, and plays animations."
  },
  fluid: {
    keywords: ['fluid', 'background', 'canvas', 'swirl', 'cursor', 'trail', 'dynamics'],
    answer: "The background uses a GPU-accelerated WebGL fluid simulation. Moving your mouse creates interactive colorful vortexes, and clicking triggers dye ripples, matching light and dark themes."
  },
  help: {
    keywords: ['help', 'faq', 'questions', 'commands', 'info', 'support'],
    answer: "You can ask me questions about:\n\n- 'profile' (background & intro)\n- 'skills' (languages & framework stack)\n- 'experience' (professional job history)\n- 'projects' (CampusBite, HealthBridge, etc.)\n- 'research' (machine learning publications)\n- 'achievements' (awards & CSE Fest champion)\n- 'contact' (email & links)\n- 'kitten' (pet companion mechanics)\n- 'fluid' (background simulation dynamics)"
  },
  fallback: {
    keywords: ['fallback'],
    answer: "I couldn't find a matching answer for that question. Try asking about 'skills', 'experience', 'projects', 'research', or 'education'. Type 'help' to see all valid topics!"
  }
}

/**
 * Normalizes query and performs typo-tolerant matching across the FAQ knowledge base.
 */
export function findBestAnswer(query) {
  if (!query || typeof query !== 'string') {
    return faqDatabase.help.answer
  }

  const cleanQuery = query.toLowerCase().replace(/[?.,!]/g, '').trim()
  if (!cleanQuery) return faqDatabase.help.answer

  const queryWords = cleanQuery.split(/\s+/)

  // 1. Direct multi-word substring check (for phrases like "go-to-market")
  for (const [topicKey, topic] of Object.entries(faqDatabase)) {
    for (const kw of topic.keywords) {
      if (cleanQuery.includes(kw)) {
        return topic.answer
      }
    }
  }

  // 2. Typo-tolerant matching using Levenshtein distance on individual words
  let bestTopic = null
  let bestScore = 999

  for (const [topicKey, topic] of Object.entries(faqDatabase)) {
    // Skip fallback topic from match candidates
    if (topicKey === 'fallback') continue

    for (const kw of topic.keywords) {
      for (const qw of queryWords) {
        const dist = getLevenshteinDistance(qw, kw)

        // Define dynamically sized max allowed edits based on target word length
        let maxAllowedDist = 0
        if (kw.length >= 7) maxAllowedDist = 2
        else if (kw.length >= 4) maxAllowedDist = 1

        if (dist <= maxAllowedDist) {
          if (dist < bestScore) {
            bestScore = dist
            bestTopic = topicKey
          }
        }
      }
    }
  }

  if (bestTopic && bestScore <= 2) {
    return faqDatabase[bestTopic].answer
  }

  return faqDatabase.fallback.answer
}
