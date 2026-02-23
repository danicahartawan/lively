/**
 * Deterministic extraction of square-bracket enrichment placeholders.
 * Brackets act as explicit user-triggered enrichment; only these are enriched.
 */

const BRACKET_REGEX = /\[(.*?)\]/g;

export interface BracketedMatch {
  /** Full match including brackets, e.g. "[Exa new search feature]" */
  fullMatch: string;
  /** Text inside brackets, e.g. "Exa new search feature" */
  inner: string;
}

/**
 * Step A: Extract all bracketed phrases from content using regex.
 * Returns array of { fullMatch, inner } for each occurrence.
 */
export function extractBracketedPhrases(content: string): BracketedMatch[] {
  const matches: BracketedMatch[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(BRACKET_REGEX.source, 'g');
  while ((match = re.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      inner: match[1],
    });
  }
  return matches;
}

/**
 * Returns true if content has at least one bracket placeholder (enrichment trigger).
 */
export function hasBracketPlaceholders(content: string): boolean {
  return /\[.*?\]/.test(content);
}

/**
 * Get unique inner phrases (trimmed) from bracketed matches, preserving order of first occurrence.
 */
export function uniqueInnerPhrases(matches: BracketedMatch[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const { inner } of matches) {
    const key = inner.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  }
  return out;
}
