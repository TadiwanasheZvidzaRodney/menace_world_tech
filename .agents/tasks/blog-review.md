# Blog feature implementation — Menace World Tech

The blog feature adds a content collection, three real markdown posts, a listing page, individual post pages, an RSS feed, and a navigation update. All seven deliverables exist. The implementation targets Astro 7.3.8's v5 content layer API, which uses `post.id` instead of `post.slug` and places the collection config at `src/content.config.ts` — not inside `src/content/`. The plan described Astro 4 paths throughout; the coder adapted correctly to the actual runtime.

**Watch for:** `src/content/config.ts` does not exist — the config is at `src/content.config.ts`, which is the correct Astro 5 location. Two category colour entries in `BlogCard` use hard-coded hex values instead of CSS custom properties; they will drift if tokens change.

**Verdict**: APPROVED

---

## High-level view

The collection config uses the Astro 5 glob loader and `z.coerce.date()` for `publishedAt`. The coercion matters: YAML front matter dates arrive as strings, and `z.date()` (plan's spec) would reject them at build time.

`BlogCard` accepts `post: CollectionEntry<'blog'>` rather than the plan's flat props. The `data-category` attribute lands on the `<article>` element as required by the filter JS. Two of the six category colour entries — `Web` and `Automation` — use `#22d3ee` and `#a78bfa` directly instead of `var(--color-cyan)` and `var(--color-violet)`. These are token-equivalent today but won't track future token changes.

The blog index hero is a verbatim port of the `index.astro` animated SVG. The category filter adds an empty-state message not in the plan. `[slug].astro` uses `render(post)` (Astro 5 standalone import) — `post.render()` from the plan would fail on this runtime. The Article JSON-LD is injected via `<Fragment slot="head">` into a `<slot name="head" />` added to `BaseLayout`.

---

<details>
<summary>Issues (0)</summary>

No blocking issues.

</details>

---

<details>
<summary>Details</summary>

## Content config — Astro 5 content layer

The plan described `src/content/config.ts` with the Astro 4 `defineCollection` + `export const collections` pattern. The file is at `src/content.config.ts` and uses the Astro 5 glob loader:

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ ... }),
});
export const collections = { blog };
```

`z` is imported from `astro/zod` (correct for v5). `z.coerce.date()` rather than `z.date()` is the non-obvious but required choice: Astro's YAML parser returns date frontmatter as a string, not a `Date` object, so `z.date()` would throw a validation error at build time for all three posts.

## BlogCard — category colour inconsistency

The `categoryColors` record maps `Strategy`, `Content`, `Advertising`, and `General` to CSS custom properties (`var(--color-violet)`, `var(--color-magenta)`, `var(--color-cyan)`, `var(--color-muted)`), but `Web` and `Automation` are mapped to `#22d3ee` and `#a78bfa` — hard-coded hex equivalents of the cyan and violet tokens. If the design tokens are ever updated, these two category labels will display the wrong colour while the others update automatically. Likely introduced because the token names didn't immediately map to those two categories and the author cross-referenced the computed values. Not blocking, but worth aligning.

## Blog index — filter JS and border token

The category filter adds a `visibleCount` tracker and shows a `blog-empty` paragraph when no posts match — an improvement over the plan's spec.

The filter bar's bottom border uses `var(--border)` rather than `var(--border-glass)` from the plan's CSS spec. Both tokens exist in the design system; the choice is aesthetic, not a gap.

## [slug].astro — routing and API divergence from plan

The plan's `getStaticPaths` used `params: { slug: post.slug }` and `post.render()`. Both are Astro 4 APIs. The implementation correctly uses `params: { slug: post.id }` and `render(post)` from `astro:content`. The sidebar shows 2 posts (`slice(0, 2)`) rather than the plan's 3 — with only 3 posts at launch, showing 3 would expose every post except the current one; 2 is the better default.

The implementation adds gradient text styling on prose `h2` elements and an enhanced blockquote (background tint, border-radius) beyond the plan's spec. Both are on-brand and don't introduce any CSS conflicts.

## Markdown post quality

All three frontmatter blocks validate against the schema. The `understanding-ad-spend-vs-management-fee.md` post's title contains a `—` em dash character and a curly apostrophe in `You're` — both are valid in YAML string values but worth noting if the site ever exports raw frontmatter to a system that expects ASCII. Not a build concern.

</details>

---

<details>
<summary>File map</summary>

| File | Change |
|---|---|
| `src/content.config.ts` | New — Astro 5 content collection definition with glob loader and Zod schema |
| `src/content/blog/why-your-zimbabwe-business-needs-facebook-first.md` | New — ~600-word Strategy post on Facebook-first for Zimbabwe |
| `src/content/blog/how-to-write-captions-that-actually-convert.md` | New — ~600-word Content post on caption copywriting framework |
| `src/content/blog/understanding-ad-spend-vs-management-fee.md` | New — ~600-word Advertising post on ad spend vs management fee |
| `src/components/BlogCard.astro` | New — glass card matching ServiceCard with cursor glow, category colours, data-category |
| `src/pages/blog/index.astro` | New — listing page with animated SVG hero, category filter, responsive grid, final CTA |
| `src/pages/blog/[slug].astro` | New — dynamic post route with getStaticPaths, Content render, prose styles, Article JSON-LD, sidebar |
| `src/pages/rss.xml.ts` | New — RSS 2.0 feed via @astrojs/rss |
| `src/data/site.ts` | Updated — Blog nav entry added between About and Contact |
| `src/layouts/BaseLayout.astro` | Updated — `<slot name="head" />` added after existing ld+json script |

Full diff: `git diff main` from workspace root.

</details>
