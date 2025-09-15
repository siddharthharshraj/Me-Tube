import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_DETAILS_API } from "../utils/constants";

const VideoInfo = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${YOUTUBE_VIDEO_DETAILS_API}&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setVideoDetails(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (count) => {
    if (!count) return "0 views";
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <div className="text-gray-500 dark:text-gray-400">
        Video information not available
      </div>
    );
  }

  const { snippet, statistics } = videoDetails;

  return (
    <div className="space-y-4">
      {/* Video Title */}
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
        {snippet?.title}
      </h1>

      {/* Video Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{formatViewCount(statistics?.viewCount)}</span>
          <span>•</span>
          <span>{formatDate(snippet?.publishedAt)}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-sm font-medium">{statistics?.likeCount ? parseInt(statistics.likeCount).toLocaleString() : "Like"}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex items-center space-x-3 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
          {snippet?.channelTitle?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {snippet?.channelTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Published {formatDate(snippet?.publishedAt)}
          </p>
        </div>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors">
          Subscribe
        </button>
      </div>

      {/* Video Description */}
      {snippet?.description && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {snippet.description}
          </p>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;
