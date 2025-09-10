import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Comments Component
 * -------------------
 * Handles fetching, displaying, adding, editing, and deleting comments for a video.
 * Props:
 *   - videoId: ID of the video for which comments are displayed.
 */
export default function Comments({ videoId }) {
  // State for all fetched comments
  const [comments, setComments] = useState([]);

  // State for adding a new comment
  const [newComment, setNewComment] = useState("");

  // State to track which comment is being edited
  const [editingCommentId, setEditingCommentId] = useState(null);

  // State to hold the text of the comment being edited
  const [editText, setEditText] = useState("");

  // Logged-in user info from localStorage (email is used as username)
  const storedUsername = localStorage.getItem("email");

  // Navigation hook to redirect users if needed (e.g., to login page)
  const navigate = useNavigate();

  /**
   * useEffect hook runs whenever videoId changes.
   * It fetches all comments for the current video.
   */
  useEffect(() => {
    if (!videoId) return; // Don't fetch if no videoId provided
    fetchComments();
  }, [videoId]);

  /**
   * Fetch comments from the backend API.
   * Sort comments chronologically based on creation time.
   */
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos/${videoId}/comments`
      );

      // Sort comments so oldest is first (change to descending if needed)
      const sortedComments = res.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setComments(sortedComments); // Update state with sorted comments
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  /**
   * Handle adding a new comment.
   * Redirects to login if user is not signed in.
   */
  const handleAddComment = async () => {
    if (!storedUsername) {
      // If not logged in, redirect to login page
      navigate("/login");
      return;
    }

    // Prevent empty or whitespace-only comments
    if (!newComment.trim()) return;

    try {
      // Send POST request to backend to add a comment
      await axios.post(
        `http://localhost:5000/api/videos/${videoId}/comments`,
        {
          userId: storedUsername, // The comment will store the user's email as ID
          text: newComment,
        }
      );

      // Clear input box
      setNewComment("");

      // Refresh comments list to include the new comment
      fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  /**
   * Handle deleting a comment.
   * Only the comment owner can delete their comment.
   */
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/${videoId}/comments/${commentId}`
      );

      // Refresh the list after deletion
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  /**
   * Handle saving changes when editing a comment.
   */
  const handleEditComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/videos/${videoId}/comments/${commentId}`,
        { text: editText } // Send updated text to the backend
      );

      // Reset editing states
      setEditingCommentId(null);
      setEditText("");

      // Refresh comments to show updated text
      fetchComments();
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  return (
    <div className="mt-8">
      {/* Section Header */}
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* Input area to add a new comment */}
      <div className="flex gap-3 mb-6">
        {/* User avatar placeholder */}
        <div>
          <p className="bg-red-400 px-3 rounded-full text-2xl py-1">
            {/* Show first letter of username or 'U' if not logged in */}
            {storedUsername ? storedUsername.charAt(0).toUpperCase() : "U"}
          </p>
        </div>

        {/* Comment input box */}
        <div className="flex-1">
          <input
            type="text"
            className="border-b border-gray-300 w-full p-2 outline-none focus:border-black"
            placeholder={
              storedUsername ? "Add a comment..." : "Sign in to comment"
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!storedUsername} // Disable if user not logged in
          />
          <div className="flex justify-end mt-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
              onClick={handleAddComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {/* Show placeholder text if no comments */}
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet</p>
        )}

        {/* Map through each comment and render it */}
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            {/* Avatar using first letter of userId */}
            <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">
              {comment.userId.charAt(0).toUpperCase()}
            </div>

            {/* Comment Content Section */}
            <div className="flex-1">
              {/* Username and timestamp */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{comment.userId}</span>
                <span className="text-gray-500 text-xs">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              {/* If editing, show input box for editing */}
              {editingCommentId === comment._id ? (
                <div>
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mt-1"
                    onClick={() => handleEditComment(comment._id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-500 ml-2"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditText("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Otherwise, show the comment text
                <p className="text-gray-800 mb-5">{comment.text}</p>
              )}

              {/* Show Edit/Delete buttons only if the comment belongs to the current user */}
              {comment.userId === storedUsername && (
                <div className="flex gap-2 mt-1">
                  <button
                    className="text-blue-500 text-xs"
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditText(comment.text);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 text-xs"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
