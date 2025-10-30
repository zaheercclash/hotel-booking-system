import Stripe from "stripe";

import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  if (!checkinDate || !checkoutDate || !adults || !hotelRoomSlug) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 400 });
  }

  const userId = session.user.id;
  const publishedUserId = userId.replace("drafts.", "");

  console.log("🔍 STRIPE DEBUG: User ID from session:", userId);
  console.log("🔍 STRIPE DEBUG: Published User ID:", publishedUserId);

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;

    // Calculate numberOfDays from actual dates to ensure accuracy
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const calculatedNumberOfDays = Math.ceil(
      (checkout.getTime() - checkin.getTime()) / (24 * 60 * 60 * 1000)
    );

    const totalPrice = discountPrice * calculatedNumberOfDays;

    console.log("📅 STRIPE: Date calculation:", {
      checkin: checkin.toISOString(),
      checkout: checkout.toISOString(),
      calculatedDays: calculatedNumberOfDays,
      frontendDays: numberOfDays,
    });

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${publishedUserId}`,
      metadata: {
        adults: adults.toString(),
        checkinDate: checkinDate.split("T")[0],
        checkoutDate: checkoutDate.split("T")[0],
        children: children.toString(),
        hotelRoom: room._id,
        numberOfDays: calculatedNumberOfDays.toString(), // Use calculated days
        user: publishedUserId,
        discount: room.discount.toString(),
        totalPrice: totalPrice.toString(),
      },
    });

    console.log(
      "✅ STRIPE: Session created with correct days:",
      calculatedNumberOfDays
    );
    console.log("✅ STRIPE: Total price calculated:", totalPrice);

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error: any) {
    console.log("Payment failed", error);
    return new NextResponse(error, { status: 500 });
  }
}
