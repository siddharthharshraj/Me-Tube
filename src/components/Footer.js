import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 mt-16 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Left side - Attribution */}
          <div className="mb-8 lg:mb-0 text-center lg:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Built by Siddharth Harsh Raj
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Full-Stack Developer & MyTube Creator
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              A Video Streaming Platform crafted with React, Redux & Modern Web Technologies
            </p>
          </div>

          {/* Center - Navigation Links (Mobile) */}
          <div className="mb-6 lg:hidden">
            <nav className="flex items-center justify-center space-x-6">
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
          </div>

          {/* Right side - Social Links */}
          <div className="flex flex-col items-center lg:items-end">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Connect with me
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/siddharthharshraj"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium">GitHub</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/siddharthharshraj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium">LinkedIn</span>
              </a>
              
              <a
                href="https://siddharth-dev.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Portfolio Website"
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium">Portfolio</span>
              </a>
              
              <a
                href="mailto:contact@siddharth-dev.tech"
                className="group flex items-center space-x-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Email Contact"
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium">Email</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; 2025 September MyTube - A Video Streaming Platform by Siddharth Harsh Raj. All rights reserved.</p>
            <div className="flex items-center mt-4 sm:mt-0 space-x-2">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>using React & Redux</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

