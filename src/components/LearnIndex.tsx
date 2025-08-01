import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import { newsletterService } from '../services/newsletterService';

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
    id: '5',
    title: "Top 10 Protein-to-Calorie Ratio Foods for Building Lean Muscle (2025)",
    description: "Discover the best protein-rich foods for muscle building that you can easily find at any grocery store. From steak to chickpeas, we break down the top 10 foods with the highest protein-to-calorie ratios for optimal lean muscle growth.",
    slug: 'top-10-protein-calorie-ratio-foods-building-lean-muscle-2025',
    publishedDate: '2025-08-02',
    readTime: '7 min read',
    category: 'Health & Wellness'
  },
  {
    id: '4',
    title: "The Best Gluten-Free Snacks We're Eating in 2025",
    description: "Tired of only eating hummus, fruit, and hard-boiled eggs? We’ve found three truly gluten-free snacks that are actually good: RXBAR, David Protein, and Mezcla. Here’s our honest (and spicy) review.",
    slug: 'best-gluten-free-snacks-2025-rxbar-david-mezcla-review',
    publishedDate: '2025-07-31',
    readTime: '4 min read',
    category: 'Product Reviews'
  },
  {
    id: '3',
    title: "Intermittent Fasting 16:8: My Honest Review & Why It's a Productivity Game-Changer",
    description: "I've been doing 16:8 intermittent fasting for months and it's completely changed my life. Here's my honest review, the science behind it, and the best products to help you maintain your fast.",
    slug: 'intermittent-fasting-16-8-honest-review-productivity-game-changer',
    publishedDate: '2025-07-26',
    readTime: '6 min read',
    category: 'Health & Wellness'
  },
  {
    id: '2',
    title: "Best Alcohol Alternatives for 2025: Liquid Death, Bero, and Brez Reviewed",
    description: "Looking for the best alcohol alternatives in 2025? We review Liquid Death, Bero, and Brez—three unique non-alcoholic drinks with serious vibes.",
    slug: 'best-alcohol-alternatives-2025-liquid-death-bero-brez',
    publishedDate: '2025-07-25',
    readTime: '5 min read',
    category: 'Product Reviews'
  },
  {
    id: '1',
    title: "David Protein Cod Review: Is This the Best Protein-Rich Food for 2025?",
    description: "We review David Protein's new Cod Protein—nutritional benefits, taste, and why it might be the best protein-rich food for 2025.",
    slug: 'david-protein-cod-review-best-protein-rich-food-2025',
    publishedDate: '2025-07-21',
    readTime: '4 min read',
    category: 'Weekly Digest'
  }
];

interface LearnIndexProps {
  onAddBrand: () => void;
}

const LearnIndex: React.FC<LearnIndexProps> = ({ onAddBrand }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    setSubscriptionMessage(null);

    try {
      const result = await newsletterService.subscribe(email.trim());
      setSubscriptionMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });

      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      setSubscriptionMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>What the moderators are eating and drinking | Bodega</title>
        <meta name="description" content="We'll keep it real with you. No BS, actual reviews." />
        <meta name="keywords" content="D2C food brands, food business, beverage brands, Instagram marketing, food startup, direct to consumer" />
        <meta property="og:title" content="What the moderators are eating and drinking | Bodega" />
        <meta property="og:description" content="We'll keep it real with you. No BS, actual reviews." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://d2cbodega.com/learn" />
        <link rel="canonical" href="https://d2cbodega.com/learn" />
      </Helmet>
      
      <Header totalBrands={0} filteredCount={0} onAddBrand={onAddBrand} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              What the moderators are eating and drinking
            </h1>
            <div className="flex justify-center mb-6">
              <img 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2N0YzdvNXd4dXNtOWtnbW04MDE1Nm9teGZtYzZzYXpucm4ydmMxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/93lEttRMS3UpxcIvPG/giphy.gif" 
                alt="Joey Chestnut eating hot dogs" 
                className="rounded shadow max-h-32" 
              />
            </div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              We'll keep it real with you. No BS, actual reviews.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">{article.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  <a href={`/learn/${article.slug}`} className="hover:text-emerald-600 transition-colors">
                    {article.title}
                  </a>
                </h3>
                <p className="text-xs text-gray-600 mb-3">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </span>
                  <a 
                    href={`/learn/${article.slug}`}
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-emerald-50 rounded-lg p-4 mt-8 text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              We'll tell you what we're following by email too
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Join thousands of people curious to know the latest in food & beverage
            </p>
            
            <form onSubmit={handleSubscribe} className="flex max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing || !email.trim()}
                className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-r-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {subscriptionMessage && (
              <div className={`mt-3 text-sm ${subscriptionMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                {subscriptionMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnIndex; 