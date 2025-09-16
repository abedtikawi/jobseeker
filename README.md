## Job Seeker – Frontend

A modern Next.js App Router project that lists jobs, supports filtering and pagination, and renders SEO-friendly job detail pages.

### Architecture overview

- App Router (Next.js 14+) with SSR by default for pages
  - `app/page.tsx`: Server component. Fetches jobs (max 10 per request), reads `searchParams` for filtering and pagination, and renders the list.
  - `app/jobs/[id]/page.tsx`: Server component. Fetches a single job by id on the server and defines `generateMetadata` for SEO (dynamic title/description).
- Client components for interactivity
  - `app/components/Filters.tsx`: Updates URL query params (category, city, experience, english) and preserves shareable URLs.
  - `app/components/Pagination.tsx`: Updates `skip` and `limit` query params.
  - `app/components/ApplyModal.tsx`: Accessible modal for applying to a job (full name + email validation).
- API layer
  - `lib/axios.ts`: Central axios instance with an interceptor that logs non-2xx responses.
  - `lib/api.ts`: Typed helpers: `listAllJobs(skip, limit, contractType)` and `getJobById(id)`.
  - `shared/constants/endpoints.ts`: Single source for REST endpoints.
  - `shared/constants/types.ts`: Domain types (`Job`, response shapes, etc.).
- Styling
  - Tailwind CSS with centralized component utility classes in `app/globals.css` (`.card`, `.btn-primary`, `.form-select`, `.focus-ring`, etc.).

### Required environment variables

Create `.env.local` in the project root with:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

- `NEXT_PUBLIC_API_BASE_URL` must point to your backend base URL that serves the endpoints defined in `shared/constants/endpoints.ts`.

### Install & run

```bash
npm install
npm run dev
# App runs at http://localhost:3000
```

### Usage notes

- Pagination: controlled by `skip` and `limit` query params (limit is capped at 10).
- Filters: `category`, `city`, `experience` (required | not_required), `english` (required | not_required) are read from URL and applied server-side in `app/page.tsx`.
- Job details: navigates to `/jobs/[id]` and fetches the job via `getJobById` using the dedicated endpoint.

### Project structure (key files)

```
app/
  components/
    ApplyModal.tsx
    Card.tsx
    Filters.tsx
    Navbar.tsx
    Pagination.tsx
  jobs/[id]/page.tsx
  layout.tsx
  page.tsx
lib/
  api.ts
  axios.ts
shared/constants/
  endpoints.ts
  types.ts
```

### Axios interceptor behavior

- Logs an error for any non-2xx response status
- Logs details for failed requests (network errors, timeouts, etc.)

