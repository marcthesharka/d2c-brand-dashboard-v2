const fs = require('fs');
const path = require('path');

// Articles data from LearnIndex.tsx
const articles = [
  {
    id: '6',
    title: "The Ultimate Guide to Coffee Alternatives: Energy Drinks, Mushroom Drinks & Yerba Mate",
    slug: 'coffee-alternatives-energy-drinks-mushroom-drinks-yerba-mate',
    publishedDate: '2025-08-05',
  },
  {
    id: '5',
    title: "Top 10 Protein-to-Calorie Ratio Foods for Building Lean Muscle (2025)",
    slug: 'top-10-protein-calorie-ratio-foods-building-lean-muscle-2025',
    publishedDate: '2025-08-02',
  },
  {
    id: '4',
    title: "The Best Gluten-Free Snacks We're Eating in 2025",
    slug: 'best-gluten-free-snacks-2025-rxbar-david-mezcla-review',
    publishedDate: '2025-07-31',
  },
  {
    id: '3',
    title: "Intermittent Fasting 16:8: My Honest Review & Why It's a Productivity Game-Changer",
    slug: 'intermittent-fasting-16-8-honest-review-productivity-game-changer',
    publishedDate: '2025-07-26',
  },
  {
    id: '2',
    title: "Best Alcohol Alternatives for 2025: Liquid Death, Bero, and Brez Reviewed",
    slug: 'best-alcohol-alternatives-2025-liquid-death-bero-brez',
    publishedDate: '2025-07-25',
  },
  {
    id: '1',
    title: "David Protein Cod Review: Is This the Best Protein-Rich Food for 2025?",
    slug: 'david-protein-cod-review-best-protein-rich-food-2025',
    publishedDate: '2025-07-21',
  }
];

function generateSitemap() {
  const baseUrl = 'https://d2cbodega.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/learn</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add article URLs
  articles.forEach(article => {
    sitemap += `
  <url>
    <loc>${baseUrl}/learn/${article.slug}</loc>
    <lastmod>${article.publishedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write to public/sitemap.xml
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap generated successfully at:', sitemapPath);
}

generateSitemap(); 