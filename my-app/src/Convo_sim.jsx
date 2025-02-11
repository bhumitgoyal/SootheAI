import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ScenarioSelection = ({
  selectedScenario,
  onSelect,
  onStart,
  scenarios,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Choose Your Scenario
      </h3>

      <div className="space-y-3 mb-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario}
            onClick={() => onSelect(scenario)}
            className={`cursor-pointer p-4 rounded-lg border transition-colors duration-200 
              ${
                selectedScenario === scenario
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{scenario}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {scenario === "Workplace Negotiation"
                    ? "Practice negotiating salary and workplace concerns"
                    : "Learn to handle and resolve conflicts professionally"}
                </p>
              </div>
              {selectedScenario === scenario && (
                <svg
                  className="w-5 h-5 text-pink-500"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        disabled={!selectedScenario}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
          ${
            selectedScenario
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
      >
        {selectedScenario ? "Start Scenario" : "Please Select a Scenario"}
      </button>
    </div>
  );
};

const ConvoSim = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const scenarios = ["Workplace Negotiation", "Conflict Resolution"];

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

  const handleScenarioSelect = async () => {
    if (!selectedScenario) return;

    try {
      const response = await fetch("https://ai-22-3.onrender.com/select_scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user12345",
          scenario_id: selectedScenario,
          difficulty:
            selectedScenario == "Workplace Negotiation" ? "Junior" : "Peer",
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to select scenario: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Scenario selection response:", data);

      setChatStarted(true);
      setMessages([
        { id: 1, text: "Scenario started! Let's chat.", sender: "bot" },
      ]);

      const startSceneResponse = await fetch(
        "https://ai-22-3.onrender.com/start_scene",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "user12345",
            scenario_id: selectedScenario,
            difficulty:
              selectedScenario == "Workplace Negotiation" ? "Junior" : "Peer",
          }),
        }
      );

      if (!startSceneResponse.ok) {
        const errorMessage = await startSceneResponse.text();
        throw new Error(`Failed to start scene: ${errorMessage}`);
      }

      const startSceneData = await startSceneResponse.json();
      console.log("Start scene response:", startSceneData);
    } catch (error) {
      console.error("Error:", error);
    }
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
      const response = await fetch("https://ai-22-3.onrender.com/chat_scene", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user12345", message: inputText }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { id: messages.length + 2, text: data.content, sender: "bot" },
        ]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Error: Failed to get response",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-pink-500 p-4 text-white">
          <h2 className="text-xl font-bold text-center">
            Conversation Simulator
          </h2>
          <p className="text-sm text-center opacity-90">
            Practice having the hard conversations.
          </p>
        </div>

        <div className="h-[600px] flex flex-col">
          {!chatStarted ? (
            <ScenarioSelection
              selectedScenario={selectedScenario}
              onSelect={setSelectedScenario}
              onStart={handleScenarioSelect}
              scenarios={scenarios}
            />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSend} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvoSim;
