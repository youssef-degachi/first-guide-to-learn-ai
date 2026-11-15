# How to research and write the next lesson

This is the publication standard for AI Fieldnotes: a repeatable editorial process for the app, course book, and future PDF editions.

## 1. Start with a learner and an outcome

Write one sentence: “After this lesson, a learner can ___ using ___ and can check success by ___.” Name prerequisites. Decide whether this is a foundation, a researched update, a tested tutorial, or a deeper reference. A new model announcement is not automatically a new lesson.

Use the [lesson template](templates/lesson.md). Create a draft with `npm run lesson:new` or copy the template. Keep the ID stable once published.

## 2. Turn the topic into research questions

Ask what the thing is, what problem it solves, what it requires, how access works, what changed, and what can go wrong. For current models also ask:

- Exact model name and version?
- Initial announcement versus usable access date?
- Which app, API, region, plan, or verification route?
- Stable release, preview, beta, restricted access, or retirement?
- Input/output modalities and supported operations in this product?
- Price unit, context tier, tool fees, and any announced future change?

Do not assume a chat subscription includes an API, or that a model understanding video means the app can edit a supplied clip.

## 3. Search and preserve the evidence

Prefer official documentation, model cards, release notes, source repositories, original research papers, and direct product announcements for technical facts. Use community examples to investigate real experiences; label them as experiences rather than proof of general adoption.

Search exact product names plus the question: `release notes`, `model card`, `availability`, `API pricing`, `limitations`, or the named feature. When using an AI research assistant, require direct sources, dates, and separation between fact and interpretation. Open sources yourself; search snippets are discovery aids.

Create `content/sources/<lesson-id>.md` from the [research record](templates/research-record.md). Record the claim, source URL, publication/update date, access date, supporting location, status, and implications. Keep supporting extracts short and write the lesson in your own words.

An imported source record should be marked `carried forward from dated material` until checked again. Never change a review date merely to make an old page look current. This initial app preserves the 14 November 2026 research snapshot; it does not invent a new review for every link.

## 4. Resolve conflicts and uncertainty

Look for later updates, current catalog entries, active endpoint records, migration notices, or explicit superseding decisions. Explain why a source governs. Newer is not automatically more authoritative, especially for informal notes.

Use clear evidence labels:

| Label | Meaning | Appropriate wording |
|---|---|---|
| Documented capability | An authoritative source describes it | “The current documentation lists…” |
| Vendor claim | A provider reports a benchmark or improvement | “The provider reports…” |
| Observed result | You completed and recorded the experiment | “In these attempts, with this setup…” |
| Interpretation | Your reasoning based on evidence | “My interpretation is…” |
| Proposed experiment | A task you have designed but not run | “Try this to evaluate…” |
| Unresolved | Evidence is absent or conflicting | “The available sources do not establish…” |

Do not report a hypothetical output as a real run. Do not turn one successful attempt into “always works” or one benchmark into “best at everything.”

## 5. Design an experiment before writing the conclusion

Specify inputs, setup, model/app, tool access, success criteria, expected answer or independent check, and budget. Include an ordinary case, an edge case, and a missing-information or failure case where relevant.

For comparisons, hold context and tools constant when testing models. If testing complete apps or workflows, allow their features but say so. Record retries, waiting, manual editing, and cost when known. A small comparison can reveal behavior but does not establish broad statistical superiority.

Use [experiment-record.md](templates/experiment-record.md). Save actual inputs and outputs. For code, preserve reproduction and check output. For media, preserve original and edited files and inspect unintended changes. For automation, test a failure path and duplicate input.

## 6. Write the lesson in the shared format

Use an understandable title and a one-sentence summary. Start with the idea, then an example. Add the exercise and the check before the teaching angle. Cite substantive product claims near the claim, with direct primary links. Keep essential facts separate from optional depth.

Voice rules:

- Speak to a curious beginner without talking down to them.
- Write a standalone lesson for public readers. Introduce the subject directly; never reference an authoring chat, private request, or a reader's assumed personal history.
- Keep personal details out of examples unless they belong to an explicitly fictional scenario. Do not infer readers' projects, languages, background, or ambitions.
- Use first-person wording only in clearly labeled prompt templates, example speech, or learner worksheets. Keep the surrounding explanation in a consistent instructional voice.
- Explain a technical term before depending on it.
- Use one concrete example across related ideas.
- Prefer practical verbs: inspect, compare, calculate, test, revise.
- State what the evidence supports and what remains unknown.
- Avoid hype, invented credentials, fake testimonials, and guaranteed results.

For a tutorial, name the relevant setup and date. For a news lesson, distinguish researched capability from something you have personally tested. Keep instructions small enough that a learner can reproduce them.

## 7. Review before publication

Reopen primary sources for time-sensitive claims. Check every new link and file. Run the exercise or explicitly retain its proposed status. Verify known answers independently. Ask a beginner to attempt an unseen comparable task.

Run content validation, tests, and the production build. Inspect the lesson at phone and desktop widths. Open the printable book and review page breaks, tables, code, and links. A second model may help review, but check each proposed correction against evidence.

## 8. Release and maintain

Change the status to `published`, set the real review date, and add a [release note](templates/release-note.md). Explain materially changed instructions, access, cost, or expected outcomes. Update a course-wide snapshot date only after a course-wide review.

Check frequently changing lessons more often than foundations. Review model/access/pricing claims immediately before a current video; review the active curriculum periodically and when a provider announces a relevant change. Correct published errors visibly and preserve the reason for the correction.
