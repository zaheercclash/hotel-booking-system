"use client";

import { motion } from "framer-motion";
import {
  FaAward,
  FaUsers,
  FaHotel,
  FaStar,
  FaHeart,
  FaLock,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { IoBed, IoRestaurant, IoSparkles } from "react-icons/io5";

const About = () => {
  const features = [
    {
      icon: <IoSparkles className="text-2xl" />,
      title: "Luxury Experience",
      description:
        "Premium amenities and exceptional service for an unforgettable stay",
    },
    {
      icon: <IoBed className="text-2xl" />,
      title: "Comfort Redefined",
      description:
        "Luxuriously appointed rooms designed for your ultimate comfort",
    },
    {
      icon: <FaLock className="text-2xl" />,
      title: "Safe & Secure",
      description: "Your safety and privacy are our highest priorities",
    },
    {
      icon: <IoRestaurant className="text-2xl" />,
      title: "Gourmet Dining",
      description: "Exquisite culinary experiences with world-class chefs",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Guests", icon: <FaUsers /> },
    { number: "150+", label: "Luxury Rooms", icon: <FaHotel /> },
    { number: "25+", label: "Awards Won", icon: <FaAward /> },
    { number: "98%", label: "Guest Satisfaction", icon: <FaStar /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Where luxury meets comfort, and every stay becomes a cherished
              memory
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="text-blue-600 dark:text-blue-400 text-2xl mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Why Choose <span className="text-blue-600">Hotelzz</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We redefine luxury hospitality with unparalleled service,
              exquisite design, and attention to every detail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-6"
            >
              <FaHeart className="text-xl" />
              <span className="font-semibold">Our Mission</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-8"
            >
              Creating unforgettable experiences, one stay at a time
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              At Hotelzz, we believe that every journey should be extraordinary.
              From the moment you arrive until your departure, our dedicated
              team ensures that your experience exceeds expectations. We combine
              modern luxury with timeless hospitality to create memories that
              last a lifetime.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
