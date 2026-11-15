---
id: "14-reusable-agent-skills"
title: "Use reusable Agent Skills"
summary: "Evaluate instruction packages before adopting them."
module: "building"
order: 14
minutes: 20
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Distinguish a human skill from an installable Agent Skill.", "Evaluate a package with a baseline and a concrete task."]
lab: 21
---

## The idea

A skill packages a method so an agent can reuse it. Start with a repeated task you understand and a way to evaluate the result. A named skill can organize work, but its instructions and dependencies still need inspection.

An Agent Skill is a reusable package of instructions and, sometimes, references or executable resources. The Agent Skills specification uses a `SKILL.md` entry point. Support and behavior depend on the host application. A skill can guide a process; it does not replace missing tools or establish that the result is correct. [Agent Skills](https://agentskills.io/home)

A useful skill improves a repeated task with an observable success check. The following candidates illustrate different uses:

| Candidate | Why it may help | Test before adopting |
|---|---|---|
| Document skills: PDF, DOCX, PPTX, XLSX | Creating and inspecting teaching materials | Does the exported file open, preserve the required content, and render correctly? [Anthropic examples](https://github.com/anthropics/skills) |
| Frontend design | Moving from a vague page request to intentional visual design | Can learners use it on mobile and find the main action? [Skill source](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) |
| Webapp testing | Checking a real browser flow | Does it reproduce the bug and verify the changed behavior? [Skill source](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md) |
| Systematic debugging | Finding a cause before making broad changes | Does it identify the contact bug with evidence? [Superpowers](https://github.com/obra/superpowers) |
| Verification before completion | Connecting a completion claim to a real check | Does the final report include the actual check and its result? [Superpowers](https://github.com/obra/superpowers) |
| Planning and code-review skills | Structuring work and exposing assumptions | Does review find a meaningful defect, and does planning reduce rework? [Superpowers](https://github.com/obra/superpowers) |
| React best practices | Improving relevant React implementations | Does it help the specific codebase and measured problem? [Vercel skills](https://github.com/vercel-labs/agent-skills) |
| Web design guidelines | Reviewing interface quality | Can you reproduce its findings and verify the fix? [Vercel skills](https://github.com/vercel-labs/agent-skills) |
| Writing guidelines | Keeping public material clear and consistent | Does it improve a draft against your rubric without changing facts? [Vercel skills](https://github.com/vercel-labs/agent-skills) |
| A personal research-to-lesson skill | Reusing your evidence and teaching format | Can it create a sourced draft without inventing experiments? Create it only after a few manual runs |

This is a curated shortlist, not a hands-on ranking. Inspect what a package asks the agent to do and whether it includes scripts, network access, or installation steps. Test on a copy of a small project. Avoid installing several overlapping process frameworks at once; you will struggle to identify which change helped.

**A current migration to notice:** OpenAI's old `openai/skills` repository marks itself deprecated and points to `openai/plugins`. Use the current destination when researching that ecosystem. The terms skill, plugin, and connector are related but not interchangeable: a plugin may bundle skills and tools, while a connector provides access to a service. [Migration notice](https://github.com/openai/skills) · [Current repository](https://github.com/openai/plugins) · [Plugin documentation](https://developers.openai.com/plugins/build/plugins)

For a future personal skill, record your audience, source rules, lesson structure, evaluation rubric, and known failure cases. Keep rapidly changing model names in a dated reference rather than embedding them as timeless instructions.

## Try it

**Time/access:** 30–60 minutes; repository reading; optional compatible skill host.

Select one skill from the main guide. Read its instructions, resources, and any scripts. Name a repeated task it should improve. Run the task without it, then with it only if you choose to install it in a suitable test setup.

**Check:** Use the same rubric. Record extra steps, dependencies, improvements, and regressions. Reading the skill supports an architectural review; only the actual trial supports a performance claim.

**Save/teach:** An adoption decision with evidence. Do not rank a skill as “best” because its name sounds useful.

## Check your work

Read the package and identify what it changes. Distinguish a source review from a completed hands-on trial.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show a skill's purpose, required tools, and one measured adoption decision.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
