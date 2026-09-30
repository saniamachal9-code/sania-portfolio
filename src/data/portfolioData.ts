export interface Project {
  id: string;
  title: string;
  category: 'games' | 'websites' | 'marketing' | 'ai';
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  featured?: boolean;
  demoType?: 'game' | 'roi' | 'preview';
}

export interface AiTool {
  name: string;
  category: 'LLMs & Reasoning' | 'Visual & Generative Art' | 'Audio & Video' | 'Code & Dev' | 'Marketing & Growth';
  useCase: string;
  favoriteWorkflow: string;
  iconName: string;
  status: 'Mastered' | 'Active Exploration';
  logoUrl: string;
  brandColor: string;
}

export interface Milestone {
  year: string;
  title: string;
  organization: string;
  location: string;
  highlight: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: 'Sania',
  fullName: 'Sania Machal',
  tagline: 'Digital Marketer & Creative Tech Builder',
  roleLine: 'Digital Marketer | Content Creator | Shayari Poet',
  location: 'Pundri, Kaithal, Haryana, India',
  email: 'saniamachal9@gmail.com',
  birthYear: 2009,
  currentEducation: 'Undergraduate Degree (Graduation in Progress)',
  bio: 'A passionate digital marketing strategist, content creator, GenAI pioneer, and creative builder from Pundri, Kaithal (Haryana). Blending data-driven performance marketing with cutting-edge AI tools (30+ explored) and real-world web/game engineering to build high-retention digital experiences.',
  about: [
    'College student from Pundri, Kaithal (Haryana), passionate about digital marketing and creative content.',
    'Running the YouTube channel "Sania Machal" where I share Hindi/Urdu shayari and original creative content.',
    'Passionate about digital marketing and creative content — building brands, telling stories, and turning ideas into real campaigns.',
  ],
  stats: [
    { label: 'AI Tools Explored', value: '30+' },
    { label: '10th Board Marks', value: '80%' },
    { label: '12th Board Marks', value: '78%' },
    { label: 'Real Projects Built', value: '12+' },
  ],
};

export interface SocialLink {
  platform: 'YouTube' | 'LinkedIn' | 'Instagram' | 'Email';
  handle: string;
  url: string;
  iconName: 'Youtube' | 'Linkedin' | 'Instagram' | 'Mail';
  brandColor: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'YouTube',
    handle: 'Sania Machal',
    url: 'https://www.youtube.com/@SaniaMachal',
    iconName: 'Youtube',
    brandColor: '#ff0000',
  },
  {
    platform: 'LinkedIn',
    handle: 'Sania Machal',
    url: 'https://www.linkedin.com/in/saniamachal',
    iconName: 'Linkedin',
    brandColor: '#0a66c2',
  },
  {
    platform: 'Instagram',
    handle: 'Sania Machal',
    url: 'https://www.instagram.com/saniamachal',
    iconName: 'Instagram',
    brandColor: '#e1306c',
  },
  {
    platform: 'Email',
    handle: 'saniamachal9@gmail.com',
    url: 'mailto:saniamachal9@gmail.com',
    iconName: 'Mail',
    brandColor: '#667eea',
  },
];

export const AI_TOOLS_LIST: AiTool[] = [
  // LLMs & Reasoning
  { 
    name: 'Google Gemini 2.5/Flash', 
    category: 'LLMs & Reasoning', 
    useCase: 'Multimodal analysis, marketing copy generation, and structured data extraction', 
    favoriteWorkflow: 'Structured content generation with zero-shot prompts', 
    iconName: 'Sparkles', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    brandColor: '#1a73e8'
  },
  { 
    name: 'ChatGPT / GPT-4o', 
    category: 'LLMs & Reasoning', 
    useCase: 'Funnel brainstorming, customer persona crafting, and SEO topic clustering', 
    favoriteWorkflow: 'End-to-end editorial calendar scripting', 
    iconName: 'Bot', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    brandColor: '#10a37f'
  },
  { 
    name: 'Claude 3.5 Sonnet', 
    category: 'LLMs & Reasoning', 
    useCase: 'Long-form thought leadership writing, analytical breakdowns, code logic', 
    favoriteWorkflow: 'Refining complex digital marketing ad scripts', 
    iconName: 'Brain', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
    brandColor: '#d97706'
  },
  { 
    name: 'Perplexity AI', 
    category: 'LLMs & Reasoning', 
    useCase: 'Real-time market research, competitor ad benchmarking, source citation', 
    favoriteWorkflow: 'Live competitor campaign intelligence', 
    iconName: 'Search', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128',
    brandColor: '#20808d'
  },
  { 
    name: 'DeepSeek R1', 
    category: 'LLMs & Reasoning', 
    useCase: 'Algorithmic reasoning, mathematical budget allocation, logic flows', 
    favoriteWorkflow: 'ROAS optimization modeling', 
    iconName: 'Cpu', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=deepseek.com&sz=128',
    brandColor: '#4d6bfe'
  },
  { 
    name: 'Mistral Le Chat', 
    category: 'LLMs & Reasoning', 
    useCase: 'Multilingual ad copy, concise creative taglines', 
    favoriteWorkflow: 'Hindi-English bilingual ad angles', 
    iconName: 'Bot', 
    status: 'Active Exploration',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=128',
    brandColor: '#ff7000'
  },

  // Visual & Generative Art
  { 
    name: 'Midjourney v6', 
    category: 'Visual & Generative Art', 
    useCase: 'Photorealistic editorial imagery, luxury brand mockups, campaign visuals', 
    favoriteWorkflow: 'Lighting and cinematic aspect ratio tuning', 
    iconName: 'Palette', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    brandColor: '#2b2d42'
  },
  { 
    name: 'Leonardo.Ai', 
    category: 'Visual & Generative Art', 
    useCase: 'Custom game assets, isometric pixel sprites, character concept art', 
    favoriteWorkflow: 'Consistent visual style token training', 
    iconName: 'Image', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128',
    brandColor: '#9333ea'
  },
  { 
    name: 'Adobe Firefly', 
    category: 'Visual & Generative Art', 
    useCase: 'Generative fill, commercial vector expansion, product photography cleanups', 
    favoriteWorkflow: 'Clean background expansion for social banners', 
    iconName: 'Sliders', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Firefly_Logo.svg',
    brandColor: '#ff0000'
  },
  { 
    name: 'Canva Magic Studio', 
    category: 'Visual & Generative Art', 
    useCase: 'Rapid social media reels thumbnails, carousel templates, poster layouts', 
    favoriteWorkflow: 'High-speed Instagram campaign rollout', 
    iconName: 'Layout', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    brandColor: '#00c4cc'
  },
  { 
    name: 'Krea AI', 
    category: 'Visual & Generative Art', 
    useCase: 'Real-time AI drawing canvas, dynamic image upscaling and enhancement', 
    favoriteWorkflow: 'Instant live sketching into photoreal assets', 
    iconName: 'Wand2', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=krea.ai&sz=128',
    brandColor: '#06b6d4'
  },
  { 
    name: 'Magnific AI', 
    category: 'Visual & Generative Art', 
    useCase: 'Ultra-resolution remastering for digital banners and billboard prints', 
    favoriteWorkflow: '4x texture synthesis for hero graphics', 
    iconName: 'Maximize', 
    status: 'Active Exploration',
    logoUrl: 'https://www.google.com/s2/favicons?domain=magnific.ai&sz=128',
    brandColor: '#8b5cf6'
  },
  { 
    name: 'Recraft.ai', 
    category: 'Visual & Generative Art', 
    useCase: 'Clean SVGs, vector icons, UI design system graphics in consistent palettes', 
    favoriteWorkflow: 'SVG generation for web project landing pages', 
    iconName: 'Feather', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=recraft.ai&sz=128',
    brandColor: '#ec4899'
  },

  // Audio & Video
  { 
    name: 'Runway Gen-3 Alpha', 
    category: 'Audio & Video', 
    useCase: 'Cinematic video generation, motion camera moves, ad hook visuals', 
    favoriteWorkflow: 'Text-to-video 4-second viral social hooks', 
    iconName: 'Video', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128',
    brandColor: '#111827'
  },
  { 
    name: 'Luma Dream Machine', 
    category: 'Audio & Video', 
    useCase: 'Dynamic 3D camera pan animations, product spin reveals', 
    favoriteWorkflow: 'Kinetic product showcases for reel promos', 
    iconName: 'Film', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128',
    brandColor: '#6366f1'
  },
  { 
    name: 'ElevenLabs', 
    category: 'Audio & Video', 
    useCase: 'Hyper-realistic AI voiceovers in natural tones for promotional video campaigns', 
    favoriteWorkflow: 'Bilingual voice narration for tutorials & game soundbites', 
    iconName: 'Mic', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128',
    brandColor: '#0f172a'
  },
  { 
    name: 'HeyGen', 
    category: 'Audio & Video', 
    useCase: 'AI spokesperson video ads, multilingual localized marketing explainers', 
    favoriteWorkflow: 'Automated video outreach campaigns', 
    iconName: 'UserCheck', 
    status: 'Active Exploration',
    logoUrl: 'https://www.google.com/s2/favicons?domain=heygen.com&sz=128',
    brandColor: '#7c3aed'
  },
  { 
    name: 'CapCut AI Tools', 
    category: 'Audio & Video', 
    useCase: 'Auto-captions, beat-synced transitions, viral vertical video editing', 
    favoriteWorkflow: 'Rapid 15-second high-retention video cut', 
    iconName: 'Scissors', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128',
    brandColor: '#000000'
  },
  { 
    name: 'Suno AI', 
    category: 'Audio & Video', 
    useCase: 'Background music generation, game theme tunes, custom brand audio jingles', 
    favoriteWorkflow: 'Original retro synth tracks for web games', 
    iconName: 'Music', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=suno.com&sz=128',
    brandColor: '#18181b'
  },
  { 
    name: 'Udio AI', 
    category: 'Audio & Video', 
    useCase: 'Dynamic acoustic soundscapes and atmospheric audio layers', 
    favoriteWorkflow: 'Sound design for interactive web projects', 
    iconName: 'Volume2', 
    status: 'Active Exploration',
    logoUrl: 'https://www.google.com/s2/favicons?domain=udio.com&sz=128',
    brandColor: '#ea580c'
  },

  // Code & Dev
  { 
    name: 'Cursor IDE', 
    category: 'Code & Dev', 
    useCase: 'Full-stack web development, React components, bug triage, refactoring', 
    favoriteWorkflow: 'Full-file code transformations with inline diffs', 
    iconName: 'Code', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128',
    brandColor: '#1e293b'
  },
  { 
    name: 'GitHub Copilot', 
    category: 'Code & Dev', 
    useCase: 'Contextual code autocomplete, unit test generation, canvas math helpers', 
    favoriteWorkflow: 'Game physics calculations & collision logic', 
    iconName: 'Terminal', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
    brandColor: '#24292f'
  },
  { 
    name: 'v0.dev by Vercel', 
    category: 'Code & Dev', 
    useCase: 'Rapid UI prototyping, Tailwind CSS layout generation, component drafts', 
    favoriteWorkflow: 'Scaffolding responsive marketing landing sections', 
    iconName: 'Laptop', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128',
    brandColor: '#000000'
  },
  { 
    name: 'Claude Code CLI', 
    category: 'Code & Dev', 
    useCase: 'Terminal-based workspace refactoring, repository wide search & patch', 
    favoriteWorkflow: 'Fast architectural reviews and code cleaning', 
    iconName: 'Zap', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
    brandColor: '#d97706'
  },
  { 
    name: 'Bolt.new', 
    category: 'Code & Dev', 
    useCase: 'In-browser full-stack sandbox execution, instant node server deployments', 
    favoriteWorkflow: 'Proof-of-concept testing for client apps', 
    iconName: 'Layers', 
    status: 'Active Exploration',
    logoUrl: 'https://www.google.com/s2/favicons?domain=bolt.new&sz=128',
    brandColor: '#2563eb'
  },

  // Marketing & Growth
  { 
    name: 'SurferSEO', 
    category: 'Marketing & Growth', 
    useCase: 'SERP keyword frequency optimization, content score auditing, NLP tags', 
    favoriteWorkflow: 'Ranking high-intent landing page copy to 85+ score', 
    iconName: 'TrendingUp', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=surferseo.com&sz=128',
    brandColor: '#f97316'
  },
  { 
    name: 'Semrush AI Suite', 
    category: 'Marketing & Growth', 
    useCase: 'Organic keyword research, backlink gap analysis, competitor PPC ads', 
    favoriteWorkflow: 'Identifying low-competition high-volume search clusters', 
    iconName: 'BarChart2', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=semrush.com&sz=128',
    brandColor: '#ff642d'
  },
  { 
    name: 'Copy.ai', 
    category: 'Marketing & Growth', 
    useCase: 'High-volume Facebook & Google Ads copy variations, email nurture sequences', 
    favoriteWorkflow: 'A/B testing 10 distinct ad angles simultaneously', 
    iconName: 'FileText', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=copy.ai&sz=128',
    brandColor: '#22c55e'
  },
  { 
    name: 'Zapier AI / Make.com', 
    category: 'Marketing & Growth', 
    useCase: 'Automated lead routing from web forms to Google Sheets & instant WhatsApp alerts', 
    favoriteWorkflow: 'Instant 30-second lead follow-up automation', 
    iconName: 'Share2', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Zapier_logo.svg',
    brandColor: '#ff4f00'
  },
  { 
    name: 'Notion AI', 
    category: 'Marketing & Growth', 
    useCase: 'Marketing project roadmap tracking, content calendars, client briefing docs', 
    favoriteWorkflow: 'Automated meeting summaries & task extraction', 
    iconName: 'CheckSquare', 
    status: 'Mastered',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    brandColor: '#000000'
  },
  { 
    name: 'AnswerThePublic AI', 
    category: 'Marketing & Growth', 
    useCase: 'Consumer intent mapping, question-based content strategy, search triggers', 
    favoriteWorkflow: 'Zeroing in on buyer pain points for conversion landing pages', 
    iconName: 'HelpCircle', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=answerthepublic.com&sz=128',
    brandColor: '#f59e0b'
  },
  { 
    name: 'AdCreative.ai', 
    category: 'Marketing & Growth', 
    useCase: 'AI-generated high-converting ad banners scored for click-through rate', 
    favoriteWorkflow: 'Generating 20+ ready-to-test ad creatives in minutes', 
    iconName: 'Target', 
    status: 'Mastered',
    logoUrl: 'https://www.google.com/s2/favicons?domain=adcreative.ai&sz=128',
    brandColor: '#8b5cf6'
  },
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'cyber-dash-game',
    title: 'Cyber Dash: 2D Arcade Web Game',
    category: 'games',
    subtitle: 'Web Game Project',
    description: 'HTML5 Canvas aur JavaScript par bana 2D physics runner game jisme obstacles dodge karna, double jump, energy orbs aur high score tracking features hain.',
    longDescription: 'Ye game maine scratch se code aur develop kiya hai. Isme smooth 60 FPS performance, real physics jump controls, procedural obstacle generation, 8-bit arcade sound effects, aur score tracking shamil hai. Mobile aur desktop dono par smooth chalta hai.',
    image: '/src/assets/images/project_game_neon_1790576297534.jpg',
    tags: ['HTML5 Canvas', 'Game Physics', 'JavaScript', 'Web Audio API', '60 FPS'],
    metrics: [
      { label: 'Performance', value: '60 FPS' },
      { label: 'Size', value: '< 25 KB' },
      { label: 'Platform', value: 'Web & Mobile' },
    ],
    deliverables: ['Custom Jump Physics', 'Obstacle Avoidance System', 'Energy Orbs & Score Tracking', 'Touch & Keyboard Controls'],
    featured: true,
  },
  {
    id: 'voguecraft-web-studio',
    title: 'Modern Responsive Web Experience',
    category: 'websites',
    subtitle: 'Website Project',
    description: 'Fast, responsive aur stylish website jo har device par instant load hoti hai aur users ko clean navigation ka experience deti hai.',
    longDescription: 'Is website project me modern React aur Tailwind CSS ka use kiya gaya hai. Isme clean product filters, fast page loading speed (99/100 score), smooth animations aur mobile-friendly design shamil hai jo dekhne me attractive lagta hai.',
    image: '/src/assets/images/project_web_studio_1790576325339.jpg',
    tags: ['React', 'Tailwind CSS', 'Responsive UI', 'Fast Load Speed', 'Modern Design'],
    metrics: [
      { label: 'Speed Score', value: '99/100' },
      { label: 'Load Time', value: '0.4s' },
      { label: 'Mobile Ready', value: '100%' },
    ],
    deliverables: ['Clean Minimalist Layout', '100% Mobile Responsive', 'Fast Page Load Speed', 'Smooth Interactive Menus'],
    featured: true,
  },
  {
    id: 'hyper-growth-marketing',
    title: 'HyperGrowth 360: Ad Engine',
    category: 'marketing',
    subtitle: 'Digital Marketing Project',
    description: 'High-ROI Meta aur Google ad campaigns jisme AI tools se targeted ad copies aur high-converting landing pages banaye gaye hain.',
    longDescription: 'Ye project digital marketing growth ke liye banaya gaya hai. Isme audience targeting, AI-generated ad designs, high conversion rate optimization, aur lead tracking shamil hain.',
    image: '/src/assets/images/project_growth_marketing_1790576311257.jpg',
    tags: ['Digital Marketing', 'Meta Ads', 'Google Ads', 'AI Copywriting', 'Lead Funnels'],
    metrics: [
      { label: 'Target ROAS', value: '4.2x' },
      { label: 'CTR Growth', value: '+142%' },
      { label: 'Lead Cost', value: '-38%' },
    ],
    deliverables: ['Meta & Google Ads Setup', 'AI Ad Copywriting & Creatives', 'Landing Page Conversion Strategy', 'Analytics & Lead Tracking'],
    featured: true,
  },
  {
    id: 'sania-machal-youtube',
    title: 'Sania Machal — YouTube Channel',
    category: 'marketing',
    subtitle: 'Content Creation Project',
    description: 'Apna YouTube channel "Sania Machal" chala rahi hoon jahan Hindi/Urdu shayari aur original creative content audience ke saath connect karta hai.',
    longDescription: 'Sania Machal YouTube channel meri apni creative identity hai. Isme main Hindi/Urdu shayari, original stories aur creative content publish karti hoon. Channel ko thumbnails, SEO titles, aur audience engagement ke through organic reach build karne ka experience hai. Content planning, video editing, aur community engagement mere daily routine ka hissa hain.',
    image: '/src/assets/images/project_growth_marketing_1790576311257.jpg',
    tags: ['YouTube', 'Hindi Shayari', 'Urdu Poetry', 'Content Strategy', 'Video SEO', 'Thumbnails'],
    metrics: [
      { label: 'Content Niche', value: 'Hindi/Urdu' },
      { label: 'Focus', value: 'Poetry' },
      { label: 'Growth', value: 'Organic' },
    ],
    deliverables: ['Channel Branding & Identity', 'Hindi/Urdu Shayari Writing', 'Video Editing & Thumbnails', 'YouTube SEO & Audience Growth'],
    featured: true,
  },
  {
    id: 'content-creation-showreel',
    title: 'Creative Content Creation',
    category: 'marketing',
    subtitle: 'Content Creation Project',
    description: 'Short-form reels aur social content ka full production — idea se scripting, video editing, captions, aur final delivery tak.',
    longDescription: 'Content creation meri core strength hai. Main short-form vertical videos (reels/shorts) ke liye idea se scripting, shooting guidance, video editing, auto-captions, aur beat-synced transitions tak poora workflow handle karti hoon. CapCut aur AI voiceover tools ke saath high-retention edits banati hoon jo social platforms par perform karte hain.',
    image: '/src/assets/images/project_web_studio_1790576325339.jpg',
    tags: ['Reels & Shorts', 'Video Editing', 'CapCut', 'Auto Captions', 'Scripting', 'AI Voiceover'],
    metrics: [
      { label: 'Format', value: 'Vertical' },
      { label: 'Editing', value: 'CapCut' },
      { label: 'Captions', value: 'Auto' },
    ],
    deliverables: ['Content Ideation & Scripting', 'Vertical Video Editing', 'Auto-Captions & Transitions', 'AI Voiceover Narration'],
  },
];

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    year: '2026',
    title: '12th Board Complete (78% Marks) & Higher Graduation',
    organization: 'Board Examination & University Study',
    location: 'Haryana, India',
    highlight: 'Scored 78% in 12th Board Examination',
    description: '12th board me 78% marks secure karne ke sath ab graduation studies continue karte hue digital marketing, GenAI pipelines aur live client projects run kar rahi hoon.',
  },
  {
    year: '2024',
    title: '10th Board Complete (80% Marks)',
    organization: 'School Academic Board',
    location: 'Pundri, Haryana',
    highlight: 'Scored 80% with Academic Distinction',
    description: 'School education me 80% marks praapt kiye aur tech, coding aur visual design me deep curiosity ke sath digital self-learning start ki.',
  },
  {
    year: '2009',
    title: 'Born in Pundri, Kaithal District, Haryana',
    organization: 'Roots & Hometown',
    location: 'Pundri, Haryana',
    highlight: 'Humble small-town beginnings with big dreams',
    description: 'Haryana ke historical town Pundri se belong karti hoon, jahan se internet aur AI tools ki power se global projects create kar rahi hoon.',
  },
];

export const CORE_SKILLS = [
  {
    category: 'Digital Marketing',
    items: ['Social Media Marketing', 'Meta Ads (FB/IG)', 'Google Ads & PPC', 'Conversion Rate (CRO)', 'Full-Funnel ROAS', 'SEO Keywords', 'Lead Generation']
  },
  {
    category: 'Content Creation',
    items: ['YouTube Channel Growth', 'Hindi/Urdu Shayari Writing', 'Video Editing (CapCut)', 'Short-Form Reels & Shorts', 'Thumbnail & Poster Design', 'Scripting & Storyboarding']
  },
  {
    category: 'AI & Generative Tools',
    items: ['30+ AI Tools Mastered', 'Prompt Engineering', 'Gemini & Claude', 'Midjourney & Firefly', 'AI Voiceovers (ElevenLabs)', 'Workflow Automation (Zapier)']
  },
  {
    category: 'Tech & Engineering',
    items: ['HTML & CSS', 'JavaScript & TypeScript', 'React & Tailwind CSS', 'HTML5 Canvas Games', 'Web Performance (99+ Lighthouse)', 'Responsive UX/UI', 'Physics Engines']
  }
];
