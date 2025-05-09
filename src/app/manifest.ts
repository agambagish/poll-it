import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Poll-it",
    short_name: "Poll-it",
    description:
    "Poll-it is a modern polling platform where users can create polls, vote, and engage through upvotes and downvotes like Reddit.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16A34A",
    orientation: "portrait",
    categories: ["social", "productivity", "voting", "polls"],
    lang: "en",
  };
}
