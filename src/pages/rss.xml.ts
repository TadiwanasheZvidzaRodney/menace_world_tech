import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_NAME } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
  return rss({
    title: `${SITE_NAME} Blog`,
    description: 'Practical digital marketing insights for Zimbabwean small businesses.',
    site: context.site!.toString(),
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-zw</language>',
  });
}
