/**
 * Research papers / publications data.
 */
export const publications = [
  {
    title: 'Can Synthetic Data Replace Real Data? Evaluating the Efficacy, Limits, and Label Trustworthiness of Generative Data in Supervised Learning',
    authors: ['Niyaz Ahmad Khan', 'Yousuf Bin Nazib', 'Golam M Naeem', 'Eshrath Jahan Esha', 'Islam Uddin', 'Abu Ubayda'],
    venue: 'EFAST 2026',
    year: 2026,
    abstract: `The scarcity of high-quality, human-annotated training data has made synthetic data generation an increasingly important component of supervised machine learning pipelines, yet the conditions under which synthetic data can safely substitute for real data remain poorly understood, particularly in tabular healthcare domains where privacy constraints restrict data access. This study presents an empirical and theoretical investigation into the efficacy and limits of CTGAN-generated synthetic data using a real-world medical appointment dataset of 110,527 records with a 4:1 class imbalance. Applying the Train-Synthetic-Test-Real protocol across five supervised classifiers and six synthetic-to-real mixing ratios, we find that model performance follows a non-linear degradation curve as synthetic proportion increases. Notably, when evaluated against purely real-data baselines under identical mixing conditions, tree-based architectures exhibit accuracy reductions of up to 19%, compared to 6–7% for parametric models. Beyond distributional mismatch, we identify and formally define synthetic label corruption, a distinct failure mode in which automatically assigned synthetic labels carry an independent error distribution that cannot be attributed to generative distributional drift alone, and which has received limited systematic treatment in prior tabular learning literature. To address this, we propose the Synthetic Label Trustworthiness Estimation (SLTE) framework, a pre-training pipeline that computes a Label Confidence Score for each synthetic sample using a real-data anchor model, applies topology-aware k-nearest neighbor label correction for low-confidence samples, and routes samples into uncertainty-stratified training tracks. Experimental results confirm that SLTE substantially narrows the performance gap between synthetic and real training conditions, with the largest gains in tree-based classifiers, offering a foundation for label-aware data augmentation in privacy-critical supervised learning environments.`,
    tags: ['Machine Learning', 'Generative AI', 'Synthetic Data', 'Supervised Learning'],
    pdfLink: null,
    codeLink: 'https://github.com/theniyazkhan',
    status: 'Accepted',
  },
  {
    title: 'The Impact of Social Media Use on Student Productivity: A Behavioral Economics Perspective',
    authors: ['Niyaz Ahmad Khan', 'Yousuf Bin Nazib', 'Shahriar Najim'],
    venue: 'NICSDG-2026',
    year: 2026,
    abstract: `Social media has become an unavoidable part of students daily lives, raising growing concerns about its effect on academic productivity and well-being. This paper seeks to investigate how social media usage patterns particularly notification frequency and addiction severity affect student productivity and focus. What makes this study unique is its use of behavioral economics concepts, specifically nudge theory and present bias, applied to a large-scale synthetic behavioral dataset of 6,000 students, capturing daily screen time, social media hours, study hours, sleep hours, notifications received, focus score, addiction level, and productivity score. According to the results, students averaging 4.15 hours of social media use per day and receiving around 160 notifications daily show a mean productivity score of only 37.61 out of 100, with high-addiction students representing nearly one-third of the sample. Overall, it has been concluded that notification-driven attention disruption and self-control failure as proxied by addiction severity tiers are significant behavioral determinants of reduced student productivity, with sleep deprivation acting as a key mediating channel. By applying behavioral economics constructs to a large simulated behavioral dataset, this study proposes a framework for understanding social media's impact on student outcomes that complements traditional self- reported survey approaches.Findings are expected to inform evidence - based intervention design including notification management policies and digital well - being nudges for academic institutions seeking to mitigate the attention costs of social media overuse.`,
    tags: ['Behavioral Economics', 'Cognitive Load', 'Student Productivity'],
    pdfLink: null,
    codeLink: null,
    status: 'Abstract Accepted',
  },
  {
    title: 'Student Performance Prediction Using Machine Learning',
    authors: ['Niyaz Ahmad Khan', 'Eshrath Jahan Esha'],
    venue: 'Metropolitan University (AI Course Thesis)',
    year: 2025,
    abstract: `This thesis presents a comprehensive machine learning approach to predict student final exam performance and pass/fail outcomes based on demographic, behavioral, and socioeconomic factors. The study utilizes a dataset of 708 students encompassing nine variables including gender, study hours per week, attendance rate, past exam scores, parental education level, internet access at home, and extracurricular activities. Three machine learning algorithms were evaluated and compared: classification models to identify patterns in academic success. The models demonstrated significant predictive capability in identifying at-risk students and factors influencing academic performance. Results show that past exam scores and attendance rate are among the strongest predictors of final exam performance, with implications for early intervention strategies and personalized educational support systems.`,
    tags: ['Machine Learning', 'Predictive Modeling', 'Education Technology'],
    pdfLink: null,
    codeLink: 'https://github.com/theniyazkhan',
    status: 'Thesis Paper',
  },
]

/**
 * Color class maps for research tags.
 */
export const researchTagColors = {
  'Machine Learning': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/40',
  'Generative AI': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/40',
  'Synthetic Data': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700/40',
  'Supervised Learning': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/40',
  'Behavioral Economics': 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/40',
  'Cognitive Load': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700/40',
  'Student Productivity': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700/40',
  'Predictive Modeling': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/40',
  'Education Technology': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40',
}

/** Fallback tag color */
export const defaultTagColor = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/40'
