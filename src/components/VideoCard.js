import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const formatViewCount = (count) => {
    if (!count) return "No views";
    const num = parseInt(count);
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M views`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K views`;
    } else {
      return `${num} views`;
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    
    // Parse ISO 8601 duration format (PT4M13S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "";
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const formatTimeAgo = (publishedAt) => {
    if (!publishedAt) return "";
    
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInSeconds = Math.floor((now - published) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    
    return "Just now";
  };

  // Handle both search results and regular video objects
  const thumbnailUrl = thumbnails?.medium?.url || thumbnails?.default?.url;
  const viewCount = statistics?.viewCount;
  const duration = contentDetails?.duration;

  return (
    <article className="flex flex-col w-full h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative w-full flex-shrink-0">
        <div className="aspect-video w-full overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt="thumbnail"
            src={thumbnails?.medium?.url}
            loading="lazy"
          />
        </div>
        {/* Duration overlay */}
        {contentDetails?.duration && (
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black bg-opacity-90 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-medium">
            {formatDuration(contentDetails?.duration)}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-2 sm:p-3 flex flex-col justify-between min-h-0">
        <div className="flex-1">
          <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 leading-4 sm:leading-5 mb-1 sm:mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {title}
          </h3>
        </div>
        
        <div className="space-y-0.5 sm:space-y-1 mt-auto">
          <p className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer truncate">
            {channelTitle}
          </p>
          
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex-shrink-0">{formatViewCount(statistics?.viewCount)} views</span>
            <span className="flex-shrink-0">•</span>
            <span className="flex-shrink-0">{formatTimeAgo(publishedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
