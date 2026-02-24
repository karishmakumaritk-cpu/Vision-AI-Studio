# Deployment

## Frontend (Vercel)
- Root directory: `frontend`
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL`

## Backend (Render/Railway)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Set env from `backend/.env.example`

## Database (Supabase)
- Run `database/schema.sql`
- Run `database/seeds.sql`


## Common Supabase URI Fix (Important)
If you see Prisma/DB connection errors with Supabase URI:
- use `sslmode=require`
- URL-encode password characters (`@` => `%40`, `#` => `%23`, etc.)
- prefer pooler URL for runtime:
  - `postgresql://postgres.<project-ref>:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require`
- use direct `db.<project-ref>.supabase.co:5432` only for migrations when needed.


### Your project reference example
For project ref `pcrtgcyqryafuautfctg`:
- `SUPABASE_URL=https://pcrtgcyqryafuautfctg.supabase.co`
- Runtime DB URL must use pooler host `aws-0-ap-south-1.pooler.supabase.com:6543`
- Migration URL can use direct host `db.pcrtgcyqryafuautfctg.supabase.co:5432`

If you set `SUPABASE_URL` to a `postgresql://...` string, backend auth/data calls will fail.
