import { createContext, useContext, useState } from "react";

// Create a new context to store and share the filter state across components
const FilterContext = createContext();

// Provider component to wrap around parts of the app that need filter state
export function FilterProvider({ children }) {
  // State to keep track of the currently selected filter, default is "All"
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    // Provide the filter state and its updater function to all child components
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

// Custom hook to make using the context easier in other components
export function useFilter() {
  // Returns the context value (selectedFilter and setSelectedFilter)
  return useContext(FilterContext);
}
