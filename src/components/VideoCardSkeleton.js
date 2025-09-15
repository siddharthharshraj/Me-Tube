import React from "react";

const VideoCardSkeleton = () => {
  return (
    <div className="p-3 sm:p-4 m-1 sm:m-2 w-full sm:w-72 h-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="relative">
        <div className="shimmer rounded-lg w-full h-32 sm:h-40 mb-3 bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="space-y-2">
        <div className="shimmer h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="shimmer h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="shimmer h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="flex items-center justify-between">
          <div className="shimmer h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="shimmer h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
