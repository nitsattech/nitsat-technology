import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (!supabase) {
      console.log("[v0] Contact form submission (Supabase not configured):", { name, email, phone, message })
      return NextResponse.json(
        {
          message: "Message received! (Database not configured yet)",
          data: { name, email, phone, message },
        },
        { status: 200 },
      )
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, phone: phone || null, message }])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save contact" }, { status: 500 })
    }

    return NextResponse.json({ message: "Contact saved successfully", data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
