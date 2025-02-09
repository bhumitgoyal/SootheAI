import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Battery, Brain, Heart } from "lucide-react";
import Journal from "./Journal";
import Chatbot from "./Chatbot";
import WellnessDashboard from "./WellnessDashboard";
import LandingPage from "./LandingPage";
import "./App.css";
import MentorConnect from "./MentorConnect";
import ConvoSim from "./Convo_sim";
import TaskPlanner from "./TaskPlanner";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-container">
          <Link to="/" className="nav-logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Soothe
          </Link>
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/journal" className="nav-link">
              Journal
            </Link>
            <Link to="/talktosoothe" className="nav-link">
              Talk to Soothe
            </Link>
            <Link to="/conversationsim" className="nav-link">
              Conversation Simulator
            </Link>
            <Link to="/therapistconnect" className="nav-link">
              Therapist Connect
            </Link>
            <Link to="/taskplan" className="nav-link">
              Task Planner
            </Link>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={<WellnessDashboard userId="newuser" />}
            />
            <Route path="/journal" element={<Journal />} />
            <Route path="/talktosoothe" element={<Chatbot />} />
            <Route path="/conversationsim" element={<ConvoSim />} />
            <Route path="/therapistconnect" element={<MentorConnect />} />
            <Route path="/taskplan" element={<TaskPlanner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
