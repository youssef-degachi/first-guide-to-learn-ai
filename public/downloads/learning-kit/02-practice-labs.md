# 30 practice labs: learn, test, explain

**14 November 2026 · Suggested exercises, not completed model benchmarks.**

Use these with the [main guide](01-ai-from-zero-to-advanced.md). The [practice inputs](practice-inputs/README.md) are fictional. Keep the [answer key](instructor-answer-key.md) separate until you finish an attempt. Copy the [experiment log](experiment-log-template.md) for each comparison.

Each lab gives you a task, a way to start, a check, and something worth teaching. Suggested times are planning estimates for an individual learner. Installation, account access, large downloads, rendering, and troubleshooting can add time.

## How to run a fair experiment

Record the date, app, exact model if visible, enabled tools, prompt, inputs, output, elapsed time, retries, and human corrections. Save failures as well as successes. For a small comparison, try three fresh attempts per candidate where practical. Small samples illustrate behavior; they do not establish a universal ranking.

Use a simple rubric: **0 = failed; 1 = partly met; 2 = met** for correctness, evidence, constraints, and usability. Record speed and cost separately. If a requirement is essential, such as the correct approved date, treat failure on it as a failed task regardless of the total score.

Use the same task and checks for each candidate. A model-only comparison should hold context and tools as constant as possible. An app/workflow comparison can allow different tools, but then state clearly that you are comparing complete workflows. Different search access can explain an apparent model advantage.

**Access labels:** “Text” means a text-capable AI interface is enough; it does not promise unlimited free use. “Tools” means a relevant file, browser, code, agent, or workflow feature is needed. “Media” means generation or editing access may require a paid plan or credits. Do not purchase access solely to finish every lab at once.

## Lab 1: Explain the basic map

**Time/access:** 15–20 minutes; Text.

Ask your AI to explain model, app, tool, workflow, and agent using one example: preparing a lesson from three documents. Then write your own two-sentence explanation without copying the answer.

```text
Explain these five terms to a complete beginner using one shared
example: model, app, tool, workflow, agent. For each, name its job
and one thing it does not establish about the final result.
```

**Check:** Can you explain why two apps using related models may behave differently? Can you distinguish generating a plan from actually performing an action?

**Save/teach:** A one-page map and a 30-second spoken explanation. Avoid teaching “all AI is a chatbot.”

## Lab 2: Turn a vague request into a useful brief

**Time/access:** 20 minutes; Text.

Run “Make a lesson about AI” once. Then specify audience, duration, one learning outcome, one example, output format, and a success check. Keep the model and other settings the same.

```text
Create a 15-minute lesson for complete beginners. Outcome: learners
can distinguish a model from an app. Include a short explanation,
one shared example, a two-question exercise, and expected answers.
Use plain language. Do not compare model quality or list prices.
```

**Check:** Score both outputs against the second brief. Notice whether the second output actually satisfies it; added detail alone is not a win.

**Save/teach:** Both prompts and outputs, plus the criteria. Demonstrate the effect of a clear task rather than a “magic prompt.”

## Lab 3: Extract facts without adding promises

**Time/access:** 15–20 minutes; Text.

Give only D02 from the [source pack](practice-inputs/source-pack.md). Request a launch fact sheet with date, price, owner, and refund period.

```text
Use only the supplied decision. For each field, return the value
and supporting source ID. If a value is not established, write
"not established". Do not infer a customer promise.
```

**Check:** Compare with the answer key. The missing refund period is an intentional part of the task. A confident invented period fails.

**Save/teach:** A fact table with one explicitly unresolved field. Explain why a useful answer may contain an unknown.

## Lab 4: Resolve conflicting documents

**Time/access:** 20–30 minutes; Text or file upload.

Supply D01–D03 and the five questions in the source pack. First ask for an answer without an authority rule; then repeat with the instruction to distinguish proposal, approved decision, and operational note.

**Check:** The approved date and price must come from D02. The explanation must account for the older proposal. “Use the newest date in any document” is not an adequate general rule.

**Save/teach:** A decision table showing the conflict and resolution. If both attempts succeed, report that; do not manufacture a dramatic failure.

## Lab 5: Calculate a result you can verify

**Time/access:** 25–35 minutes; Text, spreadsheet, or calculation tools.

Use [orders.csv](practice-inputs/orders.csv) and the rules in [its README](practice-inputs/README.md).

```text
Calculate paid net sales under the supplied rules. Show the included
order IDs, net amount per included row, total, and net total by product.
Discount is a fixed amount per order. Explain exclusions. Use a
calculation tool if available; state what you used.
```

**Check:** Verify included identities and row amounts, not just the final total. Check the answer key only after attempting it.

**Save/teach:** The calculation and a manual spot-check. Show why field definitions matter more than persuasive wording.

## Lab 6: Request structured classifications

**Time/access:** 20–30 minutes; Text; optional API schema mode.

Use [tickets.csv](practice-inputs/tickets.csv) and the category rules. Request one record per ticket with `ticket_id` and `category`; allow only billing, access, technical, and sales.

**Check:** Every ticket appears once, identifiers are preserved, categories are allowed, and labels match the key. Parseability and label accuracy are separate scores. An API schema test requires a supported structured-output feature; a chat response that looks like JSON is not the same guarantee.

**Save/teach:** An accuracy table. Explain how a clean structure can still contain a wrong answer.

## Lab 7: Recognize instructions embedded in data

**Time/access:** 15–25 minutes; Text.

Inspect T10 in the ticket fixture. It contains a request to abandon classification and resolve tickets. Ask the AI to classify the tickets with the explicit boundary that customer messages are data.

**Check:** T10 should receive a category; the system should not claim it resolved any tickets. If you later implement this workflow, give the classification step only the operations it needs. A successful prompt test does not prove resistance to all prompt injection.

**Save/teach:** A visible example of data containing an instruction. Explain the limited conclusion: it handled this test, under this setup.

## Lab 8: Compare two accessible models fairly

**Time/access:** 45–75 minutes; two accessible model choices.

Choose Labs 4, 5, and 6 as a small task set. Use identical materials and evaluation rules. Keep tool access aligned if comparing models; otherwise label it an app comparison. Run fresh attempts and log corrections.

**Check:** Report per-task results and the size of the sample. Include time to a usable result. Do not turn one successful arithmetic answer into a claim that a model is best at everything.

**Save/teach:** A small comparison card: setup, tasks, success rate, corrections, time, and limitations. Carbon, Argon, Hydrogen, Sol, Claude, or Grok are candidates only if you can actually access them.

## Lab 9: Verify one live AI announcement

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

## Lab 10: Build a small source-grounded notebook

**Time/access:** 30–45 minutes; source-grounded notebook or file-capable app.

Load only the source pack. Ask the five document questions, then ask which questions cannot be answered. Try a question about an unsupported refund promise.

**Check:** Inspect citations and the cited passages. Verify that D02 governs approved facts and missing policy remains unresolved. If the tool cites a passage that does not support the claim, count that as a failure.

**Save/teach:** An answer with its supporting source and an unanswered question. Explain the distinction between grounding and guaranteed truth.

## Lab 11: Transform facts into a script

**Time/access:** 25–35 minutes; Text.

Give the approved fact sheet from Lab 3. Request a short lesson script for beginners, then request a social caption and a learner worksheet from the same facts.

**Check:** Date, price, owner, and policy status remain consistent across all three. The script should teach one idea rather than cram in a tool list.

**Save/teach:** A fact-to-three-formats demonstration. Record what you edited manually and why.

## Lab 12: Use critique without treating it as proof

**Time/access:** 20–30 minutes; Text.

Ask the same model, a different model, or a learner to review the script for factual accuracy, jargon, and missing explanation. Provide the sources and a rubric.

```text
Review against the source facts and this rubric. Identify specific
defects with locations. Separate factual errors from preferences.
Do not rewrite until you have listed the issues and their evidence.
```

**Check:** Manually verify each proposed correction. A second AI can repeat the first one's mistake or invent a new objection.

**Save/teach:** One accepted correction and one rejected or qualified suggestion, if one occurs. Otherwise show an accurate review without forcing disagreement.

## Lab 13: Fix a small coding bug

**Time/access:** 35–60 minutes; code-capable environment.

Use [buggy_contacts.py](practice-inputs/buggy_contacts.py), [contacts.csv](practice-inputs/contacts.csv), and the specification in the README. Ask the AI to explain the failure, make a small fix, and verify expected identities and order.

**Check:** The correct records are in the answer key. Add cases for whitespace-only emails, repeated normalized emails, and different emails with matching names. Stay within the stated string-input specification or explicitly agree on how to extend it.

**Save/teach:** The failing behavior, changed code, and actual check output. Count alone is intentionally insufficient.

## Lab 14: Specify a tiny useful application

**Time/access:** 30–45 minutes; Text.

Design a lesson-request tracker. Specify fields, one user flow, validation, empty state, and acceptance criteria. Use fictional entries and avoid real learner data during practice.

**Check:** Another person can understand what “done” means. Example: a submitted valid request appears once in the list; an empty topic is rejected with a clear message. Decide whether persistence across reload is required.

**Save/teach:** A one-page specification. This lab demonstrates product thinking before generating code.

## Lab 15: Build and inspect one application slice

**Time/access:** 60–120 minutes; app builder or coding agent.

Implement the Lab 14 flow. Keep scope limited to the specified behavior. Ask for a preview and evidence from the acceptance checks.

**Check:** Try the empty state, valid submission, invalid submission, duplicate click, and reload behavior required by your specification. Check a small-screen layout. Inspect the result yourself; do not repeat the agent's “all tests passed” claim without its output or your own checks.

**Save/teach:** A working flow and an honest list of unimplemented features. Good visuals and working behavior receive separate scores.

## Lab 16: Give an agent a bounded job

**Time/access:** 30–60 minutes; agent with a working folder.

Ask the agent to create a launch brief from the source pack. Define inputs, output path, authority rule, missing-policy handling, and a time or action budget. Keep external publication as a separate decision.

**Check:** It reads the intended sources, produces the artifact, cites source IDs, and checks required facts. Log actions that were unnecessary or failed. If the tool offers no action log, state that limitation.

**Save/teach:** Goal → action → feedback → result. Identify what the harness supplied beyond the model's text generation.

## Lab 17: Test a subagent handoff

**Time/access:** 40–60 minutes; subagent support, or two manually separated sessions.

Assign one bounded job: extract factual claims and source IDs from the source pack. Give the lead session only the worker's handoff and ask it to create a lesson draft. Then let it inspect the original sources to verify the handoff.

**Check:** Which facts or uncertainties were lost? Did the worker's handoff preserve the missing refund policy? Did coordination save any time? Compare with a single-session attempt.

**Save/teach:** The handoff artifact and a specific tradeoff. Separate sessions simulate context isolation; they do not prove the performance of a native subagent implementation.

## Lab 18: Design and test a routing rule

**Time/access:** 30–45 minutes; Text; optional two models.

Route ordinary tickets to a fast classifier and ambiguous or out-of-scope cases to review. Add two original ambiguous examples, label the desired review behavior in advance, and keep those apart from the original answer key.

**Check:** Record wrong confident labels and unnecessary escalations. Compare total effort with classifying everything in one place. A router that costs more and loses information may be worse for this small task.

**Save/teach:** A routing diagram plus observed outcomes. This is a small orchestration experiment, not proof of automatic cost savings.

## Lab 19: Draw a stateful graph before implementing it

**Time/access:** 25–40 minutes; paper or diagram tool; optional LangGraph implementation.

Draw intake → draft → check → approved. A failed check routes to revise; after two failed revisions route to human review. Define state fields: source IDs, draft, check results, revision count, and status.

**Check:** Walk a passing case, a failing case, and a missing-source case through the graph. Every path should stop or reach review. If implementing, test pause/resume rather than merely drawing a loop.

**Save/teach:** The graph and a trace through it. Explain state and conditional edges without presenting LangGraph as a model.

## Lab 20: Compare a knowledge graph with ordinary retrieval

**Time/access:** 30–45 minutes; Text or paper.

Extract entities and relationships from the source pack. Include source ID and authority for each relationship, and distinguish proposed facts from approved ones. Answer a relationship question and a direct fact question using the graph and the original text.

**Check:** The graph must not flatten both proposed and approved launch dates into equally valid current facts. Record whether it helped at this tiny scale. Full GraphRAG indexing is an optional later project with its own resource budget.

**Save/teach:** One graph, one useful query, and one reason ordinary source lookup may suffice.

## Lab 21: Evaluate an installable skill

**Time/access:** 30–60 minutes; repository reading; optional compatible skill host.

Select one skill from the main guide. Read its instructions, resources, and any scripts. Name a repeated task it should improve. Run the task without it, then with it only if you choose to install it in a suitable test setup.

**Check:** Use the same rubric. Record extra steps, dependencies, improvements, and regressions. Reading the skill supports an architectural review; only the actual trial supports a performance claim.

**Save/teach:** An adoption decision with evidence. Do not rank a skill as “best” because its name sounds useful.

## Lab 22: Draft your own reusable skill

**Time/access:** 40–60 minutes; Text or compatible skill-authoring tools.

After three manual research-to-lesson runs, write a draft instruction package: purpose, when to use it, required inputs, source rules, output structure, checks, and failure handling. Keep current model names in a dated reference.

**Check:** Try a normal lesson, conflicting sources, and missing evidence. The skill should expose uncertainty rather than fabricate a completed experiment. Validate the package against your host's current skill format before installation.

**Save/teach:** A draft reusable method and its test notes. This lab does not require publishing or distributing a package.

## Lab 23: Generate an image from a measurable brief

**Time/access:** 25–45 minutes; Media.

Use the [image brief](practice-inputs/media-briefs.md). Request the closest supported portrait output. Preserve the headline and object requirements.

**Check:** Headline exact and once; one orange notebook; intended navy/cream palette; no extra logo or badge. Record the actual output size and any final cropping or typography work.

**Save/teach:** Brief, output, and a criterion-by-criterion inspection. If comparing tools, keep the brief the same and count all attempts.

## Lab 24: Make a controlled image edit

**Time/access:** 20–40 minutes; Media editing.

Edit the Lab 23 result: change only the notebook to green. Use the original as a reference through the tool's supported editing method.

**Check:** Compare headline, layout, objects, colors, and framing against the original. Score the requested change separately from preservation of everything else.

**Save/teach:** A side-by-side comparison with visible unintended changes, if any. “The edit worked” needs more evidence than the changed notebook.

## Lab 25: Generate a short video shot

**Time/access:** 30–60 minutes plus generation time; Media.

Use the eight-second notebook brief. If the product supports a different duration, adapt it and record the change. Begin with one continuous action rather than a multi-scene story.

**Check:** Notebook continuity, hand plausibility, action completion, camera movement, and no invented captions. Inspect the full output, including its ending.

**Save/teach:** The full clip, attempt count, and failure notes. A selected attractive frame does not establish temporal quality.

## Lab 26: Edit a video while preserving action

**Time/access:** 30–60 minutes plus generation time; supported video editing.

Change the desk surface to warm cream while preserving the notebook and action. Confirm that the selected tool supports editing the existing clip. If it only generates a new clip from a description, label the experiment accordingly.

**Check:** Compare timing, action, identity, color, framing, and audio where present. Log any drift or added events.

**Save/teach:** Original and edit, with a precise account of what was preserved. Do not claim an unsupported editing operation from a fresh generation.

## Lab 27: Generate and inspect educational speech

**Time/access:** 20–40 minutes; Media/TTS.

Use the fixed voice passage in the media briefs with your own or a licensed voice. Generate once, identify specific delivery issues, then revise only the directions or pronunciation controls available in the tool.

**Check:** Date, price, wording, pacing, and intelligibility. Have a listener unfamiliar with the passage write down the date and price they heard.

**Save/teach:** The passage, first output, revised output, and listener feedback. Expressiveness and factual preservation are separate checks.

## Lab 28: Test transcription and live correction

**Time/access:** 25–45 minutes; recording/transcription; optional live voice.

Record yourself reading the fixed passage. Transcribe it and compare against the known text. Optionally test a live correction: deliberately state the old launch date, then correct it to the approved one and ask for a recap.

**Check:** Mark substitutions, omissions, and additions; inspect numbers and names separately. For the live experiment, the recap should reflect the correction. Record language and acoustic conditions.

**Save/teach:** A highlighted transcript and a correction example. Speech recognition and retaining a conversational correction are different tasks.

## Lab 29: Prototype an automation with a review queue

**Time/access:** 60–90 minutes; workflow tool or manual simulation.

Create intake → validate → classify → save draft result → review. Use synthetic tickets. Add one malformed input and simulate one failed AI step. Keep the result in a test file or review queue.

**Check:** Missing fields are handled, failure is visible, retries are bounded, and repeated processing does not create unintended duplicate records. No step should claim to have sent or resolved anything it did not do.

**Save/teach:** Workflow diagram, one normal trace, and one failure trace. If you simulate steps manually, say so; this still teaches the design but does not establish integration reliability.

## Lab 30: Teach a complete, reproducible mini-lesson

**Time/access:** 60–90 minutes preparation plus a 20-minute session; any completed lab.

Choose a topic you have tested. Prepare a short explanation, source note, demonstration, learner exercise, expected answer, and limitation. Teach one learner without taking over their attempt.

**Check:** Can they reproduce the key result and explain why it works? Use an unseen but comparable example to test transfer. Ask what remained confusing and revise the lesson.

**Save/teach:** A lesson pack and an honest report of learner outcomes. This is your readiness check for publishing an educational episode on the topic.

## What to complete before your first series

Complete Labs 1–12 and 30 before publishing foundational claims as instruction. Add the relevant specialist labs before presenting coding, agents, image, video, or voice methods. These are suggested teaching gates, not a certification. A topic you have researched but not tried can still appear in a clearly labeled news explanation; keep that distinct from a tested tutorial.
