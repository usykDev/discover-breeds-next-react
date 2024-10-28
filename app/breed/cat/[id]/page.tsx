import BreedDetail from "@/components/BreedCard";
import getBreedDetails from "@/utils/getBreedDetails";

export default async function CatDetailPage({ params }: any) {
  const { id } = params;
  const breed = await getBreedDetails(id, "cat");
  return <BreedDetail breed={breed} />;
}
