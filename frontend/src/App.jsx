import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setStatus("online");
        setMessage(data.status || "ok");
      } catch (error) {
        setStatus("offline");
        setMessage(error instanceof Error ? error.message : "unknown error");
      }
    };

    checkHealth();
  }, []);

  return (
    <main className="container">
      <h1>Sample App</h1>
      <p className="subtitle">Frontend to backend health check</p>
      <div className={`badge badge-${status}`}>
        Backend: {status}
      </div>
      <p className="detail">Response: {message || "pending"}</p>
      <p className="hint">Set VITE_API_URL if your backend runs elsewhere.</p>
    </main>
  );
}

export default App;
