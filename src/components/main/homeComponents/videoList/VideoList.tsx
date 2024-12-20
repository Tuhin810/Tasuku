import { useEffect, useRef, useState } from "react";
import {
  IconSearch,
  IconDownload,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { fetchFromAPI } from "../../../../utils/api/fetchFromAPI";
import Loader from "../../../shared/loaders/loader1/Loder";
import AddVideoTodo from "../../../shared/addVideoTodo/AddVideoTodo";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const parentRef: any = useRef(null);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setVideos([]);
      return;
    } // Prevent searching with empty terms
    setLoading(true);
    setVideos([]);
    try {
      const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
      setVideos(data.items || []); // Ensure `items` exists and update state
      // console.log("=======>videos", data?.items[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (parentRef.current) {
      setIsScrolled(parentRef.current.scrollTop > 0); // Check scrollTop of the parent element
    }
  };

  useEffect(() => {
    const parentElement = parentRef.current;
    if (parentElement) {
      parentElement.addEventListener("scroll", handleScroll);
      return () => {
        parentElement.removeEventListener("scroll", handleScroll); // Cleanup
      };
    }
  }, []);

  return (
    <div
      ref={parentRef} // Attach ref to the parent container
      className="hidden md:inline h-auto w-2/5 max-h-screen overflow-y-auto pl-8 text-white hideScroll"
    >
      <div
        className={`flex items-center gap-2 bg-gray-800 rounded-xl p-3 mb-6 sticky top-0 z-[20] ${
          isScrolled ? "shadow-xl shadow-[#0d0d0d]" : ""
        }`}
      >
        <IconSearch className="text-gray-400" size={24} />
        <input
          type="text"
          placeholder="Search videos from YouTube ad-free"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
        />
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-2 ">
        {loading && <Loader />}
        {videos.map((video: any) => (
          <>
            {" "}
            {video?.id.videoId && (
              <Link
                to={
                  video?.id.videoId
                    ? `/video/${video?.id.videoId}`
                    : `/video/cV2gBU6hKfY`
                }
                onClick={() =>
                  console.log("=====>vodeolink", video?.id?.videoId)
                }
                key={video.id.videoId}
                className="cursor-pointer hover:bg-gray-800 overflow-hidden rounded-lg transition-all duration-500 ease-in-out"
              >
                <div className="relative rounded-lg overflow-hidden group">
                  {/* Thumbnail Image */}
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-32 object-cover"
                  />

                  {/* Gradient Overlay */}
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
                  <h3 className="text-xs font-semibold">
                    {video.snippet.title.length > 30
                      ? `${video.snippet.title.slice(0, 30)}...`
                      : video.snippet.title}
                  </h3>

                  <div className="flex justify-start items-center gap-4 mt-2">
                    {/* Bookmark Icon */}
                    <AddVideoTodo vdolink={video?.id?.videoId} />
                    {/* <button
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  title="Bookmark"
                >
                  <IconBookmarkPlus size={20} />
                </button> */}
                    {/* Download Icon */}
                    <button
                      className="text-gray-400 hover:text-green-400 transition-colors"
                      title="Download"
                    >
                      <IconDownload size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
