import { CreateReviewDto, Review } from "./../models/review";
import axios from "axios";

import { CreateBookingDto, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import { Booking } from "@/models/booking";
import { UpdateReviewDto } from "@/models/review";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "no-cache" }
  );

  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );

  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  try {
    console.log("🔄 CREATE BOOKING: Starting booking creation with data:", {
      user,
      hotelRoom,
      checkinDate,
      checkoutDate,
      adults,
      children,
      totalPrice,
      numberOfDays, // Debug the incoming numberOfDays
    });

    // Validate that numberOfDays matches the actual date difference
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const actualDays = Math.ceil(
      (checkout.getTime() - checkin.getTime()) / (24 * 60 * 60 * 1000)
    );

    console.log("📅 DATE VALIDATION:", {
      checkin: checkin.toISOString(),
      checkout: checkout.toISOString(),
      calculatedDays: actualDays,
      providedDays: numberOfDays,
    });

    // Use the calculated days to ensure accuracy
    const finalNumberOfDays = actualDays;

    const mutation = {
      mutations: [
        {
          create: {
            _type: "booking",
            user: { _type: "reference", _ref: user },
            hotelRoom: { _type: "reference", _ref: hotelRoom },
            checkinDate,
            checkoutDate,
            numberOfDays: finalNumberOfDays, // Use calculated days
            adults: Number(adults),
            children: Number(children),
            totalPrice: Number(totalPrice),
            discount: Number(discount),
          },
        },
      ],
    };

    console.log("📤 CREATE BOOKING: Sending mutation to Sanity...");

    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "✅ CREATE BOOKING: Booking created successfully with",
      finalNumberOfDays,
      "days"
    );
    return data;
  } catch (error: any) {
    console.error("💥 CREATE BOOKING: Failed to create booking:", error);
    console.error("💥 CREATE BOOKING: Error response:", error.response?.data);
    throw error;
  }
};

export const updateHotelRoom = async (hotelRoomId: string) => {
  try {
    console.log("🔄 UPDATE HOTEL ROOM: Updating room:", hotelRoomId);

    const mutation = {
      mutations: [
        {
          patch: {
            id: hotelRoomId,
            set: {
              isBooked: true,
            },
          },
        },
      ],
    };

    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ UPDATE HOTEL ROOM: Room updated successfully");
    return data;
  } catch (error: any) {
    console.error("💥 UPDATE HOTEL ROOM: Failed to update room:", error);
    throw error;
  }
};

export async function getUserBookings(userId: string) {
  try {
    console.log("🔍 GET USER BOOKINGS: Starting fetch for user:", userId);

    const cleanUserId = userId.replace("drafts.", "");
    console.log("🔍 GET USER BOOKINGS: Clean user ID:", cleanUserId);

    const result = await sanityClient.fetch<Booking[]>(
      queries.getUserBookingsQuery,
      {
        userId: cleanUserId,
      },
      { cache: "no-cache" }
    );

    console.log("✅ GET USER BOOKINGS: Raw result from Sanity:", result);
    console.log(
      "📊 GET USER BOOKINGS: Number of bookings found:",
      result?.length
    );

    if (result && result.length > 0) {
      console.log("🔍 BOOKING DETAILS:");
      result.forEach((booking, index) => {
        console.log(`   Booking ${index + 1}:`, {
          id: booking._id,
          userRef: "Exists in booking",
          hotelRoom: booking.hotelRoom
            ? {
                id: booking.hotelRoom._id,
                name: booking.hotelRoom.name,
                slug: booking.hotelRoom.slug,
              }
            : "MISSING HOTEL ROOM REFERENCE",
          checkin: booking.checkinDate,
          checkout: booking.checkoutDate,
          totalPrice: booking.totalPrice,
        });
      });
    } else {
      console.log(
        "❌ GET USER BOOKINGS: No bookings found for user:",
        cleanUserId
      );

      const allBookingsQuery = `*[_type == 'booking'][0..4] { _id, user->{_id, name} }`;
      const sampleBookings = await sanityClient.fetch(allBookingsQuery);
      console.log("🔍 SAMPLE BOOKINGS WITH USER REFERENCES:", sampleBookings);
    }

    return result || [];
  } catch (error) {
    console.error("💥 GET USER BOOKINGS: Critical error:", error);
    return [];
  }
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "review",
          user: {
            _type: "reference",
            _ref: userId,
          },
          hotelRoom: {
            _type: "reference",
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: "no-cache" }
  );

  return result;
}
