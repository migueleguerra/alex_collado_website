import { NextRequest, NextResponse } from "next/server";

const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;

export async function POST(request: NextRequest) {
  try {
    if (!EMAILJS_USER_ID || !EMAILJS_SERVICE_ID) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { templateId, ...templateParams } = body;

    if (!templateParams.name || !templateParams.email || !templateParams.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: templateId || "template_services",
        user_id: EMAILJS_USER_ID,
        template_params: templateParams,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Failed to send email", details: errorText },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
