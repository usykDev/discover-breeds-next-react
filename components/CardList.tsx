"use client"; // Indicates that this component is a client component

import React from "react";
import { useRouter } from "next/navigation";
import { AnimalCard } from "@/app/types/AnimalCard";

interface CardProps {
  image: string;
  name: string;
  handleClick: () => void;
}

interface CardListProps {
  cards: AnimalCard[];
  loading: boolean;
  error: string | null;
}

const Card: React.FC<CardProps> = ({ image, name, handleClick }) => {
  return (
    <div
      className="flex-1 cursor-pointer break-inside-avoid rounded-lg border border-gray-100 shadow-md transition-transform hover:scale-105 p-6 pb-4 backdrop-blur-md md:w-full w-full h-[375px]"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start gap-5 h-full">
        <div className="flex-1 flex justify-center items-center gap-3 cursor-pointer">
          <div className="flex items-center flex-col gap-3">
            <h3 className="text-gray-900 font-medium">{name}</h3>

            {image && (
              <img
                src={image}
                alt={`${name} image`}
                className="object-cover rounded-lg h-64 w-72"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardList: React.FC<CardListProps> = ({ cards, loading, error }) => {
  const router = useRouter();

  const handleClick = (id: number | string, type: "dog" | "cat") => {
    if (type === "dog") router.push(`/breed/dog/${id}`);
    if (type === "cat") router.push(`/breed/cat/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading && <div className="flex justify-center text-xl">Loading...</div>}
      {error && <div className="text-red-500 text-xl">{error}</div>}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {cards &&
          cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              name={card.name}
              handleClick={() => handleClick(card.id, card.type)}
            />
          ))}
      </div>
    </div>
  );
};

export default CardList;
