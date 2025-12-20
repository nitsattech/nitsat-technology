"use client";

import { useState } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};
const WELCOME_MESSAGE: Message = {
    role: "assistant",
    content: "👋 Welcome to Nitsat AI Assistant! How can I help you today?",
};


export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);



    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => {
                    setOpen(!open);
                    if (!open) {
                        setMessages([WELCOME_MESSAGE]);
                    }
                }}
                className="fixed bottom-6 right-6 z-[9999] 
                   bg-gradient-to-r from-purple-500 to-blue-500
                   text-white px-4 py-3 rounded-full shadow-lg"
            >
                💬 Chat
            </button>

            {/* Chat Window */}
            {open && (
                <div
                    className="fixed bottom-20 right-6 w-80 
                     bg-[#0B0F1A] border border-white/10 
                     rounded-2xl shadow-2xl z-[9999]"
                >
                    {/* Header */}
                    <div className="p-3 text-white font-semibold 
                          bg-gradient-to-r from-purple-500 to-blue-500 
                          rounded-t-2xl">
                        Nitsat AI Assistant
                    </div>

                    {/* Messages */}
                    <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[90%] ${msg.role === "user"
                                        ? "bg-blue-500/20 text-white ml-auto"
                                        : "bg-white/10 text-gray-200"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="text-gray-400 text-xs">AI is typing...</div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t border-white/10 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="flex-1 bg-[#111827] text-white 
                         border border-white/10 rounded-lg 
                         px-3 py-2 text-sm focus:outline-none 
                         focus:ring-2 focus:ring-purple-500"
                            placeholder="Ask something..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 
                         text-white px-4 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
