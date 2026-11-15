---
id: "12-specify-before-building"
title: "Specify before building"
summary: "Define one useful flow and what done means."
module: "building"
order: 12
minutes: 15
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Write a one-page specification with clear scope.", "Describe observable acceptance criteria and edge cases."]
lab: 14
---

## The idea

An app specification connects an idea to observable behavior. Keep your first project small: a lesson-request tracker with one input flow and a list. Decide what happens for valid input, invalid input, repeated clicks, and a page reload.

### Write the smallest useful specification

Name the user, the task, the fields, the primary action, and the result. Include an empty state and validation messages. Decide whether information must survive a reload; do not leave persistence implied.

### Use acceptance criteria

A valid request appears once. A missing topic is rejected with a readable message. Keyboard users can reach every action. The layout remains usable on a small screen. These are examples: adapt them to your declared scope.

### Keep scope visible

Authentication, payment, collaboration, and analytics are separate requirements. Add them when needed, with their own checks. A first prototype should not quietly imply that these systems exist.

## Try it

**Time/access:** 30–45 minutes; Text.

Design a lesson-request tracker. Specify fields, one user flow, validation, empty state, and acceptance criteria. Use fictional entries and avoid real learner data during practice.

**Check:** Another person can understand what “done” means. Example: a submitted valid request appears once in the list; an empty topic is rejected with a clear message. Decide whether persistence across reload is required.

**Save/teach:** A one-page specification. This lab demonstrates product thinking before generating code.

## Check your work

Ask another person to read your specification and tell you exactly how they would verify completion.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show how one vague feature request becomes a small flow and five checks.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
