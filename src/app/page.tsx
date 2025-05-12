import { Suspense } from "react";

import { PollList } from "@/components/global/poll-list";

export default function Page() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          <span className="text-primary">Poll-</span>
          <span>it</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create polls and see results in real-time with our Reddit-style voting platform
        </p>
      </section>
      <Suspense>
        <PollList />
      </Suspense>
    </main>
  );
}
