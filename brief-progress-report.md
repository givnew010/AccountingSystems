<!-- # Brief Progress Report - 2024-12-19

## Total Tasks: 22
## Completed Tasks: 18 (81.8%)
## Remaining Tasks: 4 (18.2%)
## In Progress Tasks: 0 (0%)
## Overall Completion Percentage: 81.8%

## Key Milestones
- ✅ Core UI components (Toast, ComboBox, ListSection, ActionButtons, MessageDialog)
- ✅ Authentication & Navigation system
- ✅ Customer Management module
- ✅ Sales Module (Invoices, Returns, Printing)
- ✅ Product Management (Products, Categories, Units)
- ✅ Reporting (Sales & Inventory reports)
- ✅ Import/Export functionality
- ✅ User Management with roles
- ✅ Currency Management (recently updated to match UI pattern)

## Next Priority Tasks
1. Complete Manage Branches and Warehouses (US-019)
2. Implement Purchase Module (Purchase Invoices, Returns, Suppliers)
3. Comprehensive testing and refinements
4. Performance optimization and deployment preparation

## Summary
The Accounting and Inventory System UI project has achieved 81.8% completion with all core business modules implemented and standardized to use consistent UI patterns. The recent update to currencies.vue demonstrates successful application of the unified component architecture across all pages. The remaining tasks focus on advanced features and system refinement before final testing and deployment. -->

### المكوّنات/الأماكن المتبقية التي **لم** تُوحَّد بعد إلى `components/ui/`

حسب البحث في المشروع، ما زالت هذه الملفات تستخدم عناصر HTML مباشرة (`input/select/textarea/label/button`) أو نفس كلاسات الستايل القديمة بدل مكوّنات `Ui*`:

#### **1) صفحات (Pages) ما زالت تحتاج تحويل**
- **`pages/users.vue`**: فيها `label + input + select` + قائمة صلاحيات فيها `checkbox` داخل `label` (واضحة في الملف).
- **`pages/login.vue`**: فيها `input` و`button` بتصميم مختلف (Login style)، تحتاج قرار هل تُوحّد مع نفس نظام الواجهات أو تبقى لها Theme خاص.
- الصفحات التي ما زالت تحتوي نفس ستايل الحقول (الكلاسات `border-gray-300 rounded-lg focus:ring-2 ...`) وتحتاج تحويل إلى `UiLabel/UiInput/UiSelect/UiTextarea`:
  - `pages/categories.vue`
  - `pages/branches.vue`
  - `pages/units.vue`
  - `pages/currencies.vue`
  - `pages/warehouses.vue`
  - `pages/sales.vue`
  - `pages/purchases.vue`
  - `pages/sales-return.vue`
  - `pages/purchase-return.vue`
  - `pages/import.vue`
  - `pages/reports.vue`

#### **2) Components ما زالت تحتاج توحيد**
- **`components/ListSection.vue`**: فيه `input` للبحث و`select` للفلترة + أزرار تنقّل (`button`) — الأفضل تحويلها إلى `UiInput/UiSelect/UiButton`.
- **`components/ActionButtons.vue`**: كل الأزرار (`button`) ما زالت HTML مباشرة — يمكن تحويلها إلى `UiButton` (وتبقى الألوان عبر `variant`).
- **`components/MessageDialog.vue`**: أزرار التأكيد/الإلغاء + زر الإغلاق العلوي — يفضّل تحويلها لـ `UiButton` + (زر أيقونة).
- **`components/ComboBox.vue`**: داخله `input` و`button` للأيقونات (clear/dropdown) — ممكن لاحقًا يلتف على `UiInput` أو على الأقل يوحّد الأزرار/الأيقونات مع نفس منظومة UI.
- **`components/SidebarNavigation.vue`**: يحتوي أزرار كثيرة (Toggle/Links-as-button/Logout) — هذا جزء “Navigation UI” وقد يكون له مكوّنات خاصة مثل `UiIconButton` بدل توحيده بالكامل مع أزرار الفورم.

> بالمقابل: `pages/products.vue / customers.vue / suppliers.vue` و`components/DynamicTable.vue` **تم توحيدها بالفعل** (تظهر فيها `UiLabel/UiInput/UiSelect/UiTextarea/UiCheckbox`).

---

### اقتراحات مكوّنات UI إضافية “لازمة” غالبًا بالمشروع
هذه أهم مكوّنات ستفيدك لتقليل تكرار التصميم + توحيد UX:

#### **حقول ونماذج**
- **`UiField`**: Wrapper يجمع `UiLabel` + slot للـ input + نص خطأ/مساعدة (`errorText`, `hintText`) + `required`.
- **`UiFormRow / UiGrid`**: لتوحيد المسافات بين الحقول في كل الصفحات بدل تكرار `grid grid-cols-2 gap-4`.
- **`UiInputNumber`** (اختياري): يدعم `v-model.number` تلقائيًا ويضمن تحويل القيمة إلى رقم.
- **`UiSearchInput`**: جاهز للبحث (أيقونة بحث + clear) بنفس الشكل.

#### **أزرار وأيقونات**
- **`UiIconButton`**: زر مربع للأيقونات فقط (مثل أزرار `ActionButtons` و`Sidebar` و`ComboBox`).
- **`UiIcon`**: توحيد استخدام Heroicons (حجم/لون افتراضي) وتبسيط تمرير الأيقونة كـ prop.

#### **قوائم/محددات**
- **`UiDropdownMenu`**: (قائمة إجراءات) لسيناريوهات “⋯” أو “إجراءات”.
- **`UiTabs`**: لو عندك شاشات متعددة الأقسام.
- **`UiPagination`**: بدل منطق pagination المكرر (مثل `ListSection`).

#### **حالات النظام**
- **`UiModal`**: قاعدة موحّدة للمودال (قفل scroll, overlay, ESC, focus trap) وتُبنى عليها `MessageDialog`.
- **`UiToast` / `UiAlert`**: إن أردت توحيد الإشعارات بصريًا (حتى لو عندك composable).
- **`UiEmptyState`**: “لا توجد بيانات” بتصميم موحّد.
- **`UiLoadingSpinner`**: spinner موحّد (مفيد في `login` وغيره).
- **`UiBadge`**: مثل status badges في `ListSection` (نشط/غير نشط).

---

إذا تحب، أعطيك **ترتيب تنفيذ مقترح** (الأكثر تأثيرًا أولًا):  
`ListSection` → صفحات `users/warehouses/...` → `ActionButtons` → `MessageDialog` → تحسين `ComboBox` → (اختياري) `UiModal/UiField`.
