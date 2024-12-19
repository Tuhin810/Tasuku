import React from "react";
import {
  IconSearch,
  IconBookmark,
  IconDownload,
  IconBookmarkPlus,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

const VideoList = () => {
  const dummyVideos = [
    {
      id: 1,
      title: "How to Learn React",
      thumbnail:
        "https://ergonotes.com/wp-content/uploads/2022/11/Find-YouTube-Thumbnail-Source.jpg",
    },
    {
      id: 2,
      title: "Introduction to Tailwind CSS",
      thumbnail:
        "https://media.licdn.com/dms/image/v2/C5612AQEMzoPCuAYC6Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1622889807362?e=2147483647&v=beta&t=LWQD_szpTTh-5KpBJmcMgh2YzLMMqQjbEQuz9rL9flw",
    },
    {
      id: 3,
      title: "Understanding JavaScript",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvs8y00ouW2NXOXmnloFzqfB_01ZEXUwjo4g&s",
    },
    {
      id: 2,
      title: "Introduction to Tailwind CSS",
      thumbnail:
        "https://media.licdn.com/dms/image/v2/C5612AQEMzoPCuAYC6Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1622889807362?e=2147483647&v=beta&t=LWQD_szpTTh-5KpBJmcMgh2YzLMMqQjbEQuz9rL9flw",
    },
    {
      id: 3,
      title: "Understanding JavaScript",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvs8y00ouW2NXOXmnloFzqfB_01ZEXUwjo4g&s",
    },
  ];

  return (
    <div className="hidden md:inline h-auto w-2/5 max-h-screen overflow-y-auto pl-8 text-white">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-3 mb-6">
        <IconSearch className="text-gray-400" size={24} />
        <input
          type="text"
          placeholder="Search videos from youtube add free"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-2">
        {dummyVideos.map((video) => (
          <div
            key={video.id}
            className=" cursor-pointer hover:bg-gray-800 overflow-hidden rounded-lg transition-all duration-500 ease-in-out"
          >
            <div className="relative rounded-lg overflow-hidden group">
              {/* Thumbnail Image */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover"
              />

              {/* Gradient Overlay - Always Visible */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <IconPlayerPlayFilled
                  size={30}
                  className="text-white opacity-90 group-hover:scale-150 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Video Details */}
            <div className="py-4 px-2">
              <h3 className="text-xs font-semibold">{video.title}</h3>
              <div className="flex justify-start items-center gap-4 mt-2">
                {/* Bookmark Icon */}
                <button
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  title="Bookmark"
                >
                  <IconBookmarkPlus size={20} />
                </button>
                {/* Download Icon */}
                <button
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  title="Download"
                >
                  <IconDownload size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
