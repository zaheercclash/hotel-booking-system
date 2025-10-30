"use client";

import { FC, useState } from "react";
import Image from "next/image";

import { Image as ImageType } from "@/models/room";
import { FaArrowLeft, FaArrowRight, FaExpand } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const HotelPhotoGallery: FC<{ photos: ImageType[] }> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const maximumVisiblePhotos = 4;
  const totalPhotos = photos.length;
  const displayPhotos = photos.slice(1, maximumVisiblePhotos);
  const remainingPhotosCount = totalPhotos - maximumVisiblePhotos;

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 mt-8 sm:mt-12 lg:mt-16">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Main Featured Image */}
        <div
          className="lg:col-span-2 relative rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer h-64 sm:h-80 lg:h-96 animate-fade-in"
          onClick={openModal.bind(this, 0)}
        >
          <Image
            src={photos[0].url}
            alt={`Featured Room Photo`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {/* Expand Icon */}
          <div className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:scale-110">
            <FaExpand className="text-sm" />
          </div>
          {/* Featured Badge */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <span className="text-sm font-semibold">Featured Photo</span>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer h-32 sm:h-40 lg:h-44 animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              onClick={openModal.bind(this, index + 1)}
            >
              <Image
                fill
                src={photo.url}
                alt={`Room Photo ${index + 2}`}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Color Overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  index === 0
                    ? "bg-blue-500/20"
                    : index === 1
                      ? "bg-purple-500/20"
                      : "bg-green-500/20"
                }`}
              ></div>
              {/* Hover Label */}
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                View {index + 2}
              </div>
            </div>
          ))}

          {/* Remaining Photos Count */}
          {remainingPhotosCount > 0 && (
            <div
              className="relative rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer h-32 sm:h-40 lg:h-44 animate-slide-up"
              style={{ animationDelay: "400ms" }}
              onClick={openModal.bind(this, maximumVisiblePhotos)}
            >
              <Image
                fill
                src={photos[maximumVisiblePhotos]?.url || photos[0].url}
                alt={`More Room Photos`}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex flex-col items-center justify-center text-white group-hover:bg-gradient-to-br group-hover:from-blue-600/50 group-hover:to-purple-600/50 transition-all duration-500">
                <div className="text-3xl sm:text-4xl font-bold transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  +{remainingPhotosCount}
                </div>
                <div className="text-sm mt-2 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  More Photos
                </div>
                <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-xl lg:rounded-2xl m-2 group-hover:border-white/50 transition-colors duration-500"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-between items-center mt-6 px-4">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 group"
        >
          <FaArrowLeft className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Previous
          </span>
        </button>

        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-lg">
          <span className="text-sm font-medium text-gray-700">
            {currentPhotoIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 group"
        >
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Next
          </span>
          <FaArrowRight className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
        </button>
      </div>

      {/* Modal for Fullscreen View */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 animate-scale-in">
            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={photos[currentPhotoIndex].url}
                alt={`Room Photo ${currentPhotoIndex + 1}`}
                fill
                className={`object-contain transition-opacity duration-500 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110 group active:scale-95"
              >
                <FaArrowLeft className="text-white text-xl group-hover:text-2xl transition-all duration-300" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110 group active:scale-95"
              >
                <FaArrowRight className="text-white text-xl group-hover:text-2xl transition-all duration-300" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 hover:scale-110 group active:scale-95 animate-pulse"
              >
                <MdCancel className="text-white text-xl group-hover:text-2xl transition-all duration-300" />
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20">
                <span className="text-lg font-semibold">
                  {currentPhotoIndex + 1} / {photos.length}
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
                {photos.slice(0, 8).map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentPhotoIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                      index === currentPhotoIndex
                        ? "border-white scale-110 shadow-lg"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={photo.url}
                      alt={`Thumbnail ${index + 1}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPhotoGallery;
