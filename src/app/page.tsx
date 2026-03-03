"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(data.result);
      }
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            🚀 App Name
          </h1>
          <p className="text-xl text-gray-400">
            One line description of what your app does.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                     disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {loading ? "Processing..." : "✨ Generate"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Result</h2>
            <div className="whitespace-pre-wrap text-gray-100">{result}</div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          Built with ☕ by{" "}
          <a href="https://twitter.com/AaronVLe" className="text-blue-400 hover:underline">
            @AaronVLe
          </a>
        </footer>
      </div>
    </main>
  );
}
