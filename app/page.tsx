import React from "react";
import { AnimalCard } from "./types/AnimalCard";
import Main from "@/components/Main";
import { shuffleArray } from "@/utils/shuffleArray";

async function fetchAnimals(): Promise<AnimalCard[]> {
  const apiKeyCats = process.env.CAT_API_KEY;
  const apiKeyDogs = process.env.CAT_API_KEY;

  const urlCats = "https://api.thecatapi.com/v1/breeds?limit=15";
  const urlDogs = "https://api.thedogapi.com/v1/breeds?limit=15";

  try {
    const [resCats, resDogs] = await Promise.all([
      fetch(urlCats, { headers: { "x-api-key": apiKeyCats || "" } }),
      fetch(urlDogs, { headers: { "x-api-key": apiKeyDogs || "" } }),
    ]);

    if (!resCats.ok || !resDogs.ok) {
      throw new Error("Failed to fetch data from cat or dog API");
    }

    const dataCats = await resCats.json();
    const dataDogs = await resDogs.json();

    const formattedCats: AnimalCard[] = dataCats.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      image: cat.image?.url || "",
      type: "cat",
    }));

    const formattedDogs: AnimalCard[] = await Promise.all(
      dataDogs.map(async (dog: any) => {
        const imageResponse = await fetch(
          `https://api.thedogapi.com/v1/images/search?breed_ids=${dog.id}&limit=1`,
          { headers: { "x-api-key": apiKeyDogs || "" } }
        );

        const imageData = await imageResponse.json();
        const imageUrl = imageData[0]?.url || "";

        return {
          id: dog.id,
          name: dog.name,
          image: imageUrl,
          type: "dog",
        };
      })
    );

    const combinedAnimals = shuffleArray([...formattedCats, ...formattedDogs]);
    return combinedAnimals;
  } catch (error) {
    console.error("Error fetching animal info:", error);
    throw new Error("Failed to load animal information.");
  }
}

const Home = async () => {
  let cards: AnimalCard[] = [];

  try {
    cards = await fetchAnimals();
  } catch (error) {
    console.error("Error loading animals:", error);
    return (
      <div className="text-red-500 text-xl">
        Failed to load animal information. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <section className="w-full flex flex-center flex-col gap-7">
        <p className="desc text-center text-2xl italic">
          You can find the breed information inside of these cards
        </p>

        <Main initialCards={cards} />
      </section>
    </div>
  );
};

export default Home;
