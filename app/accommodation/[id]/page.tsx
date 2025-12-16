import App from "@/App";

type AccommodationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const resolvedParams = await params;
  const parsedId = Number(resolvedParams.id);
  const villaId = Number.isFinite(parsedId) ? parsedId : null;

  return <App initialPage="villa" initialVillaId={villaId} />;
}
