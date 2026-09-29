import React, { useState, useMemo } from 'react';
import { AI_TOOLS_LIST, AiTool } from '../data/portfolioData';
import { 
  Search, 
  Sparkles, 
  Bot, 
  Brain, 
  Cpu, 
  Palette, 
  Image as ImageIcon, 
  Sliders, 
  Layout, 
  Wand2, 
  Maximize, 
  Feather, 
  Video, 
  Film, 
  Mic, 
  UserCheck, 
  Scissors, 
  Music, 
  Volume2, 
  Code, 
  Terminal, 
  Laptop, 
  Zap, 
  Layers, 
  TrendingUp, 
  BarChart2, 
  FileText, 
  Share2, 
  CheckSquare, 
  HelpCircle, 
  Target,
  Shuffle
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Bot, Brain, Search, Cpu,
  Palette, Image: ImageIcon, Sliders, Layout, Wand2, Maximize, Feather,
  Video, Film, Mic, UserCheck, Scissors, Music, Volume2,
  Code, Terminal, Laptop, Zap, Layers,
  TrendingUp, BarChart2, FileText, Share2, CheckSquare, HelpCircle, Target
};

// Tool Logo Component with reliable fallback
const ToolLogo: React.FC<{ tool: AiTool; size?: 'sm' | 'md' | 'lg' }> = ({ tool, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  const IconComponent = iconMap[tool.iconName] || Sparkles;

  const sizeClasses = {
    sm: 'w-7 h-7 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-14 h-14 p-2'
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  }[size];

  return (
    <div className={`relative ${sizeClasses} rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 group-hover:border-blue-400 transition-all`}>
      {!imgError && tool.logoUrl ? (
        <img
          src={tool.logoUrl}
          alt={`${tool.name} logo`}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
          <IconComponent className={iconSizes} />
        </div>
      )}
    </div>
  );
};

export const AiToolsMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [spotlightTool, setSpotlightTool] = useState<AiTool | null>(null);

  const categories = [
    'All',
    'Marketing & Growth',
    'LLMs & Reasoning',
    'Visual & Generative Art',
    'Audio & Video',
    'Code & Dev',
  ];

  const filteredTools = useMemo(() => {
    return AI_TOOLS_LIST.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.useCase.toLowerCase().includes(q) ||
        tool.favoriteWorkflow.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const spinRandomWorkflow = () => {
    const randomIndex = Math.floor(Math.random() * AI_TOOLS_LIST.length);
    setSpotlightTool(AI_TOOLS_LIST[randomIndex]);
  };

  return (
    <section id="skills" className="py-16 border-t border-slate-200 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>30+ AI Tools With Photos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Skills & AI Tools Explorer
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Copywriting, Design, Video aur Coding ke sabhi 30+ AI tools ke official photos aur practical workflows.
            </p>
          </div>

          {/* Quick Spotlight Button */}
          <button
            onClick={spinRandomWorkflow}
            className="self-start lg:self-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Spotlight Random Tool</span>
          </button>
        </div>

        {/* Spotlight Banner if selected */}
        {spotlightTool && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border-2 border-blue-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-3.5">
              <ToolLogo tool={spotlightTool} size="lg" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-mono-code text-blue-700 uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Spotlight Tool · {spotlightTool.category}</span>
                </div>
                <h4 className="text-lg font-display font-black text-slate-900">
                  {spotlightTool.name}
                </h4>
                <p className="text-xs text-slate-600">
                  <span className="text-blue-700 font-semibold">Favorite Workflow:</span> {spotlightTool.favoriteWorkflow}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSpotlightTool(null)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto max-w-full shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-2xs"
            />
          </div>

        </div>

        {/* Tools Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-5 font-mono-code">
          <span>Showing {filteredTools.length} of {AI_TOOLS_LIST.length} AI Tools with Official Photos</span>
          <span className="text-blue-600 font-bold">100% Tested & Explored</span>
        </div>

        {/* Tools Grid with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Tool Photo / Logo */}
                    <ToolLogo tool={tool} size="md" />

                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {tool.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 font-mono-code mt-0.5">
                        {tool.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-code text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-bold shrink-0">
                    {tool.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tool.useCase}
                </p>
              </div>

              {/* Workflow Note */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="text-blue-700 font-semibold">Workflow: </span>
                <span>{tool.favoriteWorkflow}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
