import React, { useState } from "react";

const TaskPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: Date.now(),
      },
    ]);

    setNewTask({
      title: "",
      description: "",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  const generateSchedule = async () => {
    if (tasks.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Sending request to backend...");

      const response = await fetch("http://localhost:5000/plan-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: "newuser",
          tasks: tasks,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid schedule format received from server");
      }

      // Assign unique IDs if not present
      const formattedTasks = data.map((task, index) => ({
        ...task,
        id: task.id ?? Date.now() + index, // Ensure each task has an ID
      }));

      setTasks(formattedTasks);
    } catch (err) {
      console.error("Full error:", err);
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const removeTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-pink-800 mb-2">
          Mind & Task Organizer
        </h1>
        <p className="text-pink-600">
          Your personal space to organize thoughts and tasks
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Task title"
            className="w-full mb-3 p-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-500"
          />
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Task description"
            className="w-full h-32 mb-3 p-3 border border-pink-200 rounded-lg resize-none focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={addTask}
            disabled={!newTask.title.trim()}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed transition-colors"
          >
            Add Task
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Task List</h2>
            <button
              onClick={generateSchedule}
              disabled={loading || tasks.length === 0}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Schedule"}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={task.id || index}
                  className="p-4 border border-pink-200 rounded-lg group hover:border-pink-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{task.title}</h3>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-pink-400 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm mt-2 text-gray-600">
                    {task.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No tasks added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPlanner;
