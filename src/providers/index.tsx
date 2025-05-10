import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
    </ThemeProvider>
  );
}
