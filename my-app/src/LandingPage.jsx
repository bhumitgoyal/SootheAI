import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg
            className="w-8 h-8 text-pink-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h1 className="text-4xl font-bold text-pink-600">Soothe</h1>
        </div>
        <p className="text-lg text-pink-400">
          Your Mentally Ill Companion for High-Stress Careers
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          to="/journal"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            📝
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Journal Entry
          </h2>
          <p className="text-gray-600 relative z-10">
            Express your thoughts and feelings in a safe, private space designed
            for self-reflection.
          </p>
        </Link>

        <Link
          to="/talktosoothe"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            💭
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Talk to Soothe
          </h2>
          <p className="text-gray-600 relative z-10">
            Connect with our AI-powered companion for immediate emotional
            support and guidance.
          </p>
        </Link>

        <Link
          to="/dashboard"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            📊
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Wellness Dashboard
          </h2>
          <p className="text-gray-600 relative z-10">
            Track your mental health journey with personalized insights and
            progress metrics.
          </p>
        </Link>
        <Link
          to="/conversationsim"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            👥
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Conversation Simulator
          </h2>
          <p className="text-gray-600 relative z-10">
            Practice the hard conversations online. Girlboss irl.
          </p>
        </Link>
        <Link
          to="/therapistconnect"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            🤝
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Therapist Connect
          </h2>
          <p className="text-gray-600 relative z-10">
            Matches you with the right specialists based on your emotions,
            stress levels, and personal preferences.
          </p>
        </Link>
        <Link
          to="/taskplan"
          className="no-underline text-inherit bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
          <span className="text-4xl text-pink-500 mb-4 group-hover:text-pink-600 relative z-10 block">
            📅
          </span>
          <h2 className="text-2xl font-semibold mb-2 relative z-10">
            Task Planner
          </h2>
          <p className="text-gray-600 relative z-10">
            Intelligently prioritizes your tasks dynamically based on your
            emotional state and mental bandwidth.
          </p>
        </Link>
      </div>

      <footer className="mt-12 text-center">
        <Link to="/dashboard" className="inline-block no-underline">
          <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 relative group">
            <span className="relative z-10">Start Your Journey Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
