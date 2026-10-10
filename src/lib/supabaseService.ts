import { supabase, isSupabaseConfigured } from '../supabase';
import type { BlogPost } from '../data/blogData';

// ============================================
// TYPES
// ============================================

export interface BlogPostDB {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image: string | null;
  author: string;
  tags: string[];
  published_at: string;
  updated_at: string;
  views: number;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

// ============================================
// BLOG SERVICE
// ============================================

/**
 * Fetch all published blogs from Supabase
 * Falls back to static data if Supabase is not configured
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, using static blog data');
    const { BLOG_POSTS } = await import('../data/blogData');
    return BLOG_POSTS;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      const { BLOG_POSTS } = await import('../data/blogData');
      return BLOG_POSTS;
    }

    if (!data || data.length === 0) {
      console.log('No blogs found in Supabase, using static data');
      const { BLOG_POSTS } = await import('../data/blogData');
      return BLOG_POSTS;
    }

    // Transform DB format to BlogPost format
    return data.map((blog: BlogPostDB) => ({
      id: blog.id,
      title: blog.title,
      category: blog.tags[0] || 'General',
      readTime: calculateReadTime(blog.content),
      date: new Date(blog.published_at).getFullYear().toString(),
      summary: blog.description,
      content: blog.content.split('\n\n').filter(p => p.trim()),
      keyTakeaways: extractKeyTakeaways(blog.content),
      slug: blog.slug,
      featuredImage: blog.featured_image || undefined,
      author: blog.author,
      tags: blog.tags,
      publishedAt: blog.published_at,
    }));
  } catch (err) {
    console.error('Unexpected error fetching blogs:', err);
    const { BLOG_POSTS } = await import('../data/blogData');
    return BLOG_POSTS;
  }
}

/**
 * Fetch a single blog by slug
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured || !supabase) {
    const { BLOG_POSTS } = await import('../data/blogData');
    return BLOG_POSTS.find(p => p.id === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.log('Blog not found in Supabase, checking static data');
      const { BLOG_POSTS } = await import('../data/blogData');
      return BLOG_POSTS.find(p => p.id === slug) || null;
    }

    const blog = data as BlogPostDB;
return {
        id: blog.id,
        title: blog.title,
        category: blog.tags[0] || 'General',
        readTime: calculateReadTime(blog.content),
        date: new Date(blog.published_at).getFullYear().toString(),
        summary: blog.description,
        content: blog.content.split('\n\n').filter(p => p.trim()),
        keyTakeaways: extractKeyTakeaways(blog.content),
        slug: blog.slug,
        featuredImage: blog.featured_image || undefined,
        author: blog.author,
        tags: blog.tags,
        publishedAt: blog.published_at,
      };
  } catch (err) {
    console.error('Error fetching blog by slug:', err);
    const { BLOG_POSTS } = await import('../data/blogData');
    return BLOG_POSTS.find(p => p.id === slug) || null;
  }
}

/**
 * Increment view count for a blog
 */
export async function incrementBlogViews(slug: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.rpc('increment_blog_views', { blog_slug: slug });
  } catch (err) {
    console.error('Error incrementing views:', err);
  }
}

// ============================================
// CONTACT SERVICE
// ============================================

/**
 * Submit contact form to Supabase and send email notification
 */
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // First, save to Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) {
        console.error('Error submitting contact form to Supabase:', error);
        return { success: false, error: error.message };
      }
    } catch (err) {
      console.error('Unexpected error submitting contact form to Supabase:', err);
      return { success: false, error: 'Failed to submit form' };
    }
  }

  // Then, send email notification via API route
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Email API error:', errorData);
      // Don't fail the whole request if email fails - form was saved
    }
  } catch (err) {
    console.error('Failed to send email notification:', err);
    // Don't fail the whole request if email fails - form was saved
  }

  return { success: true };
}

/**
 * Fetch all contact submissions (admin only)
 */
export async function fetchContacts(): Promise<ContactSubmission[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }

    return data as ContactSubmission[];
  } catch (err) {
    console.error('Error fetching contacts:', err);
    return [];
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractKeyTakeaways(content: string): string[] {
  // Try to extract key takeaways from content
  // Look for lines that start with common patterns
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const takeaways: string[] = [];
  
  for (const line of lines) {
    if (line.match(/^(key|takeaway|lesson|tip|insight|remember|note)[:\s]/i)) {
      takeaways.push(line.replace(/^(key|takeaway|lesson|tip|insight|remember|note)[:\s]/i, '').trim());
    }
  }
  
  // If no explicit takeaways, create from first few substantial sentences
  if (takeaways.length === 0) {
    const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
    return sentences.slice(0, 3);
  }
  
  return takeaways.slice(0, 5);
}