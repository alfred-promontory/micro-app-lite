import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type AIResponse = {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
};

/**
 * Generate a response using Claude
 */
export async function generateWithClaude(
  prompt: string,
  options?: {
    systemPrompt?: string;
    maxTokens?: number;
    model?: string;
  }
): Promise<AIResponse> {
  const response = await anthropic.messages.create({
    model: options?.model || "claude-sonnet-4-20250514",
    max_tokens: options?.maxTokens || 1024,
    system: options?.systemPrompt || "You are a helpful assistant.",
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = response.content.find((block) => block.type === "text");

  return {
    content: textContent?.type === "text" ? textContent.text : "",
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Stream a response using Claude
 */
export async function* streamWithClaude(
  prompt: string,
  options?: {
    systemPrompt?: string;
    maxTokens?: number;
    model?: string;
  }
): AsyncGenerator<string> {
  const stream = anthropic.messages.stream({
    model: options?.model || "claude-sonnet-4-20250514",
    max_tokens: options?.maxTokens || 1024,
    system: options?.systemPrompt || "You are a helpful assistant.",
    messages: [{ role: "user", content: prompt }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}
