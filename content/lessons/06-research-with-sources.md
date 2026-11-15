---
id: "06-research-with-sources"
title: "Research with sources"
summary: "Separate discovery, understanding, and verification."
module: "research"
order: 6
minutes: 18
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Prefer relevant primary sources for product facts.", "Distinguish evidence, vendor claims, and your interpretation."]
lab: 9
---

## The idea

Research begins with a question, not a request for a polished paragraph. First find relevant sources, then understand them, then check whether they support the precise claim you want to make. A citation is a route to evidence, not an automatic guarantee.

There are three different research jobs:

1. **Discover:** Find relevant sources you did not already have.
2. **Understand:** Summarize, compare, and question a selected collection.
3. **Verify:** Open the source and confirm that it supports the exact claim.

A web-search assistant may help with discovery. A source-grounded notebook helps explore a selected collection. Neither removes the final verification job. Perplexity documents search/research features; Google's current help pages describe Gemini Notebook, a name you may encounter alongside NotebookLM. [Perplexity product guide](https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you) · [Notebook help](https://support.google.com/gemininotebook/answer/16215270?hl=en)

**RAG**, retrieval-augmented generation, means retrieving relevant information and supplying it when generating an answer. It is useful when the answer depends on a document collection. The retrieved material can still be incomplete, stale, or misleading. OpenAI's retrieval documentation describes searching indexed files; assess retrieval quality separately from how well the model writes. [Retrieval guide](https://developers.openai.com/api/docs/guides/retrieval)

Do not confuse these mechanisms:

| Mechanism | Main job | First test |
|---|---|---|
| Context | Make information available now | Can the model use the correct passage in this task? |
| Memory | Preserve and retrieve useful information across work | Does it retain the right decision and update it when superseded? |
| RAG | Fetch relevant material from a collection | Did retrieval include the evidence needed to answer? |
| Fine-tuning | Adapt model behavior using training examples | Does it improve a measured repeated behavior on held-out examples? |

For a beginner business knowledge assistant, start with a small, clean source collection and known-answer questions. Do not start with fine-tuning merely because you want the AI to “know my business.” You first need to discover whether the problem is missing evidence, bad retrieval, conflicting policies, or behavior that truly needs adaptation.

For a teaching video, demonstrate the approved launch fixture. Show the old date, the approved date, and the missing refund policy. The lesson is stronger when viewers see both an answer and a justified refusal to invent missing information.

## Try it

**Time/access:** 30–45 minutes; web research.

Choose one model announcement from the main guide. Find the official announcement and the current access or model page. Verify version, release date, availability, preview status, and any price you plan to mention.

```text
Investigate this announcement as of today. Separate initial
announcement from usable access. Give direct primary sources and
publication dates. Identify any later update that changes the claim.
Do not infer access from a product name alone.
```

**Check:** Open every source yourself. Confirm that the linked page supports your exact sentence. If a fact changed since 14 November, update your log and video script.

**Save/teach:** A five-field news card. A screenshot of a search snippet alone is insufficient evidence.

## Check your work

For a chosen AI announcement, record the exact claim and the source passage that supports it. Identify any later update.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Show the journey from answer to citation to source passage, rather than only a list of links.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
