# AI Fieldnotes: brand and teaching conventions

## Direction

A quiet, editorial learning space. Warm paper, deep forest, rust accents, thoughtful typography, and the feeling of a useful notebook. The interface should make the course approachable without making it feel shallow.

Brand settings are centralized in `content/site.json`. Use the public author name consistently and avoid invented credentials.

## Visual system

- Paper: `#faf9f5`.
- Ink: `#292f29`.
- Forest: `#283e31`.
- Rust accent: `#b75537`.
- Sidebar paper: `#f2f1eb`.
- Lines: `#e4e4db`.
- Display type: Newsreader Variable, including restrained italic accents.
- Interface and body type: Manrope Variable.

Use color to guide attention, not to imply evidence quality. Keep reading text large and high contrast. The readability layer is `src/styles-readability.css`; adjust it alongside the main stylesheet when restyling. Keep lesson prose around 15–16 px or larger on screen. Tables and code may use smaller text with accessible scrolling.

Use thin dividers, modest radii, generous space, and a limited number of actions. The book illustration is made from CSS and requires no external image service. Motion should be brief and should respect reduced-motion preferences.

## Voice

Plain, curious, specific, and honest. A lesson should feel like a capable colleague showing useful work. Prefer a concrete example and a check to a slogan. Use “documented,” “observed,” or “proposed” when the distinction matters. Avoid fake testimonials, invented student counts, guaranteed outcomes, and universal “best” claims.

Write for public readers. Each explanation must make sense without access to an authoring conversation. Introduce terms directly and keep private requests, personal background, and inferred reader preferences out of the course.

## Repeated teaching pattern

**Understand → Try → Check → Explain.**

Make the learning outcome visible, provide a small exercise, show how to assess it, then suggest a teach-back angle. Readers should leave with a method they can apply.

## Naming and consistency

Call the top-level units chapters and the learning steps lessons. Number lessons in the displayed learning order while preserving stable content IDs. Call long-form material resources. Keep a known-answer key separate from first-attempt exercises.

## Before a brand release

Set your real public links, author name, favicon, title, and description. Check the phone layout, readable contrast, footer, print cover, and download names. Do not create a fictional social account URL merely to fill the design.
