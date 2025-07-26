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

const articles: Record<string, Article> = {
  'best-alcohol-alternatives-2025-liquid-death-bero-brez': {
    id: '2',
    title: "Best Alcohol Alternatives for 2025: Liquid Death, Bero, and Brez Reviewed",
    description: "Looking for the best alcohol alternatives in 2025? We review Liquid Death, Bero, and Brez—three unique non-alcoholic drinks with serious vibes. Find out which is right for your next party.",
    slug: 'best-alcohol-alternatives-2025-liquid-death-bero-brez',
    content: `
      <h2>Best Alcohol Alternatives for 2025: Liquid Death, Bero, and Brez Reviewed</h2>
      
      <div style="text-align:center;margin:2rem 0;display:flex;flex-direction:column;align-items:center;">
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjAxdTRicWk5eDE0N21mdjMybjltMzJ6MzZ4OHF4cDU5OHhlcjVvNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/blSTtZehjAZ8I/giphy.gif" alt="Party GIF" style="max-width:400px;border-radius:0.5rem;display:block;margin:0 auto;" />
        <div style="font-size:0.95em;color:#64748b;margin-top:0.5rem;">Party vibes without the hangover? Yes, please.</div>
      </div>

      <h3>Why Go Alcohol-Free?</h3>
      <p>Let's be real: hangovers are out, hydration is in, and sometimes you just want to vibe without the side effects. Whether you're sober-curious, taking a break, or just want to look cool at the party, these three brands have you covered.</p>

      <h3>Liquid Death: Hardcore Hydration</h3>
      <img src="https://marketingweek.imgix.net/content/uploads/2024/02/19155639/Liquid-Death_Press_Landscape_1920x1080-1.jpg?auto=compress,format&q=60&w=736&h=429" alt="Liquid Death Water" style="max-width:100%;border-radius:0.5rem;margin-bottom:1.5rem;" />
      
      <p><strong>What is it?</strong><br />
      It's water. In a can. But not just any can—this one looks like it belongs at a metal concert.</p>

      <p><strong>Vibe:</strong></p>
      <ul>
        <li>Looks like beer, feels like water</li>
        <li>Perfect for confusing your friends and staying hydrated</li>
        <li>No alcohol, no calories, just pure mountain water</li>
      </ul>

      <p><strong>Why we love it:</strong><br />
      You get to "murder your thirst" and look like a rockstar, all while drinking H2O. No one will know you're not actually drinking—unless you start crowd surfing.</p>

      <h3>Bero: The Beer Alternative (with a Celebrity Twist)</h3>
      <img src="https://beerfordriving.com/assets/images/beer/Bero-Tom-Holland-Kingston-Golden-Pils.jpg" alt="Bero Beer Alternative" style="max-width:100%;border-radius:0.5rem;margin-bottom:1.5rem;" />
      
      <p><strong>What is it?</strong><br />
      A non-alcoholic beer alternative that actually tastes good. Oh, and it's started and owned by Tom Holland (yes, Spider-Man).</p>

      <p><strong>Vibe:</strong></p>
      <ul>
        <li>All the social fun of beer, none of the next-day regret</li>
        <li>Crisp, refreshing, and surprisingly complex</li>
        <li>Great for BBQs, game nights, or pretending you're British royalty</li>
      </ul>

      <p><strong>Why we love it:</strong><br />
      You can say, "I'm drinking what Spider-Man drinks." Plus, it's a legit beer experience—minus the hangover.</p>

      <h3>Brez: Microdosed Mushroom Magic</h3>
      <img src="https://www.drinkbrez.com/cdn/shop/files/brez-social.png?v=1722708085" alt="Brez Mushroom Drink" style="max-width:100%;border-radius:0.5rem;margin-bottom:1.5rem;" />
      
      <p><strong>What is it?</strong><br />
      A microdosed mushroom drink for those who want to get a little funky—without the alcohol.</p>

      <p><strong>Vibe:</strong></p>
      <ul>
        <li>Slightly euphoric, totally legal, and hangover-free</li>
        <li>Tastes like a craft cocktail with a twist</li>
        <li>For the adventurous, the curious, and the "I want to feel something, but not too much" crowd</li>
      </ul>

      <p><strong>Why we love it:</strong><br />
      It's the only drink here that might make you want to dance on a table and then meditate. No hangover, just good vibes.</p>

      <h3>Final Thoughts: Which Alcohol Alternative Is Right for You?</h3>
      <ul>
        <li><strong>Liquid Death:</strong> For the hydration hero who wants to look cool</li>
        <li><strong>Bero:</strong> For the social butterfly who loves a good story (and Tom Holland)</li>
        <li><strong>Brez:</strong> For the adventurous spirit who wants a little extra "oomph" without the booze</li>
      </ul>

      <p>No matter your vibe, there's a non-alcoholic drink here for you. Cheers to good times, great friends, and waking up hangover-free.</p>

      <p><em>Stay tuned for more brutally honest reviews and party hacks. Got a favorite alcohol alternative? Let us know!</em></p>
    `,
    publishedDate: '2025-07-25',
    readTime: '5 min read',
    category: 'Product Reviews',
    author: 'Bodega Moderators',
    tags: ['alcohol alternatives', 'non-alcoholic drinks', 'Liquid Death', 'Bero', 'Brez', 'Tom Holland', 'mushroom drinks', 'sober curious', 'hangover free', 'party drinks', '2025', 'best alcohol alternatives']
  },
  'david-protein-cod-review-best-protein-rich-food-2025': {
    id: '1',
    title: "David Protein Cod Review: Is This the Best Protein-Rich Food for 2025?",
    description: "We review David Protein's new Cod Protein—nutritional benefits, taste, and why it might be the best protein-rich food for 2025.",
    slug: 'david-protein-cod-review-best-protein-rich-food-2025',
    content: `
      <h2>David Protein's New Cod Protein: The Review</h2>
      <img src="https://www.foodbusinessnews.net/ext/resources/2025/07/17/Adobe-Express---file---2025-07-17T091533.644.webp?height=667&t=1752761799&width=1080" alt="David Protein Cod Product" style="max-width:100%;border-radius:0.5rem;margin-bottom:1.5rem;" />
      <p><strong>Let’s get this out of the way:</strong> If you’re looking for a protein bar that tastes like a birthday cake, this is not it. If you want to feel like you just licked a Norwegian fishing boat, you’re in the right place.</p>
      <p>David Protein’s new <strong>Cod Protein</strong> is exactly what it says on the pack: clean, pure, straight-up cod. No artificial flavors, no sweeteners, no "hint of vanilla" to mask the fact that you are, in fact, eating fish. It’s protein for people who want results, not dessert.</p>
      <h3>Nutritional Benefits: Why Cod Protein?</h3>
      <p>Cod is one of the leanest, most protein-rich foods you can eat. Compared to tuna or salmon, cod has a higher protein-to-fat ratio, making it a great choice for anyone looking to maximize protein intake while keeping fat low. Each serving of David Protein Cod packs a punch of high-quality, complete protein with minimal calories and almost zero fat. If you’re serious about building muscle or just want a clean protein source, cod is hard to beat.</p>
      <ul>
        <li><strong>Cod vs. Tuna:</strong> Cod has less mercury, less fat, and a milder flavor. Tuna is great, but cod is cleaner and lighter.</li>
        <li><strong>Cod vs. Salmon:</strong> Salmon is higher in healthy fats (omega-3s), but if you want pure protein, cod wins for leanness.</li>
      </ul>
      <h3>First Impressions</h3>
      <ul>
        <li><strong>Smell:</strong> Like a fish market at 7am. Not for the faint of heart.</li>
        <li><strong>Texture:</strong> Surprisingly good! No weird mush, just a firm, slightly oceanic bite.</li>
        <li><strong>Color:</strong> Pale, off-white. Looks innocent. Tastes... not innocent.</li>
      </ul>
      <h3>The Taste Test</h3>
      <p>We tried it straight out of the pack (for science). The verdict? <em>It’s not bad, but it’s definitely not good in the way you think.</em> It’s clean, it’s pure, and it’s 100% cod. If you’ve ever wanted to take a bite and then immediately go deep-sea fishing, this is your moment.</p>
      <div style="text-align:center;margin:2rem 0;">
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXpnbWNwMDlkNHEzaGJzMnh4em1qd3FjM2JkZnRpOXZhNm5uY2lmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G5tA3ZSgiBiIo/giphy.gif" alt="Guy getting hit by a fish GIF" style="max-width:320px;border-radius:0.5rem;" />
        <div style="font-size:0.95em;color:#64748b;margin-top:0.5rem;">Eating this literally feels like getting hit in the face by a fish. But hey, that's how you know it's real.</div>
      </div>
      <p>With a little lemon and some herbs? Actually, not terrible. We’re not saying you should serve it at your next dinner party, but if you’re serious about protein and don’t care about taste, this is as real as it gets.</p>
      <h3>Final Thoughts</h3>
      <p>David Protein’s Cod is for the hardcore. The no-nonsense. The “I eat for macros, not for fun” crowd. If you want to impress your gym bros or just want to tell people you ate a cod, this is your new go-to.</p>
      <p><strong>Would we eat it again?</strong> ...Maybe. But only if we’re feeling particularly jacked and a little bit nautical.</p>
      <p><em>Stay tuned for next week’s digest, where we try something that hopefully doesn’t taste like the Atlantic.</em></p>
    `,
    publishedDate: '2025-07-21',
    readTime: '4 min read',
    category: 'Weekly Digest',
    author: 'Bodega Moderators',
    tags: ['David Protein', 'Cod Protein', 'best protein-rich food', 'protein review', '2025', 'nutrition', 'tuna', 'salmon', 'supplement', 'high protein', 'low fat']
  }
};

interface LearnArticleProps {
  onAddBrand: () => void;
}

const LearnArticle: React.FC<LearnArticleProps> = ({ onAddBrand }) => {
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
        <meta property="og:url" content={`https://d2cbodega.com/learn/${article.slug}`} />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://d2cbodega.com/learn/${article.slug}`} />
      </Helmet>
      
      <Header totalBrands={0} filteredCount={0} onAddBrand={onAddBrand} />
      
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