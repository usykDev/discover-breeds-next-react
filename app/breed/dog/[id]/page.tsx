"use client";
import BreedDetail from "@/components/BreedCard";

const DogDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  return <BreedDetail params={params} animalType="dogs" />;
};

export default DogDetail;
