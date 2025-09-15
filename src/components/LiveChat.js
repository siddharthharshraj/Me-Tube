import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    dispatch(
      addMessage({
        name: "Siddharth",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };

  return (
    <>
      {/* Mobile Live Chat - Bottom Sheet Style */}
      <div className="lg:hidden">
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Live chat</h2>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-48 overflow-y-auto px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-2">
              {chatMessages.slice(-10).map((c, i) => (
                <ChatMessage key={i} name={c.name} message={c.message} />
              ))}
            </div>
          </div>
          <form className="flex items-center p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" onSubmit={handleSendMessage}>
            <input
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              placeholder="Say something..."
              value={liveMessage}
              onChange={(e) => setLiveMessage(e.target.value)}
            />
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              type="submit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Desktop Live Chat - Sidebar Style */}
      <div className="hidden lg:flex flex-col h-[400px] xl:h-[500px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Live chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
            ))}
          </div>
        </div>
        <form className="flex items-center p-3 border-t border-gray-200 dark:border-gray-700" onSubmit={handleSendMessage}>
          <input
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            type="text"
            placeholder="Say something..."
            value={liveMessage}
            onChange={(e) => setLiveMessage(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
