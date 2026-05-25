import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blogs = defineCollection({
    loader: glob({
        base: 'src/content/blogs',
        pattern: '*.md'
    }),
    schema: z.object({
        title: z.string(),
        image: z.string(),
        overview: z.string()
    })
});

export const collections = {blogs}