import React from "react";

const ErrorMessage = ({ message, onRetry, className = "" }) => {
  const isFeatureDisabled = message && message.includes("not yet enabled");
  
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-4 ${
        isFeatureDisabled ? 'bg-orange-100' : 'bg-red-100'
      }`}>
        {isFeatureDisabled ? (
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className={`text-lg font-medium mb-2 ${
        isFeatureDisabled ? 'text-orange-900 dark:text-orange-100' : 'text-gray-900 dark:text-white'
      }`}>
        {isFeatureDisabled ? "Feature Coming Soon" : "Oops! Something went wrong"}
      </h3>
      <p className={`text-sm text-center mb-4 max-w-md ${
        isFeatureDisabled ? 'text-orange-700 dark:text-orange-300' : 'text-gray-600 dark:text-gray-400'
      }`}>
        {message || "We encountered an error while loading content. Please try again."}
      </p>
      {onRetry && !isFeatureDisabled && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
      {isFeatureDisabled && (
        <div className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Stay tuned for updates!</span>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
