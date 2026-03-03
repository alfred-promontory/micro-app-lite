import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Input is required" },
        { status: 400 }
      );
    }

    // TODO: Customize this system prompt for your app
    const systemPrompt = `You are a helpful assistant. 
    Be concise and direct in your responses.`;

    const result = await generateWithClaude(input, {
      systemPrompt,
      maxTokens: 1024,
    });

    return NextResponse.json({
      result: result.content,
      usage: result.usage,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
