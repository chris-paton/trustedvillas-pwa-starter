"use client";

import App from "@/App";

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | undefined>>;
};

export default function Search({ searchParams }: SearchPageProps) {
  const resolvedSearchParams =
    searchParams && "then" in searchParams
      ? undefined
      : (searchParams as unknown as {
          location?: string;
          guests?: string;
          checkIn?: string;
          checkOut?: string;
        });

  const guests = resolvedSearchParams?.guests
    ? Number(resolvedSearchParams.guests)
    : undefined;

  return (
    <App
      initialPage="search"
      initialSearchParams={{
        location: resolvedSearchParams?.location,
        guests: Number.isFinite(guests) ? guests : undefined,
        checkIn: resolvedSearchParams?.checkIn,
        checkOut: resolvedSearchParams?.checkOut,
      }}
    />
  );
}
