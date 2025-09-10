
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useFilter } from "./FilterContext"; // Import context

export default function MainContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedFilter } = useFilter(); // Get selected category

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/videos");
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, []);

  if (loading) {
    return <p className="text-center">Loading videos...</p>;
  }
console.log("Selected Filter:", selectedFilter);
console.log("Video Categories:", data.map(v => v.category));
  //  Apply filter (if not All)
  const filteredData =
    selectedFilter === "All"
      ? data
      : data.filter((video) =>
(video.category || "").toLowerCase() === selectedFilter.toLowerCase()

      );

  return (
    <div className="w-full px-5 py-5 h-full sm:grid-cols-2 grid lg:grid-cols-3 gap-4">
      {filteredData.map((video) => (
        <Link
          key={video.videoId}
          to={`/watch/${video.videoId}`}
          state={video}
          className="flex flex-col px-2 py-2"
        >
          <div className="flex flex-col px-2 py-2">
            <div className="h-60 flex justify-start">
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-3 items-center mt-3">
              <img
                src={video.logo || "https://via.placeholder.com/40"}
                alt={video.uploader}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{video.title}</p>
                <p className="text-sm font-bold text-gray-800">{video.uploader}</p>
                <div className="flex gap-2 text-gray-500 text-xs">
                  <span>
                    {video.views >= 1000000
                      ? Math.floor(video.views / 1000000) + "M"
                      : video.views >= 1000
                      ? Math.floor(video.views / 1000) + "k"
                      : video.views}{" "}
                    views
                  </span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
