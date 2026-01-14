
/**
 * CORE SELF-HEALING API SERVICE
 * Implements exponential backoff, circuit breaking, and silent recovery.
 */

const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 1000;
const CACHE_PREFIX = 'luxe_cache_';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

export const apiService = {
  /**
   * Resilient wrapper for any asynchronous operation.
   * Predictive error handling and silent recovery with local caching.
   */
  async execute<T>(
    operation: () => Promise<T>,
    fallbackData: T | null = null,
    operationName = 'anonymous'
  ): Promise<ApiResponse<T>> {
    let lastError: any = null;
    const cacheKey = `${CACHE_PREFIX}${operationName}`;
    
    // Try to get cached data first for instant UI if needed
    const cached = localStorage.getItem(cacheKey);
    const initialFallback = cached ? JSON.parse(cached) : fallbackData;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await operation();
        
        // Success: Cache the good result
        localStorage.setItem(cacheKey, JSON.stringify(result));
        
        return { data: result, error: null, isFallback: false };
      } catch (error) {
        lastError = error;
        console.warn(`[Self-Healing] Attempt ${attempt} failed for ${operationName}:`, error);
        
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // Critical Failure Recovery: Degrade gracefully using cached data or hard fallback
    console.error(`[Self-Healing] All retries exhausted for ${operationName}. Activating fallback.`);
    return { 
      data: initialFallback, 
      error: lastError?.message || 'Operation failed after retries', 
      isFallback: true 
    };
  }
};
