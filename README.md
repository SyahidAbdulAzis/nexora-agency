# Nexora Agency - Company Profile Website

Website Company Profile untuk Digital Marketing Agency dengan sistem autentikasi dan manajemen blog. Dibangun dengan React, TypeScript, Vite, dan Supabase.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Form Handling:** Formik + Yup
- **Backend:** Supabase (Auth + PostgreSQL)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Supabase

1. Buat project di [Supabase](https://app.supabase.com)
2. Copy `.env.example` ke `.env`
3. Isi variabel environment:
   - `VITE_SUPABASE_URL`: URL project Supabase Anda
   - `VITE_SUPABASE_ANON_KEY`: Anon/Public key dari Supabase

### 3. Setup Database

Jalankan file SQL di Supabase:

1. Buka [Supabase SQL Editor](https://app.supabase.com)
2. Pilih project Anda → SQL Editor → New Query
3. Copy-paste isi file `supabase/schema.sql`, atau upload file tersebut
4. Klik Run

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy ke Vercel

1. Push repository ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
4. Deploy

## Folder Structure

```
src/
├── assets/           # Static assets
├── components/
│   ├── common/       # Navbar, Footer, Button, dll
│   ├── blog/         # BlogCard, BlogForm
│   └── layout/       # MainLayout, AuthLayout
├── context/          # AuthContext
├── hooks/            # useAuth
├── pages/            # Page components
├── routes/           # AppRouter, ProtectedRoute, AuthRoute
├── services/         # Supabase client, authService, blogService
├── types/            # TypeScript types
├── utils/            # Helper functions
└── validations/      # Yup schemas
```

## Routes

| Route | Akses | Deskripsi |
|-------|-------|-----------|
| `/` | Public | Home |
| `/about` | Public | About Us |
| `/services` | Public | Services |
| `/teams` | Public | Teams |
| `/blog` | Public | Blog List |
| `/blog/:id` | Public | Blog Detail |
| `/login` | Auth Guard | Login (redirect jika sudah login) |
| `/dashboard` | Protected | Dashboard |
| `/blog/create` | Protected | Create Blog |
| `/blog/edit/:id` | Protected | Edit Blog |
