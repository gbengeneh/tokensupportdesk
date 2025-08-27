// components/Services.jsx
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { services } from "../data/serviceData";
import { useTheme } from '../contexts/ThemeContext';
import Link from "next/link";

const Services = () => {
  const { theme } = useTheme();

  return (
    <section className={`pt-16 w-full h-auto bg-${theme === 'dark' ? 'black' : 'gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            Blockchain Rectification issues that we could help resolve
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  pb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-[linear-gradient(180deg,#69696971_0%,#15153b69_60%)] hover:shadow-xl transition-all duration-300 mb-12"
            >
              {/* Blue Square Icon at Top Left - Larger Size */}
              <div className="absolute -top-8  w-18 h-18 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg ">
                <div className="text-white text-4xl">{service.icon}</div>
              </div>


              {/* Content */}
              <div className="pt-6">
                <h4 className="font-bold text-xl mb-3">{service.title}</h4>
                <p className="text-gray-100 dark:text-gray-100 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={"/walletlist"}
                  className="text-blue-500 flex items-center gap-2 hover:underline font-medium"
                >
                  Explore <BsArrowRightShort className="text-lg" />
                </Link>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default Services;
