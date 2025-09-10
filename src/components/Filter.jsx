import { useEffect, useState, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useFilter } from "./FilterContext"; // Import custom context for managing selected filter

export default function Filter() {
  // List of filter categories to display
  const filterList = [
    "All",
    "Podcasts",
    "Satire",
    "Comedy",
    "Music",
    "Gaming",
    "News",
    "Live",
    "Sports",
    "Movies",
    "Technology",
    "Fashion",
    "Mixes",
    "Thriller",
    "Watched",
    "New to you",
    "Television series"
  ];

  // Reference to the scrollable container for detecting and controlling scroll position
  const scrollRef = useRef(null);

  // State to control visibility of the left scroll button
  const [showLeft, setShowLeft] = useState(false);

  // State to control visibility of the right scroll button
  const [showRight, setShowRight] = useState(false);

  // Get the currently selected filter and the function to update it from context
  const { selectedFilter, setSelectedFilter } = useFilter();

  // Function to check scroll position and update button visibility
  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Show the left button only if not at the start
    setShowLeft(scrollLeft > 0);

    // Show the right button only if not at the end of the scrollable area
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Scroll the filter bar to the left
  const scrollLeftHandler = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Scroll the filter bar to the right
  const scrollRightHandler = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Set up event listener for scroll position on mount and clean up on unmount
  useEffect(() => {
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScroll); // Attach scroll listener
    checkScroll(); // Run once to set initial button visibility
    return () => el.removeEventListener("scroll", checkScroll); // Clean up listener on unmount
  }, []);

  return (
    <div className="relative w-full bg-white top-0 z-20 mb-4">
      {/* Left scroll button, shown only when showLeft is true */}
      {showLeft && (
        <button
          onClick={scrollLeftHandler}
          className="text-2xl rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-gray-300 px-2 py-2 bg-white"
        >
          <GoChevronLeft />
        </button>
      )}

      {/* Scrollable filter buttons container */}
      <div
        ref={scrollRef}
        className="flex gap-3 w-full p-4 overflow-x-auto scrollbar-hide scroll-smooth bg-white"
      >
        {filterList.map((list, index) => (
          <button
            key={index}
            onClick={() => setSelectedFilter(list)} // Update selected filter in context when clicked
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedFilter === list
                ? "bg-black text-white" // Highlight the active filter
                : "bg-gray-200 hover:bg-gray-300" // Default styling for inactive filters
            }`}
          >
            {list}
          </button>
        ))}
      </div>

      {/* Right scroll button, shown only when showRight is true */}
      {showRight && (
        <button
          onClick={scrollRightHandler}
          className="text-2xl rounded-full hover:bg-gray-300 px-2 py-2 absolute top-1/2 transform -translate-y-1/2 shadow-md bg-white right-4 z-10"
        >
          <GoChevronRight />
        </button>
      )}
    </div>
  );
}
