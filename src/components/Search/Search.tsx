"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa";

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFilterClick();
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        {/* Floating Particles */}
        <div className="absolute top-20 right-20">
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  top: `${i * 15}px`,
                  left: `${i * 12}px`,
                  animationDelay: `${i * 500}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-pink-500/90 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-sm border border-white/20">
        {/* Floating Orbs Inside Card */}
        <div className="absolute top-6 left-6 w-8 h-8 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 rounded-full animate-float animation-delay-1500"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-white/20 rounded-full animate-float animation-delay-3000"></div>

        <div className="px-6 py-8 lg:px-8 lg:py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">
                Premium Selection
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Find Your Perfect Stay
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Discover luxury accommodations tailored to your preferences
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-6xl mx-auto animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              {/* Room Type Filter */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaFilter className="text-blue-200" />
                  Room Type
                </label>
                <div className="relative group">
                  <select
                    value={roomTypeFilter}
                    onChange={handleRoomTypeChange}
                    className="w-full h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl lg:rounded-2xl pl-4 pr-10 text-white focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer hover:border-white/30"
                  >
                    <option value="All" className="text-gray-800">
                      All Room Types
                    </option>
                    <option value="Basic" className="text-gray-800">
                      Basic Room
                    </option>
                    <option value="Luxury" className="text-gray-800">
                      Luxury Room
                    </option>
                    <option value="Suite" className="text-gray-800">
                      Premium Suite
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FaChevronDown className="text-white/70 text-sm group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="lg:col-span-6">
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaSearch className="text-blue-200" />
                  Search Rooms
                </label>
                <div className="relative group">
                  <input
                    type="search"
                    id="search"
                    placeholder="Search by room name, amenities, or features..."
                    className="w-full h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl lg:rounded-2xl pl-12 pr-4 text-white placeholder:text-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 hover:border-white/30"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaSearch className="text-white/70 text-lg group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2 flex items-end">
                <button
                  className="group relative w-full h-14 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                  type="button"
                  onClick={handleFilterClick}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaSearch className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Search</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Button Border Animation */}
                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 mt-6 lg:mt-8 justify-center animate-fade-in delay-300">
              {[
                {
                  value: "All",
                  label: "All Rooms",
                  emoji: "🏨",
                  color: "from-blue-400/20 to-cyan-400/20",
                },
                {
                  value: "Basic",
                  label: "Basic",
                  emoji: "🛏️",
                  color: "from-green-400/20 to-emerald-400/20",
                },
                {
                  value: "Luxury",
                  label: "Luxury",
                  emoji: "⭐",
                  color: "from-amber-400/20 to-yellow-400/20",
                },
                {
                  value: "Suite",
                  label: "Suites",
                  emoji: "💎",
                  color: "from-purple-400/20 to-pink-400/20",
                },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setRoomTypeFilter(filter.value)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    roomTypeFilter === filter.value
                      ? "bg-white/20 border-white text-white shadow-lg scale-105"
                      : "bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${filter.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  <span className="text-lg relative z-10">{filter.emoji}</span>
                  <span className="text-sm font-medium relative z-10">
                    {filter.label}
                  </span>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Floating Elements */}
        <div className="absolute bottom-4 left-10 w-3 h-3 bg-white/30 rounded-full animate-float animation-delay-500"></div>
        <div className="absolute top-10 right-16 w-4 h-4 bg-white/25 rounded-full animate-float animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default Search;
