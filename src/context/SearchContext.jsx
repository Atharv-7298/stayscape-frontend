import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <SearchContext.Provider
      value={{ searchLocation, setSearchLocation }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
