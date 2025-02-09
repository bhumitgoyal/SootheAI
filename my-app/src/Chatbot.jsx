import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import "./Chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 💖 How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTyping(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    await simulateTyping();

    try {
      // Send user message to Flask backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "newuser", // Replace with actual user ID
          message: inputText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: "bot",
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Oops! Something went wrong. Try again later. 😔",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-status">
            <div className="status-dot"></div>
            <h2 className="header-title">SootheAI</h2>
          </div>
          <p className="header-subtitle">Always here to help 🎀</p>
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender}`}
            >
              {/* Use ReactMarkdown to parse Markdown responses */}
              <div className={`message ${message.sender}`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="input-form">
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
