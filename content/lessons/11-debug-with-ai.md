---
id: "11-debug-with-ai"
title: "Debug with AI"
summary: "Find a cause, make a small change, and test behavior."
module: "building"
order: 11
minutes: 20
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Reproduce a bug before requesting a fix.", "Verify record identity and order, not only count."]
lab: 13
---

## The idea

The contact example is small enough to understand and subtle enough to expose a weak test. Both buggy and correct outputs contain four contacts. You must inspect which records remain and why.

Start with a tiny application or bug where success is visible. You should understand the input, the expected behavior, and the way to run it. You do not have to write every line yourself, but you do need a route to detecting failure.

An effective coding session has five artifacts:

- A short specification.
- The relevant code and reproduction steps.
- A limited change.
- Evidence from meaningful checks.
- A plain-language explanation of what changed and what remains uncertain.

The supplied contact-cleaning bug is deliberately small. Both the buggy and correct versions return **four contacts**, but the buggy version retains the wrong Ada record and drops Cora. A count-only test passes while behavior is wrong. This is an excellent first lesson in evaluating AI-generated code.

For a larger project, ask the agent to inspect the existing design before editing, implement one useful slice, and show the checks. Keep the task small enough to review. A polished preview does not establish that persistence, authentication, accessibility, or error handling works.

Tools fall into different layers: an editor integrates code work; a coding agent executes tasks; an interface can supervise several agents; a framework provides application building blocks. **T3 Code** is an open-source interface/control plane for coding agents, distinct from T3 Chat and the T3 web-development stack. Its repository is the appropriate place to check current provider support. [T3 Code](https://github.com/pingdotgg/t3code)

Your first advanced coding trick should be a reliable reproduction and acceptance check. Parallel work, worktrees, and long autonomous loops become useful after you can tell whether one worker succeeded. See the [technical companion](#/resources/agents-deep-dive) for those patterns.

## Try it

**Time/access:** 35–60 minutes; code-capable environment.

Use [buggy_contacts.py](downloads/learning-kit/practice-inputs/buggy_contacts.py), [contacts.csv](downloads/learning-kit/practice-inputs/contacts.csv), and the specification in the README. Ask the AI to explain the failure, make a small fix, and verify expected identities and order.

**Check:** The correct records are in the answer key. Add cases for whitespace-only emails, repeated normalized emails, and different emails with matching names. Stay within the stated string-input specification or explicitly agree on how to extend it.

**Save/teach:** The failing behavior, changed code, and actual check output. Count alone is intentionally insufficient.

## Check your work

Run the original and corrected functions. Compare the records and test whitespace-only emails and repeated normalized emails.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Use the same-count, different-people result to explain why a check must match the intended behavior.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
