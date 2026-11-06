# Move IT Journey — Implementation Plan

**Goal:** Publish an interactive Russian presentation proposing the corporate moving website user journey.
**Architecture:** Buildless HTML, CSS and JavaScript; GitHub Pages root publishing.
**Spec:** docs/design.md

## Tasks
- [x] Build index.html: narrative, six-stage explorer, personas, evidence, lead-flow demo, launch decisions.
- [x] Build styles.css: responsive editorial layout, route illustration, contrast/focus, reduced motion, print mode.
- [x] Build app.js: stage/persona state, accessible dialog, validated quiz with persistent answers and summary.
- [x] Verify browser interactions at desktop and mobile widths, keyboard dismissal, validation and retained answers. Check JS and local assets.
- [ ] Commit only presentation source, publish GitHub Pages, verify public HTTP response and open the presentation.

## Review focus
Long Russian copy and 360px screens must not overflow. Dialog must scroll and close on Escape. Empty/whitespace route fields must block next step. Persona/stage changes must show matching content. Demo must never imply a real request was sent.
