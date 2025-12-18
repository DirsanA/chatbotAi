
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Simple AI (OpenRouter)</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="4"
        style={{ width: "100%" }}
      />

      <button onClick={sendMessage}>Ask AI</button>

      <p><strong>AI:</strong> {reply}</p>
    </div>
  );
}

export default App;
