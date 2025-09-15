import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start shadow-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <img
        className="h-6 w-6 sm:h-8 sm:w-8 rounded-full flex-shrink-0"
        alt="user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4za-gwBM2h9DeD08Vz3NmcPzrbNo4fLDS6g&usqp=CAU"
      />
      <div className="ml-2 flex-1 min-w-0">
        <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">{name}</span>
        <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
