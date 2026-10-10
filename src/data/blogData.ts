export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  slug?: string;
  featuredImage?: string;
  author?: string;
  tags?: string[];
  publishedAt?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-marketing-guide',
    title: 'How I Use 30+ AI Tools to Grow Digital Marketing Results',
    category: 'Digital Marketing & AI',
    readTime: '3 min read',
    date: '2026',
    summary: 'A simple guide to how modern AI tools like Gemini, ChatGPT, and Midjourney can help small businesses and creators reach more customers without big budgets.',
    content: [
      'Digital marketing is changing fast. In the past, creating 10 ad designs took days. Today, by using smart AI tools, we can test multiple angles, write catchy captions, and analyze audience interests in minutes.',
      'My favorite workflow starts with Google Gemini for discovering customer pain points, followed by Midjourney and Canva for visual creatives, and Zapier to instantly send leads to WhatsApp and Google Sheets.',
      'The secret is not just using AI, but adding human common sense: understanding the customer, keeping the message genuine, and testing what actually sells.'
    ],
    keyTakeaways: [
      'Save 70% time on graphic and copywriting tasks',
      'Focus on testing 5-10 ad variations per week',
      'Instant lead response = 3x higher conversion rate'
    ]
  },
  {
    id: 'game-development-journey',
    title: 'How I Built "Cyber Dash" Web Game from Scratch',
    category: 'Game Development',
    readTime: '4 min read',
    date: '2026',
    summary: 'Why I chose to build a real 2D playable web game using pure HTML5 Canvas and Web Audio API instead of just relying on templates.',
    content: [
      'Many people think building a web game requires huge teams and heavy software. But using HTML5 Canvas, modern JavaScript, and physics equations, anyone with curiosity can build fun interactive games.',
      'In Cyber Dash, I implemented double-jumping mechanics, real collision physics, procedural obstacle generation, and sound effects generated directly by mathematical sound waves in the browser.',
      'Building games teaches real problem-solving: frame rate optimization, keyboard and touch handling, and rewarding player achievements.'
    ],
    keyTakeaways: [
      'Pure 60 FPS performance without heavy external libraries',
      'Custom Web Audio synthesizer for nostalgic arcade sound',
      'Smooth responsive play on both mobile and laptop screens'
    ]
  },
  {
    id: 'pundri-to-tech-journey',
    title: 'My Journey: School, Graduation & Building Real Tech from Pundri',
    category: 'Personal Story',
    readTime: '3 min read',
    date: '2026',
    summary: 'From scoring 80% in 10th board (2024) to 78% in 12th (2026) and pursuing Graduation — how I stay consistent in learning tech and digital marketing.',
    content: [
      'Living in Pundri, Haryana taught me that opportunities are no longer limited by big city borders. All you need is an internet connection, curiosity, and the discipline to build real things every day.',
      'After completing my 10th with 80% marks in 2024, I dedicated my free hours to understanding digital funnels, ad platforms, and AI systems. In 2026, I completed my 12th with 78% marks and stepped into higher graduation studies.',
      'Balancing college studies with client projects and coding games keeps me energized. My goal is simple: help businesses grow and inspire young students to become builders.'
    ],
    keyTakeaways: [
      'Consistency matters more than where you start',
      'Combine formal education with hands-on practical skills',
      'Build real projects that people can actually test and use'
    ]
  }
];