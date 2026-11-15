---
id: "03-context-and-memory"
title: "Give AI the right context"
summary: "Choose useful information and preserve the decisions that matter."
module: "foundations"
order: 3
minutes: 15
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Distinguish current context from persistent memory.", "Prepare a compact, sourced handoff."]
lab: 4
---

## The idea

Context is what the system has available for the current work. Memory is what a system preserves and retrieves across work. Both need selection and maintenance. A long history is not automatically a useful history, and a saved fact can become wrong after a decision changes.

### A small context packet

For a task involving several documents, include the question, the relevant documents, source IDs, an authority rule, and a clear output format. Keep raw source material separate from instructions.

### A useful handoff

Save the goal, completed work, verified facts, unresolved questions, artifact locations, and the next action. Mark superseded decisions rather than silently retaining both as current facts.

### Test what the system remembers

Change a decision in a controlled exercise, then ask a later session to summarize it. Record whether the system used the corrected decision and whether it can identify its source. A vendor memory feature and a hand-written project note may behave differently. See the [context and memory chapter](#/resources/agents-deep-dive) for the longer technical reading.

## Try it

**Time/access:** 20–30 minutes; Text or file upload.

Supply D01–D03 and the five questions in the source pack. First ask for an answer without an authority rule; then repeat with the instruction to distinguish proposal, approved decision, and operational note.

**Check:** The approved date and price must come from D02. The explanation must account for the older proposal. “Use the newest date in any document” is not an adequate general rule.

**Save/teach:** A decision table showing the conflict and resolution. If both attempts succeed, report that; do not manufacture a dramatic failure.

## Check your work

Write a handoff for the launch documents. It should preserve the approved decision and the unresolved refund question.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show a short useful context packet beside an unorganized dump of unrelated material.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
