# Content system: one course, several outputs

## What is canonical

`content/lessons/*.md` is the source of truth for course lessons. `content/course.json` defines chapters, their order, and the course edition. `content/site.json` defines the public brand. The build reads these files to generate the app index, downloadable lesson Markdown, and printable course book.

`content/resources/*.md` contains longer references. The original kit under `public/downloads/learning-kit/` and its ZIP are a dated archive, not a second editable course. Preserve their snapshot date. When updating a current lesson, either update a relevant reference with a new evidence review or explicitly retain it as a historical snapshot.

Generated files in `src/generated/`, `public/content/`, and `public/course-book.html` are rebuilt automatically. Edit canonical inputs instead of generated output.

## Lesson metadata

Each Markdown file begins with YAML frontmatter. Quote strings, especially dates and numeric-looking IDs.

```yaml
---
id: "31-your-stable-lesson-id"
title: "A clear learner-facing title"
summary: "The useful thing a learner will be able to do."
module: "research"
order: 31
minutes: 15
level: "Intermediate"
updated: "2026-11-15"
status: "draft"
objectives:
  - "An observable learning outcome."
  - "A way to check the result."
lab: 31
---
```

`id` is permanent after publication. Links, progress, notes, and bookmarks use it. Lessons are sorted first by the chapter array in `course.json`, then by `order` inside each chapter. Keep order values unique across the repository. A generated `sequence` supplies the displayed lesson number, so adding a lesson to an earlier chapter automatically adjusts display numbers and previous/next links. The new-lesson command appends within the selected chapter; it does not rename old IDs. Change `order` to rearrange a chapter, but keep existing IDs stable even when their numeric-looking prefix differs from their new display number.

`minutes` is an editorial estimate for reading and practice, not a measured promise. `updated` is the evidence-review date for the content, not an automatic build timestamp. `lab` is an optional editorial reference; write a self-contained exercise even when you link to an existing lab.

Supported chapter IDs: `foundations`, `research`, `building`, `systems`, `creative`, `teaching`. New chapters may be added in `course.json`; each needs a unique ID, display number, title, short title, description, outcome, icon, and color. Supported icon names are in `src/App.tsx`; supported tones are in `src/styles.css`.

## Lesson structure

Use these headings consistently:

1. `## The idea`: plain explanation, distinctions, example, and linked evidence.
2. `## Try it`: inputs, steps, suggested prompt, access needs, and a stopping rule if needed.
3. `## Check your work`: expected result or rubric, essential failure conditions, and known limits.
4. `## Teach it`: a short explanation or demonstration angle.
5. `## Keep exploring`: related lessons, references, and primary sources.

Use third-level headings for supporting sections. Keep a lesson focused on one outcome or a small coherent pair. Split a long reference into teachable steps rather than merely adding more headings to a single huge lesson.

## Drafts and publication

`status: "draft"` excludes a file from the app, search, and course book. `published` is the only other accepted status. Drafts can be incomplete, but review them before changing status.

```bash
npm run lesson:new -- --title "Source comparison" --module research
npm run content:check
npm test
npm run build
```

The build rejects missing required metadata, unknown chapter IDs, duplicate IDs/orders, missing core lesson sections, unbalanced code fences, and unknown direct lesson/resource links. Tests also check included practice-download paths. A passing build checks structure; it does not verify product facts or prove that the exercise works.

## Linking

- Another lesson: `[Read the lesson](#/learn/01-models-apps-and-agents)`.
- A resource: `[Practice labs](#/resources/practice-labs)`.
- A practice download: `[Orders](downloads/learning-kit/practice-inputs/orders.csv)`.
- A primary source: use its full `https://` address.
- A heading in the same document: use its generated slug, such as `#check-your-work`. The reader scrolls without leaving the lesson route.

The app uses hash routes so a link works on a basic static host without server rewrite rules. Public source downloads are resolved against the deployment base path. Avoid filesystem paths, credentials, private document URLs, and links to a user's local machine.

## Adding resources and files

Add a Markdown file in `content/resources/` with `id`, `title`, `summary`, `updated`, `status`, and `category`. Categories are `Guide`, `Practice`, `Teaching`, `Reference`, and `Template`. A resource may also include an `original` filename for editorial traceability.

For a new dataset or worksheet, use a descriptive folder such as `public/downloads/lesson-31/`. Link it as `downloads/lesson-31/example.csv`. Keep a separate answer key if the exercise is assessed. Use fictional or appropriately permissioned data and clearly state the expected interpretation of its fields.

For images, store publishable assets in `public/media/` and write `![Useful alt text](media/your-image.svg)`. The reader resolves `media/` and `downloads/` image paths against the deployment base; the course book resolves them relative to its own location. External `https://` image URLs are also supported. Add meaningful alt text. Raw HTML is intentionally skipped by the reader. Markdown tables, lists, ordinary code fences, and links are supported. Mermaid fences are displayed as readable source, not automatically rendered diagrams; use an accessible SVG when a visual diagram is essential.

## Progress and changes

Progress is stored under the configurable `storageKey` in the visitor's local storage. Only known lesson IDs are retained. There is no cross-device synchronization. Changing an ID loses the connection to old progress; changing the storage key intentionally starts a new local record.

For a major lesson revision, explain what changed in a release note. Current progress does not automatically expire after content changes. If that becomes important, introduce explicit lesson-version progress with a migration rather than silently clearing every learner's notes.

## Finishing a content change

Check the evidence, run the exercise, inspect desktop/mobile reading, open every new download, review the course book, and record the edition change. Keep the update narrow enough that another reviewer can identify what changed and why.
