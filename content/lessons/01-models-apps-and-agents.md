---
id: "01-models-apps-and-agents"
title: "Models, apps, and agents"
summary: "Build a clear mental map before you start choosing tools."
module: "foundations"
order: 1
minutes: 12
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Distinguish a model, app, tool, workflow, and agent.", "Explain why the surrounding tools can change a result."]
lab: 1
---

## The idea

Start here, even if you have used a chatbot before. The names on a model menu tell you only part of the story. A useful AI system also depends on the interface, the information it can see, and the operations it can perform. Your first job is to identify those layers in a task you understand.

AI literacy starts with knowing which part of a system you are using.

| Term | Plain explanation | Example of the distinction |
|---|---|---|
| Model | The trained system that interprets input and generates output | A model may understand an image without generating images |
| App | The interface and features around models | Search, files, voice, projects, and permissions can differ between apps using related models |
| API | A way for software to call a model or service | API billing and access can differ from a chat subscription |
| Tool | An operation available to the AI | Search, run a calculation, read a file, or create an image |
| Workflow | A defined sequence of steps | Form submission → classification → review queue |
| Agent | A system that chooses actions toward a goal, using tools and feedback | Inspect a repository, make a change, run checks, and report evidence |
| Harness | The surrounding execution system for an agent | Tool access, files, state, permissions, stopping conditions, and recovery |
| Orchestrator | Logic that coordinates models, agents, or steps | Route an easy ticket to a fast model and a difficult one to a stronger model |
| Context | Information available for the current work | Your instructions, documents, conversation, retrieved passages, and tool results |
| Memory | Information preserved and retrieved across work | A saved project decision or a durable preference |
| Evaluation | A repeatable check of whether a system does the intended job | Classify ten tickets against a known answer key |

These are working definitions for this curriculum. Products sometimes use the same words differently. When evaluating a tool, ask what it actually does: what it reads, what it can change, how it checks its work, and how you stop or resume it.

```text
Your outcome and success criteria
             ↓
App / workflow / agent harness
             ↓
Model ↔ context and tools
             ↓
Draft or action → checks → human decision
```

You can be highly capable without programming. You need programming or technical help when you want custom integrations, dependable automation, application development, or deeper control over model behavior. Begin with the user skill, then learn the implementation when it solves a real limitation.

## Try it

**Time/access:** 15–20 minutes; Text.

Ask your AI to explain model, app, tool, workflow, and agent using one example: preparing a lesson from three documents. Then write your own two-sentence explanation without copying the answer.

```text
Explain these five terms to a complete beginner using one shared
example: model, app, tool, workflow, agent. For each, name its job
and one thing it does not establish about the final result.
```

**Check:** Can you explain why two apps using related models may behave differently? Can you distinguish generating a plan from actually performing an action?

**Save/teach:** A one-page map and a 30-second spoken explanation. Avoid teaching “all AI is a chatbot.”

## Check your work

Explain the same document-to-lesson task using each term. Describe an action the system actually performed separately from an action it merely proposed.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Draw the five layers and explain them without listing product names.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
