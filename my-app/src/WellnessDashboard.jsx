import React, { useEffect, useState } from "react";
import { Battery, Brain, Heart } from "lucide-react";

const WellnessDashboard = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ai-22-3.onrender.com/analyze_journal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
          throw new Error("No journal entries to analyze.");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading)
    return <p className="text-center text-gray-600">Loading... Please wait</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto bg-pink-50 rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Wellness Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Burnout Metrics & Cognitive Metrics */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-100 to-pink-300 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-pink-800">
              Burnout Metrics
            </h2>
            <div className="relative h-4 bg-gray-200 rounded-full mt-4">
              <div
                className="absolute h-full bg-pink-500 rounded-full"
                style={{
                  width: `${
                    data?.burnout_metrics?.overall_burnout_risk * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Cognitive Metrics */}
          <div className="bg-gradient-to-br from-pink-200 to-pink-400 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-pink-900">
              Cognitive Metrics
            </h2>
            {Object.entries(
              data?.cognitive_metrics?.cognitive_distortions || {}
            ).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between mt-2">
                <span className="capitalize text-pink-700">{key}</span>
                <div className="w-48 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-pink-600 rounded-full"
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional Metrics & Risk Flags */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-300 to-pink-500 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-pink-900">
              Emotional Metrics
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {Object.entries(
                data?.emotional_metrics?.primary_emotions || {}
              ).map(([emotion, value]) => (
                <div
                  key={emotion}
                  className="bg-white p-4 rounded-lg text-center"
                >
                  <p className="capitalize text-pink-700 font-semibold">
                    {emotion}
                  </p>
                  <p className="font-bold text-pink-900">
                    {Math.round(value * 100)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Flags */}
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-white">Risk Flags</h2>
            <ul className="list-disc list-inside text-white mt-4">
              {data?.risk_flags?.areas_of_concern?.map((item, index) => (
                <li key={index} className="capitalize">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
