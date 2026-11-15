---
id: "02-a-better-task-brief"
title: "Write a better task brief"
summary: "Replace vague requests with a result you can inspect."
module: "foundations"
order: 2
minutes: 15
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Write an outcome and observable acceptance criteria.", "Use examples and constraints without overwhelming a simple task."]
lab: 2
---

## The idea

A prompt is a way to communicate a job. Before collecting clever phrases, decide what the result must do. An audience, useful inputs, a format, and a success check often clarify more than a longer description of the assistant's personality.

Start with a task brief that makes the result inspectable.

```text
Outcome: What useful result do I need?
Audience: Who will use it, and what do they already know?
Inputs: Which material should you use?
Authority: Which source wins if inputs conflict?
Constraints: What must be included, preserved, or excluded?
Output: What format should the result take?
Checks: How will I judge it?
Uncertainty: What should you leave unresolved or ask about?
```

For example, “write me a good AI video” leaves almost every important decision open. A better brief is: “Create a 60-second beginner explanation of model versus app. Use one contact-cleaning example. Include a visible failure and a check. Avoid claims about a universal best model. Deliver narration and a shot list.” The duration here is an editorial choice, not a platform limit.

Useful techniques to practice:

- **Provide examples of the target output.** One accepted example and one rejected example can clarify a subjective request.
- **Separate source material from instructions.** Mark the supplied customer text as data and specify what to extract from it.
- **Define the authority order.** An approved decision should outrank an older proposal; a newer informal note is not automatically authoritative.
- **Request an evidence table.** Ask for the claim, source, supporting passage or location, and unresolved gaps.
- **Draft, inspect, revise.** Name the defect you want changed and the elements that must stay fixed.
- **Ask for a plan when the task has dependencies.** Skip elaborate planning for a one-sentence rewrite.
- **Use external checks.** A calculator, schema validator, test runner, or source document can catch errors a second opinion may repeat.
- **Save a compact handoff.** Record completed work, verified facts, open questions, file locations, and the next action before continuing elsewhere.

Ask for concise reasons, assumptions, calculations, and verification evidence. You do not need a model's private internal reasoning to judge a result. A long explanation can still be wrong.

Context engineering is the practical work of deciding what information is supplied, retrieved, retained, summarized, and removed. More material is useful only if the right facts remain findable. In Lab 4 you will test whether an AI can resolve three conflicting documents; simply pasting them all is not the complete skill.

Three original templates:

```text
RESEARCH BRIEF
Answer [question] as of [date]. Prefer primary sources.
Separate verified facts, vendor claims, and your interpretation.
For each important claim, supply a direct source and its date.
If sources conflict, explain which one governs and why.
End with what remains unknown and what I could test myself.
```

```text
CONTROLLED EDIT
Change [one named element] in [artifact].
Preserve [list of invariants].
Show the revised result and identify any requested element you
could not preserve. I will compare it against the original.
```

```text
BOUNDED AGENT TASK
Produce [deliverable] using [working folder and permitted tools].
Success means [observable checks].
Keep a short progress record and identify unresolved blockers.
Stop after [time, cost, or action budget] or when checks pass.
Prepare external messages or publication as drafts unless authorized.
Return the changed artifacts and the evidence from your checks.
```

Treat templates as starting points. If a task already specifies everything clearly, adding a long ritual can make it harder to understand.

## Try it

**Time/access:** 20 minutes; Text.

Run “Make a lesson about AI” once. Then specify audience, duration, one learning outcome, one example, output format, and a success check. Keep the model and other settings the same.

```text
Create a 15-minute lesson for complete beginners. Outcome: learners
can distinguish a model from an app. Include a short explanation,
one shared example, a two-question exercise, and expected answers.
Use plain language. Do not compare model quality or list prices.
```

**Check:** Score both outputs against the second brief. Notice whether the second output actually satisfies it; added detail alone is not a win.

**Save/teach:** Both prompts and outputs, plus the criteria. Demonstrate the effect of a clear task rather than a “magic prompt.”

## Check your work

Compare the vague and specific attempts against the same rubric. Name the requirement that improved and any requirement still missed.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show the brief first, then the output. Let learners predict which missing detail will matter.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
