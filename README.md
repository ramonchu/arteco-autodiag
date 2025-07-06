# TechCheck Navigator

This is a Next.js project for a self-assessment tool that helps companies evaluate their IT maturity. It features a step-by-step diagnostic wizard and provides AI-generated insights based on the user's answers.

To get started, take a look at `src/app/page.tsx`.

## Database

Results from the diagnostic can be stored in a PostgreSQL database. Create a
database and provide the connection string via the `DATABASE_URL` environment
variable (see `.env.example`). Only submissions with `utm_source=apollo.io` are
persisted.
