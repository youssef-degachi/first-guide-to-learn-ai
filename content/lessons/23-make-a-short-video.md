---
id: "23-make-a-short-video"
title: "Make a short video shot"
summary: "Think in action, camera, timing, and continuity."
module: "creative"
order: 23
minutes: 20
level: "Intermediate"
updated: "2026-11-14"
status: "published"
objectives: ["Describe a shot with action and continuity constraints.", "Distinguish editing an existing clip from generating a new one."]
lab: 25
---

## The idea

A clip has to work across time. Start with one subject and one action. Inspect the beginning, middle, and end, then evaluate any edit against the supplied original.

Break a clip into subject, action, setting, camera movement, duration, and continuity constraints. Use a short shot to discover failure modes before attempting a complex sequence. A model may understand a reference video without supporting every kind of edit you want.

Two current examples are **Gemini Omni 1.2 Flash**, documented with multimodal input and audiovisual output, and Runway's **Gen-4.5** generation and **Aleph 2.0** editing offerings. These are different entry points into production; compare the relevant operation rather than declaring a single winner from a trailer. [Omni model card](https://deepmind.google/models/model-cards/gemini-omni-1-2-flash/) · [Runway model catalog](https://docs.dev.runwayml.com/guides/models/)

For the notebook clip, score continuity, hand movement, action completion, unintended text, and whether the requested edit preserves the original action. View the full clip at normal speed and inspect problem frames. Log every generation, not only the selected result.

**ComfyUI** represents a different workflow: a node graph connects media-processing components. It is useful to study when you want visible control over stages and repeatable configurations. It is not a language model or a synonym for LangGraph. [Official repository](https://github.com/Comfy-Org/ComfyUI)

## Try it

**Time/access:** 30–60 minutes plus generation time; Media.

Use the eight-second notebook brief. If the product supports a different duration, adapt it and record the change. Begin with one continuous action rather than a multi-scene story.

**Check:** Notebook continuity, hand plausibility, action completion, camera movement, and no invented captions. Inspect the full output, including its ending.

**Save/teach:** The full clip, attempt count, and failure notes. A selected attractive frame does not establish temporal quality.

## Check your work

View the whole clip and inspect difficult frames. Record actual duration, attempts, and any action or identity drift.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Explain why a selected frame cannot establish the quality of an entire clip.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
