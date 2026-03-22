import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // ✅ Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // ✅ 1. Save to Supabase (important → await)
    let savedData = null

    if (supabase) {
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name, email, phone: phone || null, message }])
        .select()

      if (error) {
        console.error("Supabase error:", error)
        return NextResponse.json(
          { error: "Failed to save contact" },
          { status: 500 }
        )
      }

      savedData = data
    }

    // ✅ 2. Send Email (🔥 NON-BLOCKING)
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      // ❌ await hata diya → fast ho gaya
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🚀 New Contact Form Submission",
        html: `
          <h2>New Enquiry Received</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      })
      .then(() => {
        console.log("EMAIL SENT ✅")
      })
      .catch((err) => {
        console.error("EMAIL ERROR ❌", err)
      })

    } catch (emailError) {
      console.error("Email setup error:", emailError)
    }

    // ✅ 3. Instant Response
    return NextResponse.json(
      {
        message: "✅ Message sent successfully",
        data: savedData,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}