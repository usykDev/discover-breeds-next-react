"use client";

const BackButton: React.FC = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="absolute -top-12 sm:-top-14 left-0 flex items-center py-1 px-1 text-black"
      title="Go back"
    >
      <span className="text-3xl sm:text-4xl">&#x2190;</span>
    </button>
  );
};

export default BackButton;
