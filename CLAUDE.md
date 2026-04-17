# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file interactive web application visualizing the "European Hearth Charter" — a conceptual reimagining of EU integration structured around voluntary "Hestias" (fires of integration). The entire application lives in `eu-hestias-map.html`.

## Running the App

No build step or install required. Open `eu-hestias-map.html` directly in a modern browser, or serve it with any static file server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/eu-hestias-map.html
```

Requires an internet connection to fetch D3 v7, TopoJSON v3, and world-atlas data from CDN.

## Architecture

The entire application is one HTML file (~890 lines) with three sections:

1. **Embedded CSS (lines 7–400)** — Theming via CSS variables (`--ember`, `--hearth`, `--ash` color palette), responsive breakpoints at 600px and 900px.

2. **HTML structure (lines 401–473)** — Static shell: buttons for Hestia selection, SVG map container, legend, and country detail panel.

3. **Embedded JavaScript (lines 474–891)** — Vanilla JS with D3 for rendering.

### Data Model

`COUNTRY_DATA` (lines 480–536) is the master registry — keyed by ISO alpha-3 code, each entry has:
- `standing`: `"member"` | `"inner-assoc"` | `"outer-assoc"` | `"strategic"`
- `note`: policy context string
- 16 Hestia participation values: `1` (full), `0.5` (partial), `0` (none)

The 16 Hestias are: fiscal, krone, shield, gate, atlas, anchor, bench, green, forge, loom, library, spring, pharmacy, beacon, lattice, lyre.

### Key Functions

| Function | Purpose |
|---|---|
| `init()` | Entry point; fetches TopoJSON, initializes UI |
| `drawMap(world)` | Creates SVG paths, wires click handlers |
| `applyView()` | Re-colors countries for the active view (standings or a Hestia) |
| `renderLegend()` | Updates legend for current view |
| `selectCountry(alpha3)` | Updates selected state, calls `renderDetail` |
| `renderDetail(alpha3)` | Renders country detail panel |
| `buildListFallback()` | Text fallback if map CDN fails |

### State

Three mutable state variables drive everything:
- `currentView` — `"standings"` or a Hestia name (e.g. `"fiscal"`)
- `selectedCountry` — alpha-3 code of selected country, or `null`
- `svgEl`, `projection`, `pathGen` — D3 map rendering handles

### TopoJSON Mapping

Countries arrive from TopoJSON with numeric ISO codes. `NUMERIC_TO_ALPHA3` (lines 603–614) converts these to alpha-3; `NAME_TO_ALPHA3` (lines 624–626) handles edge cases like Kosovo.

## Policy Documents

The `.md` files are governance/policy documents, not code docs:
- `charter.md` — Constitutional charter defining standings and Hestias
- `manifesto.md` — Political rationale
- `commentary.md` — Interpretive commentary on the charter

When editing `COUNTRY_DATA` or Hestia definitions, consult `charter.md` for canonical definitions.
