"use client";
import React from 'react';
import { useTheme } from './contexts/ThemeContext';
import Services from './components/Services';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Page = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full h-auto bg-${theme === 'dark' ? 'black' : 'white'} text-${theme === 'dark' ? 'white' : 'black'}`}>
      <Hero />
      <Services />
       {/* Gray Pencil Triangle after all service cards - Longer version */}
     <div className="relative w-full flex justify-end mt-1 pt-0">
  <div
    className="w-0 h-0
      border-t-[20px] border-t-transparent
      border-r-[90vw] border-r-gray-900
      border-b-[20px] border-b-transparent"
  ></div>
</div>

 <Footer />
    </div>
  );
};

export default Page;
