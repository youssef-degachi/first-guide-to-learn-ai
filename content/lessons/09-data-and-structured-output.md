---
id: "09-data-and-structured-output"
title: "Work with data and structured output"
summary: "Turn messy inputs into results you can verify."
module: "research"
order: 9
minutes: 20
level: "Beginner"
updated: "2026-11-14"
status: "published"
objectives: ["Define and verify a calculation rule.", "Separate schema validity from factual or classification accuracy."]
lab: 5
---

## The idea

Data work makes errors easier to expose when the rules are precise. Define units, missing values, exclusions, and field meanings before calculating. Then check both the output shape and the content inside it.

This is a high-value area because a result can often be checked precisely. Practice turning messy input into a small useful output: an expense table, ticket classification, document comparison, or course outline.

The essential sequence is:

1. Inspect the input and define the meaning of each field.
2. State the calculation or classification rule.
3. Request the output format.
4. Check totals, identities, exclusions, and missing values.
5. Explain the result in the user's language.

In the supplied orders fixture, a discount is a fixed amount per order. Applying it per unit changes the answer. Refunded, pending, and cancelled rows are excluded by the exercise's rule. The correct paid net total is **USD 890**. This is a fictional calculation exercise, not an accounting policy.

Structured output means an answer follows a defined shape, such as a JSON object with required fields and allowed categories. A compatible API can enforce a supported schema, but a valid structure can contain a wrong classification or invented fact. Verify the content separately. [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

For teaching, show two independent dimensions: “Can my program parse it?” and “Is it right?” Lab 6 includes a customer message containing an instruction to change the task. The desired behavior is to classify that message, not follow it. A prompt boundary is useful, but a dependable automation also limits what the tool can actually change.

## Try it

**Time/access:** 25–35 minutes; Text, spreadsheet, or calculation tools.

Use [orders.csv](downloads/learning-kit/practice-inputs/orders.csv) and the rules in [its README](downloads/learning-kit/practice-inputs/README.md).

```text
Calculate paid net sales under the supplied rules. Show the included
order IDs, net amount per included row, total, and net total by product.
Discount is a fixed amount per order. Explain exclusions. Use a
calculation tool if available; state what you used.
```

**Check:** Verify included identities and row amounts, not just the final total. Check the answer key only after attempting it.

**Save/teach:** The calculation and a manual spot-check. Show why field definitions matter more than persuasive wording.

## Check your work

Reconcile the paid order rows and product totals. Then try the ticket classification lab and inspect embedded instructions as data.

Keep the [instructor answer key](#/resources/instructor-key) separate until you finish the attempt. Open the [full lab workbook](#/resources/practice-labs) for related exercises.

## Teach it

Contrast a parseable result with a correct result using one visible example.

## Keep exploring

Read the [complete field guide](#/resources/course-guide), use the [experiment log](#/resources/experiment-log), or explore the [technical agents companion](#/resources/agents-deep-dive). Product details reflect the research snapshot above; verify the primary links before presenting a current claim.
