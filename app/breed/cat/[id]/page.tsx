"use client";
import BreedDetail from "@/components/BreedCard";

const CatDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  return <BreedDetail params={params} animalType="cats" />;
};

export default CatDetail;
