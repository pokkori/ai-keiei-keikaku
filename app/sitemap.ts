import { MetadataRoute } from "next";

const keywordSlugs = [
  "keiei-keikaku-kakikata",
  "chusho-kigyou-keiei-senryaku",
  "jigyo-keikaku-sakusei",
  "keiei-vision-mission-sakusei",
  "5year-keiei-keikaku",
  "keiei-keikaku-jugyoin-kyoyu",
  "swot-bunseki-keiei",
  "solo-jigyou-keiei-keikaku",
  "startup-jigyo-keikaku",
  "franchise-keiei-keikaku",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ai-keiei-keikaku.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tool`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const keywordPages: MetadataRoute.Sitemap = keywordSlugs.map((slug) => ({
    url: `${base}/keywords/${slug}`,
    lastModified: new Date("2026-03-31"),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...keywordPages];
}
