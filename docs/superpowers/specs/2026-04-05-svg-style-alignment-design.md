# SVG Style Alignment Design

Date: 2026-04-05
Repository: `sine-io.github.io`
Status: Approved in conversation

## Summary

This design refines the migrated React portfolio so the site feels substantially closer to the visual language of the user-provided `SVG1.svg` and `SVG2.svg`.

The current site already:

- uses both SVGs in the project
- derives lightweight web-facing assets from them
- applies a dark Cyber-Wave visual system

The approved next step is to push the visual identity further toward the original SVG mood without sacrificing readability.

The target feeling is:

- starfield atmosphere
- cold technological tone
- constellation / star-map cues
- deep-ocean blue depth
- restrained luminous panels
- abstract Alpha Centauri / Centaurus-region mood

This is not a request to make the site more chaotic, louder, or more cyberpunk in the neon-glitch sense. The visual refinement should stay mature and editorially readable.

## Current Context

Current frontend stack:

- `Vite`
- `React`
- `Tailwind CSS`
- `Framer Motion`
- `React Router`

Current site already includes:

- dark global theme
- glassmorphism navbar
- abstract `SineWaveBg`
- lightweight derived SVG assets
- portfolio-oriented information architecture

Current visual gap:

- the site uses the SVGs, but much of the UI still reads as a refined dark website rather than a site truly shaped by the original artwork
- the strongest remaining opportunity is to align composition, accent treatment, linework, and panel styling more closely to the source images

## Design Goals

- Make the overall site feel more visually native to `SVG1.svg` and `SVG2.svg`
- Preserve content readability and navigation clarity
- Increase starfield / celestial / constellation cues without turning the site into an illustration-first poster
- Preserve the current portfolio structure and content model
- Keep the final result restrained enough for repeated reading and long-form browsing

## Non-Goals

- Adding figurative character art or a literal centaur silhouette
- Turning the site into a sci-fi poster or splash page at the expense of usability
- Rewriting content structure again
- Adding heavy animation, glitch effects, or looping spectacle
- Replacing the lightweight derived SVG pipeline created in the previous task

## Source Interpretation

The user clarified that the mention of `Centaurus` describes the feeling of the images rather than a requirement for literal iconography.

Therefore, the approved interpretation is:

- constellation / star chart feeling
- Alpha Centauri / southern sky style directional mood
- abstract astronomical technology atmosphere

Explicitly rejected interpretation:

- literal centaur body or mythological figure artwork

## Chosen Direction

Approved visual direction: **visual language reinforcement + light layout adjustment**

This is the previously recommended middle path:

- stronger alignment to the original SVG mood
- some compositional adjustment where necessary
- readability remains the governing constraint

## Visual System Changes

### 1. Global Field

The global field should evolve from a flat dark page into a controlled astronomical-tech backdrop.

Approved changes:

- keep `#0A1128` as the base body color
- add very low-contrast star-speck texture or tiny celestial light points
- deepen the large-scale cool gradients so the page feels like a dark spatial volume rather than a plain color fill
- add faint constellation-like line segments or wave-field traces where they support the SVG mood

Constraints:

- these layers must remain subordinate to content
- they should be quieter than the existing `SineWaveBg`
- they must not create visible noise behind body copy

### 2. Color Alignment

The current color system should be shifted closer to the source SVG palette.

Primary retained base:

- `#0A1128`

Primary accent family:

- electric cyan
- ice blue
- blue-violet
- pale stellar white-blue highlights

Usage changes:

- use cyan/blue highlights more selectively but more intentionally
- introduce slightly more blue-violet presence in edges and glow transitions
- reduce any generic “dark site” neutrals that do not feel sourced from the SVGs

### 3. Panel Language

Panels should feel more like suspended analytical interfaces inside a starfield.

Approved changes:

- sharpen edge treatment with cold low-opacity borders
- add inner glow or layered border lighting where useful
- deepen panel interiors so they feel embedded in the cosmic field
- use subtle contour or arc overlays where they help tie panels back to the source illustrations

Constraints:

- no loud bloom
- no obvious sci-fi HUD gimmicks
- no dense overlay pattern that harms text clarity

### 4. Constellation Cues

Constellation motifs should be used as a background language, not as dominant illustration content.

Approved forms:

- small star nodes
- sparse connecting lines
- directional star-map segments
- cluster hints suggesting Centaurus / Alpha Centauri mood

Not approved:

- literal astronomy diagrams
- educational star charts
- named labels on the UI
- large symbolic constellations overlaid on text-heavy sections

### 5. Motion Tone

Motion should remain restrained and atmospheric.

Allowed:

- slow fade/rise section entry
- gentle panel reveal
- subtle SVG drift or position shift if extremely light
- low-amplitude starfield / linefield movement if implemented later and only if it stays quiet

Not allowed:

- rapid parallax
- shimmering noise
- repeated pulses
- glitch tearing
- continuous animated spectacle

## Page-Level Design

### Home

The homepage should become the strongest expression of the SVG-aligned visual identity.

Approved changes:

- make the hero feel more compositionally integrated with `SVG1`
- strengthen the relationship between title block and the SVG art layer
- add stronger star-map / constellation cues around the hero field
- increase the sense that the text is placed inside the artwork’s spatial logic, not merely on top of it
- refine the lower sections so they feel like a continuation of the same visual universe

Specific emphasis:

- homepage should feel like a starfield technology frontispiece
- the effect should remain editorial, not cinematic

### Projects

`Projects` should feel more like a technical topic gateway than a generic listing page.

Approved changes:

- `SVG2` remains the page-top visual anchor
- strengthen page-top composition so the art behaves like a cover motif
- make cards feel more like instrument panels or thematic entry modules
- add stronger cool-edge depth and constellation continuity in the header zone

### Writing

`Writing` should feel like a knowledge field organized in constellated groups.

Approved changes:

- strengthen group distinction among `Guides`, `Notes`, and `Updates`
- preserve anchors for `#guides`, `#notes`, `#updates`
- make each grouped section feel like a visually distinct “band” in the same cosmic system
- keep `SVG2`-derived atmosphere present at page-top and along the grouped flow

### Detail Pages

Detail pages should remain reading-friendly while inheriting the SVG mood.

Approved changes:

- keep strongest decoration in top regions and edges
- preserve generous readability for paragraphs
- use subtle top framing, thin glow edges, and restrained starline treatment rather than dense illustration overlays

## Layout Adjustments

This refinement is allowed to include light layout adjustment where it materially improves SVG alignment.

Approved examples:

- rebalance homepage hero split
- adjust visual weight of top cards
- revise spacing rhythm so large blocks feel more like a deliberate composition
- slightly tune card width / stacking rhythm for a more atmospheric reading flow

Not approved:

- information architecture changes
- adding new top-level sections
- major page restructuring unrelated to visual direction

## Implementation Constraints

- continue using the existing optimized SVG asset flow
- do not replace the lightweight derived SVG approach with raw always-on originals
- do not introduce animation-heavy dependencies beyond the current stack
- prefer CSS/Tailwind and minimal component adjustments over large architectural changes
- keep file boundaries clean; visual tweaks should not create giant mixed-responsibility files

## Acceptance Criteria

- the site feels more clearly aligned to the original SVG mood than before
- the visual impression includes stronger starfield / constellation / cold-tech qualities
- homepage hero composition feels more native to `SVG1`
- Projects/Writing top sections feel more native to `SVG2`
- content readability remains strong across text-heavy pages
- no figurative centaur illustration appears
- no aggressive cyberpunk effects appear
- the current route and content architecture remains intact

## Risks

- too much constellation detail could reduce readability
- overusing glow could make the UI feel generic rather than SVG-specific
- light layout adjustments could drift into unnecessary redesign if not constrained
- adding “space” cues too literally could break the abstract tone that currently works

## Decisions Locked In

- follow the recommended middle path, not the conservative or aggressive alternatives
- interpret `Centaurus` as mood, not literal character art
- reinforce the site toward starfield + constellation + cold-tech atmosphere
- preserve readability as the governing constraint
- keep current information architecture and content model
- use the existing SVG-derived asset strategy

## Next Step

After user review of this document, create a focused implementation plan for the SVG-style alignment pass and then execute it.
