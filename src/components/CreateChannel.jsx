

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateChannel() {
  const navigate = useNavigate();

  // Form state
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelIcon, setChannelIcon] = useState(""); // for image URL
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // assuming JWT is stored in localStorage

      const res = await fetch("http://localhost:5000/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT for auth
        },
        body: JSON.stringify({ channelName, description, channelIcon }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        alert("Channel created successfully!");
        navigate(`/channel/${data.channel._id}`);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-4 sm:mx-auto  p-6 border rounded shadow bg-white mt-20 sm:p-8">

<h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Create Channel
      </h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Channel Name */}
        <div>
          <label className="block mb-1 font-semibold">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            placeholder="Enter your channel name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            placeholder="Write about your channel"
            rows="3"
          />
        </div>

        {/* Channel Icon */}
        <div>
          <label className="block mb-1 font-semibold">Channel Icon URL</label>
          <input
            type="text"
            value={channelIcon}
            onChange={(e) => setChannelIcon(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            placeholder="Enter image URL"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
}
