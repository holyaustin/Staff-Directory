# Staff Directory Information System

**Design and Implementation of a Staff Directory Information System**
Case Study: Akanu Ibiam Federal Polytechnic, Unwana

A full-stack directory application built with **Next.js 16 (App Router)** and
**Tailwind CSS**, using flat **JSON files** as a lightweight, file-based data
store instead of a database.

---

## 1. Getting started

### Prerequisites
- Node.js 18.18 or later
- npm (or yarn/pnpm)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

---

## 2. Project structure

```
staff-directory-system/
├── app/
│   ├── layout.js                 # Root layout (fonts, Header, Footer)
│   ├── page.js                   # Dashboard / home page
│   ├── globals.css               # Tailwind + design tokens
│   ├── staff/
│   │   ├── page.js               # Staff directory (search + filter)
│   │   ├── new/page.js           # Add staff form
│   │   ├── [id]/page.js          # Staff profile
│   │   └── [id]/edit/page.js     # Edit staff form
│   ├── departments/
│   │   ├── page.js                # Departments list
│   │   └── [id]/page.js           # Department detail + staff
│   ├── faculties/
│   │   ├── page.js                # Schools list
│   │   └── [id]/page.js           # School detail + departments
│   ├── announcements/page.js      # Notices
│   ├── about/page.js              # Project documentation
│   └── api/                       # REST-style API routes (see below)
├── components/                    # Header, Footer, StaffCard, StaffForm, etc.
├── lib/db.js                      # JSON file read/write data-access layer
├── data/                          # The 5 JSON datasets (the "database")
│   ├── staff.json
│   ├── departments.json
│   ├── faculties.json
│   ├── designations.json
│   └── announcements.json
└── public/
```

No `src/` folder is used — routing lives directly under `app/`, per the App Router convention.

---

## 3. Data model (JSON "database")

| File                  | Description                                            |
|------------------------|----------------------------------------------------------|
| `staff.json`           | Individual staff records (name, contact, appointment)   |
| `departments.json`     | Departments, each linked to a `facultyId`                |
| `faculties.json`       | Schools/faculties of the Polytechnic                     |
| `designations.json`    | Job titles / CONTISS levels                               |
| `announcements.json`   | Institutional notices shown on the dashboard              |

Relationships are modelled with simple foreign keys (`departmentId`,
`facultyId`, `designationId`) resolved at read time in `lib/db.js`.

---

## 4. How file-based read/write works

`lib/db.js` uses Node's `fs/promises` to read and write the JSON files
directly on disk, from Next.js **Route Handlers** (`app/api/**/route.js`),
which run in the Node.js runtime by default — giving full filesystem access
without a separate backend server:

```js
const filePath = path.join(process.cwd(), "data", "staff.json");
const raw = await fs.readFile(filePath, "utf-8");
// ...
await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
```

Server Components (pages) call these functions **directly**, with no network
round-trip. Client Components (like the Add/Edit staff form) call the
`/api/staff` routes with `fetch`, which then use the same `lib/db.js` helpers.

### ⚠️ Important limitation

Writing to the local filesystem only works on a **persistent server** (your
own machine, a VPS, Docker container, etc.). It will **not** persist on
serverless hosts with a read-only or ephemeral filesystem (e.g. Vercel's
default deployment). For a real deployment with the same "no external
database" constraint, run `npm run build && npm run start` on a normal Node
server (VPS, Render, Railway, a school server, etc.) rather than a serverless
platform.

---

## 5. Deploying on Netlify

A `netlify.toml` is included so the build works without manual dashboard
configuration:

```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

If you see this build error:

```
Error: Your publish directory cannot be the same as the base directory of your site.
```

it means the Netlify site's **Publish directory** field (Site configuration →
Build & deploy → Build settings) has been manually set to the repo root. Fix:
open that setting and leave **both** the Base directory and Publish directory
fields **empty** — the `@netlify/plugin-nextjs` plugin manages the publish
output itself and should never have it set manually.

**Persistence on Netlify:** the same filesystem limitation from section 5
applies here — Netlify's API routes run as serverless functions with an
ephemeral filesystem, so add/edit/delete through the live site will not
persist between requests or redeploys. The site will still build, deploy, and
work for browsing/searching the seeded data; only the write operations are
affected. This is fine for a demo/read-only deployment. If you need working
writes in production, either deploy on a persistent Node host (see section 5)
or swap `lib/db.js` to a storage backend that supports serverless writes
(e.g. Netlify Blobs, a hosted database, etc.) — happy to help with either
when you're ready.

---

## 6. API routes

| Method | Route                     | Description                        |
|--------|----------------------------|--------------------------------------|
| GET    | `/api/staff`               | List staff (supports `?q=`, `?departmentId=`, `?facultyId=`) |
| POST   | `/api/staff`                | Create a staff record               |
| GET    | `/api/staff/:id`            | Get one staff record                |
| PUT    | `/api/staff/:id`            | Update a staff record               |
| DELETE | `/api/staff/:id`            | Delete a staff record               |
| GET    | `/api/departments`          | List departments                    |
| GET    | `/api/departments/:id`      | Get one department                  |
| GET    | `/api/faculties`            | List schools/faculties              |
| GET    | `/api/faculties/:id`        | Get one school/faculty              |
| GET    | `/api/designations`         | List designations                   |
| GET    | `/api/announcements`        | List announcements (newest first)   |
| GET    | `/api/stats`                | Dashboard summary counts            |

---

## 7. Design system

- **Colours:** navy (`#0B2545`), royal blue accent (`#14509E`), ink black
  (`#0A0A0C`) and paper white (`#F7F8FA`) — see `tailwind.config.js`.
- **Type:** Fraunces (display/headings), Inter (body/UI), IBM Plex Mono
  (staff IDs, labels, metadata) — loaded via `next/font/google` in
  `app/layout.js`.
- **Signature element:** staff records are presented as ID-badge style cards
  (`StaffCard`, staff profile header) with a punch-hole detail and monospace
  staff ID, echoing a physical staff identification card.

---

## 8. Extending the system

- Add a new dataset by creating a JSON file in `data/`, a `FILES` entry and
  accessor functions in `lib/db.js`, and (optionally) a route in `app/api/`.
- Authentication/roles are intentionally left out to keep the file-based
  scope simple; add a middleware-based auth layer if the project requires
  restricting create/edit/delete to admins only.
