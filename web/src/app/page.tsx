'use client';

import React from 'react';
import { MobileSimulatorShell } from '@/components/mobile/MobileSimulatorShell';
import ExplorePage from './(workspace)/explore/page';

export default function HomePage() {
  return (
    <MobileSimulatorShell>
      <ExplorePage />
    </MobileSimulatorShell>
  );
}
