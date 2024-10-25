import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const catApiKey = process.env.CAT_API_KEY;
  const breedId = params.id;

  if (!breedId) {
    return NextResponse.json({ error: "breedId is required" }, { status: 400 });
  }

  try {
    const urlBreed = `https://api.thecatapi.com/v1/breeds/${breedId}`;
    const resBreed = await fetch(urlBreed, {
      headers: { "x-api-key": catApiKey },
    });

    if (!resBreed.ok) {
      throw new Error(`Failed to fetch breed with ID: ${breedId}`);
    }

    const breedData = await resBreed.json();

    const urlImages = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5&api_key=${catApiKey}`;
    const resImages = await fetch(urlImages);

    if (!resImages.ok) {
      throw new Error(`Failed to fetch images for breed ID: ${breedId}`);
    }

    const imagesData = await resImages.json();

    const imageUrls = imagesData.map((image) => image.url);

    const breedInfo = {
      id: breedData.id,
      name: breedData.name,
      temperament: breedData.temperament || undefined,
      life_span: `${breedData.life_span} years` || undefined,
      origin: breedData.origin || undefined,
      description: breedData.description,
      images: imageUrls || [],
    };

    return NextResponse.json(breedInfo);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch breed details: ${error.message}` },
      { status: 500 }
    );
  }
}
