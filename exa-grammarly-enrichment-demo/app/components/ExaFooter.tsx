'use client';

import Image from 'next/image';

export default function ExaFooter() {
  return (
    <div className="py-3 text-center border-t border-gray-200 bg-white">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span>Powered by</span>
        <Image
          src="/exa-logo.avif"
          alt="Exa"
          width={50}
          height={20}
          className="inline-block"
        />
        <span>the search engine for AIs</span>
      </div>
    </div>
  );
}
