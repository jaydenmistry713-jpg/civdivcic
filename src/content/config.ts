import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:     z.string(),
    date:      z.coerce.date(),
    excerpt:   z.string().optional(),
    image:     z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    time:        z.string().optional(),
    location:    z.string().optional(),
    description: z.string().optional(),
    image:       z.string().optional(),
    published:   z.boolean().default(true),
  }),
});

const partnersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name:      z.string(),
    logo:      z.string().optional(),
    website:   z.string().url().optional(),
    funded:    z.boolean().default(false),
    need_tags: z.array(z.string()).default([]),
    active:    z.boolean().default(true),
    description: z.string().optional(),
  }),
});

const teamCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name:  z.string(),
    role:  z.string(),
    bio:   z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = {
  news:     newsCollection,
  events:   eventsCollection,
  partners: partnersCollection,
  team:     teamCollection,
};
