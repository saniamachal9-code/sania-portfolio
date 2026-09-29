import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock, X, CheckCircle2 } from 'lucide-react';

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

export const BlogsSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" className="py-20 border-t border-slate-200 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Articles & Notes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Blogs & Insights
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Simple articles about digital marketing, AI tools, and building real projects.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group p-6 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4 hover:bg-white"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-500">
                  <span className="text-blue-700 font-semibold">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Read Article</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono-code text-blue-600 uppercase font-semibold">
                  {selectedPost.category} · {selectedPost.readTime}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
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
              <div className="text-xs font-mono-code text-blue-800 font-semibold uppercase">
                Key Takeaways:
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
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
    </section>
  );
};
