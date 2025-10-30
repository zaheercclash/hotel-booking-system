"use client";

import useSWR from "swr";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaSync,
  FaHotel,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { BsJournalBookmarkFill, BsGraphUp, BsStarFill } from "react-icons/bs";
import { GiMoneyStack, GiNightSleep } from "react-icons/gi";
import { MdOutlineRefresh, MdReviews } from "react-icons/md";
import toast from "react-hot-toast";

import { getUserBookings } from "@/libs/apis";
import { User } from "@/models/user";
import LoadingSpinner from "../../loading";
import Table from "@/components/Table/Table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";

const UserDetails = ({
  params: { id: userId },
}: {
  params: { id: string };
}) => {
  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "reviews"
  >("bookings");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");
  const [manualRefresh, setManualRefresh] = useState(0);

  const toggleRatingModal = () => setIsRatingVisible((prev) => !prev);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error("Please provide both rating text and a rating value");
    }

    if (!roomId) {
      toast.error("Room ID not provided");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const { data } = await axios.post("/api/users", {
        reviewText: ratingText,
        ratingValue,
        roomId,
      });
      toast.success("Review submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    } finally {
      setRatingText("");
      setRatingValue(null);
      setRoomId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  // Data Fetchers
  const fetchUserBooking = async () => {
    try {
      const bookings = await getUserBookings(userId);
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get<User>(`/api/users?id=${userId}`);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const {
    data: userBookings,
    isLoading: isBookingsLoading,
    error: bookingsError,
    mutate: mutateBookings,
  } = useSWR(
    userId ? `user-bookings-${userId}-${manualRefresh}` : null,
    fetchUserBooking,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
    mutate: mutateUserData,
  } = useSWR(
    userId ? `user-data-${userId}-${manualRefresh}` : null,
    fetchUserData,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const refreshData = () => {
    setManualRefresh((prev) => prev + 1);
    mutateBookings();
    mutateUserData();
    toast.success("Data refreshed!");
  };

  // Calculate stats
  const totalAmountSpent =
    userBookings?.reduce((total, booking) => total + booking.totalPrice, 0) ||
    0;
  const totalNights =
    userBookings?.reduce((total, booking) => total + booking.numberOfDays, 0) ||
    0;
  const averageSpending = userBookings?.length
    ? totalAmountSpent / userBookings.length
    : 0;

  // Check for successful booking from URL
  useEffect(() => {
    const checkForSuccessfulBooking = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
      const success = urlParams.get("success");

      if (success && sessionId) {
        toast.loading("Processing your new booking...", { duration: 3000 });
        await new Promise((resolve) => setTimeout(resolve, 4000));
        refreshData();
        toast.success("Booking confirmed! Your bookings have been updated.");
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    checkForSuccessfulBooking();
  }, []);

  // --- Loading and fallback checks ---
  if (isBookingsLoading || isUserLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Connection Issue
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't load your profile information.
          </p>
          <button
            onClick={refreshData}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserCircle className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium text-lg">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10% left-5% w-72 h-72 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-20% right-8% w-96 h-96 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-15% left-15% w-80 h-80 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 transform transition-all duration-500 hover:shadow-3xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Image
                    src={userData.image || "/default-avatar.png"}
                    alt={userData.name || "User"}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10"></div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {userData.name || "Guest"}!
                </h1>
                <p className="text-gray-600 text-lg flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Member since{" "}
                  {userData._createdAt?.split("T")[0] ?? "Unknown date"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <p className="text-blue-800 text-sm font-semibold mb-1 flex items-center gap-2">
                  <BsJournalBookmarkFill className="text-blue-600" />
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {userBookings?.length || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <p className="text-green-800 text-sm font-semibold mb-1 flex items-center gap-2">
                  <GiMoneyStack className="text-green-600" />
                  Total Spent
                </p>
                <p className="text-3xl font-bold text-green-900">
                  LKR {totalAmountSpent.toLocaleString()}
                </p>
              </div>
              <button
                onClick={refreshData}
                className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <FaSync className="text-purple-600 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-purple-800 text-sm font-semibold">
                  Refresh
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 sticky top-8 transform transition-all duration-500 hover:shadow-3xl">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto mb-4 transform transition-all duration-500 hover:scale-105">
                  <Image
                    src={userData.image || "/default-avatar.png"}
                    alt={userData.name || "User"}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {userData.name}
                </h2>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200/50">
                  <BsStarFill className="text-amber-500" />
                  Premium Member
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl p-4 text-center border border-blue-200/30">
                  <GiNightSleep className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">
                    {totalNights}
                  </p>
                  <p className="text-blue-700 text-xs font-medium">
                    Total Nights
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl p-4 text-center border border-green-200/30">
                  <FaHotel className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">
                    {userBookings?.length || 0}
                  </p>
                  <p className="text-green-700 text-xs font-medium">Bookings</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-2xl p-4 text-center border border-purple-200/30">
                  <FaDollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.round(averageSpending).toLocaleString()}
                  </p>
                  <p className="text-purple-700 text-xs font-medium">
                    Avg/Booking
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/30 rounded-2xl p-4 text-center border border-cyan-200/30">
                  <MdReviews className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-cyan-900">0</p>
                  <p className="text-cyan-700 text-xs font-medium">Reviews</p>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaUserCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50/50 rounded-xl p-4 border border-gray-200/30">
                  {userData.about ||
                    "No description provided yet. Share something about yourself to personalize your profile!"}
                </p>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-red-400/30"
              >
                <FaSignOutAlt className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Navigation Tabs */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-3 mb-8">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setCurrentNav("bookings")}
                  className={`flex-1 flex items-center justify-center gap-4 py-5 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    currentNav === "bookings"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 border border-transparent hover:border-gray-200/50"
                  }`}
                >
                  <BsJournalBookmarkFill className="w-6 h-6" />
                  <span>My Bookings ({userBookings?.length || 0})</span>
                </button>
                <button
                  onClick={() => setCurrentNav("amount")}
                  className={`flex-1 flex items-center justify-center gap-4 py-5 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    currentNav === "amount"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 border border-transparent hover:border-gray-200/50"
                  }`}
                >
                  <BsGraphUp className="w-6 h-6" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setCurrentNav("reviews")}
                  className={`flex-1 flex items-center justify-center gap-4 py-5 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    currentNav === "reviews"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 border border-transparent hover:border-gray-200/50"
                  }`}
                >
                  <MdReviews className="w-6 h-6" />
                  <span>My Reviews</span>
                </button>
              </div>
            </div>

            {/* Enhanced Content Sections */}
            <div className="space-y-8">
              {/* Bookings Section */}
              {currentNav === "bookings" && (
                <div>
                  {userBookings && userBookings.length > 0 ? (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                      <Table
                        bookingDetails={userBookings}
                        setRoomId={setRoomId}
                        toggleRatingModal={toggleRatingModal}
                      />
                    </div>
                  ) : (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-12 text-center transform transition-all duration-500 hover:shadow-3xl">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <BsJournalBookmarkFill className="w-16 h-16 text-blue-500" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        No Bookings Yet
                      </h3>
                      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        Your travel story begins here! Explore our luxurious
                        rooms and create unforgettable memories with your first
                        booking.
                      </p>
                      <button
                        onClick={() => (window.location.href = "/rooms")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Discover Amazing Rooms
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Analytics Section */}
              {currentNav === "amount" && (
                <div>
                  {userBookings && userBookings.length > 0 ? (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
                      <Chart userBookings={userBookings} />
                    </div>
                  ) : (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-12 text-center transform transition-all duration-500 hover:shadow-3xl">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <BsGraphUp className="w-16 h-16 text-green-500" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        No Data Available
                      </h3>
                      <p className="text-gray-600 text-lg mb-8">
                        Your booking analytics dashboard will light up with
                        insights after your first reservation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Section */}
              {currentNav === "reviews" && (
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-12 text-center transform transition-all duration-500 hover:shadow-3xl">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <MdReviews className="w-16 h-16 text-yellow-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Share your experiences! Rate and review your stays to help
                    other travelers.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Reviews will appear here after you complete your bookings
                    and share your feedback.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetails;
