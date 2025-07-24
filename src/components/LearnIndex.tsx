import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  readTime: string;
  category: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'How to Launch a D2C Food Brand in 2024',
    description: 'Complete guide to launching your direct-to-consumer food brand, from concept to first sale.',
    slug: 'how-to-launch-d2c-food-brand-2024',
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Launch Guide'
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Instagram Growth for Food Brands',
    description: 'Proven strategies to grow your food brand\'s Instagram following and drive sales.',
    slug: 'instagram-growth-food-brands-guide',
    publishedDate: '2024-01-10',
    readTime: '12 min read',
    category: 'Marketing'
  },
  {
    id: '3',
    title: 'What the Moderators Are Eating and Drinking This Week',
    description: 'Weekly roundup of the hottest food and beverage trends from our community moderators.',
    slug: 'moderators-eating-drinking-weekly',
    publishedDate: '2024-01-08',
    readTime: '5 min read',
    category: 'Trends'
  }
];

const LearnIndex: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Food & Beverage Brand Guides & Insights | Bodega</title>
        <meta name="description" content="Expert guides, tips, and insights for D2C food and beverage brands. Learn how to launch, grow, and scale your food business with proven strategies." />
        <meta name="keywords" content="D2C food brands, food business, beverage brands, Instagram marketing, food startup, direct to consumer" />
        <meta property="og:title" content="Food & Beverage Brand Guides & Insights | Bodega" />
        <meta property="og:description" content="Expert guides, tips, and insights for D2C food and beverage brands." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/learn" />
        <link rel="canonical" href="https://yourdomain.com/learn" />
      </Helmet>
      
      <Header totalBrands={0} filteredCount={0} onAddBrand={() => {}} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Food & Beverage Brand Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert guides, tips, and strategies to help you launch, grow, and scale your D2C food and beverage brand.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-4">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {articles[0].category}
              </span>
              <span className="text-gray-500 text-sm ml-4">{articles[0].readTime}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <a href={`/learn/${articles[0].slug}`} className="hover:text-emerald-600 transition-colors">
                {articles[0].title}
              </a>
            </h2>
            <p className="text-gray-600 mb-4">{articles[0].description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Published {new Date(articles[0].publishedDate).toLocaleDateString()}</span>
              <a 
                href={`/learn/${articles[0].slug}`}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Read more →
              </a>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <a href={`/learn/${article.slug}`} className="hover:text-emerald-600 transition-colors">
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </span>
                  <a 
                    href={`/learn/${article.slug}`}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-emerald-50 rounded-lg p-6 mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get the latest insights delivered to your inbox
            </h3>
            <p className="text-gray-600 mb-4">
              Join thousands of food and beverage entrepreneurs getting weekly tips and strategies.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-r-md hover:bg-emerald-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnIndex; 