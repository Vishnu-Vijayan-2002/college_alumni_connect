# College Alumni Connect

> Landing Page prototype (modern design) + README.md for Git

---

## README.md

# College Alumni Connect Portal

**A verified, role-based platform connecting students, alumni, and placement cell staff.**

### 🎯 Objective

The College Alumni Connect Portal is a secure digital platform designed to strengthen connections between alumni, students, and institutional staff. It facilitates verified mentorship, job/internship postings, events, and collaboration across the college community.

### ✨ Key Features

* Role-based authentication and verification (Alumni, Student, Placement Cell, Chapter Head)
* Alumni directory with verified profiles
* Job & internship postings with approvals
* Events & training (live + recorded)
* Private messaging with controlled access
* Chapter-head-driven alumni verification
* Admin panel for moderation, backups, and analytics

### 🧩 Modules

* **Home / Landing**: Overview, news, featured alumni, upcoming webinars.
* **Alumni**: Sign up, login, post jobs/trainings, manage profile, view applications.
* **Students**: Registration, search jobs/internships, request mentorship, view applications.
* **Placement Cell**: Approvals, reports, notifications.
* **Events & Trainings**: Register for events, watch recordings.
* **Networking & Forums**: Discussion boards and advice.
* **Admin Panel**: User roles, content moderation, backups, analytics.

### 🔐 Security

* Email + register number verification
* Employment validation for alumni
* Approval-based profile activation
* Role-specific access control
* Monitored private messaging

### 🧭 Tech Stack (suggested)

* Frontend: React + Tailwind CSS (shadcn/ui optional)
* Backend: Node.js + Express
* Database: MongoDB (Mongoose)
* Authentication: JWT + secure cookies
* Email: Nodemailer (or external service like SendGrid)
* Deployment: Vercel (frontend) + Heroku / Render / Railway (backend)

### 🗂️ Suggested Project Structure

```
college-alumni-connect/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  └─ styles/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ middleware/
├─ docs/
└─ README.md
```

### 🚀 Installation (developer)

```bash
# clone
git clone https://github.com/your-org/college-alumni-connect.git
cd college-alumni-connect

# frontend
cd frontend
npm install
npm run dev

# backend (new terminal)
cd backend
npm install
npm run dev
```

### 🛠️ Environment variables (example)

```
# backend
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=app_password
```

### 🧪 Running locally

* Start backend and frontend as above.
* Seed initial admin / chapter head accounts via a seed script or admin route.

### 🤝 Contribution

1. Fork the repo
2. Create a branch: `feature/your-feature`
3. Make your changes, add tests if applicable
4. Open a PR and request review

### 📄 License

MIT

---

## Landing Page — Modern Design (React + Tailwind)

Below is a single-file React component (default export) using Tailwind classes to preview a modern landing page hero and sections.

```jsx
// src/components/LandingPage.jsx
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <header className="container mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">CA</div>
          <div>
            <h1 className="text-lg font-semibold">College Alumni Connect</h1>
            <p className="text-sm text-slate-500">Verified alumni. Real opportunities.</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a className="hover:underline" href="#alumni">Alumni</a>
          <a className="hover:underline" href="#students">Students</a>
          <a className="hover:underline" href="#events">Events</a>
          <a className="hover:underline" href="#contact">Contact</a>
          <button className="ml-4 px-4 py-2 rounded-full bg-indigo-600 text-white font-medium">Get Started</button>
        </nav>

        <div className="md:hidden">
          <button className="px-3 py-2 border rounded-lg">Menu</button>
        </div>
      </header>

      <main className="container mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Bridge the gap between students and alumni.</h2>
            <p className="mt-4 text-lg text-slate-600">Mentorship, verified job postings, live events and a strong alumni network — all in one secure platform.</p>

            <div className="mt-6 flex gap-4">
              <a href="#signup" className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold">Sign up</a>
              <a href="#learn" className="inline-flex items-center px-6 py-3 rounded-full border font-medium text-slate-700">Learn more</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-sm text-slate-500">Verified Alumni</div>
                <div className="text-xl font-semibold mt-1">1,250+</div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-sm text-slate-500">Jobs & Internships</div>
                <div className="text-xl font-semibold mt-1">320+</div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-sm text-slate-500">Events Hosted</div>
                <div className="text-xl font-semibold mt-1">85</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-pink-50 p-6 shadow-lg">
              <img src="/hero-illustration.png" alt="hero" className="w-full h-64 object-cover rounded-xl" />
            </div>

            <div className="absolute -bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
              <img src="/alumni1.jpg" alt="alumni" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold">Priya Sharma</div>
                <div className="text-xs text-slate-500">Software Engineer @ TechCorp</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12">
          <h3 className="text-2xl font-bold">What you can do</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-semibold">For Alumni</h4>
              <p className="mt-2 text-slate-600 text-sm">Post opportunities, mentor students, and host trainings.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-semibold">For Students</h4>
              <p className="mt-2 text-slate-600 text-sm">Search verified internships, apply, and request mentorship.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-semibold">For Placement Cell</h4>
              <p className="mt-2 text-slate-600 text-sm">Approve posts, verify users, and generate placement reports.</p>
            </div>
          </div>
        </section>

        <section id="alumni" className="py-12">
          <h3 className="text-2xl font-bold">Featured Alumni</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="p-4 bg-white rounded-xl shadow flex flex-col items-start gap-3">
                <div className="w-full h-40 bg-slate-100 rounded-lg" />
                <div className="font-semibold">Alumni Name {i}</div>
                <div className="text-xs text-slate-500">Role & Company</div>
                <div className="mt-2 text-sm text-slate-600">Short testimonial or achievements that show the impact.</div>
              </div>
            ))}
          </div>
        </section>

        <section id="events" className="py-12">
          <h3 className="text-2xl font-bold">Upcoming Events</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-xl shadow">
              <div className="font-semibold">Webinar: Career in AI</div>
              <div className="text-xs text-slate-500 mt-1">Sept 25, 2025 • Online</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow">
              <div className="font-semibold">Resume Workshop</div>
              <div className="text-xs text-slate-500 mt-1">Oct 3, 2025 • Hybrid</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow">
              <div className="font-semibold">Startup Mentorship Hour</div>
              <div className="text-xs text-slate-500 mt-1">Oct 12, 2025 • Online</div>
            </div>
          </div>
        </section>

        <footer id="contact" className="py-12 text-sm text-slate-600">
          <div className="border-t pt-6 flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <div className="font-semibold">Contact Placement Office</div>
              <div className="mt-1">placement@college.edu | +91 12345 67890</div>
            </div>
            <div>
              <div className="font-semibold">Alumni Relations</div>
              <div className="mt-1">alumni@college.edu</div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} College Alumni Connect. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}
```

---

### Notes & next steps

* This README.md is ready to be added to the repo root. Update URLs, env vars, and seed scripts as needed.
* The landing page component uses Tailwind CSS utility classes — ensure Tailwind is configured in the frontend project.
* If you want, I can also generate the full component files, Tailwind config, and a deploy-ready README with CI steps.

---

*End of document.*
