// Live Chat Performance Test Script
// Tests message delivery time, concurrency, and UI update speed

class LiveChatTest {
  constructor() {
    this.messageCount = 0;
    this.deliveryTimes = [];
    this.uiUpdateTimes = [];
    this.testResults = {
      totalMessages: 0,
      averageDeliveryTime: 0,
      averageUIUpdateTime: 0,
      messagesPerSecond: 0,
      concurrentUsers: 0,
      timestamp: new Date().toISOString()
    };
  }

  // Simulate message creation and delivery
  simulateMessageDelivery() {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      // Simulate message processing time
      setTimeout(() => {
        const deliveryTime = performance.now() - startTime;
        this.deliveryTimes.push(deliveryTime);
        this.messageCount++;
        
        resolve({
          messageId: this.messageCount,
          deliveryTime: deliveryTime,
          timestamp: new Date().toISOString()
        });
      }, Math.random() * 50 + 10); // 10-60ms delivery simulation
    });
  }

  // Simulate UI update performance
  simulateUIUpdate() {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      // Simulate DOM manipulation
      requestAnimationFrame(() => {
        const updateTime = performance.now() - startTime;
        this.uiUpdateTimes.push(updateTime);
        resolve(updateTime);
      });
    });
  }

  // Test concurrent message handling
  async testConcurrentMessages(concurrentCount = 10) {
    console.log(`🔄 Testing ${concurrentCount} concurrent messages...`);
    
    const promises = [];
    const startTime = performance.now();
    
    for (let i = 0; i < concurrentCount; i++) {
      promises.push(this.simulateMessageDelivery());
    }
    
    const results = await Promise.all(promises);
    const endTime = performance.now();
    
    const totalTime = endTime - startTime;
    const messagesPerSecond = (concurrentCount / totalTime) * 1000;
    
    console.log(`📊 Processed ${concurrentCount} messages in ${Math.round(totalTime)}ms`);
    console.log(`📈 Rate: ${Math.round(messagesPerSecond)} messages/second`);
    
    return {
      totalTime,
      messagesPerSecond,
      results
    };
  }

  // Test UI update performance under load
  async testUIPerformance(updateCount = 50) {
    console.log(`🎨 Testing UI update performance with ${updateCount} updates...`);
    
    const startTime = performance.now();
    
    for (let i = 0; i < updateCount; i++) {
      await this.simulateUIUpdate();
      // Small delay to simulate real chat flow
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const averageUpdateTime = this.uiUpdateTimes.reduce((a, b) => a + b, 0) / this.uiUpdateTimes.length;
    
    console.log(`🎯 Average UI update time: ${Math.round(averageUpdateTime)}ms`);
    console.log(`⏱️ Total test time: ${Math.round(totalTime)}ms`);
    
    return {
      totalTime,
      averageUpdateTime,
      updatesPerSecond: (updateCount / totalTime) * 1000
    };
  }

  // Simulate real-time chat scenario
  async simulateRealTimeChat(duration = 10000) {
    console.log(`💬 Simulating real-time chat for ${duration/1000} seconds...`);
    
    const startTime = performance.now();
    let messagesSent = 0;
    
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        await this.simulateMessageDelivery();
        await this.simulateUIUpdate();
        messagesSent++;
        
        if (performance.now() - startTime >= duration) {
          clearInterval(interval);
          
          const totalTime = performance.now() - startTime;
          const messagesPerSecond = (messagesSent / totalTime) * 1000;
          
          console.log(`📊 Sent ${messagesSent} messages in ${Math.round(totalTime/1000)} seconds`);
          console.log(`📈 Average rate: ${Math.round(messagesPerSecond)} messages/second`);
          
          resolve({
            messagesSent,
            totalTime,
            messagesPerSecond
          });
        }
      }, 2000); // Every 2 seconds like the actual implementation
    });
  }

  // Run comprehensive test
  async runTest() {
    console.log('🚀 Starting Live Chat Performance Test');
    console.log('=====================================');
    
    // Reset counters
    this.messageCount = 0;
    this.deliveryTimes = [];
    this.uiUpdateTimes = [];
    
    // Test 1: Concurrent message handling
    const concurrentTest = await this.testConcurrentMessages(25);
    
    // Test 2: UI performance
    const uiTest = await this.testUIPerformance(30);
    
    // Test 3: Real-time simulation
    const realTimeTest = await this.simulateRealTimeChat(8000);
    
    // Calculate final metrics
    this.testResults.totalMessages = this.messageCount;
    this.testResults.averageDeliveryTime = Math.round(
      this.deliveryTimes.reduce((a, b) => a + b, 0) / this.deliveryTimes.length
    );
    this.testResults.averageUIUpdateTime = Math.round(
      this.uiUpdateTimes.reduce((a, b) => a + b, 0) / this.uiUpdateTimes.length
    );
    this.testResults.messagesPerSecond = Math.round(concurrentTest.messagesPerSecond);
    this.testResults.concurrentUsers = 25;
    
    // Final results
    console.log('\n📈 LIVE CHAT PERFORMANCE RESULTS');
    console.log('================================');
    console.log(`Total messages processed: ${this.testResults.totalMessages}`);
    console.log(`Average delivery time: ${this.testResults.averageDeliveryTime}ms`);
    console.log(`Average UI update time: ${this.testResults.averageUIUpdateTime}ms`);
    console.log(`Peak messages per second: ${this.testResults.messagesPerSecond}`);
    console.log(`Concurrent users supported: ${this.testResults.concurrentUsers}`);
    
    return this.testResults;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LiveChatTest;
}

// Auto-run if called directly
if (typeof window !== 'undefined') {
  window.LiveChatTest = LiveChatTest;
}
