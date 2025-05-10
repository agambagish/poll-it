import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>{children}</NuqsAdapter>
  );
}
