import { createFileRoute } from "@tanstack/react-router";

import { TrendovaHomepage } from "@/components/landing/trendova-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trendova AI — AI Marketing Intelligence for Modern Brands" },
      {
        name: "description",
        content:
          "Discover emerging trends, create on-brand content, and make smarter marketing decisions with Trendova AI.",
      },
      { property: "og:title", content: "Trendova AI — AI Marketing Intelligence for Modern Brands" },
      {
        property: "og:description",
        content:
          "See what youth culture is becoming and create what belongs next with Trendova AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrendovaHomepage,
});
