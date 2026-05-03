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

---

إذا تريد، الخطوة التالية أطبّقهم مباشرة في أماكن واضحة:

UiBadge داخل ListSection لحالات نشط/غير نشط.
UiModal بدل MessageDialog.
UiIcon + UiButton داخل ActionButtons وSidebar.
UiTabs في صفحة مناسبة مثل reports أو users لتقسيم الأقسام.

---

قم بتطبيق التالي في مكون @UiInput.vue :

1. قم باضافة #@components/ui/UiLabel.vue واجعل يظهر اذا كان البروبرتي تحتوي على نص و يختفي اذا كان فارغ في هذا المكونات ( @UiInput.vue , )
2. اجعل مكون @UiInput.vue يدعم `v-model.number` تلقائيًا ويضمن تحويل القيمة إلى رقم وايضاً يقبل رقم فقط من الكبيورد.
3. قم باضاقة ايقونة #@components/ui/UiIcon.vue `Icon Info` تظهر في الحقل اذا وجود خطاء في الحقل وعند عمل hover على الايقونة تظهر ...
4. تطبيق ToolTip على المكونات

5. قم بجعل @UiButton.vue يحتوي حالة IconButton اي ان الزر يكون عبارة عن ايقونة فقط مثل أزرار ActionButtons و زر clearable `مسح` في ComboBox == تم الانجاز
6.

المشاكل في تصميم المكونات المتبيقة :

1. Scroll اخفى الزرين تحريك الاسكرول.
2. تعديل تصميم UiBadge باصافة ايقونات ==> تم
3. UiToolTip تعديل حجم عرض ToolTip , استخدام ToolTip في جميع المكونات التي تحتوي على ToolTip
4. UiModal تعديل تصميم المكون كامل واستخدام المكوتات داخله ==> تم
5. توحديد تصميم بين مكون UiToggleButton و UiToggleButton2
6. UiInput الغاء زرين الزيدة/ النقصان في حالة الرقم
7. UiSelect اعادة تصميم قائمة Dropdown
8. UiCheckbox إعادة تصميمة بالكامل ==> تم
9. تصميم مكون جديد datePicrk ==> تم
10. في مكون #UiInput قم باضاقة ايقونة #UiIcon `Icon Info` تظهر في الحقل اذا وجود خطاء في الحقل وعند عمل hover على الايقونة يظهر #UiToolTip لعرض رسالة الخطاء ==> تم
11.
12. عدل كود مكون # بحيث تستخدام المكونات الاخر # بدل من استخدام element العادية بشرط ان لايتغير طريقة عمل المكون

UiDatePicker
ComboBox

نفذ المهمة التالية :
قم بتطبيق نفس فكرة ايقونة `errorMessage` الموجودة في مكون #file:UiInput.vue في المكونات هذا #ComboBox.vue , #UiDatePicker.vue مع مراعاة الامور التاللية:

- اجعل ايقونة `errorMessage` بين

# ملاحظة

- الخطاء قم بتحديث #file:test.vue لعرض هذا الحالات والسلوكيات الجديدة للمكون.
