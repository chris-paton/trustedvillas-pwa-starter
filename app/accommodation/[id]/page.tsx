"use client";

import App from "@/App";

type AccommodationPageProps = {
  params?: any;
};

export default function AccommodationPage({ params }: AccommodationPageProps) {
  const parsedId = params?.id ? Number(params.id) : NaN;
  const villaId = Number.isFinite(parsedId) ? parsedId : null;

  return <App initialPage="villa" initialVillaId={villaId} />;
}
