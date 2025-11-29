/* Made by Pranav */
/* thepranavhub.online */

import React, { useState, useEffect, useRef } from "react";
import { askAI } from "../api/aiAssistant";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  // 🟢 Prevent duplicate messages
  const isReplying = useRef(false);

  // 🟢 Auto Welcome message only once
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hey! I’m Rio — Pranav’s AI Assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen]);

  // 🔄 Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  // ✉️ Send message function
  const sendMessage = async () => {
    if (!input.trim() || isReplying.current) return;

    const text = input;
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);

    setLoading(true);
    isReplying.current = true;

    try {
      const reply = await askAI(text);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply || "⚠️ Rio couldn't respond." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Oops! Something went wrong." },
      ]);
    }

    setLoading(false);
    isReplying.current = false;
  };

  // Typing dots animation component
  const TypingDots = () => (
    <div className="flex gap-1 mt-1 ml-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img
              src="/assets/chatbot.png"
              className="w-14 h-14 drop-shadow-xl hover:scale-110 transition"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl
                       w-[75vw] sm:w-[270px] max-w-[270px]
                       h-[52vh] sm:h-[340px]
                       fixed bottom-4 right-4 sm:bottom-6 sm:right-6
                       overflow-hidden flex flex-col"
          >

            {/* HEADER */}
            <div className="px-3 py-2 flex items-center justify-between bg-white/40 backdrop-blur-md border-b border-white/40">
              <div className="flex items-center gap-2">
                <motion.img
                  src="/assets/chatbot.png"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-7 h-7 rounded-full shadow-md"
                />
                <span className="text-[13px] font-semibold text-gray-900 tracking-wide">
                  Rio — AI Assistant
                </span>
              </div>

              <button
                className="text-gray-700 hover:text-black font-bold"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* MESSAGE AREA */}
            <div
              ref={chatRef}
             className="flex-1 overflow-y-auto p-2 pb-[70px] space-y-3 text-sm 
           flex flex-col items-start"

            >
              {messages.map((msg, i) => (
             <motion.div
  key={i}
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  className={`
    relative px-3 py-2 rounded-2xl text-sm leading-snug
    max-w-[80%] w-fit break-words shadow-sm

    ${msg.sender === "user"
      ? "bg-black text-white self-end mr-1"
      : "bg-white text-gray-900 border border-gray-300 self-start ml-1"}
  `}
>
  {msg.text}

  {/* FIXED ARROW — no movement */}
  {msg.sender === "user" ? (
    <span className="
      absolute right-[-6px] top-[14px]
      w-3 h-3 bg-black rotate-45
    " />
  ) : (
    <span className="
      absolute left-[-6px] top-[14px]
      w-3 h-3 bg-white border-l border-t border-gray-300 rotate-45
    " />
  )}
</motion.div>


              ))}

              {/* Typing animation */}
              {loading && (
                <div className="self-start bg-white p-2 rounded-xl border shadow-sm max-w-[40%]">
                  <TypingDots />
                </div>
              )}
            </div>

            {/* INPUT BAR */}
            <div className="p-2 border-t border-white/40 bg-white/60 backdrop-blur-md flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask Rio anything..."
                className="flex-1 p-2 text-sm bg-transparent outline-none text-gray-800"
              />

              <button
                onClick={sendMessage}
                className="bg-black text-white px-3 py-2 rounded-xl text-sm hover:opacity-90 active:scale-95 transition"
              >
                Send
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
