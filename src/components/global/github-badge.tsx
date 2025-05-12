import { unstable_cache as cache } from "next/cache";

import { Badge } from "@/components/ui/badge";

export async function GithubBadge() {
  const starCount = await cache(
    async () => {
      const res = await fetch(
        "https://api.github.com/repos/agambagish/poll-it",
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          next: {
            revalidate: 60,
          },
        },
      );

      if (!res.ok) {
        return null;
      }

      const data = (await res.json()) as { stargazers_count: number };
      return data.stargazers_count;
    },
    ["github-stars"],
    {
      revalidate: 900,
      tags: ["github-stars"],
    },
  )();

  return (
    <Badge variant="secondary">
      {starCount}
      ⭐ on Github
    </Badge>
  );
}
