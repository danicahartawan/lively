# Quick Setup Guide

Follow these steps to get the Live Context Enrichment demo running:

## 1. Install Dependencies

```bash
cd exa-grammarly-enrichment-demo
npm install
```

## 2. Get API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

### Exa API Key
1. Go to https://exa.ai/
2. Sign up for an account
3. Navigate to your dashboard
4. Copy your API key

## 3. Configure Environment Variables

Edit `.env.local` and add your keys:

```env
OPENAI_API_KEY=sk-your-openai-key-here
EXA_API_KEY=your-exa-key-here
```

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

1. **Gmail-like header** at the top with search bar
2. **Email thread** showing Cyrus's initial request
3. **Email composer** at the bottom with a pre-filled reply
4. **Exa branding footer** at the bottom

## How to Use

### Option 1: Send Email Directly
1. Edit the text in the composer
2. Click **"Send"** button
3. Your email appears in the thread above

### Option 2: Enrich Before Sending
1. Edit the text in the composer
2. Click **"Enrich with Context"** button
3. Wait for AI to:
   - Extract topics from your email
   - Search the web via Exa
   - Generate enriched version with context
4. Review the enriched content and sources
5. Copy enriched text if desired
6. Click **"Send"** to add to thread

### Clear and Start Over
- Click the trash icon to clear the composer
- Type your own email from scratch

## Troubleshooting

### "Failed to enrich content" error
- Check that both API keys are correctly set in `.env.local`
- Ensure you have credits/quota available for both OpenAI and Exa
- Check the browser console for detailed error messages

### Image not loading (Exa logo)
- Make sure `/public/exa-logo.avif` exists
- Try clearing your browser cache
- Check Next.js console for image optimization errors

### TypeScript errors
- Run `npm install` again to ensure all dependencies are installed
- Restart your development server

## Architecture Notes

- **Server Actions** (`app/actions/enrich.ts`): Handles all API calls server-side
- **Client Components**: All UI components are client-side for interactivity
- **Type Safety**: Full TypeScript support throughout
- **Styling**: TailwindCSS for all UI components

## API Costs

Be aware of API usage:
- **OpenAI**: Each enrichment uses ~2 API calls (GPT-4o-mini for topics, GPT-4o for enrichment)
- **Exa**: Each enrichment uses 1 search query (typically returns 3 results)

Monitor your usage in the respective dashboards:
- OpenAI: https://platform.openai.com/usage
- Exa: Check your Exa dashboard

## Next Steps

- Customize the initial email content in `app/page.tsx`
- Adjust enrichment prompts in `app/actions/enrich.ts`
- Modify the UI styling in component files
- Add more features like attachments, formatting, etc.

Enjoy exploring context enrichment with Exa and OpenAI!
