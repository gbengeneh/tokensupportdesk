import React from "react";

const IntroVideo = () => {
  return (
    <>
      {/* Intro Video Section */}
      <div className="relative bg-black text-white py-20">
        {/* Section Title */}
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Started Now</h2>
            <p className="text-gray-300">
              Discover the difference that Web 3 Resolver Panel can make in
              resolving a diverse range of blockchain, cryptocurrency, and DeFi
              issues. Get started today!
            </p>
          </div>

          {/* Video Play Button */}
          <div className="flex justify-center mt-10">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 transition">
              <a
                href="https://www.youtube.com/watch?v=qOVAbKKSH10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-play-fill text-white text-4xl"></i>
              </a>
            </div>
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
      <div className="bg-black text-white py-16">
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
      <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
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
