import React from 'react';
import { ItineraryDetailView } from '@/components/itinerary/ItineraryDetailView';
import { mockItineraries } from '@/lib/mockData/itineraries';

export function generateStaticParams() {
  return mockItineraries.map((item) => ({
    id: item.id,
  }));
}

export default function ItineraryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ItineraryDetailView id={params.id} />;
}
