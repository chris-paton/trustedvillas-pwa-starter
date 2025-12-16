"use client";

import App from "@/App";

type SearchPageProps = {
  searchParams?: any;
};

export default function Search({ searchParams }: SearchPageProps) {
  const guests = searchParams?.guests ? Number(searchParams.guests) : undefined;

  return (
    <App
      initialPage="search"
      initialSearchParams={{
        location: searchParams?.location,
        guests: Number.isFinite(guests) ? guests : undefined,
        checkIn: searchParams?.checkIn,
        checkOut: searchParams?.checkOut,
      }}
    />
  );
}
