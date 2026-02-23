'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const DEFAULT_SUGGESTIONS = ['Hi Cyrus from OpenAI', 'Hi Claudia from Ramp'];

interface EmailEditorProps {
  onEnrich: (content: string) => Promise<void>;
  onSend: (content: string) => void;
  isEnriching: boolean;
  initialContent?: string;
  suggestionPhrases?: string[];
}

export default function EmailEditor({ onEnrich, onSend, isEnriching, initialContent = '', suggestionPhrases = DEFAULT_SUGGESTIONS }: EmailEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [suggestion, setSuggestion] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');
  const glowRef = useRef<HTMLDivElement>(null);

  // Typewriter suggestion animation (only when content is empty)
  useEffect(() => {
    if (content.length > 0) return;
    const phrase = suggestionPhrases[phraseIndex % suggestionPhrases.length];
    if (phase === 'typing') {
      if (suggestion.length < phrase.length) {
        const t = setTimeout(() => setSuggestion(phrase.slice(0, suggestion.length + 1)), 80);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('pause'), 0);
      return () => clearTimeout(t);
    }
    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), 2000);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (suggestion.length > 0) {
        const t = setTimeout(() => setSuggestion(suggestion.slice(0, -1)), 50);
        return () => clearTimeout(t);
      }
      setPhase('typing');
      setPhraseIndex((i) => i + 1);
      return () => {};
    }
    return () => {};
  }, [content, suggestion, phraseIndex, phase, suggestionPhrases]);

  useEffect(() => {
    const element = glowRef.current;
    if (!element) return;
    let angle = 0;
    let rafId: number;
    const rotate = () => {
      angle = (angle + 1) % 360;
      element.style.setProperty('--angle', `${angle}deg`);
      rafId = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleClear = () => {
    setContent('');
  };

  const handleEnrich = async () => {
    if (content.trim()) {
      await onEnrich(content);
    }
  };

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src="/View recent photos.png"
              alt="Danica"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">Danica Hartawan</div>
            <div className="text-xs text-gray-500">&lt;danica@exa.ai&gt;</div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="p-4 relative">
        <div className="relative w-full min-h-[180px] rounded-lg overflow-hidden">
          {/* Typewriter suggestion overlay — visible only when empty, reduced opacity */}
          {content.length === 0 && (
            <div
              className="absolute inset-0 p-3 pointer-events-none flex items-start text-sm text-gray-500 overflow-hidden z-10"
              style={{ opacity: 0.45 }}
              aria-hidden
            >
              <span className="whitespace-pre-wrap">
                {suggestion}
                <span className="inline-block w-0.5 h-4 ml-0.5 bg-gray-400 animate-pulse align-middle" />
              </span>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="relative w-full min-h-[180px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm bg-white"
            placeholder=""
            disabled={isEnriching}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-4 pb-3 flex items-center gap-2 border-t pt-3">
        <button className="p-2 hover:bg-gray-100 rounded" disabled={isEnriching}>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded" disabled={isEnriching}>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>

        <div className="flex items-center gap-1 px-3 py-1 border-l ml-2">
          <select className="text-sm text-gray-600 focus:outline-none" disabled={isEnriching}>
            <option>Sans Serif</option>
            <option>Serif</option>
            <option>Monospace</option>
          </select>
        </div>

        <div className="flex items-center gap-1 border-l pl-2">
          <button className="px-2 py-1 hover:bg-gray-100 rounded font-bold text-gray-600" disabled={isEnriching}>
            B
          </button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded italic text-gray-600" disabled={isEnriching}>
            I
          </button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded underline text-gray-600" disabled={isEnriching}>
            U
          </button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded text-gray-600" disabled={isEnriching}>
            A
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            disabled={isEnriching || !content.trim()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors text-sm"
          >
            Send
          </button>
          <div ref={glowRef} className="rotating inline-block">
            <button
              onClick={handleEnrich}
              disabled={isEnriching || !content.trim()}
              className="enrich-button-inner px-5 py-2 w-full text-blue-600 border border-blue-600 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed font-medium transition-colors text-sm"
            >
              {isEnriching ? 'Enriching...' : 'Enrich with Context'}
            </button>
          </div>
        </div>

        <button
          onClick={handleClear}
          disabled={isEnriching}
          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          title="Clear content"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
