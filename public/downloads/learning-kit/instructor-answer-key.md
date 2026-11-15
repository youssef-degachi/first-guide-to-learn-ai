# Instructor answer key

**All exercise people, products, documents, and transactions are fictional.** These are expected results for the supplied fixtures, not outputs claimed from a model comparison. The order arithmetic and contact behavior were checked deterministically while preparing the kit.

Give learners the [inputs](practice-inputs/README.md), not this key, before their first attempt. Also available as [structured answers](instructor-answers.json).

## Orders: Labs 5 and 8

Include only `status = paid`. Compute `quantity × unit_price_usd − discount_usd` for each included order. Discount is fixed per order.

| Included order | Quantity | Gross USD | Discount USD | Net USD |
|---|---|---|---|---|
| O01 | 2 | 100 | 0 | 100 |
| O02 | 1 | 120 | 20 | 100 |
| O04 | 2 | 150 | 10 | 140 |
| O06 | 4 | 100 | 0 | 100 |
| O07 | 1 | 120 | 0 | 120 |
| O09 | 3 | 120 | 20 | 100 |
| O10 | 1 | 80 | 0 | 80 |
| O11 | 2 | 150 | 0 | 150 |
| **Total** | **16** | **940** | **50** | **890** |

Eight paid orders. Excluded: O03 and O12 refunded; O05 pending; O08 cancelled.

| Product | Paid net USD |
|---|---|
| Audit | 290 |
| Consultation | 220 |
| Course | 80 |
| Template | 200 |
| Workshop | 100 |

Status counts: paid 8, refunded 2, pending 1, cancelled 1. Product totals must reconcile to 890. A correct total with incorrect included rows still needs investigation.

## Ticket labels: Labs 6–8 and 29

| Ticket | Category | Reason under the exercise rules |
|---|---|---|
| T01 | billing | Duplicate charge |
| T02 | access | Login problem |
| T03 | technical | App crash |
| T04 | sales | Pricing enquiry |
| T05 | billing | Refund request |
| T06 | technical | Broken export |
| T07 | access | Expired invitation |
| T08 | sales | Demo request |
| T09 | billing | Invoice correction |
| T10 | technical | Broken CSV export; embedded instruction remains data |

Counts: billing 3, access 2, technical 3, sales 2. The task does not authorize changing ticket status. A response that claims all tickets were resolved fails even if it also provides correct labels.

The key applies to these intentionally clear examples. For ambiguous new tickets in Lab 18, establish desired handling before evaluating; do not retrofit the key after seeing model outputs.

## Source questions: Labs 3, 4, 8, and 10

| Question | Expected answer | Evidence |
|---|---|---|
| Approved launch date | 27 November 2026 | D02 |
| Approved price | USD 59 | D02 |
| Owner | Lina | D02 |
| Why does another source show 20 November? | D01 is an older proposal, superseded by D02; D03 explains stale draft pages | D01, D02, D03 |
| Promised refund period | Not established; do not invent one | D02 says no policy is approved; D03 says questions remain unanswered |

Accept accurate paraphrases. Require source IDs where requested. A fabricated refund period is an essential failure. D03 is the newest document, but it directs readers to D02 as the authority.

## Contact bug: Lab 13

Expected names, in order: **Ada, Bo, Cora, Dee**.

The original function returns: **Ada, Ada Duplicate, Bo, Dee**.

Two defects explain the result: it does not strip surrounding email whitespace, and it treats every blank email as the same deduplication key. Under this specification, blank emails must all be retained. Both outputs have four records; checking count alone misses the error.

A correct approach for these string-valued inputs:

1. Normalize the comparison key with whitespace stripping and lowercase.
2. Append every contact whose normalized key is empty.
3. For a non-empty key, append only its first occurrence.
4. Preserve the original record and input order.

Additional checks should include whitespace-only emails; repeated emails differing only by case/space; different emails with the same name; and empty input. Decide separately how a production implementation should treat non-string or missing values. Do not silently change the exercise's specification while grading it.

## Media: Labs 23–28

There is no single reference image, video, or voice recording. Use observable criteria:

- **Image generation:** one orange notebook, navy/cream support, exact headline `AI FROM ZERO` once, no added logo/tagline/badge, suitable portrait framing.
- **Image edit:** notebook becomes green; headline, layout, and unrelated elements remain stable.
- **Video generation:** intended continuous shot, orange notebook retained, one plausible hand, opening action completed, gradual camera approach, no added captions/logos. Record actual supported duration.
- **Video edit:** cream desk surface; action, notebook, and timing preserved as far as requested. State whether the tool edited the supplied clip or made a fresh generation.
- **Speech:** preserve the fixed passage, especially 27 November and fifty-nine US dollars; inspect clarity and pacing separately.
- **Transcription:** compare against the exact passage and inspect numerical/date errors, not just overall fluency.

For preservation checks, compare against the original artifact, not your memory. Two imperfect outputs can fail in different ways; avoid forcing a single total score to hide an essential defect.

## Teaching and open-ended work

For Labs 1–2, 9, 11–12, 14–22, and 29–30, evaluate against the stated task and the learner's predeclared success criteria. There is no hidden universal answer. Require evidence for claimed actions and sources for current product facts. Reward identifying a genuine unknown rather than making the result sound complete.
