import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const IntroVideo = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Get Started Section */}
      <div
        className={`${
          theme === "dark" ? "bg-black" : "bg-gray-900"
        } text-white py-20`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Started Now</h2>
            <p className="text-gray-300">
              Discover the difference that Web 3 Resolver Panel can make in
              resolving a diverse range of blockchain, cryptocurrency, and DeFi
              issues. Get started today!
            </p>
          </div>

          {/* Video Section (Thumbnail Background) */}
         <div className="relative mt-10 mx-45 rounded-lg overflow-hidden h-144 flex items-center justify-center bg-gray-800 bg-cover bg-center"
              style={{ backgroundImage: "url('/skywaterimage.jpeg')" }}
            >

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

            {/* Play Button */}
            <a
              href="https://www.youtube.com/watch?v=qOVAbKKSH10"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 transition z-10"
            >
              <i className="bi bi-play-fill text-white text-4xl"></i>
            </a>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 px-6 text-md py-3 rounded-lg text-white font-medium interact-button"
            >
              Connect to get started
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`${
          theme === "dark" ? "bg-black" : "bg-gray-900"
        } text-white py-16`}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Content */}
          <div>
            <p className="text-gray-400">
              Our commitment is to address a wide array of blockchain and crypto
              challenges comprehensively. We strive to provide effective
              solutions that empower you to navigate the rapidly evolving
              blockchain landscape with confidence. Trust us to optimize your
              operations and create a successful and efficient blockchain
              ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="interact-button hover:underline">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="interact-button hover:underline">
                  Connect
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`${
          theme === "dark" ? "bg-black" : "bg-gray-900"
        } text-gray-400 py-6 border-t border-gray-800`}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            © Copyright 2025 <a href="#">YourBrand</a>. All Rights Reserved
          </p>

          {/* Social Links */}
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default IntroVideo;
