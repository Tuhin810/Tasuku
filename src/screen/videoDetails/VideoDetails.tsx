import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchFromAPI } from "../../utils/api/fetchFromAPI";
import Loader from "../../components/shared/loaders/loader1/Loder";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState<any>(null);
  const [, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data: any) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Video Player Section */}
        <div className="flex-1 p-4">
          <div className="sticky top-16">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="w-full h-64 md:h-96"
              controls
            />
            <h1 className="text-2xl font-bold mt-4">{title}</h1>
            <div className="flex justify-between items-center mt-2">
              <Link
                to={`/channel/${channelId}`}
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                {channelTitle}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 16 8A8 8 0 0 0 8 0zm0 1.333a6.667 6.667 0 1 1-6.667 6.667A6.667 6.667 0 0 1 8 1.333zM8 12a.667.667 0 1 0 .667.667A.667.667 0 0 0 8 12zm-.667-4.667a.667.667 0 0 0-.666.667v2a.667.667 0 0 0 1.333 0v-2a.667.667 0 0 0-.667-.667z" />
                </svg>
              </Link>
              <div className="flex gap-4 text-sm text-gray-400">
                <p>{parseInt(viewCount).toLocaleString()} views</p>
                <p className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                  </svg>
                  {parseInt(likeCount).toLocaleString()} likes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Videos Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
          {/* <Videos videos={videos} direction="column" /> */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
