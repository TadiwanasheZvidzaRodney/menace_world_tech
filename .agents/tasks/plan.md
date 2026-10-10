# Implementation Plan — Blog Feature
## Menace World Tech · Astro 7.3.8 static site

**Key facts established during exploration:**
- Pure Astro 7.3.8, static output, no UI framework, no Tailwind — CSS custom properties only
- `@astrojs/sitemap` already installed; `@astrojs/rss` is NOT installed
- No `src/content/` directory exists yet — content collections must be created from scratch
- Astro 7.x uses `defineCollection` + `getCollection` from `astro:content`; Zod is bundled — no separate install
- CSS tokens: `--glass-bg`, `--glass-bg-hover`, `--glass-blur`, `--border-glass`, `--glass-shadow`, `--glass-shadow-hover`, `--glow-violet`, `--ease-spring`, `--duration-base`, `--duration-slow`, `--radius-md`, `--color-violet`, `--color-magenta`, `--color-cyan`, `--color-text`, `--color-muted`, `--font-display`, `--font-body`
- `ServiceCard.astro` uses cursor-tracked glow (JS), hover transitions, `--gx`/`--gy` CSS custom properties — BlogCard must follow the same pattern
- Hero animated SVG uses three drifting ellipse orbs (`orb--v`, `orb--m`, `orb--c`) + floating dots (`d1`–`d7`) — replicate exactly on blog index
- `BaseLayout.astro` accepts `title`, `description`, `image?`, `noindex?`; generates full OG/Twitter/structured data automatically
- `navigation` array in `src/data/site.ts` drives both `SiteHeader` and `SiteFooter`
- Build command: `npm run build` · Verify command: `npm run verify` (after build)
- All file paths below are absolute from workspace root `c:\Users\tadiwanashe.zvidza\Documents\MenaceWorldTech`

---

- [ ] 1. Install `@astrojs/rss`
      Run `npm install @astrojs/rss --ignore-scripts` from the workspace root. This adds the package that powers RSS feed generation. No astro.config.mjs change is needed — the RSS feed is a standalone endpoint.
      Files: `package.json`, `package-lock.json` (auto-updated by npm)
      Verify: `npm ls @astrojs/rss` — should print the installed version without errors.

- [ ] 2. Create `src/content/config.ts` — blog collection schema
      Create `src/content/config.ts` using Astro's `defineCollection` and the Zod `z` export from `astro:content`. Define a single collection named `'blog'` with this exact schema:
      ```
      title:       z.string()
      description: z.string()
      publishedAt: z.date()
      updatedAt:   z.date().optional()
      author:      z.string().default('Menace World Tech')
      category:    z.enum(['Strategy','Content','Advertising','Web','Automation','General'])
      tags:        z.array(z.string()).optional()
      image:       z.string().optional().default('/brand/social-card.svg')
      draft:       z.boolean().default(false)
      ```
      Export `collections` as `{ blog: collection }`.
      Files: `src/content/config.ts` (create new)
      Verify: `npm run build` — build succeeds with no TypeScript errors related to the content config.

- [ ] 3. Write 3 real markdown blog posts in `src/content/blog/`
      Create the directory `src/content/blog/` and add three `.md` files. Each post must be 400–600 words of real, useful body content (not placeholder text) written for a Zimbabwean small-business audience. All frontmatter fields must match the schema exactly.

      **Post 1 — `why-your-zimbabwe-business-needs-facebook-first.md`**
      ```yaml
      ---
      title: "Why Your Zimbabwe Business Needs a Facebook-First Strategy"
      description: "In Zimbabwe, Facebook is not just social media — it's where buying decisions happen. Here's why your business should start there before anywhere else."
      publishedAt: 2025-06-01
      author: "Menace World Tech"
      category: Strategy
      tags: ["facebook", "zimbabwe", "social media", "strategy"]
      image: "/brand/social-card.svg"
      draft: false
      ---
      ```
      Body (write ~500 words): Cover why Facebook dominates Zimbabwean digital commerce — mobile penetration, WhatsApp+Facebook cross-referral, Facebook Marketplace, practical tips for small businesses (posting frequency, profile completeness, Messenger response time), and a closing CTA to get a growth audit.

      **Post 2 — `how-to-write-captions-that-actually-convert.md`**
      ```yaml
      ---
      title: "How to Write Captions That Actually Convert"
      description: "The difference between a post people scroll past and one that generates enquiries often comes down to the caption. Here's a practical framework for writing copy that moves people to act."
      publishedAt: 2025-06-08
      author: "Menace World Tech"
      category: Content
      tags: ["copywriting", "captions", "content", "social media"]
      image: "/brand/social-card.svg"
      draft: false
      ---
      ```
      Body (write ~500 words): Cover the hook-value-CTA framework, the importance of speaking to one person (not a crowd), using concrete specifics over vague claims, local context (prices in USD/ZWG, local references), and caption length guidelines per platform. End with a CTA.

      **Post 3 — `understanding-ad-spend-vs-management-fee.md`**
      ```yaml
      ---
      title: "Understanding Ad Spend vs. Management Fee — What You're Actually Paying For"
      description: "Confused about the difference between ad spend and a management fee? You're not alone. Here's a plain-language breakdown that every Zimbabwean business owner should know before running paid ads."
      publishedAt: 2025-06-15
      author: "Menace World Tech"
      category: Advertising
      tags: ["advertising", "ad spend", "management fee", "facebook ads"]
      image: "/brand/social-card.svg"
      draft: false
      ---
      ```
      Body (write ~500 words): Explain that ad spend goes directly to Facebook/Google and the management fee pays for strategy, execution, and reporting. Use a clear example (e.g., $100/month split). Cover what a management fee actually covers (research, creative, targeting, optimisation, reporting), why transparency matters, and how Menace World Tech invoices them separately. End with a CTA.

      Files: `src/content/blog/why-your-zimbabwe-business-needs-facebook-first.md`, `src/content/blog/how-to-write-captions-that-actually-convert.md`, `src/content/blog/understanding-ad-spend-vs-management-fee.md` (all create new)
      Verify: `npm run build` — build succeeds; `dist/blog/` directory is created with three post subdirectories (not yet, they need the dynamic route in step 6).

- [ ] 4. Create `src/components/BlogCard.astro` — glass card matching `ServiceCard.astro`
      Model the component directly on `ServiceCard.astro` — same glass surface, cursor-tracked glow, hover lift. Accept a typed `Props` interface:
      ```ts
      interface Props {
        slug:        string;   // collection entry slug
        title:       string;
        description: string;
        publishedAt: Date;
        category:    string;
        image:       string;
        index?:      number;   // for stagger delay
      }
      ```
      Layout structure (in order, inside `<article class="blog-card">`):
      1. `<div class="blog-card__glow" aria-hidden="true">` — identical to `service-card__glow`, gradient from `--color-violet`
      2. `<div class="blog-card__meta">` — contains `<span class="blog-card__category eyebrow">{category}</span>` + `<time datetime={publishedAt.toISOString()} class="blog-card__date">{formatted date}</time>`
      3. `<h3>{title}</h3>`
      4. `<p>{description}</p>`
      5. `<a href={/blog/${slug}} class="blog-card__link">Read article <span class="sr-only">: {title}</span></a>` — same uppercase style as ServiceCard's anchor

      CSS rules to copy verbatim from `ServiceCard.astro` and adapt:
      - `.blog-card` = same as `.service-card` (glass-bg, backdrop-filter, border-glass, glass-shadow, hover transitions, outline)
      - `.blog-card__glow` = identical to `.service-card__glow`
      - `.blog-card:hover` = same hover state as `.service-card:hover` (translateY(-6px), glass-bg-hover, glass-shadow-hover + glow-violet, border-color violet, outline cyan)
      - `.blog-card__meta` = `display: flex; justify-content: space-between; align-items: center; gap: var(--space-2)`
      - `.blog-card__date` = `color: var(--color-muted); font-size: 0.72rem; font-weight: 600`
      - `.blog-card__link` = same styles as `.service-card > a` (uppercase, 0.78rem, muted→cyan on hover)

      `<script>` block: copy the cursor-tracked glow mousemove listener from `ServiceCard.astro`, scoping the selector to `.blog-card` instead of `.service-card`.

      Date formatting: use `publishedAt.toLocaleDateString('en-ZW', { year: 'numeric', month: 'long', day: 'numeric' })` directly in the template.

      Files: `src/components/BlogCard.astro` (create new)
      Verify: `npm run build` — component compiles without errors (it will be imported in the next step).

- [ ] 5. Create `src/pages/blog/index.astro` — blog listing page
      This page queries all non-draft posts and renders them in a filterable grid.

      **Frontmatter:**
      ```ts
      import { getCollection } from 'astro:content';
      import BaseLayout from '../../layouts/BaseLayout.astro';
      import BlogCard from '../../components/BlogCard.astro';
      import SectionHeading from '../../components/SectionHeading.astro';
      import ButtonLink from '../../components/ButtonLink.astro';

      const allPosts = await getCollection('blog', ({ data }) => !data.draft);
      const posts = allPosts.sort(
        (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
      );
      const categories = ['All', ...Array.from(new Set(posts.map(p => p.data.category)))];
      ```

      **Template structure:**
      1. `<BaseLayout title="Blog" description="Practical digital marketing insights for Zimbabwean small businesses…">`
      2. Hero section (`.blog-hero`) — replicate the hero animated SVG background from `index.astro` verbatim (same `<svg>` with orbs, grid lines, floating dots, same `<defs>`, same animation classes). Hero content: eyebrow "Insights & strategy", `<h1>` with gradient-text span, short support paragraph.
      3. Category filter bar (`.filter-bar`) — `<nav aria-label="Filter by category">` containing a `<ul>` of `<button>` elements, one per category string. Each button gets `data-filter="{category}"`. The "All" button is active by default (`data-active="true"`). Entirely plain HTML — the JS below drives it.
      4. Blog grid — `<div class="blog-grid" id="blog-grid">` containing `{posts.map((post, i) => <BlogCard ... index={i} />)}`. Each `<article>` (inside BlogCard) should also receive `data-category={post.data.category}` so the JS filter can target it. Because `data-category` is on the wrapping article rendered inside BlogCard, pass it as a prop and render `data-category={category}` on the `<article>` element inside `BlogCard.astro`.

      **CSS (scoped `<style>`):**
      - `.blog-hero` — same rules as `.hero` in `index.astro` (relative, padding-block clamp, overflow hidden)
      - `.blog-hero__bg`, `.blog-hero__bg-svg` — identical to `.hero__bg` / `.hero__bg-svg`
      - Orb and dot keyframes — copy the exact `@keyframes drift-v`, `drift-m`, `drift-c`, `float-dot` blocks and all `.orb`, `.dot`, `.d1`–`.d7` rules from `index.astro`
      - `.blog-hero__content` — same as `.hero__content` (centered flex column, max-width 54rem, gap space-5, z-index 1)
      - `.filter-bar` — `padding-block: var(--space-5); border-bottom: var(--border)`
      - `.filter-bar ul` — `display: flex; flex-wrap: wrap; gap: var(--space-2); padding: 0; margin: 0; list-style: none; justify-content: center`
      - `.filter-btn` — glass button: `padding: 0.5rem 1.1rem; border: var(--border-glass); border-radius: var(--radius-sm); background: var(--glass-bg); backdrop-filter: var(--glass-blur); color: var(--color-muted); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; cursor: pointer; transition: color/background/border-color var(--duration-base) var(--ease-spring)`
      - `.filter-btn:hover, .filter-btn[data-active="true"]` — `color: var(--color-text); background: var(--glass-bg-hover); border-color: rgb(124 33 245 / 35%); box-shadow: var(--glow-violet)`
      - `.blog-grid` — `display: grid; gap: var(--space-5); padding-block: var(--space-8) var(--space-10)`; responsive: 1 col → 2 cols at 40rem → 3 cols at 72rem (matching services-grid breakpoints)
      - `.blog-card--hidden` — `display: none`

      **`<script>` block (client-side category filter):**
      ```ts
      const buttons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
      const cards = document.querySelectorAll<HTMLElement>('.blog-card');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.removeAttribute('data-active'));
          btn.dataset.active = 'true';
          const filter = btn.dataset.filter;
          cards.forEach(card => {
            const show = filter === 'All' || card.dataset.category === filter;
            card.classList.toggle('blog-card--hidden', !show);
          });
        });
      });
      ```

      Files: `src/pages/blog/index.astro` (create new), `src/components/BlogCard.astro` (update: add `data-category` prop + attribute)
      Verify: `npm run build` — `dist/blog/index.html` is generated. `npm run verify` passes.

- [ ] 6. Create `src/pages/blog/[slug].astro` — dynamic post route
      This is the individual blog post page.

      **Frontmatter:**
      ```ts
      import { getCollection, getEntry } from 'astro:content';
      import BaseLayout from '../../layouts/BaseLayout.astro';
      import ButtonLink from '../../components/ButtonLink.astro';
      import BlogCard from '../../components/BlogCard.astro';
      import { SITE_NAME } from '../../data/site';

      export async function getStaticPaths() {
        const posts = await getCollection('blog', ({ data }) => !data.draft);
        return posts.map(post => ({
          params: { slug: post.slug },
          props:  { post },
        }));
      }

      const { post } = Astro.props;
      const { Content } = await post.render();

      // More posts sidebar — 3 most-recent posts excluding the current one
      const allPosts = await getCollection('blog', ({ data }) => !data.draft);
      const morePosts = allPosts
        .filter(p => p.slug !== post.slug)
        .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
        .slice(0, 3);

      const siteUrl = Astro.site?.toString().replace(/\/$/, '') ?? 'https://menaceworldtech.vercel.app';
      const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
      const publishedIso = post.data.publishedAt.toISOString();
      const updatedIso   = (post.data.updatedAt ?? post.data.publishedAt).toISOString();
      const publishedDisplay = post.data.publishedAt.toLocaleDateString('en-ZW', { year: 'numeric', month: 'long', day: 'numeric' });

      // Article JSON-LD
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.data.title,
        description: post.data.description,
        image: `${siteUrl}${post.data.image}`,
        datePublished: publishedIso,
        dateModified: updatedIso,
        author: {
          '@type': 'Organization',
          name: post.data.author,
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.webp` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      };
      ```

      **Template structure:**
      1. `<BaseLayout title={post.data.title} description={post.data.description} image={post.data.image}>`
      2. Inside head (inject via a `<slot name="head">` — note: `BaseLayout` does not currently have a named head slot, so inject the `<script type="application/ld+json">` directly inside the page using Astro's `<Fragment slot="head">` pattern IF BaseLayout exposes it. Since it does NOT currently expose a `head` slot, add the Article JSON-LD as an inline `<script type="application/ld+json" set:html={JSON.stringify(articleSchema)}></script>` immediately after the opening `<BaseLayout>` tag, placed inside a `<Fragment>` wrapper so it renders into `<body>`. This is acceptable for structured data. Alternatively — and preferably — add a `<slot name="head" />` to `BaseLayout.astro`'s `<head>` section (after the existing structured data script) so post pages can inject the Article schema cleanly into `<head>`. **Choose this approach: add `<slot name="head" />` to `BaseLayout.astro`.** Then use `<Fragment slot="head">` in `[slug].astro`.
      3. Article hero (`.post-hero section`): eyebrow = category, `<h1>` = title, meta bar with author + date, description paragraph.
      4. Article body (`.post-layout`): two-column at ≥72rem — main `<article class="post-prose">` (left, wider) + `<aside class="post-sidebar">` (right, narrower).
      5. `<article class="post-prose">` contains `<Content />` (Astro renders the markdown). Apply prose styles scoped to `.post-prose` (see CSS below).
      6. `<aside class="post-sidebar">`: heading "More articles", then `{morePosts.map((p, i) => <BlogCard ... index={i} />)}`.
      7. Below the layout: a full-width CTA strip (reuse `.final-cta` pattern from `index.astro`) with a WhatsApp audit link.

      **CSS (scoped `<style>`):**
      - `.post-hero` — `position: relative; padding-block: clamp(var(--space-8), 10vw, var(--space-10)); text-align: center; overflow: hidden`
      - `.post-hero .eyebrow` — `display: inline-block; margin-bottom: var(--space-3)`
      - `.post-hero h1` — `max-width: 22ch; margin-inline: auto; margin-bottom: var(--space-4)`
      - `.post-meta` — `display: flex; justify-content: center; gap: var(--space-5); color: var(--color-muted); font-size: 0.8rem; flex-wrap: wrap`
      - `.post-layout` — `display: grid; gap: var(--space-7); padding-block: var(--space-8) var(--space-10)`; at ≥72rem: `grid-template-columns: 1fr 22rem`
      - `.post-prose` — `max-width: 70ch; width: 100%`
      - **Prose typography (inside `.post-prose`):** all rules scoped with `:global()` inside the scoped style or applied without `:global()` since Content renders inside the article element:
        - `h2, h3, h4` — `font-family: var(--font-display); margin-block: var(--space-6) var(--space-3); color: var(--color-text)`
        - `p` — `color: var(--color-muted); line-height: 1.85; margin-block: var(--space-4) 0; font-size: 1.0125rem`
        - `a` — `color: var(--color-cyan); text-underline-offset: 0.25em`
        - `ul, ol` — `color: var(--color-muted); padding-left: var(--space-5); line-height: 1.85`
        - `li` — `margin-block: var(--space-2) 0`
        - `strong` — `color: var(--color-text); font-weight: 800`
        - `blockquote` — `border-left: 3px solid var(--color-cyan); padding-left: var(--space-4); margin: var(--space-6) 0; color: var(--color-muted); font-style: italic`
        - `hr` — `border: none; border-top: var(--border-glass); margin-block: var(--space-7)`
        - `code` — `background: rgb(124 33 245 / 12%); padding: 0.15em 0.45em; border-radius: var(--radius-sm); font-size: 0.88em; color: var(--color-cyan)`
      - Since `<Content />` renders to `.post-prose`'s children which Astro scopes, use `:global(h2)` etc. **only within the `.post-prose` selector** to target rendered markdown nodes: `.post-prose :global(h2) { ... }`
      - `.post-sidebar` — `display: grid; align-content: start; gap: var(--space-5)`
      - `.sidebar-heading` — `font-family: var(--font-display); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); padding-bottom: var(--space-3); border-bottom: var(--border-glass)`

      Files: `src/pages/blog/[slug].astro` (create new), `src/layouts/BaseLayout.astro` (add `<slot name="head" />` inside `<head>` after the existing ld+json script)
      Verify: `npm run build` — `dist/blog/why-your-zimbabwe-business-needs-facebook-first/index.html`, `dist/blog/how-to-write-captions-that-actually-convert/index.html`, and `dist/blog/understanding-ad-spend-vs-management-fee/index.html` are all generated. `npm run verify` passes.

- [ ] 7. Create `src/pages/rss.xml.ts` — RSS 2.0 feed
      Use `@astrojs/rss`'s `rss()` function. Query non-draft posts, sort by date descending.
      ```ts
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
          items: sorted.map(post => ({
            title:       post.data.title,
            description: post.data.description,
            pubDate:     post.data.publishedAt,
            link:        `/blog/${post.slug}/`,
          })),
          customData: `<language>en-zw</language>`,
        });
      }
      ```
      Files: `src/pages/rss.xml.ts` (create new)
      Verify: `npm run build` — `dist/rss.xml` is generated and contains the three post entries.

- [ ] 8. Update `src/data/site.ts` — add Blog to navigation
      Insert `{ label: 'Blog', href: '/blog' }` into the `navigation` array between the About and Contact entries. The array must become:
      ```ts
      export const navigation: NavigationItem[] = [
        { label: 'Home',     href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Packages', href: '/packages' },
        { label: 'About',    href: '/about' },
        { label: 'Blog',     href: '/blog' },   // ← new
        { label: 'Contact',  href: '/contact' },
      ];
      ```
      This is the only change to `site.ts`. Both `SiteHeader` and `SiteFooter` consume `navigation` directly, so the link appears everywhere without further changes.
      Files: `src/data/site.ts`
      Verify: `npm run build` — build succeeds. `dist/index.html` source contains the text "Blog" in the navigation markup.

- [ ] 9. Final build and verification
      Run `npm run build` from the workspace root. Confirm:
      - Zero TypeScript or Astro compilation errors.
      - `dist/blog/index.html` exists.
      - `dist/blog/why-your-zimbabwe-business-needs-facebook-first/index.html` exists.
      - `dist/blog/how-to-write-captions-that-actually-convert/index.html` exists.
      - `dist/blog/understanding-ad-spend-vs-management-fee/index.html` exists.
      - `dist/rss.xml` exists and contains `<item>` elements.
      - `dist/sitemap-index.xml` or `dist/sitemap-0.xml` exists (sitemap integration auto-discovers blog routes).
      - `dist/index.html` navigation contains "Blog".
      If any error occurs, fix it before marking complete. Run `npm run verify` after a clean build.
      Files: no new files — fix any files that caused build errors.
      Verify: `npm run build && npm run verify` — both exit 0.

---

## Implementation notes for the coder

**Astro content collections import path:** Always `import { defineCollection, z } from 'astro:content'` — Zod is re-exported from astro:content, no separate `zod` package is needed.

**`data-category` on BlogCard:** The category filter JS in `blog/index.astro` queries `card.dataset.category`. The `<article>` element inside `BlogCard.astro` must render `data-category={category}`. Add `category` to the `Props` interface and bind it: `<article class="blog-card" data-category={category} style={...}>`.

**Markdown date parsing:** Astro parses frontmatter `publishedAt: 2025-06-01` as a `Date` object automatically when the schema field is `z.date()`. No manual parsing is needed in templates.

**`BaseLayout.astro` head slot:** Add `<slot name="head" />` on a new line immediately after the `</script>` closing tag of the existing structured-data script. In `[slug].astro`, use `<Fragment slot="head"><script type="application/ld+json" set:html={JSON.stringify(articleSchema)}></script></Fragment>` as a direct child of `<BaseLayout>`.

**RSS `context.site`:** `context.site` is typed `URL | undefined`. Use `context.site!` (non-null assertion) since the site is always set in `astro.config.mjs`.

**Backdrop-filter fallback:** Every glass component must include `@supports not (backdrop-filter: blur(1px)) { .blog-card { background: rgb(16 10 28 / 94%); } }` — consistent with `ServiceCard.astro` and `SiteHeader.astro`.

**Animation classes:** The orb and dot animation CSS must be scoped inside `<style>` in `blog/index.astro`. Because these are SVG elements inside the component, scoped styles work for them — no `:global()` needed.

**`prefers-reduced-motion`:** The global CSS already covers all animations via `animation-duration: 0.01ms !important`. No additional reduced-motion handling is needed in new components.
