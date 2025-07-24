import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedDate: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

// Mock articles database - in production, this would come from your CMS or database
const articles: Record<string, Article> = {
  'how-to-launch-d2c-food-brand-2024': {
    id: '1',
    title: 'How to Launch a D2C Food Brand in 2024',
    description: 'Complete guide to launching your direct-to-consumer food brand, from concept to first sale.',
    slug: 'how-to-launch-d2c-food-brand-2024',
    content: `
      <h2>Introduction</h2>
      <p>Launching a direct-to-consumer (D2C) food brand in 2024 requires a strategic approach that combines traditional business fundamentals with modern digital marketing tactics. This comprehensive guide will walk you through every step of the process.</p>
      
      <h2>1. Market Research and Validation</h2>
      <p>Before you invest time and money into your food brand, you need to validate your concept. Start by identifying your target audience and understanding their pain points.</p>
      
      <h3>Key Questions to Answer:</h3>
      <ul>
        <li>Who is your ideal customer?</li>
        <li>What problem does your product solve?</li>
        <li>How big is your target market?</li>
        <li>What are your competitors doing?</li>
      </ul>
      
      <h2>2. Product Development</h2>
      <p>Your product is the foundation of your brand. Focus on creating something that's not just good, but exceptional. Consider factors like taste, packaging, shelf life, and scalability.</p>
      
      <h2>3. Brand Identity and Story</h2>
      <p>Your brand story should resonate with your target audience. It's not just about what you sell, but why you sell it. Your story should be authentic, compelling, and consistent across all touchpoints.</p>
      
      <h2>4. Digital Presence and Marketing</h2>
      <p>In today's digital age, your online presence is crucial. Focus on building a strong Instagram following, creating valuable content, and engaging with your community.</p>
      
      <h2>5. E-commerce Setup</h2>
      <p>Choose the right e-commerce platform for your needs. Consider factors like ease of use, customization options, payment processing, and shipping integrations.</p>
      
      <h2>Conclusion</h2>
      <p>Launching a D2C food brand is challenging but rewarding. Focus on creating an exceptional product, building a strong brand, and connecting with your audience authentically.</p>
    `,
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Launch Guide',
    author: 'Bodega Team',
    tags: ['D2C', 'Food Brand', 'Launch Guide', 'Marketing', 'E-commerce']
  },
  'instagram-growth-food-brands-guide': {
    id: '2',
    title: 'The Ultimate Guide to Instagram Growth for Food Brands',
    description: 'Proven strategies to grow your food brand\'s Instagram following and drive sales.',
    slug: 'instagram-growth-food-brands-guide',
    content: `
      <h2>Why Instagram is Crucial for Food Brands</h2>
      <p>Instagram has become the go-to platform for food discovery and brand building. With over 2 billion monthly active users, it's where your potential customers are spending their time.</p>
      
      <h2>Content Strategy</h2>
      <p>Your content should be visually appealing, authentic, and valuable to your audience. Mix product shots with behind-the-scenes content, user-generated content, and educational posts.</p>
      
      <h2>Hashtag Strategy</h2>
      <p>Use a mix of popular and niche hashtags to increase your discoverability. Research hashtags that your target audience is using and create a branded hashtag for your community.</p>
      
      <h2>Engagement Tactics</h2>
      <p>Engage with your followers authentically. Respond to comments, like and comment on relevant posts, and create interactive content like polls and questions.</p>
    `,
    publishedDate: '2024-01-10',
    readTime: '12 min read',
    category: 'Marketing',
    author: 'Bodega Team',
    tags: ['Instagram', 'Social Media', 'Marketing', 'Growth']
  },
  'moderators-eating-drinking-weekly': {
    id: '3',
    title: 'What the Moderators Are Eating and Drinking This Week',
    description: 'Weekly roundup of the hottest food and beverage trends from our community moderators.',
    slug: 'moderators-eating-drinking-weekly',
    content: `
      <h2>This Week's Hot Picks</h2>
      <p>Our community moderators are always on the lookout for the latest and greatest in food and beverage. Here's what they're loving this week.</p>
      
      <h2>Trending Products</h2>
      <ul>
        <li>Functional beverages with adaptogens</li>
        <li>Plant-based protein snacks</li>
        <li>Gut-health focused foods</li>
        <li>Sustainable packaging innovations</li>
      </ul>
      
      <h2>What's Next</h2>
      <p>Keep an eye on these emerging trends that our moderators are predicting will be big in the coming months.</p>
    `,
    publishedDate: '2024-01-08',
    readTime: '5 min read',
    category: 'Trends',
    author: 'Bodega Moderators',
    tags: ['Trends', 'Food', 'Beverage', 'Community']
  }
};

const LearnArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Bodega</title>
          <meta name="description" content="The requested article could not be found." />
        </Helmet>
        <Header totalBrands={0} filteredCount={0} onAddBrand={() => {}} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <a 
              href="/learn" 
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Back to all articles
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Bodega</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourdomain.com/learn/${article.slug}`} />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://yourdomain.com/learn/${article.slug}`} />
      </Helmet>
      
      <Header totalBrands={0} filteredCount={0} onAddBrand={() => {}} />
      
      <div className="min-h-screen bg-gray-50">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Article Header */}
          <header className="mb-6">
            <div className="flex items-center mb-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded">
                {article.category}
              </span>
              <span className="text-gray-500 text-xs ml-3">{article.readTime}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h1>
            <p className="text-base text-gray-600 mb-4">{article.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>By {article.author}</span>
              <span>Published {new Date(article.publishedDate).toLocaleDateString()}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-900 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-1">
              {article.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Back to Articles */}
          <div className="text-center">
            <a 
              href="/learn" 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              ← Back to all articles
            </a>
          </div>
        </article>
      </div>
    </>
  );
};

export default LearnArticle; 