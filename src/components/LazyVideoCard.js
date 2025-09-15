import React, { lazy, Suspense } from "react";
import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoCard = lazy(() => import("./VideoCard"));

const LazyVideoCard = ({ info }) => {
  return (
    <Suspense fallback={<VideoCardSkeleton />}>
      <VideoCard info={info} />
    </Suspense>
  );
};

export default LazyVideoCard;
