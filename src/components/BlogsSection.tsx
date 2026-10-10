import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock, X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/blogData';
import { useT, type StringKey } from '../lib/i18n';

export const BlogsSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = useT();

  return (
    <section id="blogs" className="py-20 border-t border-slate-200 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 space-y-1.5" data-reveal="left">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal-stagger>
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="card-lift group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 flex flex-col justify-between cursor-pointer space-y-4 hover:bg-white"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-500">
                  <span className="text-blue-700 font-semibold">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" aria-hidden="true" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overlay-fade">
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
