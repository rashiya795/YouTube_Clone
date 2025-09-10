import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comment.jsx";
import { BiLike, BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";

/**
 * Content Component
 * -----------------
 * Displays a single video's player, title, channel info, action buttons,
 * and the comments section.
 */
export default function Content() {
  // useLocation hook is used to receive the video object passed from another page (e.g., homepage)
  const location = useLocation();

  // Retrieve the video object from location.state (it was sent during navigation)
  const video = location.state;

  // Retrieve logged-in user data from localStorage (if the user is logged in)
  const user = JSON.parse(localStorage.getItem("user"));

  // If for some reason the video data is not available, show an error message
  if (!video) return <p>Video not found!</p>;

  // Log the received video object to the console for debugging
  console.log("Video data:", video);

  // Likes and Dislikes states initialized from the video object (default to 0 if undefined)
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);

  /**
   * handleLike()
   * Increments the likes count locally.
   * You could also trigger an API call here to update the database.
   */
  const handleLike = () => {
    setLikes(likes + 1);
    // TODO: Make an API request to update the like count in your backend
  };

  /**
   * handleDislike()
   * Increments the dislikes count locally.
   * An API call can be added here to update dislikes on the server.
   */
  const handleDislike = () => {
    setDislikes(dislikes + 1);
    // TODO: Make an API request to update the dislike count in your backend
  };

  return (
    <div className="flex flex-col lg:flex-row px-4 mt-4">
      {/* Main video container */}
      <div className="w-full">
        {/* Embedded YouTube video player */}
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`} // Use the videoId from the passed video object
          className="w-full h-[400px] bg-black rounded-lg" // Responsive width, fixed height, and styling
          allowFullScreen // Allow fullscreen mode
          title={video.title} // Video title for accessibility
        />

        {/* Video title */}
        <h2 className="text-xl font-semibold mt-4">{video.title}</h2>

        {/* Channel info and action buttons section */}
        <div className="flex items-center justify-between mt-4">
          {/* Channel information (logo, uploader name, subscriber count, subscribe button) */}
          <div className="flex items-center space-x-3">
            {/* Channel logo - uses placeholder if logo is missing */}
            <img
              src={video.logo || "https://via.placeholder.com/40"}
              alt="Channel Logo"
              className="w-12 h-12 rounded-full"
            />
            {/* Uploader details */}
            <div>
              <p className="font-semibold">{video.uploader}</p>
              <p className="text-gray-500 text-sm">341K subscribers</p>
              {/* ^ Subscriber count is hardcoded for now */}
            </div>
            {/* Subscribe button */}
            <button className="bg-black text-white px-5 py-2 rounded-full ml-4 hover:bg-gray-800">
              Subscribe
            </button>
          </div>

          {/* Action Buttons: Like/Dislike, Share, Download */}
          <div className="flex items-center space-x-3">
            {/* Likes & Dislikes combined into one container */}
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              {/* Like button */}
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
              >
                {/* Like icon */}
                <BiLike size={30} />
                {/* Display current like count */}
                <span>{likes}</span>
              </button>

              {/* Divider line between Like and Dislike */}
              <div className="w-px bg-gray-300 h-6"></div>

              {/* Dislike button */}
              <button
                onClick={handleDislike}
                className="flex items-center px-4 py-2 hover:bg-gray-200"
              >
                <BiDislike size={30} />
                {/* Dislike count could also be displayed here if desired */}
              </button>
            </div>

            {/* Share Button */}
            <button className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 flex gap-1 justify-center items-center">
              <PiShareFat />
              Share
            </button>

            {/* Download Button */}
            <button className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 flex gap-1 justify-center items-center">
              <LiaDownloadSolid />
              Download
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {/* Pass the videoId and logged-in user's ID to the Comments component */}
        <Comments videoId={video.videoId} userId={user?._id} />
      </div>
    </div>
  );
}
