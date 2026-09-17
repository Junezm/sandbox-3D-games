<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:db-agent-rules -->
# Database rules

This project is in development — no backwards compatibility is needed.

- DO NOT use migrations (`db:generate` / `db:migrate` / `drizzle-kit generate` / `drizzle-kit migrate`).
- DO NOT create or commit files under `drizzle/` (migration artifacts).
- ALWAYS push schema changes with `npm run db:push` (`drizzle-kit push`) instead.
<!-- END:db-agent-rules -->
