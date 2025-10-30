"use client";

import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;

  return (
    <section className="relative flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 items-center gap-12 lg:gap-16 xl:gap-20 container mx-auto min-h-[80vh] lg:min-h-[90vh] py-12 lg:py-16 xl:py-20">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-5 lg:top-20 lg:left-10 w-40 h-40 lg:w-60 lg:h-60 bg-gradient-to-br from-blue-100/80 to-purple-100/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 lg:bottom-20 lg:right-10 w-40 h-40 lg:w-60 lg:h-60 bg-gradient-to-br from-orange-100/80 to-pink-100/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-green-100/60 to-cyan-100/60 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2 py-6 lg:py-12">
        {heading1}

        {/* Stats Section - Redesigned */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16 max-w-2xl mx-auto lg:mx-0">
          {/* Basic Room */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative w-full">
              <div className="absolute -inset-3 lg:-inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl lg:rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:duration-200"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-xl lg:rounded-2xl p-5 lg:p-6 shadow-lg lg:shadow-xl border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <span className="text-white text-sm lg:text-base">🏨</span>
                  </div>
                  <p className="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-3">
                    Basic Room
                  </p>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <CountUpNumber duration={3000} endValue={50} />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1 lg:mt-2">
                    Available Now
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Room */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative w-full">
              <div className="absolute -inset-3 lg:-inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl lg:rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:duration-200"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-xl lg:rounded-2xl p-5 lg:p-6 shadow-lg lg:shadow-xl border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <span className="text-white text-sm lg:text-base">⭐</span>
                  </div>
                  <p className="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-3">
                    Luxury Room
                  </p>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    <CountUpNumber duration={3000} endValue={120} />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1 lg:mt-2">
                    Available Now
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suite */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative w-full">
              <div className="absolute -inset-3 lg:-inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl lg:rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:duration-200"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-xl lg:rounded-2xl p-5 lg:p-6 shadow-lg lg:shadow-xl border border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <span className="text-white text-sm lg:text-base">🏰</span>
                  </div>
                  <p className="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-3">
                    Suite
                  </p>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    <CountUpNumber duration={3000} endValue={60} />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1 lg:mt-2">
                    Available Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 lg:mt-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">
                Best Price Guarantee
              </p>
              <p className="text-xs text-gray-600">
                Find a lower price? We'll match it!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative z-10 w-full lg:w-1/2 mt-8 lg:mt-0">
        <div className="relative">
          {/* Floating decoration for right section */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-bounce delay-500"></div>
          {section2}
        </div>
      </div>
    </section>
  );
};

export default ClientComponent;
