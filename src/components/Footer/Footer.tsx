import Link from "next/link";
import {
  BsFillSendFill,
  BsTelephoneOutbound,
  BsInstagram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { MdLocationOn, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-20 lg:mt-32">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1 animate-fade-in">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Hotelzz
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Experience unparalleled luxury and comfort in the heart of the
              city. Your perfect getaway awaits at our premium hotel.
            </p>
            <div className="flex space-x-4">
              {[BsFacebook, BsTwitter, BsInstagram].map((Icon, index) => (
                <button
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 hover:scale-110 transition-all duration-300 group"
                >
                  <Icon className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1 animate-fade-in delay-200">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MdLocationOn className="text-blue-600 text-xl mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    123 Luxury Avenue
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Premium District, City 10001
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <BsTelephoneOutbound className="text-green-600 text-lg group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    +94 (555) 123-4567
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    24/7 Customer Support
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <MdEmail className="text-purple-600 text-lg group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    zaheercclash@gmail.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We reply within 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-1 animate-fade-in delay-300">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Company
            </h4>
            <div className="space-y-3">
              {[
                "Our Story",
                "Get in Touch",
                "Our Team",
                "Careers",
                "Press Kit",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-1 animate-fade-in delay-400">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Experience
            </h4>
            <div className="space-y-3">
              {[
                "Dining Experience",
                "Wellness & Spa",
                "Fitness Center",
                "Swimming Pool",
                "Event Spaces",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 lg:pt-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                © 2024 Hotelzz. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Accessibility",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 -translate-x-10 translate-y-10"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 translate-x-10 translate-y-10"></div>
    </footer>
  );
};

export default Footer;
