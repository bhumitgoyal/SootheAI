import React, { useState } from "react";
import "./Journal.css";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [userId, setUserId] = useState("newuser"); // Example user ID, replace it dynamically

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entry.trim()) {
      alert("Please enter a journal entry.");
      return;
    }

    try {
      const response = await fetch("https://ai-22-3.onrender.com/store_journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          text: entry,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Journal entry submitted:", entry);
        alert("Journal entry saved successfully!");
        setEntry(""); // Clear input after successful submission
      } else {
        console.error("Error saving journal:", data.error);
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-container">
        <img src="./src/assets/journalimage.jpg"></img>
        <h1 className="journal-title">Journal Entry</h1>
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="input-group">
            <label htmlFor="journalEntry" className="input-label">
              Write your thoughts...
            </label>
            <textarea
              id="journalEntry"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="journal-textarea"
              placeholder="Dear Journal..."
            />
          </div>

          <button type="submit" className="submit-button">
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Journal;
