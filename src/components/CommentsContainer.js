import React from "react";

const commentsData = [
  {
    name: "Siddharth",
    text: "Nice Video",
    replies: [
      {
        name: "Harsh",
        text: "Awesome Video",
      },
      {
        name: "Raj",
        text: "Very Nice Video",
      },
      {
        name: "Naman",
        text: "Perfect",
        replies: [
          {
            name: "Harsh",
            text: "Awesome Video",
          },
          {
            name: "Raj",
            text: "Very Nice Video",
            replies: [
              {
                name: "Harsh",
                text: "Awesome Video",
              },
              {
                name: "Raj",
                text: "Very Nice Video",
              },
              {
                name: "Naman",
                text: "Perfect",
              },
            ],
          },
          {
            name: "Naman",
            text: "Perfect",
          },
        ],
      },
    ],
  },
  {
    name: "Harsh",
    text: "Awesome Video",
    replies: [
      {
        name: "Harsh",
        text: "Awesome Video",
      },
      {
        name: "Raj",
        text: "Very Nice Video",
      },
      {
        name: "Songkiat",
        text: "Perfect",
      },
    ],
  },
  {
    name: "Raj",
    text: "Very Nice Video",
  },
  {
    name: "Dev",
    text: "Perfect",
    replies: [
      {
        name: "Raj",
        text: "Very Nice Video",
        replies: [
          {
            name: "Harsh",
            text: "Awesome Video",
          },
          {
            name: "Raj",
            text: "Very Nice Video",
          },
          {
            name: "Kaushik",
            text: "Perfect",
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg my-1 sm:my-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors w-full overflow-hidden">
      <img
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
        alt="comment-user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4za-gwBM2h9DeD08Vz3NmcPzrbNo4fLDS6g&usqp=CAU"
      />
      <div className="ml-2 sm:ml-3 flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">{name}</p>
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed break-words">{text}</p>
        <div className="flex items-center mt-1 sm:mt-2 space-x-2 sm:space-x-4">
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center space-x-1">
            <span>👍</span>
            <span className="hidden sm:inline">Like</span>
          </button>
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center space-x-1">
            <span>👎</span>
            <span className="hidden sm:inline">Dislike</span>
          </button>
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  if (!Array.isArray(comments)) {
    return null;
  }

  return comments.map((comment, index) => (
    <div key={index} className="mb-2 sm:mb-3 w-full">
      <Comment data={comment} />
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-3 sm:ml-6 pl-2 sm:pl-4 border-l-2 border-gray-200 dark:border-gray-600 mt-1 sm:mt-2">
          <CommentsList comments={comment.replies} />
        </div>
      )}
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-lg w-full overflow-hidden">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Comments</h2>
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span>{commentsData.length} comments</span>
          <button className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white">
            <span>📊</span>
            <span className="hidden sm:inline">Sort by</span>
          </button>
        </div>
      </div>
      <div className="space-y-1 sm:space-y-2 w-full">
        <CommentsList comments={commentsData} />
      </div>
    </div>
  );
};

export default CommentsContainer;
