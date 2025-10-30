import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import { format } from "date-fns";

import { Review } from "@/models/review";
import Rating from "../Rating/Rating";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR(`/api/room-reviews/${roomId}`, fetchRoomReviews);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 font-medium">Failed to load reviews</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!roomReviews || roomReviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Reviews Yet
        </h3>
        <p className="text-gray-500">Be the first to share your experience</p>
      </div>
    );
  }

  const averageRating =
    roomReviews.reduce((sum, review) => sum + review.userRating, 0) /
    roomReviews.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Guest Reviews</h2>
          <p className="text-gray-600">
            {roomReviews.length} review{roomReviews.length !== 1 ? "s" : ""} •{" "}
            {averageRating.toFixed(1)} avg
          </p>
        </div>
        <div className="bg-blue-50 px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Rating rating={averageRating} />
            <span className="text-blue-900 font-bold">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {roomReviews.map((review) => {
          const userName = review.user?.name || "Anonymous";
          const userInitial = userName.charAt(0).toUpperCase();
          const reviewDate = review._createdAt
            ? format(new Date(review._createdAt), "MMM dd, yyyy")
            : "Recently";

          return (
            <div key={review._id} className="bg-white rounded-lg border p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {userInitial}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{userName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Rating rating={review.userRating} />
                      <span className="text-sm text-gray-500">
                        {review.userRating}.0
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{reviewDate}</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomReview;
