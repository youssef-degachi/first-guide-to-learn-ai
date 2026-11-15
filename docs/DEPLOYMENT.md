# GitHub and deployment

This project is prepared for a repository you choose. The source package does not create a GitHub repository or push changes on your behalf.

## Push your source

Create an empty repository in your GitHub account, then follow its existing-repository instructions from this app folder. Commit source, Markdown content, documentation, practice files, and `package-lock.json`. Keep `node_modules/`, `dist/`, generated files, browser reports, and secrets ignored.

Choose the publication/reuse license you want for your code and course content. This source package does not silently assign an open-source license to your brand material.

## Checks on GitHub

`.github/workflows/checks.yml` runs on pushes and pull requests. It installs locked dependencies, validates content, runs the content/utility tests, and builds the app. Browser acceptance tests are available locally; they are not implied by the default CI result.

## GitHub Pages

1. Push the source to the repository's `main` branch, or adjust the supplied workflow for your branch.
2. In repository Settings → Pages, select GitHub Actions as the source.
3. Add an Actions repository variable named `DEPLOY_PAGES` with value `true`.
4. Run the Pages workflow manually or push to `main`.
5. Inspect the returned deployment URL and test direct lesson links, assets, downloads, and the printable book.

The workflow derives `/<repository>/` for a normal project Pages site and `/` for a `<owner>.github.io` repository. For a custom domain or another path, set `SITE_BASE_PATH` to the correct leading/trailing-slash value, usually `/` for a custom root domain. Configure the domain separately in GitHub Pages settings.

The workflow stays disabled until you explicitly set the variable. The local preview does not publish anything.

## Other static hosts

Use the build command `npm ci && npm run build` and output directory `dist`. Set `VITE_BASE_PATH` in the build environment for a subpath. Serve `index.html`, assets, `content/`, `downloads/`, `media/`, and `course-book.html` together. The hash router does not require a rewrite per lesson.

For a local subfolder preview, use the same base setting for both build and preview. You can copy `.env.example` to `.env.local` and set `VITE_BASE_PATH=/learn/` there, or supply the variable to both commands. Open the full subpath URL printed by the preview server. A preview server configured for `/` is not the correct test host for a build configured for `/learn/`.

Vite's official guide documents static output and deployment-base settings. [Static deployment guide](https://vite.dev/guide/static-deploy.html)

## Preview versus production

`npm run dev` is for development. `npm run preview` lets you inspect a production build locally; it is not a production hosting service. Deploy the built static files to your chosen host.

Before a release, follow the content/research checks and PDF workflow. Keep the research snapshot visible and verify current news separately. Record a release note so readers can understand substantial changes.
