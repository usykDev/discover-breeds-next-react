import React, { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        onSearch(value);
      }, 500)
    );
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <form className="flex w-full justify-center">
      <input
        type="text"
        placeholder="Search for an animal"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="py-3 px-5 w-full md:w-3/6 text-xl border rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-200 border-gray-100 transition-transform"
      />
    </form>
  );
};

export default Search;
