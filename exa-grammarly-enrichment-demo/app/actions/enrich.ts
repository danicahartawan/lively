'use server';

import Exa from 'exa-js';
import OpenAI from 'openai';
import {
  extractBracketedPhrases,
  uniqueInnerPhrases,
} from '@/app/lib/bracket-placeholders';

interface EnrichmentResult {
  enrichedContent: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

/**
 * Step B (per phrase): OpenAI normalizes placeholder to a long-form semantic Exa query.
 */
async function normalizeToSemanticQuery(
  openai: OpenAI,
  phrase: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You convert a short placeholder phrase into a single long-form semantic search query for finding recent, relevant web content.
Output only the search query: natural language, one sentence, optimized for semantic search. No quotes or preamble.
Examples: "Recent Exa product announcements and new search features", "Grammarly Coda acquisition integration updates 2025".`,
      },
      {
        role: 'user',
        content: `Convert this phrase into one semantic search query:\n${phrase}`,
      },
    ],
    temperature: 0.3,
  });
  const query = response.choices[0]?.message?.content?.trim() || phrase;
  return query;
}

/**
 * Step C (per phrase): Generate concise, context-aware enrichment from Exa results. Keeps original tone.
 */
async function generateStructuredEnrichment(
  openai: OpenAI,
  phrase: string,
  contextText: string,
  overallToneContext: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a concise writing assistant. Given a placeholder phrase and retrieved web context, write a short replacement (1-3 sentences) that:
- Replaces the placeholder with specific, context-aware content drawn from the sources
- Keeps the same tone as the surrounding email: ${overallToneContext}
- Is concise and factual; no filler or keyword stuffing
Output only the replacement text, nothing else.`,
      },
      {
        role: 'user',
        content: `Placeholder phrase: "${phrase}"\n\nRetrieved context:\n${contextText}\n\nWrite the enriched replacement for the placeholder (concise, same tone).`,
      },
    ],
    temperature: 0.5,
  });
  return response.choices[0]?.message?.content?.trim() || phrase;
}

/**
 * Dedupe sources by URL.
 */
function dedupeSources(
  sources: Array<{ title: string; url: string; snippet: string }>
): Array<{ title: string; url: string; snippet: string }> {
  const byUrl = new Map<string, { title: string; url: string; snippet: string }>();
  for (const s of sources) {
    if (!byUrl.has(s.url)) byUrl.set(s.url, s);
  }
  return Array.from(byUrl.values());
}

export async function enrichContent(content: string): Promise<EnrichmentResult> {
  try {
    // Step A: Deterministic placeholder parsing — only enrich bracketed phrases
    const matches = extractBracketedPhrases(content);
    if (matches.length === 0) {
      return { enrichedContent: content, sources: [] };
    }

    const exa = new Exa(process.env.EXA_API_KEY);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const uniquePhrases = uniqueInnerPhrases(matches);
    const enrichmentMap = new Map<string, string>();
    const allSources: Array<{ title: string; url: string; snippet: string }> = [];
    const toneContext = content.substring(0, 300).replace(/\[(.*?)\]/g, '…');

    for (const phrase of uniquePhrases) {
      // Step B: Query normalization (OpenAI) then retrieval (Exa)
      const semanticQuery = await normalizeToSemanticQuery(openai, phrase);
      const searchResults = await exa.searchAndContents(semanticQuery, {
        type: 'auto',
        numResults: 3,
        text: { maxCharacters: 500 },
      });

      const contextText = searchResults.results
        .map(
          (r, i) =>
            `Source ${i + 1}: ${r.title}\n${(r.text ?? '').substring(0, 300)}`
        )
        .join('\n\n');

      for (const r of searchResults.results) {
        allSources.push({
          title: r.title || 'Untitled',
          url: r.url,
          snippet: (r.text?.substring(0, 200) ?? '') + '...',
        });
      }

      // Step C: Structured enrichment for this bracket (OpenAI, concise, same tone)
      const enriched = await generateStructuredEnrichment(
        openai,
        phrase,
        contextText || '(No relevant context found)',
        toneContext
      );
      enrichmentMap.set(phrase.trim(), enriched);
    }

    // Step D: Replace each [phrase] with enriched version; leave non-bracketed text unchanged
    const enrichedContent = content.replace(
      /\[(.*?)\]/g,
      (fullMatch, inner) => enrichmentMap.get(inner.trim()) ?? fullMatch
    );

    return {
      enrichedContent,
      sources: dedupeSources(allSources),
    };
  } catch (error) {
    console.error('Enrichment error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to enrich content'
    );
  }
}
