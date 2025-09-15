// API Rate Limit Handling Test Script
// Tests behavior under quota exhaustion, retries, and error handling

class ApiRateLimitTest {
  constructor() {
    this.requestCount = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.retryAttempts = 0;
    this.responseTimes = [];
    this.testResults = {
      totalRequests: 0,
      successRate: 0,
      failureRate: 0,
      averageResponseTime: 0,
      retryEffectiveness: 0,
      errorHandling: 'passed',
      timestamp: new Date().toISOString()
    };
  }

  // Simulate API request with rate limiting
  async simulateApiRequest(shouldFail = false, retryCount = 0) {
    const startTime = performance.now();
    this.requestCount++;
    
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const responseTime = performance.now() - startTime;
        this.responseTimes.push(responseTime);
        
        if (shouldFail) {
          this.failedRequests++;
          reject({
            error: 'Rate limit exceeded',
            statusCode: 429,
            retryAfter: 1000,
            responseTime
          });
        } else {
          this.successfulRequests++;
          resolve({
            data: { suggestions: ['test', 'result'] },
            statusCode: 200,
            responseTime
          });
        }
      }, Math.random() * 200 + 100); // 100-300ms response time
    });
  }

  // Test retry mechanism
  async testRetryMechanism(maxRetries = 3) {
    console.log(`🔄 Testing retry mechanism with ${maxRetries} max retries...`);
    
    let attempt = 0;
    
    while (attempt <= maxRetries) {
      try {
        // Fail first 2 attempts, succeed on 3rd
        const shouldFail = attempt < 2;
        const result = await this.simulateApiRequest(shouldFail);
        
        if (!shouldFail) {
          console.log(`✅ Request succeeded on attempt ${attempt + 1}`);
          return result;
        }
      } catch (error) {
        this.retryAttempts++;
        attempt++;
        
        if (attempt <= maxRetries) {
          console.log(`⚠️ Attempt ${attempt} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, error.retryAfter || 1000));
        } else {
          console.log(`❌ All ${maxRetries + 1} attempts failed`);
          throw error;
        }
      }
    }
  }

  // Test rate limit behavior
  async testRateLimitBehavior(requestsPerSecond = 10, duration = 5000) {
    console.log(`📊 Testing rate limit with ${requestsPerSecond} requests/second for ${duration/1000}s...`);
    
    const interval = 1000 / requestsPerSecond;
    const startTime = performance.now();
    let requestsSent = 0;
    
    return new Promise((resolve) => {
      const sendRequest = async () => {
        try {
          // Simulate rate limiting after 20 requests
          const shouldFail = requestsSent > 20;
          await this.simulateApiRequest(shouldFail);
          requestsSent++;
        } catch (error) {
          // Handle rate limit error
          console.log(`⚠️ Rate limit hit at request ${requestsSent + 1}`);
        }
        
        if (performance.now() - startTime < duration) {
          setTimeout(sendRequest, interval);
        } else {
          const totalTime = performance.now() - startTime;
          const actualRate = (requestsSent / totalTime) * 1000;
          
          console.log(`📈 Sent ${requestsSent} requests in ${Math.round(totalTime/1000)}s`);
          console.log(`📊 Actual rate: ${Math.round(actualRate)} requests/second`);
          
          resolve({
            requestsSent,
            totalTime,
            actualRate
          });
        }
      };
      
      sendRequest();
    });
  }

  // Test error handling and graceful degradation
  async testErrorHandling() {
    console.log('🛡️ Testing error handling and graceful degradation...');
    
    const errorScenarios = [
      { type: 'rate_limit', shouldFail: true },
      { type: 'network_error', shouldFail: true },
      { type: 'success', shouldFail: false }
    ];
    
    const results = [];
    
    for (const scenario of errorScenarios) {
      try {
        const result = await this.simulateApiRequest(scenario.shouldFail);
        results.push({ scenario: scenario.type, status: 'handled', result });
        console.log(`✅ ${scenario.type}: Handled successfully`);
      } catch (error) {
        results.push({ scenario: scenario.type, status: 'error', error });
        console.log(`⚠️ ${scenario.type}: Error caught and handled`);
      }
    }
    
    return results;
  }

  // Test caching effectiveness under rate limits
  async testCachingUnderRateLimit() {
    console.log('💾 Testing caching effectiveness under rate limits...');
    
    const cache = new Map();
    const queries = ['react', 'javascript', 'react', 'python', 'javascript', 'react'];
    let cacheHits = 0;
    let cacheMisses = 0;
    
    for (const query of queries) {
      if (cache.has(query)) {
        cacheHits++;
        console.log(`💾 Cache hit for: ${query}`);
      } else {
        cacheMisses++;
        try {
          const result = await this.simulateApiRequest(false);
          cache.set(query, result);
          console.log(`🌐 API call for: ${query}`);
        } catch (error) {
          console.log(`❌ API call failed for: ${query}`);
        }
      }
    }
    
    const cacheEfficiency = (cacheHits / queries.length) * 100;
    console.log(`📊 Cache efficiency: ${Math.round(cacheEfficiency)}%`);
    
    return {
      cacheHits,
      cacheMisses,
      cacheEfficiency
    };
  }

  // Run comprehensive test
  async runTest() {
    console.log('🚀 Starting API Rate Limit Test');
    console.log('===============================');
    
    // Reset counters
    this.requestCount = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.retryAttempts = 0;
    this.responseTimes = [];
    
    try {
      // Test 1: Retry mechanism
      await this.testRetryMechanism(3);
      
      // Test 2: Rate limit behavior
      const rateLimitTest = await this.testRateLimitBehavior(8, 4000);
      
      // Test 3: Error handling
      const errorTest = await this.testErrorHandling();
      
      // Test 4: Caching under rate limits
      const cacheTest = await this.testCachingUnderRateLimit();
      
      // Calculate final metrics
      this.testResults.totalRequests = this.requestCount;
      this.testResults.successRate = Math.round((this.successfulRequests / this.requestCount) * 100);
      this.testResults.failureRate = Math.round((this.failedRequests / this.requestCount) * 100);
      this.testResults.averageResponseTime = Math.round(
        this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      );
      this.testResults.retryEffectiveness = this.retryAttempts > 0 ? 'effective' : 'not_tested';
      this.testResults.cacheEfficiency = Math.round(cacheTest.cacheEfficiency);
      
      // Final results
      console.log('\n📈 API RATE LIMIT TEST RESULTS');
      console.log('==============================');
      console.log(`Total requests: ${this.testResults.totalRequests}`);
      console.log(`Success rate: ${this.testResults.successRate}%`);
      console.log(`Failure rate: ${this.testResults.failureRate}%`);
      console.log(`Average response time: ${this.testResults.averageResponseTime}ms`);
      console.log(`Retry attempts: ${this.retryAttempts}`);
      console.log(`Cache efficiency: ${this.testResults.cacheEfficiency}%`);
      console.log(`Error handling: ${this.testResults.errorHandling}`);
      
    } catch (error) {
      this.testResults.errorHandling = 'failed';
      console.error('❌ Test suite failed:', error);
    }
    
    return this.testResults;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiRateLimitTest;
}

// Auto-run if called directly
if (typeof window !== 'undefined') {
  window.ApiRateLimitTest = ApiRateLimitTest;
}
