'use client';

import Image from 'next/image';

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

interface EmailThreadProps {
  emails: Email[];
}

export default function EmailThread({ emails }: EmailThreadProps) {
  if (emails.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mb-4">
      {emails.map((email, index) => (
        <div key={email.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Email Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                  {email.from.avatar ? (
                    <Image
                      src={email.from.avatar}
                      alt={email.from.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-semibold text-blue-700">
                      {email.from.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Sender Info */}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{email.from.name}</div>
                  <div className="text-xs text-gray-500">&lt;{email.from.email}&gt;</div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{email.timestamp}</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-4">
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {email.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
