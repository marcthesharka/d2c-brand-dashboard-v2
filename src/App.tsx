import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterBar, { FilterState } from './components/FilterBar';
import BrandCard from './components/BrandCard';
import Stats from './components/Stats';
import Pagination from './components/Pagination';
import AddBrandForm from './components/AddBrandForm';
import Footer from './components/Footer';
import LearnIndex from './components/LearnIndex';
import LearnArticle from './components/LearnArticle';
import { Brand, PaginationInfo, AnalyticsData } from './types/Brand';
import { brandService } from './services/brandService';
import { analyticsService } from './services/analyticsService';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';



const ITEMS_PER_PAGE = 20;

const App: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    pricePoint: '',
    minRating: 0,
    sortBy: 'hotScore',
    sortOrder: 'desc'
  });

  // Load brands from Supabase
  const loadBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const brandsData = await brandService.getAllBrands();

      // Fallback: find max followers for normalization
      const maxFollowers = brandsData.reduce((max, b) => Math.max(max, b.socialMedia.instagram || 0), 0);

      const growthWeight = 0.7;
      const scaleWeight = 0.3;

      const brandsWithAnalytics = brandsData.map(brand => {
        let hotScore = 0;
        let normalizedGrowth = 0;
        let normalizedFollowers = 0;
        let analyticsObj: AnalyticsData | undefined = undefined;
        if (brand.instagram_growth_7d !== undefined && brand.instagram_growth_7d !== null) {
          // Use real 7d growth
          normalizedGrowth = Math.min((brand.instagram_growth_7d / 10) * 100, 100);
          normalizedFollowers = maxFollowers > 0 ? (brand.socialMedia.instagram / maxFollowers) * 100 : 0;
          hotScore = (growthWeight * normalizedGrowth) + (scaleWeight * normalizedFollowers);
          analyticsObj = {
            websiteClicks: 0,
            instagramFollowersLastWeek: 0,
            instagramGrowthWoW: brand.instagram_growth_7d ?? 0,
            hotScore,
            lastUpdated: brand.updatedAt || new Date().toISOString(),
          };
        } else {
          // Fallback: hot score based on recency and followers only (no randomness)
          const recencyWeight = 0.4;
          const followersWeight = 0.6;
          const currentYear = new Date().getFullYear();
          const yearsSinceLaunch = currentYear - (brand.launchYear || currentYear);
          const maxYears = 10;
          const recencyScore = Math.max(0, (1 - yearsSinceLaunch / maxYears)) * 100;
          normalizedFollowers = maxFollowers > 0 ? (brand.socialMedia.instagram / maxFollowers) * 100 : 0;
          hotScore = Math.max((recencyWeight * recencyScore) + (followersWeight * normalizedFollowers), 0);
          analyticsObj = {
            websiteClicks: 0,
            instagramFollowersLastWeek: 0,
            instagramGrowthWoW: 0,
            hotScore,
            lastUpdated: brand.updatedAt || new Date().toISOString(),
          };
        }
        return {
          ...brand,
          analytics: analyticsObj
        };
      });

      setBrands(brandsWithAnalytics);
    } catch (err) {
      console.error('Error loading brands:', err);
      setError(err instanceof Error ? err.message : 'Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let filtered = brands.filter(brand => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = `${brand.name} ${brand.description} ${brand.ingredients?.join(' ') || ''}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }
      
      // Category filter
      if (filters.category && brand.category !== filters.category) return false;
      
      // Price point filter
      if (filters.pricePoint && brand.pricePoint !== filters.pricePoint) return false;
      
      // Rating filter
      if (filters.minRating > 0 && brand.rating < filters.minRating) return false;
      
      return true;
    });

    // Sort brands
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'hotScore':
          aValue = a.analytics?.hotScore || 0;
          bValue = b.analytics?.hotScore || 0;
          break;
        case 'launchYear':
          aValue = a.launchYear;
          bValue = b.launchYear;
          break;
        case 'followers':
          aValue = a.socialMedia.instagram;
          bValue = b.socialMedia.instagram;
          break;
        default:
          return 0;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [brands, filters]);

  // Pagination
  const paginatedBrands = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBrands.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBrands, currentPage]);

  const pagination: PaginationInfo = {
    currentPage,
    totalPages: Math.ceil(filteredBrands.length / ITEMS_PER_PAGE),
    totalItems: filteredBrands.length,
    itemsPerPage: ITEMS_PER_PAGE
  };

  // Handle website click tracking
  const handleWebsiteClick = (brandId: string) => {
    analyticsService.trackWebsiteClick(brandId);
    // Update the brand's analytics in state
    setBrands(prev => prev.map(brand => 
      brand.id === brandId 
        ? { ...brand, analytics: analyticsService.getBrandAnalytics(brandId) || undefined }
        : brand
    ));
  };

  // Handle brand added
  const handleBrandAdded = () => {
    loadBrands(); // Reload brands from database
    setShowAddForm(false);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          totalBrands={0} 
          filteredCount={0} 
          onAddBrand={() => setShowAddForm(true)} 
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading brands from database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          totalBrands={0} 
          filteredCount={0} 
          onAddBrand={() => setShowAddForm(true)} 
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading brands: {error}</p>
            <button 
              onClick={loadBrands}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/learn" element={<LearnIndex onAddBrand={() => setShowAddForm(true)} />} />
        <Route path="/learn/:slug" element={<LearnArticle onAddBrand={() => setShowAddForm(true)} />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <Header 
              totalBrands={brands.length} 
              filteredCount={filteredBrands.length} 
              onAddBrand={() => setShowAddForm(true)} 
            />
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              totalBrands={brands.length}
              filteredCount={filteredBrands.length}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Stats brands={brands} filteredBrands={filteredBrands} />
              {filteredBrands.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    {brands.length === 0 ? 'No brands found in database' : 'No brands match your current filters'}
                  </p>
                  {brands.length === 0 && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    >
                      Add Your First Brand
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wide">
                        <div className="w-8 mr-3"></div>
                        <div className="min-w-0 flex-1 max-w-xs">Brand</div>
                        <div className="hidden sm:block min-w-0 flex-1 max-w-xs px-2">Category</div>
                        <div className="hidden md:block min-w-0 flex-1 max-w-xs px-2">Price</div>
                        <div className="hidden lg:block min-w-0 flex-1 max-w-xs px-2">Year Est.</div>
                        <div className="min-w-0 flex-1 max-w-xs px-2">Hot Score</div>
                        <div className="hidden sm:block min-w-0 flex-1 max-w-xs px-2">Social</div>
                        <div className="w-24">Actions</div>
                      </div>
                    </div>
                    {/* Brand List */}
                    <div className="divide-y divide-gray-200">
                      {paginatedBrands.map((brand) => (
                        <BrandCard 
                          key={brand.id} 
                          brand={brand} 
                          onWebsiteClick={handleWebsiteClick}
                        />
                      ))}
                    </div>
                  </div>
                  <Pagination 
                    pagination={pagination}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </main>
          </div>
        } />
      </Routes>
      {showAddForm && (
        <AddBrandForm onClose={() => setShowAddForm(false)} />
      )}
      <Footer />
    </>
  );
};

export default App;