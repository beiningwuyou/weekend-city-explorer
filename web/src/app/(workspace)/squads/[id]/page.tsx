import React from 'react';
import { SquadDetailView } from '@/components/squads/SquadDetailView';
import { mockSquads } from '@/lib/mockData/squads';

export function generateStaticParams() {
  return mockSquads.map((squad) => ({
    id: squad.id,
  }));
}

export default function SquadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <SquadDetailView id={params.id} />;
}
