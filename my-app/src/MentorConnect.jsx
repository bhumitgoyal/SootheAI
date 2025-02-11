import React, { useState } from "react";

const MentorConnect = () => {
  const [responses, setResponses] = useState({
    stress: "",
    emotions: "",
    sleep: "",
    support: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [mentorMatch, setMentorMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      // Start the session if we're on the first question
      if (currentStep === 0) {
        await fetch("https://ai-22-3.onrender.com/start_mentor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Send the current response
      const response = await fetch("https://ai-22-3.onrender.com/ask_mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "newuser",
          message: Object.values(responses)[currentStep],
        }),
      });

      const data = await response.json();

      // If we have a mentor match, show it
      if (data.Category && data.Mentor) {
        setMentorMatch(data);
      }

      // Move to next question if available
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const questions = [
    {
      icon: "psychology",
      color: "purple",
      question: "How would you rate your current stress level?",
      field: "stress",
    },
    {
      icon: "sentiment_very_satisfied",
      color: "blue",
      question: "What emotions are you experiencing right now?",
      field: "emotions",
    },
    {
      icon: "bedtime",
      color: "indigo",
      question: "Tell us about your sleep patterns lately.",
      field: "sleep",
    },
    {
      icon: "support_agent",
      color: "violet",
      question: "What kind of support are you looking for?",
      field: "support",
    },
  ];

  if (mentorMatch) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Your Therapist Match</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Category: {mentorMatch.Category}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">Name: {mentorMatch.Mentor.name}</p>
                <p className="text-gray-700">
                  Contact: {mentorMatch.Mentor.contact}
                </p>
              </div>
            </div>
            <p className="text-center text-gray-600">
              Your therapist will contact you shortly to schedule your first
              session.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-100">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-full max-w-4xl bg-gradient-to-br from-pink-50 to-pink-50 p-8 rounded-xl shadow-lg mx-auto">
          <div className="space-y-8">
            <header className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                Connect to a therapist
              </h1>
              <p className="text-gray-600">
                Let's understand how you're feeling to connect you with the
                right therapist
              </p>
            </header>

            <div className="space-y-6">
              {questions.map((q, index) => (
                <div
                  key={q.field}
                  className="flex items-start gap-4"
                  style={{ display: index === currentStep ? "flex" : "none" }}
                >
                  <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
                    <p className="font-medium text-gray-700 mb-4">
                      {q.question}
                    </p>
                    <textarea
                      className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-${q.color}-300 focus:border-${q.color}-300 transition-all duration-300 resize-none`}
                      rows="3"
                      placeholder="Share your thoughts here..."
                      value={responses[q.field]}
                      onChange={(e) =>
                        handleInputChange(q.field, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full bg-gradient-to-r from-pink-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
              onClick={handleContinue}
              disabled={!responses[questions[currentStep].field] || isLoading}
            >
              {isLoading ? "Processing..." : "Continue"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Your responses are confidential and will help us match you with
              the most suitable therapist
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorConnect;
