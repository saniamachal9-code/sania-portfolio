import React, { useState, useMemo } from 'react';
import { BookOpen, ArrowUpRight, Clock, X, CheckCircle2, Search, ArrowLeft, Sparkles, Tag, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-marketing-guide',
    title: 'How I Use 30+ AI Tools to Grow Digital Marketing Results in 2026',
    category: 'Digital Marketing & AI',
    readTime: '3 min read',
    date: '2026',
    summary: 'A practical, no-fluff guide on how modern AI tools like Gemini, ChatGPT, and Midjourney help small businesses reach more customers without big agency budgets.',
    content: [
      'Digital marketing is changing faster than ever. In the past, creating 10 ad design variants and copy angles took several days. Today, by combining smart AI tools, we can test multiple consumer angles, write high-CTR headlines, and analyze customer interests in minutes.',
      'My favorite daily workflow starts with Google Gemini for uncovering audience pain points and objections. Next, I use Midjourney and Canva to generate 15+ visual ad concepts. Finally, Zapier automatically routes leads directly to WhatsApp and Google Sheets within 30 seconds.',
      'The real advantage isn’t just using AI—it is applying human common sense: understanding the customer, keeping the tone authentic, and testing what actually brings in sales.'
    ],
    keyTakeaways: [
      'Save 70% of creative production time while maintaining brand tone',
      'Always test 5–10 ad angles per week to let data find the winning hook',
      'Responding to leads within 5 minutes increases conversion rates by 3x'
    ]
  },
  {
    id: 'game-development-journey',
    title: 'How I Built "Cyber Dash" Web Game from Scratch with Pure Canvas',
    category: 'Game Development',
    readTime: '4 min read',
    date: '2026',
    summary: 'Why I chose to build a real 2D playable web arcade game using pure HTML5 Canvas and Web Audio API instead of bloated third-party engines.',
    content: [
      'Many people believe that game development requires massive teams and heavy engines. But with HTML5 Canvas, modern JavaScript, and physics mathematics, anyone with curiosity can build smooth, responsive arcade games directly in the browser.',
      'In Cyber Dash, I implemented realistic gravity and double-jump mechanics, procedural barrier generation, energy orb collection, dynamic score multipliers, and sound effects synthesized directly using mathematical sound waves via the Web Audio API.',
      'Building a game from zero dependency teaches real engineering discipline: managing frame rate bottlenecks, handling both keyboard and mobile touch gestures, and creating rewarding visual feedback.'
    ],
    keyTakeaways: [
      'Pure 60 FPS performance with less than 25 KB total footprint',
      'Native Web Audio synthesizer for nostalgic arcade sound without audio asset latency',
      'Zero external dependencies ensures instantaneous loading on mobile'
    ]
  },
  {
    id: 'pundri-to-tech-journey',
    title: 'My Journey: School, Graduation & Building Real Tech from Pundri, Haryana',
    category: 'Personal Story',
    readTime: '3 min read',
    date: '2026',
    summary: 'From scoring 80% in 10th board (2024) to 78% in 12th (2026) and pursuing Graduation — how I stay consistent in learning digital marketing and building real projects.',
    content: [
      'Growing up in Pundri, Haryana taught me that opportunities are no longer bounded by big city borders. All you need is an internet connection, relentless curiosity, and the discipline to create real things every day.',
      'After completing my 10th with an 80% score in 2024, I dedicated my evenings to mastering digital marketing algorithms, performance ad campaigns, and AI tools. In 2026, I completed my 12th standard with 78% marks and stepped into higher university graduation studies.',
      'Balancing college academics with client campaigns and coding web projects keeps me energized. My mission is simple: deliver high ROI for businesses and show young students from small towns that they can build world-class tech right from home.'
    ],
    keyTakeaways: [
      'Consistency and daily builds matter far more than geographic location',
      'Combine formal education with high-demand practical skills',
      'Focus on shipping real projects that people can actually test and use'
    ]
  }
];

interface BlogsPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onBackToHome, onNavigateToContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Digital Marketing & AI', 'Game Development', 'Personal Story'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-blue-50/70 via-[#f8fafc] to-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50/50 border border-blue-200 px-3.5 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Dedicated Page Header */}
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Dedicated Articles & Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Blogs & Perspectives
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Thoughts, workflows, and transparent lessons on digital marketing, 30+ AI tools, web engineering, and student builder life in Haryana.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer shadow-xs"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-3 text-xs font-mono-code text-slate-500">
                  <span className="text-blue-700 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md shadow-blue-900/15">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-white">
              Have a Project or Collaboration in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Let's create high-converting marketing campaigns or custom digital experiences together.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            Go to Contact Page →
          </button>
        </div>

      </div>

      {/* Full Modal Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono-code text-blue-600 uppercase font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {selectedPost.category} · {selectedPost.readTime}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-2 leading-snug">
                  {selectedPost.title}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>By Sania Machal (Pundri, Haryana)</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3.5 text-sm text-slate-700 leading-relaxed">
              {selectedPost.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
              <div className="text-xs font-mono-code text-blue-800 font-semibold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Key Practical Takeaways:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedPost.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
