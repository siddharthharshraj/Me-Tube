// Test Runner - Executes all performance tests and generates metrics
// This script runs all tests and generates a comprehensive metrics JSON file

const SearchDebounceTest = require('./searchDebounceTest');
const LiveChatTest = require('./liveChatTest');
const ApiRateLimitTest = require('./apiRateLimitTest');

class TestRunner {
  constructor() {
    this.allResults = {
      testSuite: 'MeTube Performance Tests',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'development',
      results: {}
    };
  }

  async runAllTests() {
    console.log('🚀 Starting MeTube Performance Test Suite');
    console.log('==========================================\n');

    try {
      // Run Search Debounce Test
      console.log('1️⃣ Running Search Debounce Test...');
      const searchTest = new SearchDebounceTest();
      this.allResults.results.searchDebounce = await searchTest.runTest();
      console.log('✅ Search Debounce Test completed\n');

      // Run Live Chat Test
      console.log('2️⃣ Running Live Chat Test...');
      const chatTest = new LiveChatTest();
      this.allResults.results.liveChat = await chatTest.runTest();
      console.log('✅ Live Chat Test completed\n');

      // Run API Rate Limit Test
      console.log('3️⃣ Running API Rate Limit Test...');
      const apiTest = new ApiRateLimitTest();
      this.allResults.results.apiRateLimit = await apiTest.runTest();
      console.log('✅ API Rate Limit Test completed\n');

      // Generate summary
      this.generateSummary();

      // Save results to JSON file
      this.saveResults();

      console.log('🎉 All tests completed successfully!');
      return this.allResults;

    } catch (error) {
      console.error('❌ Test suite failed:', error);
      this.allResults.error = error.message;
      return this.allResults;
    }
  }

  generateSummary() {
    const results = this.allResults.results;
    
    this.allResults.summary = {
      searchPerformance: {
        debounceEfficiency: `${results.searchDebounce.debounceEfficiency}%`,
        averageResponseTime: `${results.searchDebounce.averageResponseTime}ms`,
        status: results.searchDebounce.debounceEfficiency > 80 ? 'excellent' : 'good'
      },
      chatPerformance: {
        messagesPerSecond: results.liveChat.messagesPerSecond,
        averageDeliveryTime: `${results.liveChat.averageDeliveryTime}ms`,
        uiUpdateTime: `${results.liveChat.averageUIUpdateTime}ms`,
        status: results.liveChat.averageDeliveryTime < 100 ? 'excellent' : 'good'
      },
      apiReliability: {
        successRate: `${results.apiRateLimit.successRate}%`,
        averageResponseTime: `${results.apiRateLimit.averageResponseTime}ms`,
        cacheEfficiency: `${results.apiRateLimit.cacheEfficiency}%`,
        status: results.apiRateLimit.successRate > 80 ? 'excellent' : 'needs_improvement'
      },
      overallScore: this.calculateOverallScore()
    };
  }

  calculateOverallScore() {
    const results = this.allResults.results;
    let score = 0;
    
    // Search performance (30%)
    score += (results.searchDebounce.debounceEfficiency / 100) * 30;
    
    // Chat performance (35%)
    const chatScore = results.liveChat.averageDeliveryTime < 100 ? 1 : 0.7;
    score += chatScore * 35;
    
    // API reliability (35%)
    score += (results.apiRateLimit.successRate / 100) * 35;
    
    return Math.round(score);
  }

  saveResults() {
    const fs = require('fs');
    const path = require('path');
    
    const resultsPath = path.join(__dirname, '..', '..', 'test-results.json');
    
    try {
      fs.writeFileSync(resultsPath, JSON.stringify(this.allResults, null, 2));
      console.log(`📄 Results saved to: ${resultsPath}`);
    } catch (error) {
      console.error('❌ Failed to save results:', error);
    }
  }
}

// Export for use in other modules
module.exports = TestRunner;

// Auto-run if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests();
}
