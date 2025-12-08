"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat", { message: input });

      const botMsg = { sender: "bot", text: data.reply || "No reply from AI" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botMsg = { sender: "bot", text: "Error: Could not connect to API" };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold shadow-md">
          AI Chatbot
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto h-[500px] space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-2xl max-w-[75%] break-words ${msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
                } shadow`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-gray-300 text-gray-800 p-3 rounded-2xl max-w-[70%] shadow animate-pulse">
              Responding you...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 flex gap-3 border-t bg-gray-50">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
