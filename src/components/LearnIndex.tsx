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
    id: '1',
    title: "David Protein Cod Review: Is This the Best Protein-Rich Food for 2025?",
    description: "We review David Protein's new Cod Protein—nutritional benefits, taste, and why it might be the best protein-rich food for 2025.",
    slug: 'david-protein-cod-review-best-protein-rich-food-2025',
    publishedDate: '2025-07-21',
    readTime: '4 min read',
    category: 'Weekly Digest'
  }
];

const LearnIndex: React.FC = () => {
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
        <title>David Protein Cod Review: Is This the Best Protein-Rich Food for 2025? | Bodega</title>
        <meta name="description" content="We review David Protein's new Cod Protein—nutritional benefits, taste, and why it might be the best protein-rich food for 2025." />
        <meta name="keywords" content="David Protein, Cod Protein, best protein-rich food, protein review, 2025, high protein, low fat, nutrition, tuna, salmon, supplement" />
        <meta property="og:title" content="David Protein Cod Review: Is This the Best Protein-Rich Food for 2025? | Bodega" />
        <meta property="og:description" content="We review David Protein's new Cod Protein—nutritional benefits, taste, and why it might be the best protein-rich food for 2025." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/learn" />
        <link rel="canonical" href="https://yourdomain.com/learn" />
      </Helmet>
      
      <Header totalBrands={0} filteredCount={0} onAddBrand={() => {}} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              David Protein Cod Review: Is This the Best Protein-Rich Food for 2025?
            </h1>
            <div className="flex justify-center mb-6">
              {/* Add your GIF or image here later */}
            </div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              We tried David Protein's new Cod Protein so you don't have to. Get the honest scoop on nutrition, taste, and why cod might be a better protein option than tuna or salmon for 2025.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center mb-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded">
                {articles[0].category}
              </span>
              <span className="text-gray-500 text-xs ml-3">{articles[0].readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              <a href={`/learn/${articles[0].slug}`} className="hover:text-emerald-600 transition-colors">
                {articles[0].title}
              </a>
            </h2>
            <p className="text-sm text-gray-600 mb-3">{articles[0].description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Published {new Date(articles[0].publishedDate).toLocaleDateString()}</span>
              <a 
                href={`/learn/${articles[0].slug}`}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Read more →
              </a>
            </div>
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