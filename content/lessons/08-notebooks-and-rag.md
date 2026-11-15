---
id: "08-notebooks-and-rag"
title: "Notebooks, retrieval, and RAG"
summary: "Ask questions over a selected source collection."
module: "research"
order: 8
minutes: 18
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Explain retrieval separately from answer generation.", "Test both answerable and unanswerable questions."]
lab: 10
---

## The idea

A source-grounded assistant is useful when the answer depends on material you choose. It still needs the right evidence to be retrieved and interpreted. Start with three clean documents and known questions before adding a large archive.

### Separate the stages

Retrieval selects material; generation uses that material to answer. If the key source is absent, a better-written answer will not repair the missing evidence. Inspect both stages where the product allows it.

### A small evaluation

Ask a direct fact question, a question involving conflicting sources, and a question the collection cannot answer. Inspect citations in every case. The supplied launch pack supports all three.

### Read further

The [main guide](#/resources/course-guide) distinguishes context, memory, retrieval, and fine-tuning. [OpenAI's retrieval documentation](https://developers.openai.com/api/docs/guides/retrieval) describes one implementation. [Google's notebook help](https://support.google.com/gemininotebook/answer/16215270?hl=en) describes its source-oriented product. Product details reflect the dated research snapshot.

## Try it

**Time/access:** 30–45 minutes; source-grounded notebook or file-capable app.

Load only the source pack. Ask the five document questions, then ask which questions cannot be answered. Try a question about an unsupported refund promise.

**Check:** Inspect citations and the cited passages. Verify that D02 governs approved facts and missing policy remains unresolved. If the tool cites a passage that does not support the claim, count that as a failure.

**Save/teach:** An answer with its supporting source and an unanswered question. Explain the distinction between grounding and guaranteed truth.

## Check your work

Verify that the cited passage supports the specific answer. Count an unsupported citation as a failure.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Use one supported question and one deliberate unknown to explain source grounding.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
