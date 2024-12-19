import {
  IconAlignBoxLeftTopFilled,
  IconLink,
  IconBookmark,
  IconBookmarkFilled,
  IconBookmarkPlus,
} from "@tabler/icons-react";
import React, { useState, useContext } from "react";
import { TodoContext } from "../../../context/todoProvider";

const TodoCards = ({ todo }: any) => {
  const { toggleBookmark } = useContext(TodoContext); // Use toggleBookmark from context
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <div className="card bg-gray-800 shadow-md rounded-xl p-3 text-white text-sm max-w-xs relative">
      {/* Bookmark Icon */}
      <button
        onClick={() => toggleBookmark(todo.id)} // Call toggleBookmark on click
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Bookmark"
      >
        {todo.bookmark ? (
          <IconBookmarkFilled
            size={20}
            stroke={1.5}
            className={`${
              todo.bookmark ? "text-yellow-400" : "text-gray-400"
            } hover:text-yellow-500`}
          />
        ) : (
          <IconBookmarkPlus
            size={20}
            stroke={1.5}
            className={`${
              todo.bookmark ? "text-yellow-400" : "text-gray-400"
            } hover:text-yellow-500`}
          />
        )}
      </button>

      {/* Title */}
      <h3 className="text-base font-bold flex items-center mb-2">
        <IconAlignBoxLeftTopFilled stroke={2} className="mr-2 text-gray-400" />
        {todo.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3">{todo.details}</p>

      {/* Display Images */}
      {todo.images && todo.images.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold mb-2">Images:</h4>
          {!showAllImages ? (
            <div className="grid grid-cols-2 gap-1">
              {/* First Image */}
              <img
                src={
                  typeof todo.images[0] === "string"
                    ? todo.images[0]
                    : URL.createObjectURL(todo.images[0])
                }
                alt="Todo First Image"
                onClick={() =>
                  openModal(
                    typeof todo.images[0] === "string"
                      ? todo.images[0]
                      : URL.createObjectURL(todo.images[0])
                  )
                }
                className="w-full h-16 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* "Show More" Box */}
              {todo.images.length > 1 && (
                <div
                  onClick={toggleShowAllImages}
                  className="w-full h-16 flex items-center justify-center bg-gray-700 text-xs font-semibold rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Show More
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {todo.images.map((image: File | string, index: number) => {
                const imageUrl =
                  typeof image === "string"
                    ? image
                    : URL.createObjectURL(image);
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Todo Image ${index + 1}`}
                    onClick={() => openModal(imageUrl)}
                    className="w-full h-16 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Display Links */}
      <div className="mt-2">
        <h4 className="text-xs font-semibold mb-2">Links:</h4>
        {todo.links.map((link: string, index: number) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:underline text-xs mb-1"
          >
            <IconLink size={14} className="mr-1 text-gray-600" />
            &nbsp; Link {index + 1}
          </a>
        ))}
      </div>

      {/* Calendar Date */}
      <div className="flex items-center mt-3 text-xs text-gray-400">
        Due: {new Date(todo.calendarDate).toLocaleDateString()}
      </div>

      {/* Modal for Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="relative p-3 bg-gray-900 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected Todo"
              className="max-w-full max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCards;
