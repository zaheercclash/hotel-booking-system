"use client";

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;
  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  const totalDays = calcNoOfDays();
  const totalPrice = totalDays * discountPrice;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            {discount > 0 ? (
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">LKR {discountPrice}</span>
                <span className="text-lg line-through text-blue-200">
                  LKR {price}
                </span>
                <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                  {discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">LKR {price}</span>
            )}
            <p className="text-blue-100 text-sm mt-1">per night</p>
          </div>
          <div className="text-right">
            {totalDays > 0 && (
              <>
                <p className="text-sm text-blue-200">
                  {totalDays} night{totalDays > 1 ? "s" : ""}
                </p>
                <p className="text-lg font-bold">LKR {totalPrice}</p>
                <p className="text-xs text-blue-200">total</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Special Note */}
      {specialNote && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {specialNote}
            </p>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <div className="p-6">
        {/* Date Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="check-in-date"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Check-in Date
            </label>
            <DatePicker
              selected={checkinDate}
              onChange={setCheckinDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              id="check-in-date"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholderText="Select check-in"
            />
          </div>
          <div>
            <label
              htmlFor="check-out-date"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Check-out Date
            </label>
            <DatePicker
              selected={checkoutDate}
              onChange={setCheckoutDate}
              dateFormat="dd/MM/yyyy"
              disabled={!checkinDate}
              minDate={calcMinCheckoutDate()}
              id="check-out-date"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholderText="Select check-out"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="adults"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Adults
            </label>
            <div className="relative">
              <input
                type="number"
                id="adults"
                value={adults}
                onChange={(e) => setAdults(+e.target.value)}
                min={1}
                max={5}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="children"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Children
            </label>
            <div className="relative">
              <input
                type="number"
                id="children"
                value={noOfChildren}
                onChange={(e) => setNoOfChildren(+e.target.value)}
                min={0}
                max={3}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-sm">👶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        {totalDays > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                LKR {discountPrice} × {totalDays} night
                {totalDays > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-gray-800">
                LKR {totalDays * discountPrice}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-600">You save</span>
                <span className="font-semibold text-green-600">
                  LKR {(price - discountPrice) * totalDays}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Book Button */}
        <button
          disabled={isBooked}
          onClick={handleBookNowClick}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isBooked
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          }`}
        >
          {isBooked ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                />
              </svg>
              Already Booked
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Book Now
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
        </button>

        {/* Security Note */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure booking • Free cancellation
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookRoomCta;
