---
id: "16-what-a-harness-does"
title: "What a harness does"
summary: "Understand the system around an agent model."
module: "systems"
order: 16
minutes: 20
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Identify tools, state, feedback, and stopping conditions.", "Explain the difference between model intelligence and execution support."]
lab: 16
---

## The idea

A model response becomes useful work only when the surrounding system can provide information, execute operations, and return feedback. The harness is where many reliability and control decisions live.

A **model** generates responses. An **agent harness** supplies the machinery around it: the loop that processes those responses, tools it can call, working files, state, and controls over execution. LangChain's March 10, 2026 architecture article treats prompts, tools, infrastructure, orchestration, and lifecycle logic as parts of this surrounding system. [Harness anatomy](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)

Consider the instruction: “Fix the duplicate-contact bug in this CRM.”

To complete that assignment, the agent needs access to the repository, a way to locate the relevant code, permission to edit, a runnable application, and evidence that the duplicate is gone. The model's intelligence helps choose the actions. The harness makes the actions possible and returns their results.

```text
Your goal and acceptance criteria
                ↓
         Agent harness
   ┌──────────────────────────┐
   │ Model ↔ tools ↔ feedback  │
   │ Context and session state│
   │ Execution controls      │
   └──────────────────────────┘
                ↓
      Files, browser, APIs,
      databases, test results
                ↓
       Reviewable deliverable
```

### Harness engineering

**Harness engineering** means improving that environment so the agent succeeds more consistently. In his February 5, 2026 account, Mitchell Hashimoto describes improving project instructions and creating verification tools in response to repeated agent mistakes. He also describes learning which tasks were worth delegating. This is a practitioner's account, rather than a controlled productivity study. [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)

**Worked example: an improvement loop**

| Repeated problem | Change to the working environment | Evidence of improvement |
|---|---|---|
| Agent runs the wrong test command | Document the actual command beside the project setup | A fresh session runs the correct check |
| Agent declares a visual change finished without opening it | Provide a browser verification procedure | The handoff includes inspected screenshots |
| Agent repeatedly recreates an existing utility | Add a short architecture index linking to the utility | New work reuses the existing implementation |
| Agent forgets what happened in a long task | Save a compact state and next-step note | Another session resumes without reconstructing everything |
| Agent overwrites another worker's edits | Assign ownership and separate workspaces | Integration preserves both changes |

The point is to convert an observed failure into a repeatable improvement. A longer instruction file is only useful when the added information changes behavior.

### Agent harness versus evaluation harness

The **agent harness** runs the worker. An **evaluation harness** runs tasks, collects traces, grades outcomes, and compares runs. Anthropic explicitly distinguishes these terms in its January 9, 2026 evaluation guide. Both matter: one produces the work, the other measures how reliably it succeeds. [Evaluation terminology](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)

### Inner and outer layers

A useful distinction for your own setup is between the runtime you receive from an agent product and the project-specific practices you add around it. You may have little reason to replace the runtime. You can still improve setup instructions, task briefs, reusable procedures, and verification. This is a practical way to begin harness engineering without building a new coding agent.

---

## Try it

**Time/access:** 30–60 minutes; agent with a working folder.

Ask the agent to create a launch brief from the source pack. Define inputs, output path, authority rule, missing-policy handling, and a time or action budget. Keep external publication as a separate decision.

**Check:** It reads the intended sources, produces the artifact, cites source IDs, and checks required facts. Log actions that were unnecessary or failed. If the tool offers no action log, state that limitation.

**Save/teach:** Goal → action → feedback → result. Identify what the harness supplied beyond the model's text generation.

## Check your work

Map the files and operations your agent used to produce the brief. Require evidence that it read the intended sources.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Trace one action through request, tool result, check, and next decision.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
