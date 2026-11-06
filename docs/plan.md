# Move IT — Research Presentation Implementation Plan

**Goal:** Explain company facts, research findings, proposed positioning and the corporate moving website user journey in plain Russian.
**Architecture:** Buildless HTML, CSS and JavaScript; GitHub Pages root publishing.
**Spec:** docs/design.md

## Tasks
- [x] Build index.html: separate facts, research, positioning, audience strengths, eight-block paths, evidence, post-request flow, form demo and unresolved decisions.
- [x] Build styles.css: neutral document layout, ordinary sans-serif text, contrast/focus, reduced motion, print mode.
- [x] Build app.js: stage/persona state, accessible dialog, validated quiz with persistent answers and summary.
- [x] Verify browser interactions at desktop and mobile widths, keyboard dismissal, validation and retained answers. Check JS and local assets.
- [x] Commit only presentation source, publish GitHub Pages, verify public HTTP response and open the presentation.

## Revision 07.11.2026
User requested an explanatory document instead of a sales landing page. Removed serif/italic typography, promotional slogans, lime ticker and decorative hero. Added company findings, market observations and reasoning behind positioning. Further steering: explain small/large-office strengths and each objection through a concrete block. Added separate data/controller modules and eight ordered blocks per audience. Browser verification includes ordinary heading typography, both audiences/eight blocks, source/objection explanations, post-request flow, form/back/validation and widths 360/390/768.

## Review focus
Long Russian copy and 360px screens must not overflow. Dialog must scroll and close on Escape. Empty/whitespace route fields must block next step. Persona/stage changes must show matching content. Demo must never imply a real request was sent.
