"use client";

import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // This will open user's email app with pre-filled content
    const subject = "New Newsletter Subscription Request";
    const body = `Please add this email to your newsletter list: ${email}`;

    window.location.href = `mailto:zaheercclash@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Optional: Show success message
    alert("Thank you! Your email app will open to complete subscription.");
    setEmail("");
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-12 lg:px-12 lg:py-16 xl:px-20 xl:py-24 text-center">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">
                Exclusive Offers
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
              Stay in the
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Luxury Loop
              </span>
            </h2>
            <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Get exclusive deals, luxury travel tips, and first access to our
              premium suites.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-14 lg:h-16 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl lg:rounded-3xl pl-6 pr-4 text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-300 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="group relative bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold h-14 lg:h-16 px-8 lg:px-12 rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden min-w-[140px]"
              >
                Subscribe
              </button>
            </div>

            {/* Privacy Note */}
            <p className="text-white/60 text-sm mt-4 lg:mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-16 max-w-4xl mx-auto">
            {[
              { icon: "🎁", text: "Exclusive Deals" },
              { icon: "⭐", text: "Early Access" },
              { icon: "💎", text: "VIP Treatment" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <p className="text-white font-medium text-sm lg:text-base">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
