import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import Link from 'next/link'

const Hero = () => {
  const { theme } = useTheme()
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-8 sm:pt-44 sm:pb-12 lg:pt-48 lg:pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 leading-tight text-left">
            Your Trusted
            <br />Blockchain
            <span className="text-[rgb(43,158,255)]"> and <br />  Crypto Rectification  <br /> Solution! </span>
          </h1>
          <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed mb-10 sm:mb-12 text-left">
            Your go-to online tool to seamlessly and efficiently fix <br /> any blockchain-related issues you might encounter
          </p>
          
          {/* Buttons Container */}
      <div className="w-full max-w-sm ">
        <div className="grid grid-cols-2 gap-4   sm:m-2 ">
          <Link
            href="/walletlist"
            className="inline-flex items-center justify-center text-sm  rounded-lg
                      bg-[rgb(43,158,255)] text-white min-w-[100px] max-w-[160px] w-auto"
          >
            Connect Wallet
          </Link>

          <Link
            href="/walletlist"
            className="inline-flex items-center justify-center text-sm px-1 rounded-lg
                      border border-[rgb(43,158,255)] text-white min-w-[90px] max-w-[160px] h-10 w-auto"
          >
            Claim Airdrop
          </Link>

          <Link
            href="/walletlist"
            className="inline-flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg
                      bg-[rgb(43,158,255)] text-white min-w-[90px] max-w-[160px] w-auto"
          >
            Migration <i className="bi bi-arrow-right text-xs"></i>
          </Link>

          <Link
            href="/walletlist"
            className="inline-flex items-center justify-center text-sm px-3 py-2 rounded-lg
                      border border-[rgb(43,158,255)] text-white min-w-[90px] max-w-[160px] w-auto"
          >
            Validation
          </Link>
        </div>
      </div>




        </div>
      </div>
  )
}

export default Hero
