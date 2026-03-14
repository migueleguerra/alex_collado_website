import { NextRequest, NextResponse } from "next/server";

const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID || "user_RjYoUr6zpBN3O4umVqmJ3";
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "default_service";

export async function POST(request: NextRequest) {
  try {
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
