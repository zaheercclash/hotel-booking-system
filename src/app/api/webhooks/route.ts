import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error("❌ WEBHOOK: Missing signature or secret");
      return new NextResponse("Webhook configuration error", { status: 400 });
    }

    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    console.log("✅ WEBHOOK: Event constructed successfully");
  } catch (error: any) {
    console.error("❌ WEBHOOK: Signature verification failed:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      console.log("🎯 WEBHOOK: Checkout session completed");
      console.log(
        "🔍 WEBHOOK: Full session:",
        JSON.stringify(session, null, 2)
      );

      if (!session.metadata) {
        console.error("❌ WEBHOOK: No metadata found in session");
        return new NextResponse("Metadata missing", { status: 400 });
      }

      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      } = session.metadata;

      console.log("🔍 WEBHOOK: Extracted metadata:");
      console.log(" - User:", user);
      console.log(" - Hotel Room:", hotelRoom);
      console.log(" - Check-in:", checkinDate);
      console.log(" - Check-out:", checkoutDate);
      console.log(" - Adults:", adults);
      console.log(" - Children:", children);
      console.log(" - Metadata Days:", numberOfDays);

      // Validate required fields
      if (!user || !hotelRoom || !checkinDate || !checkoutDate) {
        console.error("❌ WEBHOOK: Missing required metadata fields");
        return new NextResponse("Missing required fields", { status: 400 });
      }

      try {
        console.log("🔄 WEBHOOK: Creating booking...");

        // Calculate correct numberOfDays from dates
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const calculatedNumberOfDays = Math.ceil(
          (checkout.getTime() - checkin.getTime()) / (24 * 60 * 60 * 1000)
        );

        console.log("📅 WEBHOOK: Date calculation:", {
          checkin: checkin.toISOString(),
          checkout: checkout.toISOString(),
          calculatedDays: calculatedNumberOfDays,
          metadataDays: numberOfDays,
        });

        const booking = await createBooking({
          adults: Number(adults) || 1,
          checkinDate,
          checkoutDate,
          children: Number(children) || 0,
          hotelRoom,
          numberOfDays: calculatedNumberOfDays, // Use calculated days instead of metadata
          discount: Number(discount) || 0,
          totalPrice: Number(totalPrice) || 0,
          user,
        });

        console.log(
          "✅ WEBHOOK: Booking created successfully with",
          calculatedNumberOfDays,
          "days"
        );

        // Update hotel Room
        console.log("🔄 WEBHOOK: Updating hotel room status...");
        await updateHotelRoom(hotelRoom);

        console.log("🎉 WEBHOOK: Booking process completed successfully");

        return NextResponse.json("Booking successful", {
          status: 200,
          statusText: "Booking Successful",
        });
      } catch (bookingError) {
        console.error("💥 WEBHOOK: Failed to create booking:", bookingError);
        return new NextResponse("Booking creation failed", { status: 500 });
      }

    default:
      console.log(`🔔 WEBHOOK: Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
