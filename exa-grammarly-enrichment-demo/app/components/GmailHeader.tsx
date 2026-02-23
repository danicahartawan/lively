'use client';

export default function GmailHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-4">
        {/* Gmail Logo */}
        <div className="flex items-center">
          <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
            <path d="M6 14.5L24 26L42 14.5V12L24 23.5L6 12V14.5Z" fill="#EA4335"/>
            <path d="M42 12L24 23.5L6 12V10C6 8.9 6.9 8 8 8H40C41.1 8 42 8.9 42 10V12Z" fill="#FBBC04"/>
            <path d="M42 14.5V38C42 39.1 41.1 40 40 40H8C6.9 40 6 39.1 6 38V14.5L24 26L42 14.5Z" fill="#34A853"/>
            <path d="M42 14.5L24 26V40H40C41.1 40 42 39.1 42 38V14.5Z" fill="#4285F4"/>
            <path d="M6 14.5L24 26V40H8C6.9 40 6 39.1 6 38V14.5Z" fill="#C5221F"/>
          </svg>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search mail"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 text-gray-700"
            />
          </div>
        </div>

        {/* Settings Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
