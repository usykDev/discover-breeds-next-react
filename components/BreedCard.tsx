import { BreedDetailTypes } from "@/app/types/BreedDetail";
import BackButton from "./BackButton";

type BreedCardProps = {
  breed: BreedDetailTypes;
};

const BreedDetail: React.FC<BreedCardProps> = ({ breed }) => {
  return (
    <div className="flex justify-center items-center py-6 sm:p-6 md:p-8 lg:p-16">
      <div className="relative flex flex-col w-full max-w-6xl gap-4 sm:gap-6 bg-white/80 rounded-xl border border-gray-300 shadow-xl p-6 sm:p-8 md:p-10 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          {breed.name}
        </h1>

        <BackButton />

        <div className=" flex overflow-x-auto space-x-4 py-4">
          {breed.images && breed.images.length > 0 ? (
            breed.images.map((image: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-72 h-72 relative">
                <img
                  src={image}
                  alt={`${breed.name} image ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))
          ) : (
            <div>No images available for this breed.</div>
          )}
        </div>

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
