"use client";

import { useState, useRef, useEffect } from "react";

export default function SongPage() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hey! Tell me a word and I'll suggest songs for you 🎵" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    // Auto scroll to last message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessage() {
        if (!input.trim()) return;

        // Add user message
        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);

        setLoading(true);

        try {
            const res = await fetch("/api/getmesong", {
                method: "POST",
                body: JSON.stringify({ word: input }),
            });

            const data = await res.json();
            console.log("API RESPONSE:", data);

            // Fix: Convert AI string into clean list
            const cleaned = data.reply
                .split("\n")                          // split lines
                .map(line => line.replace(/^\d+\.\s*/, "")) // remove "1. "
                .filter(Boolean);                    // remove empty

            // Bot message
            const botMsg = {
                role: "assistant",
                content:
                    `Here are some songs with the word "${input}":\n\n` +
                    cleaned.map((s, i) => `${i + 1}. ${s}`).join("\n"),
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error: unable to generate songs 😢" },
            ]);
        }

        setLoading(false);
        setInput("");
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.role === "user"
                            ? "ml-auto bg-blue-600 text-white"
                            : "mr-auto bg-gray-700 text-gray-200"
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}

                {loading && (
                    <div className="mr-auto bg-gray-700 text-gray-300 p-3 rounded-xl w-fit animate-pulse">
                        Thinking...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-gray-800 flex gap-2">
                <input
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    placeholder="Enter a word: rose, heart, fire..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
