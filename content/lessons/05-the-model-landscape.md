---
id: "05-the-model-landscape"
title: "Navigate the model landscape"
summary: "Understand ChatGPT, Claude, Gemini, and the models behind common AI assistants."
module: "foundations"
order: 5
minutes: 20
level: "Beginner"
updated: "2026-11-15"
status: "published"
objectives: ["Distinguish ChatGPT, Claude, and Gemini from their underlying model families.", "Compare models using task requirements, evidence, access, and cost.", "Verify release date, availability, and preview status."]
lab: 9
---

## The idea

AI assistants combine a model with an interface, tools, and access rules. Understanding those layers makes it easier to choose a product and interpret a comparison. Start with familiar assistants, then look at the models available inside each product.

### ChatGPT, Claude, and Gemini: the basic map

| Assistant | Provider | Model family | What to recognize |
|---|---|---|---|
| **ChatGPT** | OpenAI | GPT | ChatGPT is the application name; GPT names identify underlying models. |
| **Claude** | Anthropic | Claude | Claude names both an assistant and a model family, including Opus, Sonnet, and Haiku. |
| **Gemini** | Google | Gemini | Gemini names both Google's assistant and its model family. |

A model name alone does not describe the complete experience. File access, search, coding tools, subscriptions, and account permissions also affect what the assistant can do. The following model descriptions are provider positioning, not an independent ranking. Product access should be checked separately. [OpenAI product guide](https://learn.chatgpt.com/docs/models) · [Claude overview](https://claude.com/product/overview) · [Gemini release](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

### ChatGPT and OpenAI's GPT models

ChatGPT is a familiar starting point for working through questions, drafts, documents, and ideas. The model determines part of its behavior; the selected product and enabled tools determine the surrounding workflow. When comparing results, record both the application and the exact model shown.

OpenAI's API catalog lists these general-purpose options:

| Model | Provider positioning | Example task to evaluate |
|---|---|---|
| **GPT-6 Astra** | Demanding reasoning and complex work | Investigate a difficult problem and check the conclusions. |
| **GPT-6.1 Sol** | A balance of capability and cost | Produce a sourced brief or implement a scoped feature. |
| **GPT-6.1 Terra** | Visual reasoning, computer use, and clear writing | Interpret a screenshot or revise a document. |
| **GPT-6 Luna** | Efficient execution of focused, repeated tasks | Classify records or extract specified fields. |

These entries are drawn from the [OpenAI API catalog](https://developers.openai.com/api/docs/models). They are not a universal ChatGPT model-picker list. OpenAI's product guide distinguishes **Chat**, **Work**, and **Codex** availability. Check the current selection and limits in the actual product and account being used. [Product availability](https://learn.chatgpt.com/docs/models)

### Claude and Anthropic's model families

Claude is Anthropic's assistant and model family. The assistant provides a place to work with tasks and information; a selected Claude model supplies the underlying reasoning and generation. [Claude product overview](https://claude.com/product/overview)

| Model | Provider positioning | Example task to evaluate |
|---|---|---|
| **Claude Opus 5.5** | Substantial coding and knowledge work | Work through a complex document or debugging task. |
| **Claude Sonnet 5.5** | A balance of speed and capability | Draft, revise, or implement a well-defined change. |
| **Claude Haiku 5.5** | Fast, high-volume tasks | Classify tickets, extract fields, or route requests. |
| **Claude Fable 5.2** | Difficult reasoning and longer technical projects | Investigate a problem that simpler approaches have not solved. |

Anthropic's model guide recommends Opus as a general starting point and Fable for more demanding work. These are provider recommendations to test on representative tasks. [Claude model overview](https://platform.claude.com/docs/en/models/overview)

**Claude Mythos 5.2** has a different access arrangement: Anthropic describes verification programs for qualifying cybersecurity and life-sciences work. Its availability should not be assumed from the public Claude model list. [Fable and Mythos announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2)

### Gemini and Google's model families

Gemini is Google's assistant and model family. The Gemini 4 lineup includes three names with different intended roles:

| Model | Provider positioning | Example task to evaluate |
|---|---|---|
| **Gemini 4 Argon** | Broad software and knowledge work | Create a document brief or fix a scoped bug. |
| **Gemini 4 Carbon** | More demanding, sustained reasoning | Investigate difficult debugging or research questions. |
| **Gemini 4 Hydrogen** | Fast execution and everyday workflows | Classify records, rewrite text, or complete smaller workflow steps. |

Google's announcements describe these roles and model routing in Antigravity. Access varies across the Gemini app, developer tools, subscriptions, and API. [Carbon and Argon positioning](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) · [Hydrogen and routing](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

### Other model families worth recognizing

The wider reading list also covers **Grok**, **DeepSeek**, **Qwen**, and **Mistral**. Their interfaces, deployment options, licenses, and tool support differ. Consult their current documentation before selecting a version: [Grok](https://docs.x.ai/developers/models/grok-4.7), [DeepSeek](https://api-docs.deepseek.com/updates/), [Qwen](https://github.com/QwenLM/Qwen3.8), and [Mistral](https://mistral.ai/news/mistral-large-4-oss/).

### How to choose a model in practice

Begin with a task and a success check. Compare candidates on:

1. **Correctness:** Does the result meet the requirements?
2. **Evidence:** Can important claims be traced to reliable sources?
3. **Instruction following:** Are the required format and constraints preserved?
4. **Time:** How long does a usable result take, including corrections?
5. **Cost:** What does the full attempt cost, including retries and tools?
6. **Workflow fit:** Can the product access the inputs and perform the required operations?

For example, give two assistants the same short document and request five facts with source locations. Check missing information and unsupported additions as well as fluency. Record tool access so the comparison describes the setup accurately.

Start with accessible options and a small task set. Add another provider when it answers a concrete question about quality, speed, cost, or workflow. Model choice should follow the work being evaluated. [OpenAI model-selection guidance](https://learn.chatgpt.com/docs/model-selection)

## Try it

**Time/access:** 30–45 minutes; web research.

Choose ChatGPT, Claude, or Gemini and one model available through that provider. Create a source card with five fields: provider, application, model/version, usable access and status, and dated primary sources. Verify any price before including it.

```text
Investigate this announcement as of today. Separate initial
announcement from usable access. Give direct primary sources and
publication dates. Identify any later update that changes the claim.
Do not infer access from a product name alone.
```

**Check:** Open each primary source and confirm that it supports the recorded claim. Distinguish API availability from access inside a consumer app. Record any later update that changes the announcement.

**Save/teach:** A completed source card with direct links and a research date. Search snippets alone are insufficient evidence.

## Check your work

The card should distinguish the provider, application, and model; identify the available product or access route; and link directly to evidence. Record the research date separately from any hands-on test date.

Use the [full lab workbook](#/resources/practice-labs) for announcement verification and controlled model comparisons.

## Teach it

Explain the difference between an assistant and a model using ChatGPT, Claude, or Gemini. Then show one sourced model description and one practical task for evaluating it. Label untested capabilities as researched information.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). This model overview was reviewed on 15 November 2026; other resources retain their stated research dates. Always verify the primary links before presenting a current claim.
