import BreedDetail from "@/components/BreedCard";
import getBreedDetails from "@/utils/getBreedDetails";

export default async function CatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const breed = await getBreedDetails(id, "cat");
  return <BreedDetail breed={breed} />;
}
