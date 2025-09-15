import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_VIDEO_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { setSearchResults, setSearchQuery, setLoading, setError, clearSearchResults } from "../utils/videoSlice";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { downloadMetricsJSON } from "../utils/metricsGenerator";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [showFeatureMessage, setShowFeatureMessage] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery.trim()) {
        if (searchCache[searchQuery]) {
          setSuggestions(searchCache[searchQuery]);
        } else {
          getSearchSuggestions();
        }
      } else {
        setSuggestions([]);
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchCache]);

  const getSearchSuggestions = async () => {
    try {
      // Use a CORS proxy for the suggestions API
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const text = await response.text();
      
      // Parse the JSONP response
      const jsonpMatch = text.match(/\[.*\]/);
      if (jsonpMatch) {
        const data = JSON.parse(jsonpMatch[0]);
        const suggestionsList = data[1] || [];
        setSuggestions(suggestionsList);
        dispatch(
          cacheResults({
            [searchQuery]: suggestionsList,
          })
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (!query || !query.trim()) return;
    
    setshowSuggestions(false);
    setShowFeatureMessage(true);
    
    // Auto-hide message after 4 seconds
    setTimeout(() => {
      setShowFeatureMessage(false);
    }, 4000);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 w-full">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
          <button
            onClick={() => toggleMenuHandler()}
            className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 sm:p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Toggle menu"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity">
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="#FF0000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a2.833 2.833 0 0 0-2.019-2.019C19.78 4 12 4 12 4s-7.78 0-9.479.167a2.833 2.833 0 0 0-2.019 2.019C.167 8.905.167 12 .167 12s0 3.094.335 5.813a2.833 2.833 0 0 0 2.019 2.019c1.699.168 9.479.168 9.479.168s7.78 0 9.479-.168a2.833 2.833 0 0 0 2.019-2.019C23.833 15.094 24 12 24 12s-.167-3.094-.502-5.814z" />
              <path
                d="M9.732 15.468V8.534l6.534 3.467-6.534 3.467z"
                fill="#fff"
              />
            </svg>
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-red-600 dark:text-red-500 hidden xs:block">MYTUBE</h1>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4 relative">
          <div className="flex" role="search">
            <label htmlFor="search-input" className="sr-only">Search videos</label>
            <input
              id="search-input"
              className="flex-grow px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-xs sm:text-sm"
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setshowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setshowSuggestions(false), 200);
              }}
              onKeyDown={handleKeyPress}
              aria-expanded={showSuggestions}
              aria-haspopup="listbox"
              aria-autocomplete="list"
            />
            <button
              className="border border-gray-300 dark:border-gray-600 border-l-0 px-2 sm:px-4 py-1.5 sm:py-2 rounded-r-full bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handleSearch(searchQuery)}
              aria-label="Search"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
              <ul role="listbox" aria-label="Search suggestions">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setshowSuggestions(false);
                      handleSearch(suggestion);
                    }}
                    role="option"
                    aria-selected="false"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-gray-900 dark:text-white text-sm">{suggestion}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Feature Message Modal */}
        {showFeatureMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform animate-pulse">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                  <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  🚧 Feature Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Search functionality is not yet enabled. We're working hard to bring you this feature!
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-orange-600 dark:text-orange-400">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Stay tuned for updates!</span>
                </div>
                <button
                  onClick={() => setShowFeatureMessage(false)}
                  className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Section - Navigation, Download Metrics, Theme Toggle & User */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 mr-2">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/metrics" 
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition-colors"
            >
              Metrics
            </Link>
          </nav>

          <button
            onClick={downloadMetricsJSON}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Download performance test metrics"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden lg:inline">Download Metrics</span>
            <span className="lg:hidden">Metrics</span>
          </button>
          
          {/* Mobile Download Button */}
          <button
            onClick={downloadMetricsJSON}
            className="sm:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Download metrics"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          
          <ThemeToggle />
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Head;
