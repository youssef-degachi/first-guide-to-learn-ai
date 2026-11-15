# Integrate the course into your website later

This is an integration plan. The current deliverable is a standalone React/Vite app with static output. No change has been made to an existing website, and no assumption is made about its framework.

## Choose an approach

| Approach | Best when | Tradeoff |
|---|---|---|
| Host the built library under `/learn/` | Your website can serve a static directory or route to a static deployment | Keeps the course independent; simplest recommended starting point |
| Host at `learn.your-domain.example` | You prefer separate deployment and updates | Requires a subdomain and hosting setup |
| Embed an iframe | The website offers an embed block and you need a quick connection | Nested navigation/scrolling; weaker integration and shareable parent URLs |
| Port the React components into your app | You want one navigation, design system, and analytics setup | Requires adapting routing, assets, styles, and build-time content generation |

The `.example` domain above is a placeholder. Replace it with your actual domain.

## Option A: serve the standalone library at `/learn/`

1. Keep this repository as the course source.
2. Set `VITE_BASE_PATH=/learn/` in the build environment.
3. Run `npm ci`, `npm test`, and `npm run build`.
4. Serve the contents of `dist/` at your website's `/learn/` directory, or route that path to the static deployment.
5. Add a “Learn AI” link in your website navigation.
6. Check a direct URL such as `/learn/#/learn/01-models-apps-and-agents` and reload it.
7. Test search, downloads, notes, the course book, and mobile navigation at the real path.

Hash routes are intentional: they work on simple static hosting without a rewrite for every lesson. Asset paths respect the configured base. Vite documents the relationship between deployment paths and its `base` setting. [Vite deployment guide](https://vite.dev/guide/static-deploy.html)

Keep the course-book path alongside the app so its “Back to the library” link works. For a custom root domain, use `/` instead of `/learn/`. Do not simply copy a root-path build into a subfolder and assume its assets will resolve.

## Option B: embed temporarily

After deploying the standalone build, a basic embed looks like:

```html
<iframe
  src="https://YOUR-ACTUAL-HOST/learn/"
  title="AI Fieldnotes learning library"
  style="width:100%;height:90vh;border:0;border-radius:12px"
  loading="lazy"
></iframe>
```

This snippet is a template, not a live endpoint. Test keyboard navigation, scrolling, downloads, and print in the target site. Do not add a restrictive sandbox or permissions policy blindly: it can disable storage, downloads, popups, or printing. Prefer a normal link to the full library when the embed experience is awkward.

Browser storage belongs to the course origin and can behave differently in embedded/third-party contexts. Test it in the actual deployment instead of assuming that progress will persist.

## Option C: integrate the React source

The reusable pieces are `src/components/Reader.tsx`, `Markdown.tsx`, the content utilities, and the generated course data. `src/App.tsx` currently provides the full shell, navigation, hash routing, and page views. Treat it as an application to adapt rather than a drop-in component guaranteed to work in every framework.

Adapt these boundaries:

- **Router:** replace the hash navigation helpers and `parseRoute` with your host router. If the host already uses hash routing, avoid two routers controlling the same hash.
- **Content build:** run `scripts/build-content.mjs` before the website build, or adapt its output to the host's content loader.
- **Assets:** replace `import.meta.env.BASE_URL` in `assetUrl` with the host's public asset configuration. `import.meta.env` is Vite-specific.
- **Styles:** namespace global selectors and theme variables under a course wrapper before placing them inside a site with existing CSS. Preserve the reading-size rules in `styles-readability.css`.
- **Fonts:** move bundled font imports into the host's supported font system.
- **Browser APIs:** progress, clipboard, print, dialogs, and the current router use browser APIs. In an SSR framework, load the app in a client-only boundary or refactor initialization to be server-safe. Merely labeling a file as a client component does not automatically make every server-rendered access to `window` safe.
- **Brand and navigation:** keep `content/site.json` as the single branding source or deliberately map it to your website settings.
- **Storage:** preserve the key and stable lesson IDs if you want existing progress to remain available on the same origin. A new domain does not inherit local storage automatically.

Do not add login, a database, or a CMS unless your use case requires shared progress, multiple authors, or browser-based uploads. Those are new features with their own data model and tests, not configuration switches in this app.

## Search and discoverability

The current app offers local keyword search over included content. It is not a live AI search service. Its default HTML metadata describes the library as a whole.

If public search-engine discovery of every lesson becomes important, add prerendering or server rendering, clean routes, per-lesson metadata, a sitemap, and canonical URLs in the host framework. Do not assume a static hash-routed app already provides all those features.

## Integration acceptance checks

Open the deployed landing page and a direct lesson link. Reload both. Test a lesson completion and note, reload, then reopen the app. Check a resource download and the printable book. Verify assets at the actual subpath, phone widths, keyboard access, and the host's content-security policy. Confirm that website navigation and course navigation do not overwrite each other's state.

## Information to collect before integration work

Record your actual website framework, repository, host, intended course path/domain, brand settings, router type, and whether you need accounts or shared progress. With those facts, the adaptation can be concrete and limited to the required boundaries.
