export interface EnrichmentResult {
  enrichedContent: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

export interface EmailEditorProps {
  onEnrich: (content: string) => Promise<void>;
  isEnriching: boolean;
}

export interface EnrichmentPanelProps {
  result: EnrichmentResult | null;
}
