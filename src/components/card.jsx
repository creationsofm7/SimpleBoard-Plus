// Card Component
import EditableText from "./Edit";
import React, { useState, useRef, useEffect } from 'react';


const Card = ({
  id,
  title,
  content,
  position,
  onDragStart,
  isSupporting,
  setIsSupporting,
  onUpdate,
}) => {
  const onButtonClick = (e) => {
    e.stopPropagation();
    setIsSupporting(!isSupporting);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onUpdate(id, "delete");
  };

  return (
    <div
      className="absolute group cursor-move"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
      }}
      onMouseDown={onDragStart}
    >
      <div className="w-72 transform transition-all duration-300 hover:scale-105">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200">
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1 opacity-0 transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
          >
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
            <EditableText
              value={title}
              onChange={(newTitle) => onUpdate(id, "title", newTitle)}
              className="text-lg font-semibold text-white"
              isTitle={true}
            />
          </div>

          <div
            className={`relative min-h-[200px] p-4 transition-colors duration-300 ${
              isSupporting ? "bg-blue-50" : "bg-red-50"
            }`}
          >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform rounded-full bg-gradient-to-br from-blue-400 to-blue-300 opacity-10"></div>
            <EditableText
              value={content}
              onChange={(newContent) => onUpdate(id, "content", newContent)}
              className="relative z-10 text-white"
            />
          </div>

          <div className="p-4 pt-0">
            <button
              onClick={onButtonClick}
              className={`w-full transform rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300
                  ${
                    isSupporting
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="flex items-center justify-center">
                {isSupporting ? "Completed" : "Start"}
                <svg
                  className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
                    isSupporting ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;