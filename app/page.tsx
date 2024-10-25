"use client";

import CardList from "@/components/CardList";
import { useState, useEffect } from "react";
import { AnimalCard } from "./types/AnimalCard";
import Search from "@/components/Search";
import { shuffleArray } from "@/utils/shuffleArray";

const Home: React.FC = () => {
  const [originalCards, setOriginalCards] = useState<AnimalCard[]>([]);
  const [cards, setCards] = useState<AnimalCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      // Getting cats info
      const responseCats = await fetch("/api/cats");
      if (!responseCats.ok) {
        throw new Error("responseCats is not ok");
      }
      const dataCats: AnimalCard[] = await responseCats.json();

      // Getting dogs info
      const responseDogs = await fetch("/api/dogs");
      if (!responseDogs.ok) {
        throw new Error("responseDogs is not ok");
      }
      const dataDogs: AnimalCard[] = await responseDogs.json();

      // combining dogs and cats
      const combinedAnimals = [...dataCats, ...dataDogs];
      const shuffledAnimals = shuffleArray(combinedAnimals);

      setOriginalCards(shuffledAnimals);
      setCards(shuffledAnimals);
    } catch (error) {
      console.error("Error fetching animal info:", error);
      setError("Failed to load animal information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const filterCards = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    const filteredCards = originalCards.filter((card) => regex.test(card.name));
    setCards(filteredCards.length > 0 ? filteredCards : originalCards);
  };

  return (
    <div>
      <section className="w-full flex flex-center flex-col gap-7">
        <p className="desc text-center text-2xl italic">
          You can find the breed information inside of these cards
        </p>

        <Search onSearch={filterCards} />

        <CardList cards={cards} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default Home;
