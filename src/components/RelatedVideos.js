import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const RelatedVideos = ({ currentVideoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(YOUTUBE_VIDEOS_API);
      const data = await response.json();
      
      if (data.items) {
        // Filter out current video and get first 10
        const filtered = data.items
          .filter(video => video.id !== currentVideoId)
          .slice(0, 10);
        setRelatedVideos(filtered);
      }
    } catch (error) {
      console.error("Error fetching related videos:", error);
      setError("Failed to load related videos");
    } finally {
      setLoading(false);
    }
  }, [currentVideoId]);

  useEffect(() => {
    fetchRelatedVideos();
  }, [fetchRelatedVideos]);

  const formatViewCount = (count) => {
    if (!count) return "0 views";
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  const formatTimeAgo = (publishedAt) => {
    if (!publishedAt) return "";
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInMs = now - published;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) return <LoadingSpinner text="Loading related videos..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRelatedVideos} />;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Related Videos
      </h2>
      <div className="space-y-3">
        {relatedVideos.map((video) => (
          <Link
            key={video.id}
            to={`/watch?v=${video.id}`}
            className="flex space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={video.snippet?.thumbnails?.medium?.url}
                alt={video.snippet?.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {video.snippet?.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {video.snippet?.channelTitle}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500 mt-1">
                <span>{formatViewCount(video.statistics?.viewCount)}</span>
                <span>•</span>
                <span>{formatTimeAgo(video.snippet?.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
