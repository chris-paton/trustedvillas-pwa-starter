import App from "@/App";

type AccommodationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const resolvedParams = await params;
  const villaId = resolvedParams.id || null;

  return <App initialPage="villa" initialVillaId={villaId} />;
}
