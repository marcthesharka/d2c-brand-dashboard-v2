// Analytics service for tracking brand performance and calculating hot scores

export interface AnalyticsData {
  currentInstagramFollowers: number;
  hotScore: number;
  lastUpdated: string;
}

class AnalyticsService {
  private storageKey = 'brand_analytics';

  // Get analytics data from localStorage
  getAnalyticsData(): Record<string, AnalyticsData> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading analytics data:', error);
      return {};
    }
  }

  // Save analytics data to localStorage
  saveAnalyticsData(data: Record<string, AnalyticsData>): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  // Update Instagram followers
  updateInstagramFollowers(brandId: string, currentFollowers: number): void {
    const analytics = this.getAnalyticsData();
    
    if (!analytics[brandId]) {
      analytics[brandId] = this.createDefaultAnalytics();
    }
    
    analytics[brandId].currentInstagramFollowers = currentFollowers;
    analytics[brandId].hotScore = this.calculateHotScore(analytics[brandId]);
    analytics[brandId].lastUpdated = new Date().toISOString();
    
    this.saveAnalyticsData(analytics);
  }

  // Calculate hot score (this will be overridden by the new calculation in App.tsx)
  calculateHotScore(analytics: AnalyticsData): number {
    // This is a placeholder - the actual calculation is now done in App.tsx
    return analytics.hotScore || 0;
  }

  // Create default analytics object
  createDefaultAnalytics(): AnalyticsData {
    return {
      currentInstagramFollowers: 0,
      hotScore: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  // Generate sample analytics data for demo purposes
  generateSampleAnalytics(brandId: string, currentFollowers: number): AnalyticsData {
    const analytics: AnalyticsData = {
      currentInstagramFollowers: currentFollowers,
      hotScore: 0,
      lastUpdated: new Date().toISOString()
    };
    
    analytics.hotScore = Math.max(this.calculateHotScore(analytics), 0);
    return analytics;
  }

  // Initialize analytics for all brands (for demo)
  initializeSampleData(brands: any[]): void {
    const analytics = this.getAnalyticsData();
    let hasNewData = false;
    
    brands.forEach(brand => {
      if (!analytics[brand.id]) {
        analytics[brand.id] = this.generateSampleAnalytics(brand.id, brand.socialMedia.instagram);
        hasNewData = true;
      }
    });
    
    if (hasNewData) {
      this.saveAnalyticsData(analytics);
    }
  }

  // Get analytics for a specific brand
  getBrandAnalytics(brandId: string): AnalyticsData | null {
    const analytics = this.getAnalyticsData();
    return analytics[brandId] || null;
  }

  // Get all brands sorted by hot score
  getHotRankings(): Array<{ brandId: string; hotScore: number }> {
    const analytics = this.getAnalyticsData();
    return Object.entries(analytics)
      .map(([brandId, data]) => ({ brandId, hotScore: data.hotScore }))
      .sort((a, b) => b.hotScore - a.hotScore);
  }
}

export const analyticsService = new AnalyticsService();