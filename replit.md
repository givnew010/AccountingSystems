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

- `pages/` — Application routes: dashboard, login, sales, purchases, products, customers, suppliers, units, currencies, categories, users, sales-return, purchase-return, reports, import
- `components/` — Reusable UI components (globally registered): `ListSection.vue`, `ActionButtons.vue`, `MessageDialog.vue`, etc.
- `layouts/default.vue` — Main authenticated layout with sidebar and auth guards
- `stores/` — Pinia stores (`auth.ts`, `sidebar.ts`)
- `composables/` — Shared logic (`useToast.ts`, `helper.js`)
- `assets/css/main.css` — Global styles

## UI Pattern (All Pages)

All pages follow the `customers.vue` reference pattern:

- Split-panel layout: `ListSection` on left, form panel on right
- `ActionButtons` component for New/Edit/Delete/Save/Cancel (plus Print/Post for invoices)
- Form always visible; inputs disabled via `:disabled="isViewMode"`
- State: `selectedItemId`, `lastSelectedItemId`, `isViewMode`
- Delete dialogs: `inject('showMessage')` — never `confirm()` or inline `MessageDialog`
- Notifications: `injectToast()` from `~/composables/useToast`
- Helpers: `getDefaultValues(Structure)` from `~/composables/helper`
- Invoice pages use `computed` to map invoices → `{ no, name, status }` for `ListSection`

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
