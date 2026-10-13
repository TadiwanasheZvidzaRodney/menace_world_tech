import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Menace World Tech'),
    category: z.enum(['Strategy', 'Content', 'Advertising', 'Web', 'Automation', 'General']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional().default('/brand/social-card.png'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
