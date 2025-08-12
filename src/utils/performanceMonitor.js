/**
 * Performance Monitoring Utility
 * Tracks and measures performance metrics for the application
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
    
    // Bind methods to preserve 'this' context
    this.startMeasure = this.startMeasure.bind(this);
    this.endMeasure = this.endMeasure.bind(this);
    this.measureApiCall = this.measureApiCall.bind(this);
    this.measureComponentRender = this.measureComponentRender.bind(this);
    this.getMetrics = this.getMetrics.bind(this);
    this.getAverageMetric = this.getAverageMetric.bind(this);
    this.clearMetrics = this.clearMetrics.bind(this);
    this.exportMetrics = this.exportMetrics.bind(this);
    this.setupCoreWebVitalsObserver = this.setupCoreWebVitalsObserver.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  /**
   * Start a performance measurement
   * @param {string} name - Name of the measurement
   * @param {string} category - Category of the measurement
   */
  startMeasure(name, category = 'general') {
    if (!this.isEnabled) return;

    const markName = `${name}_start`;
    const categoryKey = `${category}_${name}`;
    
    performance.mark(markName);
    
    if (!this.metrics.has(categoryKey)) {
      this.metrics.set(categoryKey, {
        name,
        category,
        startTime: performance.now(),
        marks: [],
        measures: []
      });
    }
    
    this.metrics.get(categoryKey).startTime = performance.now();
  }

  /**
   * End a performance measurement
   * @param {string} name - Name of the measurement
   * @param {string} category - Category of the measurement
   * @param {Object} metadata - Additional metadata
   */
  endMeasure(name, category = 'general', metadata = {}) {
    if (!this.isEnabled) return;

    const markName = `${name}_end`;
    const measureName = `${name}_measure`;
    const categoryKey = `${category}_${name}`;
    
    performance.mark(markName);
    
    try {
      const measure = performance.measure(measureName, `${name}_start`, markName);
      
      if (this.metrics.has(categoryKey)) {
        const metric = this.metrics.get(categoryKey);
        metric.measures.push({
          duration: measure.duration,
          startTime: measure.startTime,
          endTime: measure.endTime,
          metadata
        });
      }
      
      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Performance: ${name} took ${measure.duration.toFixed(2)}ms`, metadata);
      }
      
      return measure.duration;
    } catch (error) {
      console.warn(`Performance measurement failed for ${name}:`, error);
      return null;
    }
  }

  /**
   * Measure API call performance
   * @param {string} endpoint - API endpoint
   * @param {Function} apiCall - API call function
   * @param {Object} options - Additional options
   */
  async measureApiCall(endpoint, apiCall, options = {}) {
    const startTime = performance.now();
    const category = 'api';
    const name = `api_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    this.startMeasure(name, category);
    
    try {
      const result = await apiCall();
      const duration = performance.now() - startTime;
      
      this.endMeasure(name, category, {
        endpoint,
        duration,
        success: true,
        ...options
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      
      this.endMeasure(name, category, {
        endpoint,
        duration,
        success: false,
        error: error.message,
        ...options
      });
      
      throw error;
    }
  }

  /**
   * Measure component render performance
   * @param {string} componentName - Name of the component
   * @param {Function} renderFunction - Render function
   */
  measureComponentRender(componentName, renderFunction) {
    const category = 'component';
    const name = `render_${componentName}`;
    
    this.startMeasure(name, category);
    
    try {
      const result = renderFunction();
      this.endMeasure(name, category, { success: true });
      return result;
    } catch (error) {
      this.endMeasure(name, category, { 
        success: false, 
        error: error.message 
      });
      throw error;
    }
  }

  /**
   * Get performance metrics for a category
   * @param {string} category - Category to get metrics for
   * @returns {Array} Array of metrics
   */
  getMetrics(category = null) {
    if (category) {
      return Array.from(this.metrics.entries())
        .filter(([key]) => key.startsWith(category))
        .map(([key, value]) => ({ key, ...value }));
    }
    
    return Array.from(this.metrics.entries())
      .map(([key, value]) => ({ key, ...value }));
  }

  /**
   * Get average performance for a metric
   * @param {string} name - Metric name
   * @param {string} category - Metric category
   * @returns {number} Average duration
   */
  getAverageMetric(name, category = 'general') {
    const categoryKey = `${category}_${name}`;
    const metric = this.metrics.get(categoryKey);
    
    if (!metric || metric.measures.length === 0) {
      return 0;
    }
    
    const totalDuration = metric.measures.reduce((sum, measure) => sum + measure.duration, 0);
    return totalDuration / metric.measures.length;
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }

  /**
   * Export metrics as JSON
   * @returns {string} JSON string of metrics
   */
  exportMetrics() {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics: this.getMetrics(),
      summary: {
        totalMetrics: this.metrics.size,
        totalMeasures: Array.from(this.metrics.values())
          .reduce((sum, metric) => sum + metric.measures.length, 0)
      }
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Set up performance observer for Core Web Vitals
   */
  setupCoreWebVitalsObserver() {
    if (!this.isEnabled || !window.PerformanceObserver) return;

    try {
      // Observe Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.set('lcp', {
          name: 'LCP',
          category: 'web-vitals',
          value: lastEntry.startTime,
          timestamp: Date.now()
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 LCP:', lastEntry.startTime.toFixed(2), 'ms');
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.set('fid', {
            name: 'FID',
            category: 'web-vitals',
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now()
          });
          
          if (process.env.NODE_ENV === 'development') {
            console.log('🚀 FID:', (entry.processingStart - entry.startTime).toFixed(2), 'ms');
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observe Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.set('cls', {
          name: 'CLS',
          category: 'web-vitals',
          value: clsValue,
          timestamp: Date.now()
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 CLS:', clsValue.toFixed(4));
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      this.observers.set('lcp', lcpObserver);
      this.observers.set('fid', fidObserver);
      this.observers.set('cls', clsObserver);
      
    } catch (error) {
      console.warn('Failed to setup Core Web Vitals observer:', error);
    }
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    this.observers.clear();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Setup Core Web Vitals observer when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.setupCoreWebVitalsObserver();
    });
  } else {
    performanceMonitor.setupCoreWebVitalsObserver();
  }
}

export default performanceMonitor;

// Export individual functions for convenience - these are now properly bound
export const {
  startMeasure,
  endMeasure,
  measureApiCall,
  measureComponentRender,
  getMetrics,
  getAverageMetric,
  clearMetrics,
  exportMetrics
} = performanceMonitor;
