import { NextResponse } from "next/server";

export async function GET() {
  const dogApiKey = process.env.DOG_API_KEY;

  const urlDogs = `https://api.thedogapi.com/v1/breeds?limit=15`;

  try {
    const resDogs = await fetch(urlDogs, {
      headers: { "x-api-key": dogApiKey },
    });

    if (!resDogs.ok) {
      throw new Error("Failed to fetch dog breeds");
    }

    const dogsData = await resDogs.json();

    const dogImagePromises = dogsData.map(async (dog) => {
      const urlImages = `https://api.thedogapi.com/v1/images/search?breed_ids=${dog.id}&api_key=${dogApiKey}`;
      const resImages = await fetch(urlImages);

      if (!resImages.ok) {
        throw new Error(`Failed to fetch images for dog ID: ${dog.id}`);
      }

      const imagesData = await resImages.json();
      const imageUrl = imagesData[0]?.url || "";

      return {
        id: dog.id,
        name: dog.name,
        image: imageUrl,
        type: "dog",
      };
    });

    const dogWithImages = await Promise.all(dogImagePromises);

    return NextResponse.json(dogWithImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dog and cat images" },
      { status: 500 }
    );
  }
}
