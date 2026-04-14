# Accounting & Inventory Management System

## Overview
A comprehensive Arabic-language (RTL) accounting and inventory management system built with Nuxt 3. It handles sales, purchases, products, suppliers, customers, and financial reporting.

## Tech Stack
- **Framework:** Nuxt 3 (Vue 3)
- **Styling:** Tailwind CSS via `@nuxtjs/tailwindcss`
- **State Management:** Pinia (`@pinia/nuxt`)
- **Form Validation:** VeeValidate (`@vee-validate/nuxt`)
- **Icons:** Heroicons (`@heroicons/vue`)
- **Language:** Arabic (ar), RTL layout

## Project Structure
- `pages/` — Application routes (dashboard, login, sales, purchases, products, customers, suppliers)
- `components/` — Reusable UI components (globally registered)
- `layouts/default.vue` — Main authenticated layout with sidebar and auth guards
- `stores/` — Pinia stores (`auth.ts`, `sidebar.ts`)
- `composables/` — Shared logic (`useToast.ts`)
- `assets/css/main.css` — Global styles

## Key Configuration
- Dev server runs on `0.0.0.0:5000` for Replit compatibility
- Vite `allowedHosts: true` and HMR over WSS port 443 for Replit proxy
- HTML `dir="rtl"` and `lang="ar"` set globally in `nuxt.config.ts`

## Authentication
Mock authentication in `stores/auth.ts` with `localStorage` persistence. Predefined roles:
- Admin: `admin@123`
- Accountant: `acc123`
- Manager: `mgr123`

## Running the Project
```bash
npm install
npm run dev
```
The app runs on port 5000.
