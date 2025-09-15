const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const OFFSET_LIVE_CHAT = parseInt(process.env.REACT_APP_LIVE_CHAT_OFFSET) || 25;

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEO_SEARCH_API = 
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=" + 
  GOOGLE_API_KEY + "&q=";

export const YOUTUBE_CATEGORY_VIDEOS_API = 
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=";

export const YOUTUBE_CATEGORIES_API = 
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" + 
  GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_DETAILS_API = 
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics";
