import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      "Investigación",
      "Tratamientos",
      "Familias",
      "Educación",
      "Asociaciones",
      "Eventos",
      "Divulgación",
    ]),
    tags: z.array(z.string()),
    excerpt: z.string(),
    source: z.string(),
    originalUrl: z.string().url(),
    originalLanguage: z.string(),
    summary: z.string(),
    relevance: z.string(),
  }),
});

export const collections = { posts };
