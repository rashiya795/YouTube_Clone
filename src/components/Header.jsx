// Import icons from react-icons library
import { GrYoutube } from "react-icons/gr";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { AiFillAudio } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

// Import custom hooks and React Router features
import { useSidebar } from "./SideBarProvider"; // Sidebar context for toggling sidebar state
import { Link, useLocation, useNavigate } from "react-router-dom"; // For navigation and current location
import { useEffect, useState } from "react"; // React hooks for state and side-effects
import { useSearch } from "./SearchContext"; // Custom context for search term

export default function Header() {
  // Sidebar toggle from context
  const { toggleSidebar } = useSidebar();

  // Update global search term using context
  const { setSearchTerm } = useSearch();

  // Local states for managing user and UI behavior
  const [username, setUsername] = useState(null);       // Logged-in user's email (or null)
  const [showMenu, setShowMenu] = useState(false);      // Toggle for user dropdown menu
  const [showCreateMenu, setShowCreateMenu] = useState(false); // Toggle for "Create" dropdown
  const [inputValue, setInputValue] = useState("");     // Input value for search bar
  const [channelExists, setChannelExists] = useState(false);   // Whether the user already has a channel
  const [userChannel, setUserChannel] = useState(null); // Store the user's channel details

  const location = useLocation(); // Track current URL path
  const navigate = useNavigate(); // Navigation helper

  // ------------------------
  // Function: Check if user already has a channel
  // ------------------------
  const checkUserChannel = async () => {
    const token = localStorage.getItem("token"); // Get auth token from localStorage
    if (!token) return; // If no token, stop here

    try {
      const res = await fetch("http://localhost:5000/api/channels/me", {
        headers: { Authorization: `Bearer ${token}` }, // Send token for authorization
      });

      if (res.ok) {
        // If request is successful, update state
        const data = await res.json();
        setChannelExists(true);
        setUserChannel(data);

        // Save channel details locally for quick access
        localStorage.setItem("channel", JSON.stringify(data));
      } else {
        // If not found or unauthorized, reset state
        setChannelExists(false);
        setUserChannel(null);
        localStorage.removeItem("channel");
      }
    } catch (err) {
      // Log any network or server errors
      console.error("Error fetching channel:", err);
      setChannelExists(false);
      setUserChannel(null);
    }
  };

  // ------------------------
  // Effect: Runs whenever URL path changes
  // ------------------------
  useEffect(() => {
    const storedUsername = localStorage.getItem("email"); // Retrieve stored username (email)
    if (storedUsername) setUsername(storedUsername);

    // Check channel existence each time page changes
    checkUserChannel();
  }, [location.pathname]);

  // ------------------------
  // Function: Logout handler
  // ------------------------
  const handleLogout = () => {
    // Remove user info from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUsername(null);
    setChannelExists(false);
    setUserChannel(null);
  };

  // ------------------------
  // Function: Search handler
  // ------------------------
  const handleSearch = () => {
    setSearchTerm(inputValue); // Update search term in context
  };

  // ------------------------
  // Function: Navigate to user's channel page
  // ------------------------
  const handleClickYourChannel = () => {
    if (userChannel) {
      navigate(`/channel/${userChannel._id}`); // Redirect to channel using its ID
    }
  };

  // ------------------------
  // JSX: Header UI
  // ------------------------
  return (
    <>
      <header className="flex sticky top-0 left-0 right-0 z-50  flex-row gap-2 lg:px-4 lg:py-2 justify-around">
        {/* Sidebar toggle button (hamburger icon) */}
        <button onClick={toggleSidebar} className="px-2 py-1 lg:text-2xl">
          <RxHamburgerMenu />
        </button>

        {/* YouTube Logo Section */}
        <div className="flex">
          <div className="text-red-600 text-2xl lg:text-3xl py-2">
            <GrYoutube />
          </div>
          <div className="lg:text-3xl lg:font-extrabold font-bold font-mono tracking-tighter py-2">
            YouTube
            <sup className="align-super font-light text-xs font-sans tracking-tight py-2">
              IN
            </sup>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="flex lg:w-[60%] py-2">
          {/* Text input for search */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search something"
            className="w-full hidden md:flex px-5 py-2 border border-gray-300 rounded-l-full focus:outline-none"
          />
          {/* Search button */}
          <button
            onClick={handleSearch}
            className="lg:px-2 lg:py-1 px-2 py-2 bg-gray-200 border border-gray-200 hover:bg-gray-300 
                      rounded-full md:px-5 md:py-2 
                      lg:rounded-r-full lg:rounded-l-none"
          >
            <CiSearch className="lg:text-xl" />
          </button>
        </div>

        {/* Microphone Button (for voice search) */}
        <button className="bg-gray-200 w-10 h-12 hover:bg-gray-300 rounded-full hidden md:flex justify-center items-center">
          <AiFillAudio className="text-2xl font-bold" />
        </button>

        {/* Right Section Buttons */}
        <div className="flex justify-around items-center gap-2 lg:gap-5">
          {/* Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex px-1 py-1 text-base justify-center bg-gray-200 border border-gray-200 hover:bg-gray-300 items-center rounded-full lg:w-25 lg:h-9"
            >
              <span className="lg:text-2xl">
                <GoPlus />
              </span>
              Create
            </button>

            {/* Dropdown Menu for Create button */}
            {showCreateMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 z-50">
                {/* Show different options based on whether user has a channel */}
                {!channelExists ? (
                  // Option to create a channel
                  <button
                    onClick={() => {
                      if (username) navigate("/create-channel");
                      else navigate("/login");
                      setShowCreateMenu(false);
                    }}
                    className="block w-full text-left lg:px-4 lg:py-2 hover:bg-gray-100"
                  >
                    Create Channel
                  </button>
                ) : (
                  // Option to upload a video
                  <button
                    onClick={() => {
                      if (username) navigate("/upload-video");
                      else navigate("/login");
                      setShowCreateMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Upload Video
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button className="hidden md:flex lg:text-3xl hover:bg-gray-300 rounded-full text-2xl">
            <CiBellOn />
          </button>

          {/* User Menu: Show profile initial or Sign In button */}
          {username ? (
            <div className="relative">
              {/* Circle with user's first letter */}
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-full bg-red-400 text-amber-50 px-3 py-1 text-2xl cursor-pointer"
              >
                {username.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown menu for user actions */}
              {showMenu && (
                <div className="absolute top-full px-4 py-5 z-50 mt-2 right-0 bg-gray-50 shadow-md flex flex-col gap-3 rounded-lg">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-red-400 text-amber-50 px-3 py-1 text-2xl">
                      {username.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {username}
                    </span>
                  </div>

                  {/* Link to user's channel if exists */}
                  {channelExists && (
                    <button
                      onClick={handleClickYourChannel}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Your Channel
                    </button>
                  )}

                  {/* Logout link */}
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="hover:bg-blue-50 text-blue-500 text-center"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // If not logged in, show Sign-in button
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full hover:bg-blue-50 border border-blue-400 w-[95px] h-9 text-blue-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
