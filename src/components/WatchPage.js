import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import RelatedVideos from "./RelatedVideos";
import VideoInfo from "./VideoInfo";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const videoId = searchParams.get("v");

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-6 p-6">
        {/* Left Side - Video and Info */}
        <div className="flex-1 lg:flex-[2]">
          {/* Video Player */}
          <div className="w-full mb-4">
            <iframe
              className="w-full aspect-video rounded-lg shadow-lg"
              src={"https://www.youtube.com/embed/" + searchParams.get("v")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <div className="mb-6">
            <VideoInfo videoId={searchParams.get("v")} />
          </div>

          {/* Comments Section */}
          <div className="w-full">
            <CommentsContainer />
          </div>
        </div>

        {/* Right Side - Live Chat and Related Videos */}
        <div className="w-80 xl:w-96 flex flex-col space-y-4">
          {/* Live Chat - Top Priority */}
          <div className="flex-shrink-0">
            <LiveChat />
          </div>

          {/* Related Videos - Below Chat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Related Videos</h2>
            <RelatedVideos />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Video Player - Full Width */}
        <div className="w-full">
          <iframe
            className="w-full aspect-video"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Mobile Content Container */}
        <div className="p-4 pb-64">
          {/* Video Info */}
          <div className="mb-4">
            <VideoInfo videoId={searchParams.get("v")} />
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between mb-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">Save</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <CommentsContainer />
          </div>

          {/* Related Videos */}
          <div className="mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Related Videos</h2>
            <RelatedVideos />
          </div>
        </div>

        {/* Mobile Live Chat - Bottom Sheet */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
