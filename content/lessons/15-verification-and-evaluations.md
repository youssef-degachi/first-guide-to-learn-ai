---
id: "15-verification-and-evaluations"
title: "Verify before saying done"
summary: "Choose checks that expose meaningful defects."
module: "building"
order: 15
minutes: 18
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Choose a check appropriate to the artifact.", "Separate a review suggestion from verified evidence."]
lab: 12
---

## The idea

Verification should answer the actual task question. A total score can hide a critical failure, so define essential requirements separately. A review model can help find defects, but its suggestions need evidence too.

### Build a small evaluation set

Keep known inputs, expected results, and a rubric. Include ordinary cases, edge cases, missing information, and a deliberately misleading input. Avoid grading only on polish.

### Use the strongest available check

For a calculation, reconcile rows and totals. For a factual claim, inspect the source. For code, run behavior checks. For media, compare constraints and preservation against the original.

### Report the actual evidence

Say which check ran, what it found, and what remains unresolved. A planned test is not an executed test. The [practice answer key](#/resources/instructor-key) supplies known results for the fictional fixtures.

## Try it

**Time/access:** 20–30 minutes; Text.

Ask the same model, a different model, or a learner to review the script for factual accuracy, jargon, and missing explanation. Provide the sources and a rubric.

```text
Review against the source facts and this rubric. Identify specific
defects with locations. Separate factual errors from preferences.
Do not rewrite until you have listed the issues and their evidence.
```

**Check:** Manually verify each proposed correction. A second AI can repeat the first one's mistake or invent a new objection.

**Save/teach:** One accepted correction and one rejected or qualified suggestion, if one occurs. Otherwise show an accurate review without forcing disagreement.

## Check your work

Review a script or output against its original sources. Confirm every accepted correction.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Explain one defect that would survive a superficial check.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
