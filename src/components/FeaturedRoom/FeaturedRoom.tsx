"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Room } from "@/models/room";
import Link from "next/link";

type Props = {
  featuredRoom: Room;
};

const FeaturedRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;
  const discountPrice =
    featuredRoom.price - (featuredRoom.price / 100) * featuredRoom.discount;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:to-blue-900/20 py-16 lg:py-24 overflow-hidden"
    >
      {/* Animated Background Video */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/video-poster.jpg" // Add a fallback poster
        >
          <source src="/videos/hotel-background.mp4" type="video/mp4" />
          <source src="/videos/hotel-background.webm" type="video/webm" />
        </video>
        {/* Fallback gradient if video fails to load */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20 animate-pulse"></div>
        )}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Animation */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Featured Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Suite
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience luxury redefined in our most exclusive accommodation
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Images Section with Enhanced Animations */}
          <div
            className={`lg:w-1/2 w-full transition-all duration-1000 delay-500 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {/* Main Image with Hover Video */}
              <div className="sm:col-span-2 relative rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer h-64 sm:h-80 lg:h-96">
                <Image
                  src={featuredRoom.coverImage.url}
                  alt={featuredRoom.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Hover Video Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/40 flex items-center justify-center">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">View Room Tour</p>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm">
                  <span className="text-sm font-semibold">Featured</span>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
              </div>

              {/* Thumbnail Images with Enhanced Interactions */}
              {featuredRoom.images.slice(0, 2).map((image, index) => (
                <div
                  key={image._key}
                  className="relative rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer h-32 sm:h-40 lg:h-48"
                >
                  <Image
                    src={image.url}
                    alt={`${featuredRoom.name} view ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section with Staggered Animations */}
          <div
            className={`lg:w-1/2 w-full transition-all duration-1000 delay-700 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
              {/* Room Name */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {featuredRoom.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 lg:mb-8 text-lg">
                {featuredRoom.description}
              </p>

              {/* Room Features with Staggered Animation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:mb-8">
                {[
                  {
                    icon: "🛏️",
                    value: featuredRoom.numberOfBeds,
                    label: "Beds",
                    sublabel: "Comfort",
                  },
                  {
                    icon: "📏",
                    value: featuredRoom.dimension,
                    label: "Size",
                    sublabel: "Spacious",
                  },
                  {
                    icon: "👥",
                    value: "2-4",
                    label: "Guests",
                    sublabel: "Capacity",
                  },
                  {
                    icon: "🛁",
                    value: "Private",
                    label: "Bathroom",
                    sublabel: "Ensuite",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${800 + index * 100}ms`,
                      animation: isInView
                        ? `slideInUp 0.6s ease-out ${index * 100}ms both`
                        : "none",
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <span className="text-lg">{feature.icon}</span>
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold">
                        {feature.value} {feature.label}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {feature.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Section with Pulse Animation */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6 lg:mb-8 border border-blue-100 dark:border-blue-800/30 relative overflow-hidden">
                {/* Animated background element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10 animate-pulse-slow"></div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                    <div className="text-center sm:text-left">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Starting From
                      </p>
                      <div className="flex items-baseline gap-2">
                        {featuredRoom.discount > 0 ? (
                          <>
                            <span className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white animate-pulse">
                              ${discountPrice}
                            </span>
                            <span className="text-xl text-gray-400 line-through">
                              ${featuredRoom.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                            ${featuredRoom.price}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        per night
                      </p>
                    </div>

                    {featuredRoom.discount > 0 && (
                      <div className="text-center sm:text-left">
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          Save
                        </p>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">
                          {featuredRoom.discount}% OFF
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button with Enhanced Animation */}
              <Link
                href={`/rooms/${featuredRoom.slug.current}`}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl w-full text-center block shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Explore This Suite
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Button shine effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float delay-500"></div>
    </section>
  );
};

export default FeaturedRoom;
