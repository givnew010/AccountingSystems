# Copilot Instructions for Accounting and Inventory System UI

## General System Summary
This is an accounting and inventory management system built with Nuxt3, Vue3, and TailwindCSS. The system handles sales, purchases, product management, reporting, and settings. It features a sidebar navigation, dual-section screens (list and content), and supports operations like invoicing, returns, inventory tracking, and financial reporting. The UI must be modern, responsive, and RTL-friendly for Arabic users.

## UI Design Guidelines
Design the interfaces in a modern, elegant style using TailwindCSS. Use a clean layout with ample whitespace, rounded corners, and subtle shadows. Primary color: blue-600 (#2563eb), secondary: gray-500, accent: green-500 for success, red-500 for errors. Fonts: Use 'Inter' for English, 'Noto Sans Arabic' for Arabic. Ensure RTL support with `dir="rtl"` on root elements. Responsive design: Mobile-first, with breakpoints for sm, md, lg.

### Sidebar Component
- **Structure**: Fixed sidebar on the right (for RTL), collapsible.
- **Collapsed State**: Width 64px, show only icons.
- **Expanded State**: Width 256px, show icons + labels.
- **User Info**: At bottom, avatar (40x40px), name, role.
- **Logout Button**: Red button at bottom.
- **Navigation Items**: Use icons from Heroicons, hover effects with bg-blue-50.
- **Styling**: bg-white, border-r, shadow-sm. Icons: 24px, color: gray-600, active: blue-600.

### List Section Component
- **Position**: Right side (RTL), width 40% on large screens.
- **Header**: Search input (full width, rounded), filter dropdown (status: active/inactive/all).
- **Table**: Striped rows, hover highlight, pagination buttons (prev/next).
- **Styling**: bg-gray-50, padding 16px, table headers bold, rows 48px height.

### Content Section Component
- **Position**: Left side (RTL), width 60%.
- **Action Buttons**: Top row, buttons: New (blue), Edit (yellow), Delete (red), Print (gray), Post (green), Import (purple). Size: 40px height, rounded, icons inside.
- **Data Fields**: Form inputs, labels above, full width, margin 8px.
- **Sub Tables**: Similar to list table, embedded.
- **Styling**: bg-white, padding 24px, shadow-md, form fields with focus:ring-blue-500.

### Specific Interfaces

#### Sales Invoice
- **Fields**: Invoice Number (readonly, auto), Date (date picker), Customer (select), Payment Method (select: cash/credit/transfer), Notes (textarea).
- **Sub Table**: Products (columns: Product, Unit, Quantity, Price, Discount, Total). Add/Remove row buttons.
- **Operations**: Save, Print.

#### Sales Return
- Similar to Sales Invoice, add Reference Invoice field.

#### Customers
- **Fields**: Name, Phone, Address, Opening Balance, Balance Type, Status.
- **Table**: List customers with edit/delete actions.

#### Purchases
- Mirror of Sales: Purchase Invoice, Return, Suppliers.

#### Products
- **Fields**: Name, Barcode, Category, Warehouse/Branch, Status.
- **Sub Table**: Units (Unit Name, Type, Conversion Rate, Sale Price, Purchase Price, Cost Price, Current Quantity).

#### Categories
- **Fields**: Name, Description.
- **Table**: List categories.

#### Units
- **Fields**: Name, Description.
- **Table**: List units.

#### Reports
- **Filters**: Date range, Customer/Supplier/Product/Category.
- **Table**: Results based on filters.

#### Settings
- **Users**: Name, Email, Password, Role.
- **Currencies**: Name, Symbol, Exchange Rate.
- **Branches**: Name, Address.
- **Warehouses**: Name, Branch.

## Workflows

### Creating a Sales Invoice
1. Navigate to Sales > Sales Invoice.
2. Click New.
3. Fill customer, date, payment method.
4. Add products to table: select product, unit, quantity, price.
5. Calculate totals.
6. Save: validate, update inventory, create accounting entry if posted.

### Posting an Invoice
1. After saving, click Post.
2. System creates journal entry, updates stock, locks invoice.

### Importing Data
1. Go to relevant screen (e.g., Products).
2. Click Import.
3. Upload CSV/Excel, map columns, validate, save.

## Best Practices
- Use Vue3 Composition API.
- Component naming: PascalCase, e.g., SalesInvoice.vue.
- State management: Pinia for global state.
- Validation: VeeValidate.
- Accessibility: ARIA labels, keyboard navigation.
- Performance: Lazy load components, optimize images.
- Code style: ESLint with Vue rules, Prettier.

## Workflow and Task Management
- Implement a workflow tracking system through task completion in the `.github/instructions/TASKS.instructions.md` file.
- Regularly and continuously review the `.github/instructions/TASKS.instructions.md` file when starting any task or after completing it.
- Update the `.github/instructions/TASKS.instructions.md` file upon completing any task regularly and continuously.
- Create a mechanism to generate reports on task completion, including remaining tasks, completed tasks, and completion percentage.
- The structure of achievement reports in Workflow and Task Management According to file `.github/instructions/Reports-structure.instructions.md`.

## Copilot Usage Guidelines
- Before generating any UI code, read this file fully. 
- Use the component descriptions and styling specs exactly. 
- For new components, refer to the guidelines. 
- If conflicts arise, prioritize this document. 
- Generate code in Vue3 with Tailwind classes, ensure RTL support.
- Use the `.github/instructions/prd.instructions.md` and `docs/sys_anlsis.md` files as a reference for the system.
- Update the `.github/instructions/TASKS.instructions.md` file upon completing any task regularly and continuously.
- Use the `.github/instructions/Reports-structure.instructions.md` file for report generation.

