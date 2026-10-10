-- Supabase Database Schema for Sania's Portfolio
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author VARCHAR(100) DEFAULT 'Sania Machal',
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published blogs
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated can insert blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING GIN(tags);

-- ============================================
-- CONTACTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact form
CREATE POLICY "Public can submit contact" ON contacts
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view contacts
CREATE POLICY "Authenticated can view contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update contacts" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for blogs table
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE BLOG DATA (Optional - for testing)
-- ============================================
INSERT INTO blogs (title, slug, description, content, featured_image, author, tags, published_at)
VALUES
  (
    'How I Use 30+ AI Tools to Grow Digital Marketing Results',
    'ai-marketing-guide',
    'A simple guide to how modern AI tools like Gemini, ChatGPT, and Midjourney can help small businesses and creators reach more customers without big budgets.',
    '# How I Use 30+ AI Tools to Grow Digital Marketing Results

Digital marketing is changing fast. In the past, creating 10 ad designs took days. Today, by using smart AI tools, we can test multiple angles, write catchy captions, and analyze audience interests in minutes.

## My Favorite AI Workflow

My favorite workflow starts with **Google Gemini** for discovering customer pain points, followed by **Midjourney** and **Canva** for visual creatives, and **Zapier** to instantly send leads to WhatsApp and Google Sheets.

### Step 1: Research with Gemini
I use Gemini to understand what customers are searching for, what questions they have, and what language they use.

### Step 2: Create Visuals with Midjourney & Canva
For ad creatives, I use Midjourney to generate unique visuals, then polish them in Canva with brand colors and copy.

### Step 3: Automate Lead Capture with Zapier
Every form submission goes straight to Google Sheets and sends a WhatsApp notification — no manual work needed.

## Key Takeaways
- Save 70% time on graphic and copywriting tasks
- Focus on testing 5-10 ad variations per week
- Instant lead response = 3x higher conversion rate

The secret is not just using AI, but adding human common sense: understanding the customer, keeping the message genuine, and testing what actually sells.',
    '/images/blog/ai-marketing.jpg',
    'Sania Machal',
    ARRAY['digital-marketing', 'ai-tools', 'automation'],
    NOW() - INTERVAL '30 days'
  ),
  (
    'How I Built "Cyber Dash" Web Game from Scratch',
    'game-development-journey',
    'Why I chose to build a real 2D playable web game using pure HTML5 Canvas and Web Audio API instead of just relying on templates.',
    '# How I Built "Cyber Dash" Web Game from Scratch

Many people think building a web game requires huge teams and heavy software. But using HTML5 Canvas, modern JavaScript, and physics equations, anyone with curiosity can build fun interactive games.

## The Tech Stack
- **HTML5 Canvas** for rendering
- **Vanilla JavaScript** (ES6+) for game logic
- **Web Audio API** for sound synthesis
- **CSS3** for UI overlays

## Key Features Implemented
1. **Double-jumping mechanics** with variable jump height
2. **Real collision physics** using AABB (Axis-Aligned Bounding Box)
3. **Procedural obstacle generation** for infinite gameplay
4. **Mathematical sound synthesis** for nostalgic arcade sounds

## What I Learned
Building games teaches real problem-solving:
- Frame rate optimization (60 FPS target)
- Keyboard and touch handling for cross-device play
- Rewarding player achievements with visual feedback

## Performance Results
- Pure 60 FPS performance without heavy external libraries
- Custom Web Audio synthesizer for nostalgic arcade sound
- Smooth responsive play on both mobile and laptop screens',
    '/images/blog/game-dev.jpg',
    'Sania Machal',
    ARRAY['game-development', 'javascript', 'web-dev'],
    NOW() - INTERVAL '60 days'
  ),
  (
    'My Journey: School, Graduation & Building Real Tech from Pundri',
    'pundri-to-tech-journey',
    'From scoring 80% in 10th board (2024) to 78% in 12th (2026) and pursuing Graduation — how I stay consistent in learning tech and digital marketing.',
    '# My Journey: School, Graduation & Building Real Tech from Pundri

Living in Pundri, Haryana taught me that opportunities are no longer limited by big city borders. All you need is an internet connection, curiosity, and the discipline to build real things every day.

## The Timeline

### 2024: 10th Board - 80% Marks
Completed my 10th with 80% marks. This was my foundation year where I discovered digital marketing and coding.

### 2025: Started YouTube & Learning
Launched "Sania Machal" YouTube channel for Hindi/Urdu shayari. Started learning AI tools, digital marketing, and web development in parallel.

### 2026: 12th Board - 78% Marks & Graduation Begins
Completed 12th with 78% marks while managing client projects, YouTube, and coding games. Now pursuing graduation studies.

## Key Lessons
- **Consistency matters more than where you start** - Small town doesn't mean small dreams
- **Combine formal education with hands-on practical skills** - Theory + Practice = Growth
- **Build real projects that people can actually test and use** - Portfolio > Certificates

## Current Focus
Balancing college studies with:
- Client digital marketing campaigns
- YouTube content creation
- Web game development
- AI workflow automation

My goal is simple: help businesses grow and inspire young students to become builders.',
    '/images/blog/journey.jpg',
    'Sania Machal',
    ARRAY['personal-story', 'motivation', 'career'],
    NOW() - INTERVAL '90 days'
  )
ON CONFLICT (slug) DO NOTHING;