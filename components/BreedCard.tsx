"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BreedDetailTypes } from "@/app/types/BreedDetail";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
  animalType: "cats" | "dogs";
};

const BreedDetail = ({ params, animalType }: Props) => {
  const { id } = React.use(params);
  const router = useRouter();

  const [breed, setBreed] = useState<BreedDetailTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBreed = async (breedId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${animalType}/${breedId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setBreed(data);
    } catch (error: any) {
      console.error("Error fetching breed info:", error);
      setError("Failed to load breed information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreed(id);
  }, [id]);

  if (loading) {
    return <div className="flex justify-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  if (!breed) {
    return <div>No breed found</div>;
  }

  return (
    <div className="flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-16">
      <div className="relative flex flex-col w-full max-w-6xl gap-4 sm:gap-6 bg-white/80 rounded-xl border border-gray-300 shadow-xl p-6 sm:p-8 md:p-10 backdrop-blur-md">
        <button
          onClick={() => router.push("/")}
          className="absolute -top-10 sm:-top-12 left-0 flex items-center py-1 px-1 text-black"
          title="Go back"
        >
          <span className="text-3xl sm:text-4xl">&#x2190;</span>
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          {breed.name}
        </h1>

        <Swiper
          navigation
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full h-72 sm:h-[35rem]  lg:h-[50rem] rounded-xl"
        >
          {Array.isArray(breed.images) && breed.images.length > 0 ? (
            breed.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${breed.name} image ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </SwiperSlide>
            ))
          ) : (
            <div>No images available for this breed.</div>
          )}
        </Swiper>

        {breed.life_span && (
          <p className="text-md sm:text-lg md:text-2xl text-gray-800">
            Life span: {breed.life_span}
          </p>
        )}

        {breed.origin && (
          <p className="text-md sm:text-lg md:text-2xl text-gray-800">
            Originally from: {breed.origin}
          </p>
        )}
        {breed.bred_for && (
          <p className="text-md sm:text-lg md:text-2xl text-gray-800">
            Bred for: {breed.bred_for}
          </p>
        )}
        {breed.temperament && (
          <p className="text-md sm:text-lg md:text-2xl text-gray-800">
            Temperament: {breed.temperament}
          </p>
        )}

        {breed.description && (
          <p className="text-md sm:text-lg md:text-2xl text-gray-800">
            Description: {breed.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BreedDetail;
