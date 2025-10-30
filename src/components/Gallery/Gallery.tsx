import Image from "next/image";

const Gallery = () => {
  const images = [
    {
      src: "/images/hero-1.jpeg",
      alt: "Luxury Hotel Suite",
      category: "Suite",
      description:
        "Elegant suite with panoramic city views and premium amenities",
    },
    {
      src: "/images/hero-2.jpeg",
      alt: "Infinity Pool",
      category: "Pool",
      description: "Stunning infinity pool overlooking the crystal-clear ocean",
    },
    {
      src: "/images/hero-3.jpeg",
      alt: "Hotel Restaurant",
      category: "Dining",
      description:
        "Gourmet dining experience with world-class culinary masters",
    },
    {
      src: "/images/hero-1.jpeg",
      alt: "Spa & Wellness",
      category: "Spa",
      description:
        "Tranquil spa sanctuary for ultimate relaxation and rejuvenation",
    },
    {
      src: "/images/hero-2.jpeg",
      alt: "Conference Room",
      category: "Business",
      description:
        "State-of-the-art business facilities with advanced technology",
    },
    {
      src: "/images/hero-3.jpeg",
      alt: "Garden View",
      category: "Garden",
      description:
        "Serene botanical gardens with exotic flora and peaceful pathways",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]"></div>

      <div className="mx-auto container py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-2xl text-base font-light mb-8 shadow-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-300"></div>
            </div>
            <span>Visual Excellence</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Experience Luxury
            </span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Where elegance meets comfort in every carefully crafted space
          </p>
        </div>

        {/* Enhanced Masonry-style Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 auto-rows-[200px] sm:auto-rows-[280px] lg:auto-rows-[320px]">
          {images.map((image, index) => {
            // Dynamic sizing for masonry effect
            const getSizeClass = () => {
              if (index === 0) return "sm:row-span-2 lg:row-span-2";
              if (index === 2)
                return "sm:col-span-2 lg:col-span-1 sm:row-span-1";
              if (index === 4) return "lg:col-span-2 lg:row-span-1";
              return "";
            };

            return (
              <div
                key={index}
                className={`group relative rounded-3xl lg:rounded-4xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-[1.02] ${getSizeClass()}`}
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                {/* Image Container */}
                <div className="w-full h-full relative">
                  <Image
                    alt={image.alt}
                    src={image.src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                    priority={index < 3}
                  />

                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated Light Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>

                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 transform transition-all duration-500 group-hover:translate-y-0">
                    {/* Category Tag */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-2xl text-sm font-medium mb-4 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 self-start">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      {image.category}
                    </div>

                    {/* Title & Description */}
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <h3 className="text-white font-semibold text-xl lg:text-2xl xl:text-3xl mb-3 leading-tight drop-shadow-2xl">
                        {image.alt}
                      </h3>
                      <p className="text-white/80 text-sm lg:text-base leading-relaxed font-light drop-shadow-lg line-clamp-2">
                        {image.description}
                      </p>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300 origin-left"></div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-xs font-medium">Explore</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Footer Text */}
        <div
          className="text-center mt-16 lg:mt-20 opacity-0 animate-fade-in"
          style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
        >
          <p className="text-gray-400 dark:text-gray-500 text-lg font-light italic">
            Every space tells a story of luxury and attention to detail
          </p>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-10% left-5% w-80 h-80 bg-blue-200/10 dark:bg-blue-400/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-slow"></div>
      <div className="absolute top-20% right-8% w-96 h-96 bg-purple-200/10 dark:bg-purple-400/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow delay-1000"></div>
      <div className="absolute bottom-15% left-15% w-72 h-72 bg-cyan-200/10 dark:bg-cyan-400/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-slow delay-500"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"></div>
    </section>
  );
};

export default Gallery;
