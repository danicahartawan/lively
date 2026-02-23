'use client';

import { useState } from 'react';
import EmailThread from './components/EmailThread';
import EmailEditor from './components/EmailEditor';
import EnrichmentPanel from './components/EnrichmentPanel';
import ExaFooter from './components/ExaFooter';
import { enrichContent } from './actions/enrich';

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface EnrichmentResult {
  enrichedContent: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

const INITIAL_REPLY = '';

const SUGGESTION_PHRASES = [
  'Hi Cyrus from OpenAI',
  'Hi Claudia from Ramp',
  'Hi Alex from Notion',
];

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentResult, setEnrichmentResult] = useState<EnrichmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnrich = async (content: string) => {
    setIsEnriching(true);
    setError(null);
    setEnrichmentResult(null);

    try {
      const result = await enrichContent(content);
      setEnrichmentResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Enrichment failed:', err);
    } finally {
      setIsEnriching(false);
    }
  };

  const handleSend = (content: string) => {
    const newEmail: Email = {
      id: `${emails.length + 1}`,
      from: {
        name: 'Danica Hartawan',
        email: 'danica@exa.ai',
        avatar: '/View recent photos.png',
      },
      content,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setEmails([...emails, newEmail]);
    setEnrichmentResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Email Thread */}
          <EmailThread emails={emails} />

          {/* Enrichment Result Panel */}
          {enrichmentResult && (
            <EnrichmentPanel result={enrichmentResult} />
          )}

          {/* Email Composer */}
          <EmailEditor
            onEnrich={handleEnrich}
            onSend={handleSend}
            isEnriching={isEnriching}
            initialContent={INITIAL_REPLY}
            suggestionPhrases={SUGGESTION_PHRASES}
          />
        </div>
      </main>

      {/* Exa Footer */}
      <ExaFooter />
    </div>
  );
}
