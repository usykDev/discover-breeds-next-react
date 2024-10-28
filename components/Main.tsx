"use client";

import React, { useState, useEffect } from "react";
import { AnimalCard } from "@/app/types/AnimalCard";
import CardList from "./CardList";

interface SearchProps {
  initialCards: AnimalCard[];
}

const Search: React.FC<SearchProps> = ({ initialCards }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredCards, setFilteredCards] =
    useState<AnimalCard[]>(initialCards);

  useEffect(() => {
    const results = initialCards.filter((card) =>
      card.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCards(results);
  }, [searchText, initialCards]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
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

      <CardList
        cards={filteredCards.length > 0 ? filteredCards : initialCards}
        loading={false}
        error={null}
        className={filteredCards.length === 0 ? "flex" : ""}
      />
    </>
  );
};

export default Search;
