import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { Room } from "@/models/room";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: {
      coverImage,
      name,
      price,
      type,
      description,
      slug,
      isBooked,
      discount,
    },
  } = props;

  const discountedPrice =
    discount > 0 ? price - (price / 100) * discount : price;

  // Format LKR currency
  const formatLKR = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 w-full mx-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-green-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-3 right-3 z-20">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300/50 rounded-full animate-float"
              style={{
                top: `${i * 8}px`,
                left: `${i * 6}px`,
                animationDelay: `${i * 800}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Animated Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {/* Floating elements on image hover */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-float animation-delay-1500"></div>
        </div>

        {/* Top Badges Container */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          {/* Room Type */}
          <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm border border-white/20 animate-fade-in">
            {type}
          </span>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1 animate-bounce-slow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Booked Overlay */}
        {isBooked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-2xl border border-white/20">
              <span className="text-gray-800 font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Currently Booked
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 relative">
        {/* Floating content elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200/30 rounded-full animate-float animation-delay-1200"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-200/30 rounded-full animate-float animation-delay-1800"></div>

        {/* Room Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 leading-tight animate-fade-in">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed animate-fade-in delay-100">
          {description}
        </p>

        {/* Price & Status Section */}
        <div className="flex items-center justify-between mb-5 animate-fade-in delay-200">
          <div className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  {formatLKR(discountedPrice)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {formatLKR(price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {formatLKR(price)}
              </span>
            )}
            <span className="text-sm text-gray-500 font-medium">/night</span>
          </div>

          {/* Availability Status */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              isBooked
                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isBooked ? "bg-red-500 animate-pulse" : "bg-green-500"
              }`}
            ></div>
            {isBooked ? "Booked" : "Available"}
          </div>
        </div>

        {/* Book Button */}
        <Link
          href={`/rooms/${slug.current}`}
          className={`group/btn relative w-full py-3.5 px-6 rounded-xl font-semibold text-center block transition-all duration-300 overflow-hidden ${
            isBooked
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-fade-in delay-300"
          }`}
        >
          {/* Button Background Animation */}
          {!isBooked && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          )}

          {isBooked ? (
            <span className="flex items-center justify-center gap-2 relative z-10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                />
              </svg>
              BOOKED
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 group-hover/btn:gap-3 transition-all duration-300 relative z-10">
              Book Now
              <svg
                className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </Link>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100 group-hover:shadow-3xl transition-all duration-500 pointer-events-none"></div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>
      </div>

      {/* Pulse Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-50/30 group-hover:animate-pulse-slow transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default RoomCard;
