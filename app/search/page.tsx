import App from "@/App";

type SearchPageProps = {
  searchParams?: Promise<{
    location?: string;
    country?: string;
    area?: string;
    guests?: string;
    checkIn?: string;
    checkOut?: string;
  }>;
};

export default async function Search({ searchParams }: SearchPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const guests = resolvedParams?.guests ? Number(resolvedParams.guests) : undefined;

  return (
    <App
      initialPage="search"
      initialSearchParams={{
        location: resolvedParams?.location,
        country: resolvedParams?.country,
        area: resolvedParams?.area,
        guests: Number.isFinite(guests) ? guests : undefined,
        checkIn: resolvedParams?.checkIn,
        checkOut: resolvedParams?.checkOut,
      }}
    />
  );
}
