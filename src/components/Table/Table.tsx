"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Booking } from "@/models/booking";

type Props = {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
  const router = useRouter();

  // Function to calculate days left
  const calculateDaysLeft = (checkoutDate: string) => {
    const today = new Date();
    const checkout = new Date(checkoutDate);
    const timeDiff = checkout.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Function to get status badge
  const getStatusBadge = (daysLeft: number) => {
    if (daysLeft === 0) {
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    } else if (daysLeft <= 3) {
      return { text: "Ending Soon", color: "bg-orange-100 text-orange-800" };
    } else {
      return { text: "Active", color: "bg-blue-100 text-blue-800" };
    }
  };

  // Filter out bookings without hotelRoom
  const validBookings = bookingDetails.filter((booking) => booking.hotelRoom);

  if (validBookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Bookings Found
        </h3>
        <p className="text-gray-500">You haven&apos;t made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Bookings</h2>
            <p className="text-gray-600 text-sm mt-1">
              {validBookings.length} booking
              {validBookings.length !== 1 ? "s" : ""} • Manage your reservations
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm font-medium">
                Total Bookings:{" "}
                <span className="font-bold">{validBookings.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Room Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price & Discount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {validBookings.map((booking) => {
              const daysLeft = calculateDaysLeft(booking.checkoutDate);
              const status = getStatusBadge(daysLeft);

              return (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Room Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">🏨</span>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            router.push(
                              `/rooms/${booking.hotelRoom!.slug.current}`
                            )
                          }
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left"
                        >
                          {booking.hotelRoom!.name}
                        </button>
                        <p className="text-sm text-gray-500">
                          {booking.numberOfDays} nights
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1 mb-1">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {format(new Date(booking.checkinDate), "MMM dd, yyyy")}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {format(new Date(booking.checkoutDate), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </td>

                  {/* Price & Discount */}
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          LKR {booking.totalPrice}
                        </span>
                        {booking.discount > 0 && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {booking.discount}% off
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        LKR {booking.hotelRoom!.price} per night
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.text}
                      </span>
                      {daysLeft > 0 && (
                        <span className="text-xs text-gray-500">
                          {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setRoomId(booking.hotelRoom!._id);
                        toggleRatingModal();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Rate Stay
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {validBookings.map((booking) => {
          const daysLeft = calculateDaysLeft(booking.checkoutDate);
          const status = getStatusBadge(daysLeft);

          return (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() =>
                    router.push(`/rooms/${booking.hotelRoom!.slug.current}`)
                  }
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left"
                >
                  {booking.hotelRoom!.name}
                </button>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                >
                  {status.text}
                </span>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check-in</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.checkinDate), "MMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Check-out</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.checkoutDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              {/* Price & Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      LKR {booking.totalPrice}
                    </span>
                    {booking.discount > 0 && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {booking.discount}% off
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900">
                    {booking.numberOfDays} night
                    {booking.numberOfDays !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setRoomId(booking.hotelRoom!._id);
                  toggleRatingModal();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Rate Your Stay
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
