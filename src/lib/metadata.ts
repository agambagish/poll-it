import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poll-it | Create & Vote on Polls Instantly",
  description:
    "Poll-it is a modern polling platform where you can create polls, vote, and engage with others using upvotes and downvotes like Reddit. Powered by Next.js, React, and Clerk.",
  keywords: [
    "polling platform",
    "polls",
    "vote",
    "poll app",
    "reddit-style polls",
    "upvote downvote",
    "online voting",
    "create poll",
    "next.js poll app",
    "Poll-it",
  ],
  authors: [
    { name: "Akash", url: "https://github.com/agambagish" },
  ],
  creator: "Akash",
  publisher: "Poll-it",
  metadataBase: new URL("https://poll-it-agam.vercel.app"),
  openGraph: {
    title: "Poll-it | Create & Vote on Polls Instantly",
    description:
      "Join Poll-it and discover the easiest way to create, vote, and engage in trending polls. Built with Next.js, TailwindCSS, and Clerk.",
    url: "https://poll-it-agam.vercel.app",
    siteName: "Poll-it",
    images: [
      {
        url: "https://poll-it-agam.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Poll-it - Create & Vote on Polls",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poll-it | Create & Vote on Polls Instantly",
    description:
      "Poll-it is your go-to platform to create polls and engage in real-time with upvotes and downvotes. Fast, secure, and social.",
    site: "@MacherJholBhaat",
    creator: "@MacherJholBhaat",
    images: ["https://poll-it-agam.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: "/site.webmanifest",
};
