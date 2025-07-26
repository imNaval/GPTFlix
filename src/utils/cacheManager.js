// Cache Manager for GPT responses and movie search results
class CacheManager {
  constructor() {
    this.CACHE_PREFIX = 'netflix_gpt_cache_';
    this.GPT_CACHE_PREFIX = 'gpt_';
    this.MOVIE_CACHE_PREFIX = 'movie_';
    this.DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  // Generate cache key
  generateKey(prefix, query) {
    return this.CACHE_PREFIX + prefix + '_' + this.normalizeQuery(query);
  }

  // Normalize query for consistent caching
  normalizeQuery(query) {
    return query.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  // Set cache with TTL
  setCache(key, data, ttl = this.DEFAULT_TTL) {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now(),
        ttl
      };
      sessionStorage.setItem(key, JSON.stringify(cacheItem));
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get cache with TTL check
  getCache(key) {
    try {
      const cached = sessionStorage.getItem(key);
      if (!cached) return null;

      const cacheItem = JSON.parse(cached);
      const now = Date.now();
      const isExpired = (now - cacheItem.timestamp) > cacheItem.ttl;

      if (isExpired) {
        sessionStorage.removeItem(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      return null;
    }
  }

  // Cache GPT response
  cacheGptResponse(query, response) {
    const key = this.generateKey(this.GPT_CACHE_PREFIX, query);
    return this.setCache(key, response);
  }

  // Get cached GPT response
  getCachedGptResponse(query) {
    const key = this.generateKey(this.GPT_CACHE_PREFIX, query);
    return this.getCache(key);
  }

  // Cache movie search results
  cacheMovieSearch(query, results) {
    const key = this.generateKey(this.MOVIE_CACHE_PREFIX, query);
    return this.setCache(key, results);
  }

  // Get cached movie search results
  getCachedMovieSearch(query) {
    const key = this.generateKey(this.MOVIE_CACHE_PREFIX, query);
    return this.getCache(key);
  }

  // Clear all cache
  clearAllCache() {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get cache statistics
  getCacheStats() {
    try {
      const keys = Object.keys(sessionStorage);
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      
      let gptCacheCount = 0;
      let movieCacheCount = 0;
      let totalSize = 0;

      cacheKeys.forEach(key => {
        const cached = sessionStorage.getItem(key);
        if (cached) {
          totalSize += cached.length;
          if (key.includes(this.GPT_CACHE_PREFIX)) {
            gptCacheCount++;
          } else if (key.includes(this.MOVIE_CACHE_PREFIX)) {
            movieCacheCount++;
          }
        }
      });

      return {
        totalEntries: cacheKeys.length,
        gptCacheCount,
        movieCacheCount,
        totalSize: (totalSize / 1024).toFixed(2) + ' KB'
      };
    } catch (error) {
      return null;
    }
  }

  // Check if cache is available for a query
  hasCache(prefix, query) {
    const key = this.generateKey(prefix, query);
    return this.getCache(key) !== null;
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

export default cacheManager; 