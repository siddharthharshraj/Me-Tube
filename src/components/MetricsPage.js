import React, { useState, useEffect } from 'react';
import Head from './Head';
import Footer from './Footer';

const MetricsPage = () => {
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/metrics/metrics.json');
        if (!response.ok) {
          throw new Error('Failed to load metrics data');
        }
        const data = await response.json();
        setMetricsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const downloadMetricsJSON = () => {
    if (!metricsData) return;
    
    const dataStr = JSON.stringify(metricsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mytube-metrics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Head />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading metrics data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Head />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400">Error loading metrics: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Head />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Performance Metrics Report
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Frontend performance test results for MeTube application
              </p>
            </div>
            <button
              onClick={downloadMetricsJSON}
              className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Metrics JSON</span>
            </button>
          </div>

          {/* Test Suite Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Test Suite:</span>
                <p className="text-gray-900 dark:text-white">{metricsData.testSuite}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Test Tool:</span>
                <p className="text-gray-900 dark:text-white">{metricsData.testTool}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Overall Score:</span>
                <p className="text-gray-900 dark:text-white font-bold">{metricsData.summary.overallScore}/100</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
                <p className="text-gray-900 dark:text-white">{new Date(metricsData.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Debouncing Test Results */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-2">🔍</span>
                Search Debouncing Test
                <span className="ml-auto text-sm px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                  {metricsData.results.searchDebounce.metrics.status}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {metricsData.results.searchDebounce.description}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {metricsData.results.searchDebounce.metrics.averageResponseTime}ms
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Average Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {metricsData.results.searchDebounce.metrics.debounceDelay}ms
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Debounce Delay</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {metricsData.results.searchDebounce.metrics.debounceEfficiency}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">API Call Reduction</div>
                </div>
              </div>
              
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-700 dark:text-gray-300">Metric</th>
                      <th className="text-right py-2 text-gray-700 dark:text-gray-300">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Total Keystrokes</td>
                      <td className="text-right py-2">{metricsData.results.searchDebounce.metrics.totalKeystrokes}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">API Calls Without Debounce</td>
                      <td className="text-right py-2">{metricsData.results.searchDebounce.metrics.apiCallsWithoutDebounce}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">API Calls With Debounce</td>
                      <td className="text-right py-2">{metricsData.results.searchDebounce.metrics.apiCallsWithDebounce}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Accuracy</td>
                      <td className="text-right py-2">{metricsData.results.searchDebounce.metrics.accuracy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* API Rate Limit Test Results */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">🌐</span>
                API Rate Limit Handling Test
                <span className="ml-auto text-sm px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                  {metricsData.results.apiRateLimit.metrics.status}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {metricsData.results.apiRateLimit.description}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metricsData.results.apiRateLimit.metrics.requestsBeforeLimit}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Requests Before Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metricsData.results.apiRateLimit.metrics.retryAttempts}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Retry Attempts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metricsData.results.apiRateLimit.metrics.successRate}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</div>
                </div>
              </div>
              
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-700 dark:text-gray-300">Metric</th>
                      <th className="text-right py-2 text-gray-700 dark:text-gray-300">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Total Requests</td>
                      <td className="text-right py-2">{metricsData.results.apiRateLimit.metrics.totalRequests}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Successful Requests</td>
                      <td className="text-right py-2">{metricsData.results.apiRateLimit.metrics.successfulRequests}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Failed Requests</td>
                      <td className="text-right py-2">{metricsData.results.apiRateLimit.metrics.failedRequests}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Average Response Time</td>
                      <td className="text-right py-2">{metricsData.results.apiRateLimit.metrics.averageResponseTime}ms</td>
                    </tr>
                    <tr>
                      <td className="py-2">Backoff Strategy</td>
                      <td className="text-right py-2">{metricsData.results.apiRateLimit.metrics.backoffStrategy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {metricsData.results.apiRateLimit.metrics.errorMessages.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Error Messages:</h4>
                  <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
                    {metricsData.results.apiRateLimit.metrics.errorMessages.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Chat Test Results */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-purple-50 dark:bg-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="text-purple-600 dark:text-purple-400 mr-2">💬</span>
                Live Chat Performance Test
                <span className="ml-auto text-sm px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full">
                  {metricsData.results.liveChat.metrics.status}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {metricsData.results.liveChat.description}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {metricsData.results.liveChat.metrics.averageDeliveryTime}ms
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Message Delivery Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {metricsData.results.liveChat.metrics.concurrentUsers}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Concurrent Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {metricsData.results.liveChat.metrics.uiUpdateLatency}ms
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">UI Update Latency</div>
                </div>
              </div>
              
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-700 dark:text-gray-300">Metric</th>
                      <th className="text-right py-2 text-gray-700 dark:text-gray-300">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Messages Processed</td>
                      <td className="text-right py-2">{metricsData.results.liveChat.metrics.messagesProcessed}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Messages Per Second</td>
                      <td className="text-right py-2">{metricsData.results.liveChat.metrics.messagesPerSecond}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Average UI Update Time</td>
                      <td className="text-right py-2">{metricsData.results.liveChat.metrics.averageUIUpdateTime}ms</td>
                    </tr>
                    <tr>
                      <td className="py-2">Concurrent Handling Time</td>
                      <td className="text-right py-2">{metricsData.results.liveChat.metrics.concurrentHandlingTime}ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Summary and Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Summary & Recommendations
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Performance Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Tests:</span>
                    <span className="text-gray-900 dark:text-white">{metricsData.summary.totalTests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Overall Score:</span>
                    <span className="text-gray-900 dark:text-white font-bold">{metricsData.summary.overallScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Test Duration:</span>
                    <span className="text-gray-900 dark:text-white">{Math.round(metricsData.summary.testDuration/1000)}s</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Recommendations</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {metricsData.summary.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MetricsPage;
