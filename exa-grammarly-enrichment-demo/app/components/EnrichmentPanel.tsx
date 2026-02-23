'use client';

interface EnrichmentResult {
  enrichedContent: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

interface EnrichmentPanelProps {
  result: EnrichmentResult | null;
  onSendEnriched?: (content: string) => void;
}

export default function EnrichmentPanel({ result, onSendEnriched }: EnrichmentPanelProps) {
  if (!result) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-lg font-medium">No enrichment yet</p>
          <p className="text-sm mt-2">Click "Enrich with Context" to enhance your content with AI-powered insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      {/* Enriched Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Enriched Content</h2>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
            {result.enrichedContent}
          </div>
        </div>
        {onSendEnriched && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onSendEnriched(result.enrichedContent)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
            >
              Send
            </button>
          </div>
        )}
      </div>

      {/* Sources */}
      {result.sources.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Context Sources</h2>
          <div className="space-y-4">
            {result.sources.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {source.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mb-2">{source.snippet}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  {source.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
