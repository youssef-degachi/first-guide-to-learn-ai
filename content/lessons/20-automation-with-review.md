---
id: "20-automation-with-review"
title: "Automate with a review point"
summary: "Make exceptions and failed steps visible."
module: "systems"
order: 20
minutes: 22
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Design an intake, validation, AI, and review sequence.", "Test malformed input, failed steps, and duplicate processing."]
lab: 29
---

## The idea

A useful automation handles more than its happy path. Start with synthetic inputs, a visible log, and a review queue. Before adding external actions, understand validation, bounded retries, and duplicate processing.

An automation repeats a defined process. An agent can choose some of the next steps. Many useful systems combine both: fixed intake and logging, an AI classification or research step, then a controlled review or action.

Example: new lesson request → check required fields → classify topic → draft lesson → validate required sections → teacher reviews → publish. The AI is one component of the process.

Workflow tools such as **n8n** document combining AI agents and ordinary workflow steps. The important skill is designing input validation, tool access, exceptions, logs, and a stop or review point. [n8n agent workflows](https://n8n.io/ai-agents/)

When should you use each pattern?

| Pattern | Good first use | Failure to watch |
|---|---|---|
| One prompt | A bounded transformation | Missing context or ambiguous instructions |
| Fixed workflow | A repeated process with known stages | Unhandled exceptions or brittle assumptions |
| One agent | The route needs tool-based exploration | Unbounded action or weak success criteria |
| Subagent | A separable task needs its own context | Duplicated work and lost information during handoff |
| Orchestrator | Several workers or models need coordination | Coordination costs more than the work it saves |
| Long-running loop | Repeated attempts can be checked objectively | A weak check lets the loop repeat or optimize the wrong thing |

These are design recommendations. Start by proving that the simpler pattern is insufficient on a real task.

An agent needs an operating environment: tools, working files, feedback, and boundaries. That is why **harness engineering** matters alongside model selection. A subagent needs a bounded assignment and a useful handoff. An orchestrator needs a way to decide what runs, combine results, resolve conflicts, and stop.

Other names worth recognizing are **Ralph** loops, **GSD** structured development, **Git worktrees**, **MCP**, **ACP**, and **A2A**. They refer to different things: execution patterns, project processes, workspace isolation, and integration protocols. The [agents companion](#/resources/agents-deep-dive) explains each with dated primary sources and worked examples. Learn the problem each solves before installing it.

For your first agent demonstration, let an agent inspect the supplied documents and draft a brief in a working folder. Keep the result reviewable. Do not begin by letting a new setup send messages, modify customer records, or publish lessons automatically; those actions add operational decisions unrelated to understanding the basic loop.

## Try it

**Time/access:** 60–90 minutes; workflow tool or manual simulation.

Create intake → validate → classify → save draft result → review. Use synthetic tickets. Add one malformed input and simulate one failed AI step. Keep the result in a test file or review queue.

**Check:** Missing fields are handled, failure is visible, retries are bounded, and repeated processing does not create unintended duplicate records. No step should claim to have sent or resolved anything it did not do.

**Save/teach:** Workflow diagram, one normal trace, and one failure trace. If you simulate steps manually, say so; this still teaches the design but does not establish integration reliability.

## Check your work

Show one normal trace and one failure trace. Label manual simulation clearly if you have not implemented the integration.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Demonstrate how the workflow stops or asks for review when something fails.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
