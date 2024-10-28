import { BreedDetailTypes } from "@/app/types/BreedDetail";

async function getBreedDetails(id: string, type: 'dog' | 'cat'): Promise<BreedDetailTypes> {
    const apiKey = type === 'dog' ? process.env.DOG_API_KEY : process.env.CAT_API_KEY;
    const breedUrl = type === 'dog' 
      ? `https://api.thedogapi.com/v1/breeds/${id}` 
      : `https://api.thecatapi.com/v1/breeds/${id}`;
    const imageUrl = type === 'dog' 
      ? `https://api.thedogapi.com/v1/images/search?breed_ids=${id}&limit=5&api_key=${apiKey}` 
      : `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=5&api_key=${apiKey}`;
  
    const [breedRes, imagesRes] = await Promise.all([
      fetch(breedUrl, { headers: { "x-api-key": apiKey || "" } }),
      fetch(imageUrl),
    ]);
  
    if (!breedRes.ok || !imagesRes.ok) {
      throw new Error(`Failed to fetch ${type} breed data`);
    }
  
    const breedData = await breedRes.json();
    const imagesData = await imagesRes.json();
    const imageUrls = imagesData.map((image: any) => image.url);
  
    return {
      id: breedData.id,
      name: breedData.name,
      temperament: breedData.temperament || "",
      life_span: `${breedData.life_span} years` || "",
      origin: breedData.origin || "",
      description: breedData.description,
      images: imageUrls,
    };
  }
  
  export default getBreedDetails;