# Staff Directory Information System

## Akanu Ibiam Federal Polytechnic, Unwana

A modern staff directory information system built with Next.js 14, Tailwind CSS, and JSON file storage.

### Features

- **Public Features**
  - Staff directory with search and filtering
  - Staff profile pages
  - Responsive design
  - Department-based browsing

- **Admin Features**
  - Secure authentication with JWT
  - Full CRUD operations
  - Dashboard with statistics
  - Audit logging
  - Staff management

### Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- JSON File Storage (No database required)
- JWT Authentication
- React Icons
- Framer Motion

### Quick Start

1. Install dependencies:
```bash
npm install

Add your packages:

bash
npm install jsonwebtoken bcryptjs cookie react-icons framer-motion react-hot-toast react-select date-fns
Hash the admin password:

bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(hash => console.log(hash));"
Update data/users.json with the hashed password

Run development server:

bash
npm run dev
Access the application:

Public: http://localhost:3000

Admin Login: http://localhost:3000/login

Admin Panel: http://localhost:3000/admin

Default Login
Email: admin@polyunwana.edu.ng

Password: admin123 (or whatever you set)

Project Structure
text
staff-directory/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin Panel
│   ├── login/             # Login Page
│   ├── staff/             # Staff Profile Pages
│   └── page.js            # Homepage
├── components/            # React Components
│   ├── admin/            # Admin Components
│   ├── layout/           # Layout Components
│   ├── providers/        # Context Providers
│   └── ui/               # UI Components
├── data/                  # JSON Data Files
├── lib/                   # Utility Functions
├── public/               # Static Assets
└── ... config files
Demo Credentials
For testing purposes, use:

Email: admin@polyunwana.edu.ng

Password: admin123

Documentation
For detailed documentation, refer to:

Next.js: https://nextjs.org/docs

Tailwind CSS: https://tailwindcss.com/docs

Author
Akanu Ibiam Federal Polytechnic, Unwana

License
MIT