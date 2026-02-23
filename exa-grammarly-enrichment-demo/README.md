# Live Context Enrichment for AI Writing Agents

A Next.js 14 demo application that demonstrates real-time content enrichment using Exa search API and OpenAI in a Gmail-like interface.

## Features

- **Gmail-Style Interface**: Authentic email UI with search header
- **Email Thread View**: See conversation history like real email threads
- **Interactive Email Composer**: Write and edit emails with formatting toolbar
- **AI-Powered Context Enrichment**: Enhance your content with relevant web context before sending
- **Smart Topic Extraction**: Uses OpenAI to identify key topics from your writing
- **Web Context Search**: Leverages Exa to find relevant sources
- **Intelligent Content Enhancement**: Enriches your original content while maintaining tone and style
- **Send or Enrich**: Choose to send your email as-is or enrich it with AI-powered insights first

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Server Actions**
- **Exa API** - Neural search for the internet
- **OpenAI API** - GPT-4 for content analysis and enrichment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Exa API key ([Get one here](https://exa.ai/))

### Installation

1. **Clone or navigate to the project directory:**

```bash
cd exa-grammarly-enrichment-demo
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Copy `.env.local.example` to `.env.local` (or edit the existing `.env.local`):

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
EXA_API_KEY=your_exa_api_key_here
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

1. **View Email Thread**: See the initial email from Cyrus requesting an update
2. **Compose Reply**: Write your response in the composer at the bottom (pre-filled with a sample reply)
3. **Enrich Before Sending** (Optional): Click "Enrich with Context" to:
   - Extract key topics using GPT-4o-mini
   - Search for relevant sources using Exa's neural search
   - Enhance your content with contextual information from the web
   - View enriched content and sources before sending
4. **Send Email**: Click "Send" to add your email to the thread
5. **See Updated Thread**: Your sent email appears in the conversation thread above

## Project Structure

```
exa-grammarly-enrichment-demo/
├── app/
│   ├── actions/
│   │   └── enrich.ts            # Server Actions for Exa + OpenAI
│   ├── components/
│   │   ├── GmailHeader.tsx      # Gmail-style header with search
│   │   ├── EmailThread.tsx      # Email conversation thread view
│   │   ├── EmailEditor.tsx      # Email composer with formatting
│   │   ├── EnrichmentPanel.tsx  # Enrichment results display
│   │   └── ExaFooter.tsx        # Exa branding footer
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Main page with thread logic
├── public/
│   └── exa-logo.avif            # Exa logo for footer
├── .env.local                   # Environment variables (not in git)
├── .env.local.example           # Example env file
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API Usage

### Exa API

The app uses Exa's neural search to find relevant web content based on extracted topics:

```typescript
const searchResults = await exa.searchAndContents(topics, {
  type: 'auto',
  numResults: 3,
  text: { maxCharacters: 500 },
});
```

### OpenAI API

The app uses OpenAI for two purposes:

1. **Topic Extraction** (GPT-4o-mini): Identifies key topics from the content
2. **Content Enrichment** (GPT-4o): Enhances content with contextual information

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Exa](https://exa.ai/)
- [OpenAI](https://openai.com/)
- [TailwindCSS](https://tailwindcss.com/)
