# email lively

Enrich your emails with live data from the web instantly.

## Overview

**lively** is a lightweight enrichment tool that enhances drafts with real-time external context using:

- **Exa API** for semantic retrieval
- **OpenAI API** for reasoning and synthesis

The goal is simple: turn vague references into grounded, contextual, high-signal content.

Instead of guessing, the system retrieves fresh information and injects it naturally into your draft.

## How It Works

1. You write an email draft.
2. Use **square brackets `[]`** to mark phrases that need live context.

**Example:**

```
I'd love to discuss [Exa's new search feature] and its relevance to [Grammarly's Coda expansion].
```

The system:

- Extracts bracketed phrases
- Converts them into semantic queries
- Retrieves relevant content using Exa
- Synthesizes insights with OpenAI
- Replaces the bracketed text with enriched context

Retrieval and reasoning are cleanly separated:

- **Exa** handles search
- **OpenAI** handles interpretation and writing

## Example

**Input:**

```
Let's explore how [Exa's latest semantic retrieval updates] could support [Grammarly's integration of Coda and Superhuman].
```

**Output:**

- Replaces bracketed phrases with recent product updates
- Maintains original tone
- Adds relevant context from real sources

## Tech Stack

- Next.js (App Router)
- TypeScript
- exa-js
- OpenAI

## Setup

1. Create a `.env.local` file in `exa-grammarly-enrichment-demo/` (see `.env.local.example`):

```
EXA_API_KEY=your_exa_key
OPENAI_API_KEY=your_openai_key
```

2. Install dependencies:

```bash
cd exa-grammarly-enrichment-demo
npm install
```

3. Run locally:

```bash
npm run dev
```

## Why This Exists

This project explores how semantic retrieval can act as an infrastructure layer for AI writing agents.

Instead of static templates or hallucinated context, lively introduces live, grounded intelligence directly into drafting workflows.
