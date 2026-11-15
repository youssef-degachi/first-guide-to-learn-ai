# Verification record

**App edition: 15 November 2026 · research snapshot: 14 November 2026**

## Completed checks

- Production build with TypeScript checking: passed.
- Content build: 6 chapters, 30 published lessons, 6 resources.
- Nine content/utility tests: passed, including public-reader wording in published readings and downloads, the expanded model overview, creating a draft, keeping it hidden, publishing it into the correct chapter, and generating continuous display numbers without changing IDs.
- Twelve Chromium acceptance tests: passed. Covered reading, notes/bookmarks/completion after reload, resume behavior, search and keyboard controls, chapter/resource filters, downloads, course book, mobile navigation/focus, missing routes, malformed/blocked storage, local reset, all thirty lesson routes, responsive overflow checks, and the expanded model lesson on desktop and phone.
- Responsive checks included 320, 520, 600, 768, 960, 1024, and 1280 pixel widths; screenshots also cover 390 and 1440 pixels.
- A production build served at `/fieldnotes/`: deep links, Markdown downloads, dataset download, and the local SVG loaded successfully. No page errors or failed HTTP responses were observed in that smoke check.
- Printable course HTML: thirty lesson articles present, diagram loaded, and toolbar hidden under print media.
- Desktop overview, mobile overview, and lesson-reader screenshots inspected. The public-reader revision also includes inspected desktop and phone screenshots of lesson 05.

The browser used for the deployment smoke check was Chromium 151.0.7922.34. Browser tests can use the host's compatible executable through the documented environment setting. GitHub workflows are supplied as configuration; no remote repository or deployment was created or exercised.

- Prior source-package check: a clean ZIP was extracted into a separate directory; locked dependencies installed from cache, production build passed, and the original seven content/utility tests passed. Generated files and installed dependencies were absent and recreated successfully. The public-reader revision uses the same dependency lockfile and adds the two editorial tests above; its refreshed ZIP is checked for integrity and consistency with the current source files.

## Scope of verification

These checks verify the software/content pipeline and the stated UI flows. They are not new live comparisons of the AI models discussed in the course. Primary citations and original research dates are retained. The original calculation and contact-cleaning fixtures have independently checked answers.

The printable HTML is generated from the same lessons as the website. A final release PDF has not been exported or reviewed page by page; follow `PDF-WORKFLOW.md` when producing that artifact. Personal progress and notes are local to a browser and do not synchronize across devices.
