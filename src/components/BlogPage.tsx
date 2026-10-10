import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Tag, Share2, X, BookOpen } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { fetchBlogBySlug } from '../lib/supabaseService';
import { PlaceholderImage } from './PlaceholderImage';
import { useT, type StringKey } from '../lib/i18n';
import type { BlogPost } from '../data/blogData';

interface BlogPageProps {
  onNavigateBack?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateBack }) => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useT();

  useEffect(() => {
    if (!slug) {
      setError('Blog not found');
      setLoading(false);
      return;
    }

    const loadBlog = async () => {
      try {
        const blogData = await fetchBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.summary,
          url: window.location.href,
        });
        trackEvent('blog_share', { slug: blog?.slug || '' });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      trackEvent('blog_share_copy', { slug: blog?.slug || '' });
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <BookOpen className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-display font-bold text-ink mb-2">Article Not Found</h2>
          <p className="text-muted mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/#blogs"
            className="btn-primary inline-flex items-center gap-2"
            onClick={onNavigateBack}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('blogs.backToBlogs' as StringKey)}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-bg">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        {blog.featuredImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-[40vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24">
          {/* Back Link */}
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand transition-colors mb-6"
            onClick={onNavigateBack}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('blogs.backToBlogs' as StringKey) || 'Back to Blogs'}</span>
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4" data-reveal="up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-code font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
              <Tag className="w-3 h-3" aria-hidden="true" />
              {blog.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono-code">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono-code">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-ink leading-tight mb-4" data-reveal="up">
            {blog.title}
          </h1>

          {/* Author & Share */}
          <div className="flex flex-wrap items-center justify-between gap-4" data-reveal="up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center text-brand">
                <span className="font-bold text-sm">S</span>
              </div>
              <div>
                <p className="font-medium text-ink">{blog.author}</p>
                <p className="text-xs text-muted">Digital Marketer & Creator</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="btn-ghost p-2 rounded-lg"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <div className="prose prose-slate max-w-none" data-reveal="up">
          <div className="text-lg text-muted leading-relaxed mb-8 border-b border-line pb-8">
            {blog.summary}
          </div>

          {blog.content.map((paragraph: string, index: number) => (
            <p key={index} className="text-base text-ink leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}

          {/* Key Takeaways */}
          {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
            <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100" data-reveal="up">
              <h2 className="flex items-center gap-2 text-lg font-display font-bold text-blue-900 mb-4">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {blog.keyTakeaways.map((takeaway: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-line" data-reveal="up">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-code text-muted">Tags:</span>
                {blog.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-full transition-colors"
                  >
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-line" data-reveal="up">
            <h3 className="text-lg font-display font-bold text-ink mb-4">Enjoyed this article?</h3>
            <p className="text-sm text-muted mb-4">Share it with your network and help others discover it.</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShare}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
              <Link to="/#contact" className="btn-ghost inline-flex items-center gap-2" onClick={onNavigateBack}>
                <span>Work with Sania</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts Placeholder */}
        <section className="mt-16" data-reveal="up">
          <h2 className="text-2xl font-display font-bold text-ink mb-6">Read More</h2>
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            onClick={onNavigateBack}
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </article>
  );
};