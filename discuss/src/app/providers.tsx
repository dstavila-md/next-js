'use client';

import { NextUIProvider } from '@nextui-org/react';

interface ProvidersProps {
  children: React.ReactNode;
}

// This component is used to wrap the entire application with the NextUIProvider, which provides the necessary context for NextUI components to work properly.
// It should be used in the root layout of the application.
export default function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
