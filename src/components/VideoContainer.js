import React, { useEffect, useCallback } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideos, setLoading, setError } from "../utils/videoSlice";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const { videos, searchResults, loading, error, searchQuery } = useSelector((store) => store.videos);
  
  // Use search results if available, otherwise use regular videos
  const displayVideos = searchResults.length > 0 ? searchResults : videos;

  const getVideos = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      dispatch(setVideos(json.items));
    } catch (error) {
      dispatch(setError("Failed to load videos"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (videos.length === 0) {
      getVideos();
    }
  }, [videos.length, getVideos]);

  const renderVideos = () => {
    if (loading) {
      return Array.from({ length: 12 }, (_, n) => (
        <VideoCardSkeleton key={n} />
      ));
    }

    if (error) {
      return (
        <div className="col-span-full">
          <ErrorMessage message={error} onRetry={getVideos} />
        </div>
      );
    }

    if (displayVideos.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📺</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">No videos found</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Try adjusting your search or category filter</p>
        </div>
      );
    }

    return displayVideos.map((video) => {
      const videoId = video.id?.videoId || video.id;
      return (
        <Link
          key={videoId}
          to={"/watch?v=" + videoId}
          className="group block transform transition-all duration-300 hover:scale-105 hover:z-10"
        >
          <VideoCard info={video} />
        </Link>
      );
    });
  };

  return (
    <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 mt-2 sm:mt-4">
      {searchQuery && (
        <div className="mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            Search results for "{searchQuery}"
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {renderVideos()}
      </div>
    </div>
  );
};

export default VideoContainer;
