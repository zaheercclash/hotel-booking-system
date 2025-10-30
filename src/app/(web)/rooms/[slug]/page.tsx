// app/room/[slug]/page.tsx
"use client";

import useSWR from "swr";
import { MdOutlineCleaningServices, MdSecurity } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import {
  FaWifi,
  FaSwimmingPool,
  FaTv,
  FaParking,
  FaUtensils,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import { getRoom } from "@/libs/apis";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import toast from "react-hot-toast";
import { getStripe } from "@/libs/stripe";
import RoomReview from "@/components/RoomReview/RoomReview";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const { data: session } = useSession();
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  // Safe checks for offeredAmenities
  const offeredAmenities = room.offeredAmenities || [];
  const hasAmenities = offeredAmenities.length > 0;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!session) {
      toast.error("Please sign in to book a room");
      return;
    }

    if (!checkinDate || !checkoutDate)
      return toast.error("Please provide checkin / checkout date");

    if (checkinDate > checkoutDate)
      return toast.error("Please choose a valid checkin period");

    const numberOfDays = calcNumDays();
    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate: checkinDate.toISOString(),
        checkoutDate: checkoutDate.toISOString(),
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          console.error("Stripe checkout error:", result.error);
          toast.error("Payment Failed");
        }
      }
    } catch (error: any) {
      console.log("Booking error: ", error);
      toast.error("An error occurred");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  // Icon mapping for common amenities
  const getAmenityIcon = (amenityName: string) => {
    const name = amenityName.toLowerCase();
    if (name.includes("wifi")) return <FaWifi className="text-blue-500" />;
    if (name.includes("pool"))
      return <FaSwimmingPool className="text-cyan-500" />;
    if (name.includes("tv")) return <FaTv className="text-purple-500" />;
    if (name.includes("parking"))
      return <FaParking className="text-gray-500" />;
    if (name.includes("restaurant") || name.includes("food"))
      return <FaUtensils className="text-orange-500" />;
    if (name.includes("security"))
      return <MdSecurity className="text-green-500" />;
    return <MdOutlineCleaningServices className="text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Photo Gallery */}
      <div className="relative">
        <HotelPhotoGallery photos={room.images} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Content - Room Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Room Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {room.name}
                  </h1>
                  <p className="text-lg text-gray-600">{room.dimension}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {room.type} Room
                  </span>
                  {room.isBooked ? (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Booked
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Stats - Using only existing properties */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">
                    {room.price}
                  </div>
                  <div className="text-sm text-gray-600">Price</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">
                    {room.discount || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Discount</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">
                    {offeredAmenities.length}
                  </div>
                  <div className="text-sm text-gray-600">Amenities</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Room Amenities
              </h2>
              {hasAmenities ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {offeredAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {getAmenityIcon(amenity.amenity)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {amenity.amenity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdOutlineCleaningServices className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No amenities listed</p>
                </div>
              )}
            </div>

            {/* Safety Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Safety & Hygiene
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MdOutlineCleaningServices className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Daily Cleaning
                    </p>
                    <p className="text-sm text-gray-600">
                      Professional cleaning service
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <LiaFireExtinguisherSolid className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fire Safety</p>
                    <p className="text-sm text-gray-600">
                      Fire extinguishers available
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AiOutlineMedicineBox className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sanitization</p>
                    <p className="text-sm text-gray-600">
                      Regular disinfection
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <GiSmokeBomb className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Smoke Detection
                    </p>
                    <p className="text-sm text-gray-600">
                      Advanced smoke detectors
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="bg-blue-50 px-3 py-1 rounded-lg">
                  <span className="text-blue-800 text-sm font-medium">
                    Verified Stays
                  </span>
                </div>
              </div>
              <RoomReview roomId={room._id} />
            </div>
          </div>

          {/* Right Sidebar - Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <BookRoomCta
                discount={room.discount}
                price={room.price}
                specialNote={room.specialNote}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                calcMinCheckoutDate={calcMinCheckoutDate}
                adults={adults}
                noOfChildren={noOfChildren}
                setAdults={setAdults}
                setNoOfChildren={setNoOfChildren}
                isBooked={room.isBooked}
                handleBookNowClick={handleBookNowClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
