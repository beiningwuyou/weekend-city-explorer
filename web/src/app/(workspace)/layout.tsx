'use client';

import React from 'react';
import { MobileSimulatorShell } from '@/components/mobile/MobileSimulatorShell';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileSimulatorShell>{children}</MobileSimulatorShell>;
}
