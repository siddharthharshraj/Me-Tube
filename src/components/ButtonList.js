import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, setLoading, setVideos, clearSearchResults } from "../utils/videoSlice";
import { YOUTUBE_VIDEOS_API, YOUTUBE_CATEGORY_VIDEOS_API } from "../utils/constants";

const ButtonList = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((store) => store.videos);
  const [list, setList] = useState([]);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setList(json.items);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const categories = [
    { name: "All", id: null },
    { name: "Music", id: "10" },
    { name: "Gaming", id: "20" },
    { name: "Sports", id: "17" },
    { name: "Entertainment", id: "24" },
    { name: "News", id: "25" },
    { name: "Education", id: "27" },
    { name: "Science & Technology", id: "28" },
    { name: "Comedy", id: "23" },
    { name: "Film & Animation", id: "1" },
    { name: "Autos & Vehicles", id: "2" },
    { name: "Pets & Animals", id: "15" },
    { name: "Travel & Events", id: "19" },
    { name: "People & Blogs", id: "22" }
  ];

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleCategoryClick = async (category) => {
    dispatch(setSelectedCategory(category.name));
    dispatch(clearSearchResults()); // Clear search results when filtering by category
    dispatch(setLoading(true));

    try {
      let apiUrl;
      if (category.name === "All") {
        apiUrl = YOUTUBE_VIDEOS_API;
      } else {
        apiUrl = YOUTUBE_CATEGORY_VIDEOS_API + category.id + "&key=" + process.env.REACT_APP_GOOGLE_API_KEY;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      dispatch(setVideos(data.items || []));
    } catch (error) {
      console.error("Error fetching category videos:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex overflow-x-auto scrollbar-hide py-3 sm:py-4 px-2 sm:px-4 space-x-2 sm:space-x-3 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.name
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
