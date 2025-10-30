import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/libs/auth";
import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 401 });
  }

  const userId = session.user.id;

  try {
    console.log("🔍 USERS API: Session user ID:", userId);

    // Get the user ID from query parameters for the specific user we want to fetch
    const url = new URL(req.url);
    const requestedUserId = url.searchParams.get("id");

    console.log("🔍 USERS API: Requested user ID from query:", requestedUserId);

    // If no specific ID is requested, return the current session user's data
    const userIdToFetch = requestedUserId || userId;

    // Remove 'drafts.' prefix to get published user data
    const publishedUserId = userIdToFetch.replace("drafts.", "");
    console.log("🔄 USERS API: Fetching data for user ID:", publishedUserId);

    const data = await getUserData(publishedUserId);

    if (!data) {
      console.log("❌ USERS API: User not found for ID:", publishedUserId);
      return new NextResponse("User not found", { status: 404 });
    }

    console.log("✅ USERS API: User data found:", data._id);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    console.error("❌ USERS API Error:", error);
    return new NextResponse("Unable to fetch user data", { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication Required", { status: 401 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  const userId = session.user.id;

  try {
    // Use published user ID for reviews too
    const publishedUserId = userId.replace("drafts.", "");

    const alreadyExists = await checkReviewExists(publishedUserId, roomId);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId: publishedUserId, // Use published user ID
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error: any) {
    console.log("Error creating review", error);
    return new NextResponse("Unable to create review", { status: 400 });
  }
}
