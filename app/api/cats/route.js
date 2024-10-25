import { NextResponse } from "next/server";

export async function GET() {
  const catApiKey = process.env.CAT_API_KEY;

  const urlCats = `https://api.thecatapi.com/v1/breeds?limit=15`;

  try {
    const resCats = await fetch(urlCats, {
      headers: { "x-api-key": catApiKey },
    });

    if (!resCats.ok) {
      throw new Error("Failed to fetch cat breeds");
    }

    const catsData = await resCats.json();

    const catImagePromises = catsData.map(async (cat) => {
      const urlImages = `https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}&api_key=${catApiKey}`;
      const resImages = await fetch(urlImages);

      if (!resImages.ok) {
        throw new Error(`Failed to fetch images for cat ID: ${cat.id}`);
      }

      const imagesData = await resImages.json();
      const imageUrl = imagesData[0]?.url || "";

      return {
        id: cat.id,
        name: cat.name,
        image: imageUrl,
        type: "cat",
      };
    });

    const catWithImages = await Promise.all(catImagePromises);

    return NextResponse.json(catWithImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dog and cat images" },
      { status: 500 }
    );
  }
}
