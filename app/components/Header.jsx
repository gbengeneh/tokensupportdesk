"use client";

import React from 'react';
import { AiFillHighlight } from "react-icons/ai";
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const pathname = usePathname();

  const darkicon = (
    <svg xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6 text-yellow-500" 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36l-1.41 1.41M6.05 17.95l-1.41 1.41m12.72 0l-1.41-1.41M6.05 6.05L4.64 4.64" />
    </svg>
  );

  const lighticon = (
    <svg xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-800"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 
               7 7 0 0 0 21 12.79z" />
    </svg>
  );

  // If user is on walletlist, show only centered logo
  if (pathname === "/walletlist") {
    return (
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-center py-5 bg-[#040216]">
        <Link href="/">
          <div className="p-1 border-2 border-blue-600 rounded-xl">
            <AiFillHighlight className="text-blue-600 " size={24} />
          </div>
        </Link>
      </header>
    );
  }

  // Default full header for "/"
  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 bg-${
      theme === 'dark' ? 'black' : 'black'
    } text-${theme === 'dark' ? 'white' : 'white'}`}>

      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <div className="p-1 border-2 border-blue-600 rounded-xl">
            <AiFillHighlight className="text-blue-600 " size={20} />
          </div>
        </Link>
      </div>
      
      {/* Center Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        <Link href="/walletlist">
          <span className="text-[#62759d] font-medium hover:text-blue-300 transition-colors cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/walletlist">
          <span className="text-[#62759d] font-medium hover:text-blue-300 transition-colors cursor-pointer">
            Explore
          </span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="text-white mr-4 p-2 rounded-full hover:bg-[rgb(43,158,255)] dark:hover:bg-[rgb(43,158,255)] transition-colors"
        >
          {isDarkMode ? darkicon : darkicon}
        </button>
        <Link href="/walletlist">
          <button className="bg-[rgb(43,158,255)] font-medium text-gray-300 px-4 py-2 rounded hover:bg-[rgb(43,158,255)] dark:bg-[rgb(43,158,255)] dark:hover:bg-[rgb(43,158,255)] transition-colors">
            Connect
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
