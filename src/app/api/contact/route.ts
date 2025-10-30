import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Contact API called at:", new Date().toISOString());

    const { name, email, subject, message } = await request.json();
    console.log("📧 Received data:", { name, email, subject, message });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    console.log("🔧 Checking environment variables...");
    console.log("🔧 GMAIL_USER exists:", !!process.env.GMAIL_USER);
    console.log(
      "🔧 GMAIL_APP_PASSWORD exists:",
      !!process.env.GMAIL_APP_PASSWORD
    );

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log("❌ Missing environment variables");
      return NextResponse.json(
        {
          error:
            "Email configuration missing. Please check server configuration.",
        },
        { status: 500 }
      );
    }

    console.log("📧 Setting up email transporter...");

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      console.log("🔧 Verifying transporter...");
      await transporter.verify();
      console.log("✅ Transporter verified successfully");
    } catch (verifyError) {
      console.error("❌ Transporter verification failed:", verifyError);
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "zaheercclash@gmail.com",
      subject: `Hotelzz Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission - Hotelzz</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Sent from Hotelzz contact form
          </p>
        </div>
      `,
    };

    console.log("📧 Sending email...");

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);

    let errorMessage = "Failed to send email. Please try again later.";

    if (error instanceof Error) {
      errorMessage += ` Details: ${error.message}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Optional: Add GET method to test if API is working
export async function GET() {
  return NextResponse.json(
    { message: "Contact API is working!" },
    { status: 200 }
  );
}
