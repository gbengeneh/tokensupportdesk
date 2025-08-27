"use client";

import React from 'react';
import { AiFillHighlight } from "react-icons/ai";
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const darkicon = (<svg xmlns="http://www.w3.org/2000/svg" 
     class="h-6 w-6 text-yellow-500" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36l-1.41 1.41M6.05 17.95l-1.41 1.41m12.72 0l-1.41-1.41M6.05 6.05L4.64 4.64" />
</svg>);

const lighticon = (
  <svg xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-800"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 
             7 7 0 0 0 21 12.79z" />
  </svg>
);


  return (
<header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 bg-${
    theme === 'dark' ? 'black' : 'white'
  } text-${theme === 'dark' ? 'white' : 'black'}`}>

      <div className="flex items-center ">
        <div className="p-1 border-2 border-blue-600 rounded-xl">
           <AiFillHighlight className="text-blue-600 " size={20} />
       </div>
        
      </div>
      
      {/* Center Navigation - Visible only on large screens */}
      <div className="hidden lg:flex items-center space-x-8">
        <span className="text-[#62759d] font-medium hover:text-blue-300 transition-colors cursor-pointer">
          Home
        </span>
        <span className="text-[#62759d] font-medium hover:text-blue-300 transition-colors cursor-pointer">
          Explore
        </span>
      </div>
      <div className="flex items-center">
        <button onClick={toggleTheme} className="text-white mr-4 p-2 rounded-full hover:bg-[rgb(43,158,255)] dark:hover:bg-[rgb(43,158,255)] transition-colors">
          {isDarkMode ? darkicon : lighticon}
        </button>
        <button className="bg-[rgb(43,158,255)] font-medium text-gray-300 px-4 py-2 rounded hover:bg-[rgb(43,158,255)] dark:bg-[rgb(43,158,255)] dark:hover:bg-[rgb(43,158,255)] transition-colors">
          Connect
        </button>
      </div>
    </header>
  );
};

export default Header;
