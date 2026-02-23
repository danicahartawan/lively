/**
 * Converts extracted entities into semantic queries optimized for Exa.
 * Uses natural language, long-form semantic intent — not keyword-stuffed.
 */

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Map a single entity phrase to an Exa-optimized semantic query, or null if no rule matches.
 */
function entityToQuery(entity: string): string | null {
  const trimmed = entity.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();

  // "new feature" → "Recent [Company] product announcements"
  if (lower.includes('new feature')) {
    const company = trimmed
      .replace(/\s*new\s+feature\s*$/i, '')
      .replace(/^\s*new\s+feature\s*/i, '')
      .trim();
    if (company) {
      return `Recent ${company} product announcements`;
    }
  }

  // "acquisition" → "[Company A] acquisition integration updates [Year]"
  if (lower.includes('acquisition')) {
    return `${trimmed} integration updates ${CURRENT_YEAR}`;
  }

  // "expansion" → "[Company] strategic expansion updates [Year]"
  if (lower.includes('expansion')) {
    const company = trimmed
      .replace(/\s*expansion\s*$/i, '')
      .replace(/^\s*expansion\s*/i, '')
      .trim();
    if (company) {
      return `${company} strategic expansion updates ${CURRENT_YEAR}`;
    }
  }

  return null;
}

/**
 * Convert a list of extracted entities into semantic queries for Exa.
 * Deduplicates and returns only natural-language queries that match the mapping rules.
 */
export function entitiesToExaQueries(entities: string[]): string[] {
  const seen = new Set<string>();
  const queries: string[] = [];

  for (const entity of entities) {
    const query = entityToQuery(entity);
    if (query && !seen.has(query)) {
      seen.add(query);
      queries.push(query);
    }
  }

  return queries;
}

/**
 * Parse comma-separated topic string from extraction into entity strings.
 */
export function parseEntitiesFromTopics(topics: string): string[] {
  return topics
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
