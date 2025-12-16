"use client";

import App from "@/App";

type AccommodationPageProps = {
  params?: Promise<Record<string, string>>;
};

export default function AccommodationPage({ params }: AccommodationPageProps) {
  const resolvedParams = params && "then" in params ? undefined : (params as unknown as { id?: string });
  const parsedId = resolvedParams?.id ? Number(resolvedParams.id) : NaN;
  const villaId = Number.isFinite(parsedId) ? parsedId : null;

  return <App initialPage="villa" initialVillaId={villaId} />;
}
