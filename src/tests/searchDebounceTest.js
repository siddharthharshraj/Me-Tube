// Search Debouncing Test Script
// Tests the debouncing functionality and measures performance

class SearchDebounceTest {
  constructor() {
    this.apiCallCount = 0;
    this.responseTime = [];
    this.testResults = {
      totalTests: 0,
      apiCallsWithoutDebounce: 0,
      apiCallsWithDebounce: 0,
      averageResponseTime: 0,
      debounceEfficiency: 0,
      timestamp: new Date().toISOString()
    };
  }

  // Simulate API call
  mockApiCall() {
    return new Promise((resolve) => {
      const startTime = performance.now();
      this.apiCallCount++;
      
      setTimeout(() => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        this.responseTime.push(responseTime);
        resolve({
          suggestions: [`suggestion ${this.apiCallCount}`, `result ${this.apiCallCount}`],
          responseTime: responseTime
        });
      }, Math.random() * 100 + 50); // Simulate 50-150ms API response
    });
  }

  // Test without debouncing
  async testWithoutDebounce(searchQueries) {
    console.log('🔍 Testing search without debouncing...');
    this.apiCallCount = 0;
    this.responseTime = [];
    
    const startTime = performance.now();
    
    for (const query of searchQueries) {
      await this.mockApiCall();
    }
    
    const endTime = performance.now();
    this.testResults.apiCallsWithoutDebounce = this.apiCallCount;
    
    console.log(`📊 Without debounce: ${this.apiCallCount} API calls for ${searchQueries.length} keystrokes`);
    return {
      apiCalls: this.apiCallCount,
      totalTime: endTime - startTime,
      avgResponseTime: this.responseTime.reduce((a, b) => a + b, 0) / this.responseTime.length
    };
  }

  // Test with debouncing (200ms delay)
  async testWithDebounce(searchQueries) {
    console.log('⏱️ Testing search with 200ms debouncing...');
    this.apiCallCount = 0;
    this.responseTime = [];
    
    let debounceTimer;
    const debounceDelay = 200;
    const startTime = performance.now();
    
    return new Promise((resolve) => {
      let queryIndex = 0;
      
      const processQuery = () => {
        if (queryIndex < searchQueries.length) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            await this.mockApiCall();
            queryIndex++;
            if (queryIndex < searchQueries.length) {
              processQuery();
            } else {
              const endTime = performance.now();
              this.testResults.apiCallsWithDebounce = this.apiCallCount;
              this.testResults.averageResponseTime = this.responseTime.reduce((a, b) => a + b, 0) / this.responseTime.length;
              
              console.log(`📊 With debounce: ${this.apiCallCount} API calls for ${searchQueries.length} keystrokes`);
              resolve({
                apiCalls: this.apiCallCount,
                totalTime: endTime - startTime,
                avgResponseTime: this.testResults.averageResponseTime
              });
            }
          }, debounceDelay);
          
          queryIndex++;
          if (queryIndex < searchQueries.length) {
            setTimeout(processQuery, 50); // Simulate typing speed
          }
        }
      };
      
      processQuery();
    });
  }

  // Run comprehensive test
  async runTest() {
    console.log('🚀 Starting Search Debounce Performance Test');
    console.log('==========================================');
    
    // Simulate user typing "react tutorial"
    const searchQueries = ['r', 're', 'rea', 'reac', 'react', 'react ', 'react t', 'react tu', 'react tut', 'react tuto', 'react tutor', 'react tutori', 'react tutoria', 'react tutorial'];
    
    this.testResults.totalTests = searchQueries.length;
    
    // Test without debouncing
    const withoutDebounce = await this.testWithoutDebounce([...searchQueries]);
    
    // Reset for next test
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test with debouncing
    const withDebounce = await this.testWithDebounce([...searchQueries]);
    
    // Calculate efficiency
    this.testResults.debounceEfficiency = Math.round(
      ((withoutDebounce.apiCalls - withDebounce.apiCalls) / withoutDebounce.apiCalls) * 100
    );
    
    // Final results
    console.log('\n📈 PERFORMANCE RESULTS');
    console.log('=====================');
    console.log(`Total keystrokes simulated: ${searchQueries.length}`);
    console.log(`API calls without debounce: ${withoutDebounce.apiCalls}`);
    console.log(`API calls with debounce: ${withDebounce.apiCalls}`);
    console.log(`Efficiency improvement: ${this.testResults.debounceEfficiency}%`);
    console.log(`Average response time: ${Math.round(this.testResults.averageResponseTime)}ms`);
    
    return this.testResults;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchDebounceTest;
}

// Auto-run if called directly
if (typeof window !== 'undefined') {
  window.SearchDebounceTest = SearchDebounceTest;
}
