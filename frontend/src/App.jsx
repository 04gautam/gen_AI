import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [response, setResponse] = useState("Ask to AI");
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [chat, setChat] = useState([]); //  New state to store chat history

  async function handleSubmit() {
    try {
      if (question.length === 0) {
        return alert("Write something");
      }

      // Add user message to chat stack
      const userMessage = { sender: "user", text: question };
      setChat((prev) => [...prev, userMessage]);

      const res = await axios.post("https://gen-ai-ruby.vercel.app/ai/response", {
        data: question,
      });

      setResponse(res.data.message);
      setAsked(res.data.question);

      // Add AI response to chat stack
      const aiMessage = { sender: "ai", text: res.data.message };
      setChat((prev) => [...prev, aiMessage]);

      // Clear input
      setQuestion("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
    
        <header className="p-4 border-b  border-gray-700 text-center text-xl font-bold tracking-wide bg-[#121212] shadow-md">
        STARK.AI Chatbot
      </header>
     
      

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#0a0a0a] to-[#111] backdrop-blur-sm">
        {chat.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Start a conversation with <span className="text-green-400">STARK.AI</span> 💬
          </p>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3  rounded-2xl shadow-md transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-gray-800 text-white rounded-br-none"
                  : "bg-gray-900/70 border mb-25 border-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              <span
                className={`block mb-1 text-sm font-semibold ${
                  msg.sender === "user" ? "text-red-400" : "text-green-400"
                }`}
              >
                {msg.sender === "user" ? "You:" : "STARK.AI:"}
              </span>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 right-0 left-0 border-t  border-gray-700 bg-[#121212] p-4">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          <input
            placeholder="Message STARK.AI..."
            className="flex-1 bg-[#1c1c1c] text-white rounded-xl border border-gray-600 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 transition-all px-4 py-2 rounded-xl text-black font-semibold shadow-md"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          STARK.AI can make mistakes — verify important info.
        </p>
      </div>
    </div>
  );
}

export default App;
