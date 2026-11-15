---
id: "18-subagents-and-orchestrators"
title: "Subagents and orchestrators"
summary: "Divide work without losing ownership or evidence."
module: "systems"
order: 18
minutes: 22
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Write a focused subagent assignment and handoff.", "Explain routing, coordination, and final-result ownership."]
lab: 17
---

## The idea

A worker needs a bounded assignment, relevant context, and a useful handoff. A coordinator needs a way to resolve conflicts and decide when the combined task is complete. Splitting work creates coordination costs as well as opportunities.

A **subagent** is a worker invoked by another agent for a defined assignment. OpenAI's current managed-agent documentation describes independent contexts, parallel execution, and a coordinating main agent. It recommends independent assignments and coordination when workers edit the same files. This is a documented capability, not a claim about a new release this week. [OpenAI multi-agent documentation](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)

The important property is **context separation**. An investigation can produce thousands of lines of logs or source excerpts. A worker can inspect those and return the few findings that matter, preserving room in the main conversation for the overall task.

Claude Code's documentation likewise describes specialized workers with their own context, prompts, tool access, and permissions. Their requests still count toward usage limits. “Separate context” therefore does not mean “free work.” [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)

### A useful assignment

For a CRM import issue, the main agent could ask:

- Worker A: locate the import validation rules and report why duplicate rows pass.
- Worker B: inspect the existing duplicate-related tests and identify missing cases.
- Main agent: compare the evidence, choose the fix, implement it, and verify the integrated behavior.

These investigations can be independent. Asking one worker to design a new database schema while another writes code against the old schema creates a dependency that must be resolved first.

### What belongs in a worker brief

**Proposed brief format:**

| Field | Example |
|---|---|
| Objective | Explain why duplicate contacts survive an import |
| Inputs | Import implementation, relevant tests, sample duplicate rows |
| Scope | Investigate; leave files unchanged |
| Deliverable | Ranked causes with file locations and a reproduction |
| Evidence | Actual code paths and observed results |
| Stop condition | One supported explanation, or a clear statement of missing evidence |

A job title such as “expert backend engineer” communicates much less than this contract.

### Subagent, parallel session, and team are different choices

| Choice | Coordination | Good fit |
|---|---|---|
| Focused subagent | Parent assigns work and uses the result | Search, analysis, review, noisy logs |
| Independent session | Human or an external controller coordinates it | Separate feature or experiment |
| Agent team | Shared task coordination and messaging | Independent work that also needs discussion |

Claude Code currently marks **agent teams experimental and disabled by default**. Its documentation explains their shared tasks and inter-agent messaging, and identifies overhead and limitations. Those product details should not be generalized to every multi-agent implementation. [Agent teams](https://code.claude.com/docs/en/agent-teams)

**Recommended starting point:** start with one main agent and occasional focused workers. Introduce a team when you can name the independent deliverables and explain how their results will be integrated.

---

### The coordinating layer

**Orchestration** is the control of work: which steps run, in what order, under which conditions, and how results are combined. The orchestrator may be ordinary application code, an AI coordinator, or a combination.

There are two ownership patterns worth recognizing. In a **manager pattern**, specialists return results and the manager keeps responsibility for the answer. In a **handoff**, a specialist takes over that branch of the interaction. OpenAI's current SDK guide documents this distinction and advises adding specialists when their contracts actually differ. [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration)

### Four useful orchestration shapes

| Shape | Example application | Main design question |
|---|---|---|
| Fixed pipeline | Extract company facts → validate fields → draft a report | Are the stages predictable? |
| Router | Send a request to coding, research, or document work | What evidence determines the route? |
| Coordinator and workers | Split a large investigation into independent questions | Are responsibilities distinct? |
| Builder and evaluator | Produce a candidate → inspect it → repair bounded failures | What ends the review loop? |

Anthropic's **December 19, 2024** architecture article distinguishes predefined workflows from systems where the model dynamically directs tool use. It remains useful for these concepts, although the article itself notes that its tooling landscape has since changed. [Foundational architecture guide](https://www.anthropic.com/research/building-effective-agents)

### Orchestration is more than spawning workers

For the worked CRM example, someone must own the shared definition of a duplicate, decide how a conflicting finding is resolved, and rerun the final checks after integrating changes. If all workers finish successfully but their changes do not work together, the overall task has still failed.

An effective coordinator should also know when enough evidence has been collected. Repeated planning and delegation can consume the entire budget without producing a deliverable.

### A recent product example: model orchestration

Google's **November 12** Hydrogen announcement describes **Orchestrator in Antigravity**, which switches models within a session. Google reports near-Carbon task success on its cited Terminal-Bench 4.0 evaluation while consuming 24% less quota and completing 19% faster on average. These are Google's evaluation results, not guaranteed savings in other deployments. [Announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

This highlights an important distinction: **switching models within a workflow** and **running separate worker agents** are different mechanisms. A system may support either or both.

---

## Try it

**Time/access:** 40–60 minutes; subagent support, or two manually separated sessions.

Assign one bounded job: extract factual claims and source IDs from the source pack. Give the lead session only the worker's handoff and ask it to create a lesson draft. Then let it inspect the original sources to verify the handoff.

**Check:** Which facts or uncertainties were lost? Did the worker's handoff preserve the missing refund policy? Did coordination save any time? Compare with a single-session attempt.

**Save/teach:** The handoff artifact and a specific tradeoff. Separate sessions simulate context isolation; they do not prove the performance of a native subagent implementation.

## Check your work

Compare a worker handoff with the original sources. Check whether uncertainties survive the handoff and whether splitting the job helped.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show the handoff artifact rather than counting how many agents you launched.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
