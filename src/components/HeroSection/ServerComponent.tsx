export const heading1 = (
  <>
    <div className="text-center lg:text-left mb-6 lg:mb-8 relative z-10">
      {/* Animated Background Elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Floating Particles */}
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-400/30 rounded-full animate-float"
              style={{
                top: `${i * 20}px`,
                left: `${i * 15}px`,
                animationDelay: `${i * 1000}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2 mb-4 backdrop-blur-sm relative z-10">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Luxury Redefined
        </span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight relative z-10">
        <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-600 bg-clip-text text-transparent">
          Experience
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Ultimate Luxury
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 relative z-10">
        Where{" "}
        <span className="font-semibold text-blue-600">timeless elegance</span>{" "}
        meets{" "}
        <span className="font-semibold text-purple-600">
          modern sophistication
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start relative z-10">
        <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden text-sm sm:text-base">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Explore Rooms
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        <button className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 text-sm sm:text-base">
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
            Virtual Tour
          </span>
        </button>
      </div>
    </div>

    {/* Animated Grid Background */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
    </div>
  </>
);

export const section2 = (
  <div className="relative">
    {/* Animated Background for Section 2 */}
    <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl animate-pulse-slow"></div>

    {/* Floating Orbs */}
    <div className="absolute -top-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float"></div>
    <div className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-float animation-delay-1500"></div>
    <div className="absolute top-1/2 right-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full animate-float animation-delay-3000"></div>

    {/* Main Hero Image - Much Smaller */}
    <div className="relative rounded-2xl overflow-hidden h-40 sm:h-48 lg:h-56 group mb-3 sm:mb-4 z-10">
      <img
        src="/images/hero-1.jpeg"
        alt="Luxury Hotel Suite"
        className="w-full h-full object-cover scale-animation group-hover:scale-105 transition-transform duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Simple Overlay */}
      <div className="absolute bottom-3 left-3">
        <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm">
          Presidential Suite
        </div>
      </div>
    </div>

    {/* Secondary Images - Much Smaller */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
      <div className="relative rounded-xl overflow-hidden h-24 sm:h-28 lg:h-32 group">
        <img
          src="/images/hero-2.jpeg"
          alt="Infinity Pool"
          className="w-full h-full object-cover scale-animation group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Pool
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-24 sm:h-28 lg:h-32 group">
        <img
          src="/images/hero-3.jpeg"
          alt="Hotel Spa"
          className="w-full h-full object-cover scale-animation group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Spa
          </div>
        </div>
      </div>
    </div>

    {/* Smaller Floating Elements */}
    <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
    <div className="absolute -bottom-2 -left-2 w-14 h-14 sm:w-20 sm:h-20 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-1000"></div>
  </div>
);
