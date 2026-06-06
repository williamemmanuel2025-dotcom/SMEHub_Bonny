# Local SME Directory & Business Hub

A premium, scalable local business directory for Port Harcourt, Nigeria. Built with React, Vite, Tailwind CSS, and Leaflet.js.

## Tech Stack
- Frontend: React 19 + Vite
- Routing: React Router
- State Management: React Context API
- Styling: Tailwind CSS
- Maps: Leaflet.js

## Features
- **Discovery**: Search by name, category, and location area.
- **Maps**: Interactive marker maps with `react-leaflet`.
- **Profiles**: Rich business detail pages with reviews and directions.
- **Submissions**: Form for new SME owners to list their business.
- **Admin**: Dashboard to verify and manage directory entries.

## Deployment Guide (Netlify / Vercel)
This app is architected as a Client-Side Single Page Application (SPA).

1. Connect your repository to Vercel or Netlify.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Add a rewrite rule for single page apps:
   - For Netlify, create a `public/_redirects` file with: `/* /index.html 200`
   - For Vercel, create a `vercel.json` with: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`

## Future Backend Integration (Airtable / Supabase)
Currently, data is loaded via `/src/data/mockData.ts` to satisfy the MVP requirements without exposing private API keys. To connect to Airtable:
1. Initialize an API client or create serverless functions (e.g. AWS Lambda / Vercel Edge).
2. Sync `MOCK_BUSINESSES` loading inside `AppContext.tsx` with GET requests to Airtable API.
3. Hook up the `SubmitBusiness.tsx` form to send POST requests containing the business schema.
