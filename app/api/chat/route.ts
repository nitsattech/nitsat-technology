export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Message missing" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for the Nitsat Technology website. Answer clearly and professionally about services, company info, and general questions. If you don't know the answer, respond with 'I'm not sure about that.",
        },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("OPENAI PROD ERROR:", error?.message || error);
    return NextResponse.json(
      { reply: "AI service temporarily unavailable." },
      { status: 500 }
    );
  }
}
