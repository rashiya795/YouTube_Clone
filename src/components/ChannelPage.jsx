// Import React hooks and libraries
import { useEffect, useState } from "react"; // useEffect for side-effects, useState for local state
import { useParams } from "react-router-dom"; // To extract channelId from the URL
import axios from "axios"; // For making HTTP requests to backend

// ChannelPage component: Displays channel details and its videos
export default function ChannelPage() {
  // ------------------------
  // Extract channelId from the URL parameters
  // Example: /channel/123 → channelId = "123"
  // ------------------------
  const { channelId } = useParams();

  // ------------------------
  // Local state variables
  // ------------------------
  const [channel, setChannel] = useState(null); // Store channel information (name, icon, etc.)
  const [videos, setVideos] = useState([]); // Store videos associated with the channel

  // ------------------------
  // Fetch channel info from backend API when component mounts or channelId changes
  // ------------------------
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Make GET request to retrieve channel details
        const res = await axios.get(
          `http://localhost:5000/api/channels/${channelId}`
        );
        setChannel(res.data); // Save channel data in state
      } catch (err) {
        console.error(err); // Log any errors (e.g., network issues or invalid ID)
      }
    };

    fetchChannel(); // Call the function immediately
  }, [channelId]); // Dependency: re-run when channelId changes

  // ------------------------
  // Fetch videos for the channel whenever channelId changes
  // ------------------------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Make GET request to fetch all videos for the current channel
        const res = await axios.get(
          `http://localhost:5000/api/videos/channel/${channelId}`
        );
        setVideos(res.data); // Save the videos list in state
      } catch (err) {
        console.error(err); // Log errors (e.g., backend down or bad URL)
      }
    };

    fetchVideos(); // Call the function immediately
  }, [channelId]);

  // ------------------------
  // Display a loading message while channel data is being fetched
  // ------------------------
  if (!channel) return <p>Loading...</p>;

  // ------------------------
  // Render the UI once channel data is loaded
  // ------------------------
  return (
    <div className="p-6 space-y-6">
      {/* =======================
          CHANNEL HEADER SECTION
          ======================= */}
      <div className="flex items-center gap-6 border-b pb-6">
        {/* Channel Icon: shows uploaded icon or a placeholder */}
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
          <img
            src={channel.channelIcon || "https://via.placeholder.com/150"}
            alt="Channel Icon"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Channel Info: name, username, description, and action buttons */}
        <div className="flex-1">
          {/* Channel Name */}
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>

          {/* Owner Username (fallback to 'unknown' if missing) */}
          <p className="text-gray-500">@{channel.owner.username || "unknown"}</p>

          {/* Optional description if available */}
          {channel.description && (
            <p className="text-gray-600 mt-2">{channel.description}</p>
          )}

          {/* Action Buttons: Customize and Manage Videos */}
          <div className="flex items-center gap-4 mt-4">
            <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
              Customize channel
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
              Manage videos
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          VIDEOS SECTION
          ======================= */}
      <div>
        {/* Section Title */}
        <h2 className="text-xl font-semibold mb-4">Videos</h2>

        {/* If no videos exist, show a placeholder message */}
        {videos.length === 0 ? (
          <p className="text-gray-500">No videos uploaded yet.</p>
        ) : (
          // Grid layout for displaying video thumbnails
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="flex flex-col gap-2">
                {/* Video Thumbnail */}
                <div className="w-full h-40 bg-gray-200 overflow-hidden rounded-md">
                  <img
                    src={video.thumbnailUrl} // Thumbnail image for the video
                    alt={video.title} // Accessible alt text
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Video Title */}
                <h3 className="font-medium">{video.title}</h3>
                {/* Video Views (default to 0 if missing) */}
                <p className="text-sm text-gray-500">
                  {video.views || 0} views
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
