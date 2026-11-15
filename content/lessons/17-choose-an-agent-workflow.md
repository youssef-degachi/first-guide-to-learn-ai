---
id: "17-choose-an-agent-workflow"
title: "Choose a bounded agent workflow"
summary: "Use the simplest system that can complete the job."
module: "systems"
order: 17
minutes: 18
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Choose a prompt, fixed workflow, or agent for a task.", "Define a deliverable, action boundary, and stop condition."]
lab: 16
---

## The idea

An agent is useful when choosing the route is part of the work. A fixed sequence may be easier to understand and maintain when the steps are known. Choose between them using the task, not the popularity of a framework.

**The following decision table is practical guidance**, based on the architectures and tradeoffs above.

| Situation | Start with | Reason |
|---|---|---|
| Small change with an obvious location | One agent | Little value from coordination |
| Large codebase; uncertain failure location | Main agent plus focused investigators | Separate evidence gathering |
| Predictable extraction and validation | Fixed workflow with model calls where needed | Clear stages and repeatable checks |
| Broad research with independent questions | Coordinator and bounded workers | Work can proceed independently |
| Several modules with agreed interfaces | Separate workspaces and an integration owner | Ownership is explicit |
| Long task spanning sessions | Persisted plan and state | Continuity is the bottleneck |
| Repeatable personal procedure | A focused skill | Avoid rewriting the same instructions |
| Continuing monitoring responsibility | Scheduled/event-driven worker with clear triggers | Define when action is useful |

A September 26, 2026 **preprint** studying software-agent harnesses found that benefits depended on the model and task. Its component analysis reported that some general subagent and compression configurations could hurt repository-generation performance. These abstract-level findings caution against assuming that more elaborate scaffolding always helps. [Beyond the Model](https://arxiv.org/abs/2609.32459)

The right comparison is the same task under different setups, with the same acceptance criteria. Counting agents or generated lines of code does not tell you how much useful work was delivered.

---

## Try it

**Time/access:** 30–60 minutes; agent with a working folder.

Ask the agent to create a launch brief from the source pack. Define inputs, output path, authority rule, missing-policy handling, and a time or action budget. Keep external publication as a separate decision.

**Check:** It reads the intended sources, produces the artifact, cites source IDs, and checks required facts. Log actions that were unnecessary or failed. If the tool offers no action log, state that limitation.

**Save/teach:** Goal → action → feedback → result. Identify what the harness supplied beyond the model's text generation.

## Check your work

Complete the launch brief with a bounded assignment. Note unnecessary actions and whether a simpler workflow would suffice.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Explain your architecture choice using one task and one concrete tradeoff.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
