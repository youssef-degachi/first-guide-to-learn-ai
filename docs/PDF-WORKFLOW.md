# Create a PDF edition that matches the course

## Shared source, shared structure

The lesson Markdown is canonical. `scripts/build-book.mjs` reads the same validated content as the React app and emits `public/course-book.html`. Do not maintain a separate rewritten course in a PDF editor; that creates two versions that can drift.

The book uses the same chapter order, lesson titles, summaries, objectives, body, exercises, checks, source links, and author settings. App interactions such as personal notes and completion buttons are excluded. The book has a cover, table of contents, chapter openers, lesson boundaries, and print styles.

## Current export

```bash
npm run build
npm run preview
```

Open the printed Local URL and choose **Course book**, or visit `course-book.html` at that URL. Press **Print / Save as PDF**. To build the book alone, use `npm run book:html`.

Recommended export settings: A4, portrait, background graphics on, scale 100%, browser headers/footers off unless you intentionally want the browser's page numbering. The CSS supplies page margins. Preview the result before accepting the settings; browser versions can paginate differently.

For a single lesson, open its reader page and choose the printer button. The app hides navigation and notes and uses a print-specific layout.

## House format

| Element | Convention |
|---|---|
| Cover | Library name, author, clear title, chapter/lesson counts, dated edition |
| Chapter opener | Chapter number, title, purpose |
| Lesson header | Lesson number, title, summary, learning outcomes, source date |
| Main reading | The idea, supporting concepts and examples |
| Practice | Inputs, task, suggested prompt, access needs |
| Assessment | Expected answer or rubric, essential checks, limitations |
| Teaching | A concise demonstration or explanation angle |
| Sources | Direct links near the claims and related reading |

Use readable black/green text on white, restrained rust accents, and ample line spacing. Export tables as tables rather than screenshots. Preserve searchable text and working source links. Code wraps for print; inspect it carefully for long lines.

The current browser book uses a print-friendly serif fallback so it remains readable as a standalone HTML file. The app's bundled brand fonts are used in the web interface. If exact print typography is required, embed or reference licensed local fonts in the book stylesheet and verify their loading before export.

## Editorial gate before creating a release PDF

1. Confirm that every included lesson is published and reviewed.
2. Recheck time-sensitive facts and access statements.
3. Verify arithmetic, answer keys, and code behavior where claimed.
4. Preserve the distinction between proposed labs and observed experiments.
5. Build the book from the same commit as the website.
6. Export the PDF and inspect every page, including table and code breaks.
7. Check the cover, contents, sources, text extraction, and a sample of clickable links.
8. Ask another reader to open the file on a phone and desktop.

A production PDF should be rendered page by page for visual QA. If using an AI document workflow later, use the available PDF skill/tooling and retain the same canonical lesson inputs. Do not describe the PDF as verified until the exported file has actually been inspected.

## Versioning and release files

Use a dated filename such as `ai-fieldnotes-course-2026-11-15-v1.pdf`. Record the source commit, edition, export browser/version, settings, reviewer, and known limitations in the release note. Keep the final PDF in a versioned releases folder or GitHub release; avoid committing every intermediate export.

After a lesson changes, rebuild both the app and the book. Keep an older PDF available only with its original date and a clear archive label. If a critical correction affects an earlier PDF, publish a correction note rather than silently replacing the old file under the same version.

## Optional later automation

A pinned headless browser can export the book as PDF in a release job. Add an explicit export command, a predictable browser installation, font readiness, and a visual/text review step. The current repository provides printable HTML and browser export; it does not claim an automated, fully reviewed PDF release pipeline.
