<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <header>
      <h1 class="text-2xl font-bold text-gray-800">صفحة تجربة المكونات</h1>
      <p class="text-sm text-gray-500 mt-1">عرض شامل لجميع مكونات الواجهة مع كل خصائصها وحالاتها.</p>
    </header>

    <UiTabs v-model="componentPreviewTab" :tabs="componentTabs" />

    <!-- UiBadge -->
    <section v-show="componentPreviewTab === 'ui-badge'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiBadge</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: variant — size — pill — styleType — icon — iconPosition</p>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <UiBadge variant="gray">افتراضي</UiBadge>
          <UiBadge variant="blue">معلومة</UiBadge>
          <UiBadge variant="green">نشط</UiBadge>
          <UiBadge variant="yellow">معلّق</UiBadge>
          <UiBadge variant="red">ملغي</UiBadge>
          <UiBadge variant="purple">خاص</UiBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge size="xs" variant="blue">XS</UiBadge>
          <UiBadge size="sm" variant="green">SM</UiBadge>
          <UiBadge size="md" variant="red">MD</UiBadge>
          <UiBadge variant="blue" pill>شكل Pill</UiBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge variant="red" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge variant="red" style-type="outline" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge variant="blue" :icon="InformationCircleIcon" icon-position="left">تفاصيل المنتج</UiBadge>
          <UiBadge variant="green" :icon="CheckCircleIcon">متاح</UiBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge size="sm" variant="red" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="sm" variant="red" style-type="outline" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="sm" variant="blue" :icon="InformationCircleIcon" icon-position="left">تفاصيل المنتج</UiBadge>
          <UiBadge size="sm" variant="green" :icon="CheckCircleIcon">متاح</UiBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge size="md" variant="red" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="md" variant="red" style-type="outline" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="md" variant="blue" :icon="InformationCircleIcon" icon-position="left">تفاصيل المنتج</UiBadge>
          <UiBadge size="md" variant="green" :icon="CheckCircleIcon">متاح</UiBadge>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-1">icons Withe Size : md , iconSize : lg</h3>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge size="md" iconSize="lg" variant="red" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="md" iconSize="lg" variant="red" style-type="outline" :icon="NoSymbolIcon">موقف عن البيع</UiBadge>
          <UiBadge size="md" iconSize="lg" variant="blue" :icon="InformationCircleIcon" icon-position="left">تفاصيل المنتج</UiBadge>
          <UiBadge size="md" iconSize="lg" variant="green" :icon="CheckCircleIcon">متاح</UiBadge>
        </div>
      </div>
    </section>

    <!-- UiIcon -->
    <section v-show="componentPreviewTab === 'ui-icon'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiIcon</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: icon — size — tone — spin — decorative — label</p>
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-4">
          <UiIcon :icon="BellIcon" size="xs" />
          <UiIcon :icon="BellIcon" size="sm" />
          <UiIcon :icon="BellIcon" size="md" />
          <UiIcon :icon="BellIcon" size="lg" />
          <UiIcon :icon="BellIcon" size="xl" />
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <UiIcon :icon="CheckCircleIcon" tone="success" />
          <UiIcon :icon="ExclamationTriangleIcon" tone="warning" />
          <UiIcon :icon="XCircleIcon" tone="danger" />
          <UiIcon :icon="InformationCircleIcon" tone="primary" />
          <UiIcon :icon="ArrowPathIcon" tone="muted" spin />
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <UiIcon :icon="InformationCircleIcon" tone="primary" :decorative="false" label="معلومة" />
          <UiIcon :icon="ExclamationTriangleIcon" tone="warning" :decorative="false" label="تحذير" />
          <UiIcon :icon="XCircleIcon" tone="danger" :decorative="false" label="خطأ" />
        </div>
      </div>
    </section>

    <!-- UiToolTip -->
    <section v-show="componentPreviewTab === 'ui-tooltip'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiToolTip</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: text — title — description — position — delay — disabled</p>

      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-3">1) الحالة البسيطة (text) مع جميع الاتجاهات</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiToolTip text="هذا تلميح علوي" position="top">
              <UiButton size="sm">Top</UiButton>
            </UiToolTip>
            <UiToolTip text="هذا تلميح يمين" position="right">
              <UiButton size="sm" variant="secondary">Right</UiButton>
            </UiToolTip>
            <UiToolTip text="هذا تلميح سفلي" position="bottom">
              <UiButton size="sm" variant="danger">Bottom</UiButton>
            </UiToolTip>
            <UiToolTip text="هذا تلميح يسار" position="left">
              <UiButton size="sm" variant="gray">Left</UiButton>
            </UiToolTip>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-3">2) الحالة التفصيلية (title + description) مع جميع الاتجاهات</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiToolTip
              position="top"
              title="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            >
              <UiButton size="sm" variant="primary">Detailed Top</UiButton>
            </UiToolTip>
            <UiToolTip
              position="right"
              title="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            >
              <UiButton size="sm" variant="secondary">Detailed Right</UiButton>
            </UiToolTip>
            <UiToolTip
              position="bottom"
              title="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            >
              <UiButton size="sm" variant="success">Detailed Bottom</UiButton>
            </UiToolTip>
            <UiToolTip
              position="left"
              title="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            >
              <UiButton size="sm" variant="gray">Detailed Left</UiButton>
            </UiToolTip>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-3">3) حالات إضافية: delay و disabled</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiToolTip text="يظهر بعد 600ms" :delay="600">
              <UiButton size="sm" variant="warning">Delay 600ms</UiButton>
            </UiToolTip>
            <UiToolTip text="لن يظهر لأن المكوّن disabled" disabled>
              <UiButton size="sm" variant="danger">Disabled Tooltip</UiButton>
            </UiToolTip>
            <UiToolTip
              title="تنبيه سريع"
              description="يمكنك تمرير title فقط، أو title مع description حسب الحاجة."
              position="top"
            >
              <UiButton size="sm" variant="secondary">Title + Description</UiButton>
            </UiToolTip>
          </div>
        </div>
      </div>
    </section>

    <!-- UiTabs -->
    <section v-show="componentPreviewTab === 'ui-tabs'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiTabs</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: tabs — v-model — change</p>
      <UiTabs v-model="activeTab" :tabs="tabsItems" @change="onTabChange">
        <template #default="{ activeKey }">
          <div class="rounded-lg border border-gray-200 p-4 text-sm text-gray-700 bg-gray-50">
            <p v-if="activeKey === 'overview'">محتوى تبويب الملخص.</p>
            <p v-else-if="activeKey === 'details'">محتوى تبويب التفاصيل.</p>
            <p v-else-if="activeKey === 'settings'">محتوى تبويب الإعدادات.</p>
          </div>
        </template>
      </UiTabs>
      <p class="text-xs text-gray-500 mt-2">التبويب النشط: {{ activeTab }}</p>
    </section>

    <!-- UiModal -->
    <section v-show="componentPreviewTab === 'ui-modal'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiModal</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: v-model — title — description — headerVariant — maxWidth — footer actions (cancel/confirm/extra)</p>
      <div class="flex flex-wrap gap-2">
        <UiButton @click="showDemoModal = true">فتح مودال افتراضي</UiButton>
        <UiButton variant="danger" @click="showDangerModal = true">فتح مودال تحذيري</UiButton>
      </div>
      <UiModal
        v-model="showDemoModal"
        title="تأكيد العملية"
        description="مودال افتراضي مع 3 أزرار قابلة للتخصيص."
        max-width="md"
        header-variant="primary"
        :show-extra-button="true"
        extra-button-text="حفظ كمسودة"
        :extra-button-icon="PlusIcon"
        cancel-button-text="إلغاء"
        :cancel-button-icon="XCircleIcon"
        confirm-button-text="تأكيد الحفظ"
        :confirm-button-icon="CheckCircleIcon"
        @confirm="onModalConfirm"
        @cancel="onModalCancel"
        @extra="onModalExtra"
      >
        <p class="text-sm text-gray-700">
          هل تريد حفظ التغييرات الحالية؟ يمكنك تجربة زر إضافي بدون إغلاق تلقائي.
        </p>
      </UiModal>

      <UiModal
        v-model="showDangerModal"
        title="حذف العنصر"
        description="هذا الإجراء لا يمكن التراجع عنه."
        max-width="sm"
        header-variant="danger"
        :show-extra-button="false"
        cancel-button-text="تراجع"
        confirm-button-text="حذف نهائي"
        confirm-button-variant="danger"
        :confirm-button-icon="TrashIcon"
        :close-on-backdrop="false"
        @confirm="onDangerConfirm"
        @cancel="onDangerCancel"
      >
        <p class="text-sm text-gray-700">
          عند التأكيد سيتم حذف البيانات بشكل دائم.
        </p>
      </UiModal>
    </section>

    <!-- UiToggleButton2 -->
    <section v-show="componentPreviewTab === 'ui-toggle-button-2'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiToggleButton2</h2>
      <p class="text-xs text-gray-500 mb-4">مطابق لنمط الصورة: سويتش + مجموعة خيارات مع أيقونات</p>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <UiToggleButton2 v-model="toggleSwitchA" size="sm" />
          <UiToggleButton2 v-model="toggleSwitchB" size="md" />
          <span class="text-xs text-gray-500">A: {{ toggleSwitchA }} | B: {{ toggleSwitchB }}</span>
        </div>
        <div class="rounded-xl border border-gray-200 p-4 max-w-xl">
          <p class="text-sm font-semibold text-gray-800 mb-3">Toggle Group</p>
          <UiToggleButton2 v-model="toggleViewMode" :options="toggleViewOptions" />
        </div>
      </div>
    </section>

    <!-- UiButton -->
    <section v-show="componentPreviewTab === 'ui-button'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiButton</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: variant — size — disabled — type — iconButton — iconButtonStyle (filled/plain) — icon — iconPosition — slot:icon</p>

      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 mb-2">الأنواع (variant) — حجم md</p>
          <div class="flex flex-wrap gap-2">
            <UiButton variant="primary">أساسي</UiButton>
            <UiButton variant="secondary">ثانوي</UiButton>
            <UiButton variant="success">نجاح</UiButton>
            <UiButton variant="warning">تحذير</UiButton>
            <UiButton variant="danger">حذف</UiButton>
            <UiButton variant="gray">رمادي</UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">الحجم (size=sm)</p>
          <div class="flex flex-wrap gap-2">
            <UiButton size="sm" variant="primary">أساسي</UiButton>
            <UiButton size="sm" variant="secondary">ثانوي</UiButton>
            <UiButton size="sm" variant="success">نجاح</UiButton>
            <UiButton size="sm" variant="warning">تحذير</UiButton>
            <UiButton size="sm" variant="danger">حذف</UiButton>
            <UiButton size="sm" variant="gray">رمادي</UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">معطل (disabled)</p>
          <div class="flex flex-wrap gap-2">
            <UiButton disabled>أساسي معطل</UiButton>
            <UiButton variant="danger" disabled>حذف معطل</UiButton>
            <UiButton variant="secondary" size="sm" disabled>ثانوي صغير معطل</UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">زر نص + أيقونة عبر slot:icon</p>
          <div class="flex flex-wrap gap-2">
            <UiButton variant="primary">
              <template #icon>
                <PlusIcon class="w-4 h-4" />
              </template>
              إضافة
            </UiButton>
            <UiButton variant="danger">
              <template #icon>
                <TrashIcon class="w-4 h-4" />
              </template>
              حذف
            </UiButton>
            <UiButton variant="success" size="sm">
              <template #icon>
                <CheckCircleIcon class="w-4 h-4" />
              </template>
              حفظ
            </UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">زر نص + أيقونة عبر icon prop (يسار/يمين)</p>
          <div class="flex flex-wrap gap-2">
            <UiButton variant="primary" :icon="PlusIcon">icon left</UiButton>
            <UiButton variant="secondary" :icon="ArrowPathIcon" icon-position="right">icon right</UiButton>
            <UiButton variant="gray" :icon="BellIcon" icon-size="md">icon size md</UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">IconButton — النمط المعبأ (filled)</p>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton variant="primary" :icon-button="true" title="إضافة">
              <template #icon>
                <PlusIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="warning" :icon-button="true" title="تعديل">
              <template #icon>
                <LockOpenIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="danger" :icon-button="true" title="حذف">
              <template #icon>
                <TrashIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="secondary" size="sm" :icon-button="true" title="مسح">
              <template #icon>
                <XCircleIcon class="w-4 h-4" />
              </template>
            </UiButton>
            <UiButton variant="gray" :icon-button="true" disabled title="معطل">
              <template #icon>
                <BellIcon class="w-5 h-5" />
              </template>
            </UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">IconButton — النمط الشفاف (plain: بدون border/background)</p>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton variant="primary" :icon-button="true" icon-button-style="plain" title="إضافة">
              <template #icon>
                <PlusIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="secondary" :icon-button="true" icon-button-style="plain" title="تنبيه">
              <template #icon>
                <BellIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="success" :icon-button="true" icon-button-style="plain" title="نجاح">
              <template #icon>
                <CheckCircleIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="warning" :icon-button="true" icon-button-style="plain" title="تحذير">
              <template #icon>
                <ExclamationTriangleIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="danger" :icon-button="true" icon-button-style="plain" title="حذف">
              <template #icon>
                <TrashIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="gray" :icon-button="true" icon-button-style="plain" title="معلومة">
              <template #icon>
                <InformationCircleIcon class="w-5 h-5" />
              </template>
            </UiButton>
            <UiButton variant="danger" size="sm" :icon-button="true" icon-button-style="plain" title="صغير">
              <template #icon>
                <XCircleIcon class="w-4 h-4" />
              </template>
            </UiButton>
            <UiButton variant="gray" :icon-button="true" icon-button-style="plain" disabled title="معطل">
              <template #icon>
                <LockClosedIcon class="w-5 h-5" />
              </template>
            </UiButton>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">حدث النقر</p>
          <UiButton variant="success" @click="onClickDemo">اضغط هنا</UiButton>
          <span v-if="clickCount > 0" class="mr-3 text-sm text-gray-700">عدد الضغطات: {{ clickCount }}</span>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">أنواع الزر (type)</p>
          <form class="flex flex-wrap items-center gap-2" @submit.prevent="onSubmitDemo" @reset.prevent="onResetDemo">
            <UiButton type="button" variant="secondary" @click="typeButtonCount++">Button</UiButton>
            <UiButton type="submit" variant="primary">Submit</UiButton>
            <UiButton type="reset" variant="gray">Reset</UiButton>
            <span class="text-xs text-gray-600">
              button: {{ typeButtonCount }} | submit: {{ submitCount }} | reset: {{ resetCount }}
            </span>
          </form>
        </div>
      </div>
    </section>

    <!-- UiInput -->
    <section v-show="componentPreviewTab === 'ui-input'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiInput</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: type — placeholder — size (sm/md) — disabled — readonly — error</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UiLabel>نص عادي</UiLabel>
          <UiInput v-model="form.text" placeholder="أدخل نصاً" />
          <p class="text-xs text-gray-500 mt-1">القيمة: {{ form.text || '—' }}</p>
        </div>
        <div>
          <UiLabel>رقم</UiLabel>
          <UiInput v-model="form.number" type="number" placeholder="0" />
        </div>
        <div>
          <UiLabel>بريد إلكتروني</UiLabel>
          <UiInput v-model="form.email" type="email" placeholder="name@example.com" />
        </div>
        <div>
          <UiLabel>كلمة المرور</UiLabel>
          <UiInput v-model="form.password" type="password" placeholder="••••••" />
        </div>
        <div>
          <UiLabel>صغير (size=sm)</UiLabel>
          <UiInput v-model="form.small" size="sm" placeholder="حقل صغير" />
        </div>
        <div>
          <UiLabel>معطل (disabled)</UiLabel>
          <UiInput model-value="قيمة ثابتة" disabled />
        </div>
        <div>
          <UiLabel>قراءة فقط (readonly)</UiLabel>
          <UiInput model-value="قيمة للقراءة فقط" readonly />
        </div>
        <div>
          <UiLabel>حالة الخطأ (error)</UiLabel>
          <UiInput v-model="form.errorField" placeholder="حقل به خطأ" error />
        </div>
      </div>
    </section>

    <!-- UiTextarea -->
    <section v-show="componentPreviewTab === 'ui-textarea'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiTextarea</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: placeholder — rows — size — disabled — readonly — error</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UiLabel>عادي (rows=3)</UiLabel>
          <UiTextarea v-model="form.notes" placeholder="اكتب ملاحظاتك..." />
        </div>
        <div>
          <UiLabel>سطور أكثر (rows=5)</UiLabel>
          <UiTextarea v-model="form.longNotes" :rows="5" placeholder="نص طويل..." />
        </div>
        <div>
          <UiLabel>صغير (size=sm)</UiLabel>
          <UiTextarea v-model="form.smallNotes" size="sm" placeholder="ملاحظة قصيرة" />
        </div>
        <div>
          <UiLabel>معطل</UiLabel>
          <UiTextarea model-value="نص ثابت معطل" disabled />
        </div>
        <div>
          <UiLabel>قراءة فقط</UiLabel>
          <UiTextarea model-value="نص للقراءة فقط" readonly />
        </div>
        <div>
          <UiLabel>خطأ</UiLabel>
          <UiTextarea v-model="form.errorNotes" placeholder="ملاحظة بها خطأ" error />
        </div>
      </div>
    </section>

    <!-- UiSelect -->
    <section v-show="componentPreviewTab === 'ui-select'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiSelect</h2>
      <p class="text-xs text-gray-500 mb-4">قائمة منسدلة أصلية — الخصائص: size — disabled — error</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UiLabel>عادي</UiLabel>
          <UiSelect v-model="form.select">
            <option value="">اختر...</option>
            <option value="1">الخيار الأول</option>
            <option value="2">الخيار الثاني</option>
            <option value="3">الخيار الثالث</option>
          </UiSelect>
          <p class="text-xs text-gray-500 mt-1">القيمة: {{ form.select || '—' }}</p>
        </div>
        <div>
          <UiLabel>صغير</UiLabel>
          <UiSelect v-model="form.selectSm" size="sm">
            <option value="a">أ</option>
            <option value="b">ب</option>
            <option value="c">ج</option>
          </UiSelect>
        </div>
        <div>
          <UiLabel>معطل</UiLabel>
          <UiSelect model-value="x" disabled>
            <option value="x">معطل</option>
          </UiSelect>
        </div>
        <div>
          <UiLabel>خطأ</UiLabel>
          <UiSelect v-model="form.selectErr" error>
            <option value="">اختر...</option>
            <option value="1">قيمة 1</option>
          </UiSelect>
        </div>
      </div>
    </section>

    <!-- UiCheckbox -->
    <section v-show="componentPreviewTab === 'ui-checkbox'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiCheckbox</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: modelValue — disabled — id — slot للنص</p>

      <div class="space-y-3">
        <UiCheckbox v-model="form.terms" id="cb-terms">أوافق على الشروط والأحكام</UiCheckbox>
        <UiCheckbox v-model="form.newsletter" id="cb-news">اشتراك في النشرة البريدية</UiCheckbox>
        <UiCheckbox :model-value="true" disabled id="cb-d1">معطل (محدد)</UiCheckbox>
        <UiCheckbox :model-value="false" disabled id="cb-d2">معطل (غير محدد)</UiCheckbox>
        <p class="text-xs text-gray-500">الموافقة: {{ form.terms ? 'نعم' : 'لا' }} — النشرة: {{ form.newsletter ? 'نعم' : 'لا' }}</p>
      </div>
    </section>

    <!-- UiLabel -->
    <section v-show="componentPreviewTab === 'ui-label'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiLabel</h2>
      <p class="text-xs text-gray-500 mb-4">الخصائص: forId — required — disabled</p>

      <div class="space-y-3">
        <div>
          <UiLabel>تسمية عادية</UiLabel>
          <UiInput placeholder="..." />
        </div>
        <div>
          <UiLabel required>تسمية إلزامية</UiLabel>
          <UiInput placeholder="..." />
        </div>
        <div>
          <UiLabel disabled>تسمية معطلة</UiLabel>
          <UiInput disabled placeholder="..." />
        </div>
      </div>
    </section>

    <!-- ComboBox -->
    <section v-show="componentPreviewTab === 'combo-box'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">ComboBox</h2>
      <p class="text-xs text-gray-500 mb-4">قائمة منسدلة مع بحث — الخصائص: options — placeholder — searchable — clearable — size — disabled</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UiLabel>عادي مع بحث</UiLabel>
          <ComboBox v-model="form.cb1" :options="comboOptions" placeholder="اختر دولة" />
          <p class="text-xs text-gray-500 mt-1">القيمة: {{ form.cb1 ?? '—' }}</p>
        </div>
        <div>
          <UiLabel>قابل للمسح (clearable)</UiLabel>
          <ComboBox v-model="form.cb2" :options="comboOptions" placeholder="اختر..." clearable />
        </div>
        <div>
          <UiLabel>صغير (size=sm)</UiLabel>
          <ComboBox v-model="form.cb3" :options="comboOptions" placeholder="..." size="sm" clearable />
        </div>
        <div>
          <UiLabel>بدون بحث (searchable=false)</UiLabel>
          <ComboBox v-model="form.cb4" :options="comboOptions" :searchable="false" placeholder="اختيار فقط" />
        </div>
        <div>
          <UiLabel>معطل</UiLabel>
          <ComboBox :model-value="1" :options="comboOptions" disabled />
        </div>
        <div>
          <UiLabel>قائمة طويلة</UiLabel>
          <ComboBox v-model="form.cb5" :options="longOptions" placeholder="ابحث في 50 عنصراً" clearable />
        </div>
      </div>
    </section>

    <!-- UiToggleButton -->
    <section v-show="componentPreviewTab === 'ui-toggle-button'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiToggleButton</h2>
      <p class="text-xs text-gray-500 mb-4">مفتاح تبديل (boolean) أو مجموعة خيارات — الخصائص: size — color — variant — onLabel/offLabel — onIcon/offIcon — knobOnIcon/knobOffIcon — options — disabled (الأيقونات الداخلية decorative افتراضياً)</p>

      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-2">سويتش بسيط</p>
          <div class="flex items-center gap-4">
            <UiToggleButton v-model="toggle1" />
            <span class="text-sm text-gray-500">القيمة: {{ toggle1 }}</span>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">سويتش مع نص ON / OFF</p>
          <div class="flex items-center gap-4">
            <UiToggleButton v-model="toggle2" on-label="ON" off-label="OFF" />
            <UiToggleButton :model-value="false" on-label="ON" off-label="OFF" />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">سويتش بأيقونة (variant=outline)</p>
          <div class="flex items-center gap-4">
            <UiToggleButton
              v-model="toggle3"
              variant="outline"
              :knob-on-icon="LockClosedIcon"
              :knob-off-icon="LockOpenIcon"
            />
            <span class="text-sm text-gray-500">{{ toggle3 ? 'مغلق' : 'مفتوح' }}</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">ملاحظة: أيقونات المفتاح هنا تُعرض للزينة داخل المكوّن، لذلك لا تحتاج label منفصل.</p>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">الأحجام</p>
          <div class="flex items-center gap-4">
            <UiToggleButton v-model="toggle4" size="sm" on-label="ON" off-label="OFF" />
            <UiToggleButton v-model="toggle4" size="md" on-label="ON" off-label="OFF" />
            <UiToggleButton v-model="toggle4" size="lg" on-label="ON" off-label="OFF" />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">الألوان</p>
          <div class="flex items-center gap-4">
            <UiToggleButton :model-value="true" color="primary" />
            <UiToggleButton :model-value="true" color="success" />
            <UiToggleButton :model-value="true" color="danger" />
            <UiToggleButton :model-value="true" color="gray" />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">معطل</p>
          <div class="flex items-center gap-4">
            <UiToggleButton :model-value="true" disabled />
            <UiToggleButton :model-value="false" disabled />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">مجموعة خيارات (options)</p>
          <div class="flex flex-col gap-3">
            <UiToggleButton v-model="toggleGroup1" :options="hotelOptions" />
            <UiToggleButton v-model="toggleGroup2" :options="planOptions" color="success" size="lg" />
            <UiToggleButton v-model="toggleGroup3" :options="modeOptions" color="gray" size="sm" />
            <p class="text-xs text-gray-500">المختار: {{ toggleGroup1 }} | {{ toggleGroup2 }} | {{ toggleGroup3 }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- UiScroll -->
    <section v-show="componentPreviewTab === 'ui-scroll'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">UiScroll</h2>
      <p class="text-xs text-gray-500 mb-4">حاوية تمرير مع شريط تمرير مخصص — الخصائص: maxHeight — height — maxWidth — horizontal — size (sm/md/lg)</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600 mb-2">تمرير عمودي (maxHeight=200px)</p>
          <UiScroll max-height="200px" class="border border-gray-200 rounded-lg p-3">
            <p v-for="i in 30" :key="i" class="text-sm text-gray-700 py-1 border-b border-gray-100">
              السطر رقم {{ i }} — محتوى تجريبي للتمرير العمودي
            </p>
          </UiScroll>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">تمرير أفقي (horizontal)</p>
          <UiScroll horizontal max-width="100%" class="border border-gray-200 rounded-lg p-3">
            <div class="flex gap-3 w-max">
              <div v-for="i in 20" :key="i" class="w-32 h-20 flex-shrink-0 bg-blue-100 text-blue-700 rounded flex items-center justify-center font-medium">
                بطاقة {{ i }}
              </div>
            </div>
          </UiScroll>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">شريط رفيع (size=sm)</p>
          <UiScroll size="sm" max-height="150px" class="border border-gray-200 rounded-lg p-3">
            <p v-for="i in 20" :key="i" class="text-sm text-gray-700 py-1">
              عنصر صغير {{ i }}
            </p>
          </UiScroll>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">شريط عريض (size=lg)</p>
          <UiScroll size="lg" max-height="150px" class="border border-gray-200 rounded-lg p-3">
            <p v-for="i in 20" :key="i" class="text-sm text-gray-700 py-1">
              عنصر كبير {{ i }}
            </p>
          </UiScroll>
        </div>
      </div>
    </section>

    <!-- ActionButtons -->
    <section v-show="componentPreviewTab === 'action-buttons'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">ActionButtons</h2>
      <p class="text-xs text-gray-500 mb-4">أزرار الإجراءات الموحدة (جديد / تعديل / حفظ / إلغاء / حذف ...)</p>
      <ActionButtons
        :is-view-mode="isViewMode"
        :selected-id="selectedId"
        @new="isViewMode = false; selectedId = null"
        @edit="isViewMode = false"
        @save="isViewMode = true"
        @cancel="isViewMode = true"
        @delete="selectedId = null"
      />
      <p class="text-xs text-gray-500 mt-3">الوضع: {{ isViewMode ? 'عرض' : 'تحرير' }} — العنصر المحدد: {{ selectedId ?? '—' }}</p>
    </section>

    <!-- DynamicTable -->
    <section v-show="componentPreviewTab === 'dynamic-table'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">DynamicTable</h2>
      <p class="text-xs text-gray-500 mb-4">جدول قابل للتحرير مع أعمدة متنوعة</p>
      <div class="mb-3">
        <UiCheckbox v-model="tableEditMode">وضع التحرير</UiCheckbox>
      </div>
      <DynamicTable
        v-model="tableRows"
        :columns="tableColumns"
        :is-view-mode="!tableEditMode"
        title="عناصر تجريبية"
        empty-text="لا توجد عناصر"
      />
    </section>

    <!-- ListSection -->
    <section v-show="componentPreviewTab === 'list-section'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">ListSection</h2>
      <p class="text-xs text-gray-500 mb-4">قائمة جانبية للاختيار من بين عناصر</p>
      <div class="h-72 border border-gray-200 rounded-lg overflow-hidden flex">
        <ListSection
          :items="listItems"
          :selected-item-id="listSelectedId"
          title="قائمة العملاء"
          @select-item="(id) => listSelectedId = id"
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">المختار: {{ listSelectedId ?? '—' }}</p>
    </section>

    <!-- MessageDialog & Toast -->
    <section v-show="componentPreviewTab === 'messages-toast'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">رسائل وإشعارات</h2>
      <p class="text-xs text-gray-500 mb-4">MessageDialog (عبر inject) و Toast (عبر useToast)</p>

      <div class="flex flex-wrap gap-2">
        <UiButton variant="primary" @click="showInfoDialog">رسالة معلومات</UiButton>
        <UiButton variant="warning" @click="showConfirmDialog">رسالة تأكيد</UiButton>
        <UiButton variant="success" @click="toast?.success('تمت العملية بنجاح')">إشعار نجاح</UiButton>
        <UiButton variant="danger" @click="toast?.error('حدث خطأ ما')">إشعار خطأ</UiButton>
        <UiButton variant="gray" @click="toast?.info('معلومة')">إشعار معلومات</UiButton>
        <UiButton variant="warning" @click="toast?.warning('انتبه!')">إشعار تحذير</UiButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import {
  PlusIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
  Squares2X2Icon,
  Bars3Icon,
  Cog6ToothIcon,
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  NoSymbolIcon,
  InformationCircleIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import { injectToast } from '~/composables/useToast'

definePageMeta({ layout: 'default' })

const toast = injectToast()
const showMessage = inject('showMessage', null)

const clickCount = ref(0)
const onClickDemo = () => clickCount.value++
const typeButtonCount = ref(0)
const submitCount = ref(0)
const resetCount = ref(0)
const onSubmitDemo = () => submitCount.value++
const onResetDemo = () => resetCount.value++

const form = ref({
  text: '',
  number: null,
  email: '',
  password: '',
  small: '',
  errorField: '',
  notes: '',
  longNotes: '',
  smallNotes: '',
  errorNotes: '',
  select: '',
  selectSm: 'a',
  selectErr: '',
  terms: false,
  newsletter: true,
  cb1: null,
  cb2: 2,
  cb3: null,
  cb4: null,
  cb5: null
})

const comboOptions = [
  { label: 'مصر', value: 1 },
  { label: 'السعودية', value: 2 },
  { label: 'الإمارات', value: 3 },
  { label: 'الأردن', value: 4 },
  { label: 'لبنان', value: 5 },
  { label: 'العراق', value: 6 },
  { label: 'الكويت', value: 7 },
  { label: 'قطر', value: 8 }
]

const longOptions = Array.from({ length: 50 }, (_, i) => ({
  label: `عنصر رقم ${i + 1}`,
  value: i + 1
}))

const isViewMode = ref(true)
const selectedId = ref(1)

const toggle1 = ref(false)
const toggle2 = ref(true)
const toggle3 = ref(true)
const toggle4 = ref(true)
const toggleGroup1 = ref('hotels')
const toggleGroup2 = ref('monthly')
const toggleGroup3 = ref('day')
const hotelOptions = [
  { label: 'فنادق', value: 'hotels' },
  { label: 'شقق', value: 'apartments' }
]
const planOptions = [
  { label: 'شهري', value: 'monthly' },
  { label: 'سنوي', value: 'yearly' }
]
const modeOptions = [
  { label: 'يوم', value: 'day' },
  { label: 'أسبوع', value: 'week' },
  { label: 'شهر', value: 'month' }
]

const showDemoModal = ref(false)
const showDangerModal = ref(false)
const componentPreviewTab = ref('ui-icon')
const componentTabs = [
  { key: 'ui-icon', label: 'UiIcon' },
  { key: 'ui-tooltip', label: 'UiToolTip' },
  { key: 'ui-scroll', label: 'UiScroll' },
  { key: 'ui-label', label: 'UiLabel' },
  { key: 'ui-badge', label: 'UiBadge' },
  { key: 'ui-button', label: 'UiButton' },
  { key: 'ui-checkbox', label: 'UiCheckbox' },
  { key: 'ui-input', label: 'UiInput' },
  { key: 'ui-textarea', label: 'UiTextarea' },
  { key: 'ui-select', label: 'UiSelect' },
  { key: 'ui-toggle-button', label: 'UiToggleButton' },
  { key: 'ui-toggle-button-2', label: 'UiToggleButton2' },
  { key: 'ui-tabs', label: 'UiTabs' },
  { key: 'ui-modal', label: 'UiModal' },
  { key: 'messages-toast', label: 'Messages & Toast' },
  { key: 'combo-box', label: 'ComboBox' },
  { key: 'action-buttons', label: 'ActionButtons' },
  { key: 'dynamic-table', label: 'DynamicTable' },
  { key: 'list-section', label: 'ListSection' },
]

const activeTab = ref('overview')
const tabsItems = [
  { key: 'overview', label: 'ملخص', icon: Squares2X2Icon },
  { key: 'details', label: 'تفاصيل', icon: Bars3Icon },
  { key: 'settings', label: 'إعدادات', icon: Cog6ToothIcon }
]

const toggleSwitchA = ref(false)
const toggleSwitchB = ref(true)
const toggleViewMode = ref('grid')
const toggleViewOptions = [
  { label: 'شبكي', value: 'grid', icon: Squares2X2Icon },
  { label: 'قائمة', value: 'list', icon: Bars3Icon },
  { label: 'ملخص', value: 'summary', icon: Cog6ToothIcon }
]

const tableEditMode = ref(false)
const tableColumns = [
  { field: 'name', label: 'الاسم', type: 'text' },
  { field: 'qty', label: 'الكمية', type: 'number' },
  { field: 'price', label: 'السعر', type: 'number' }
]
const tableRows = ref([
  { name: 'منتج أ', qty: 2, price: 100 },
  { name: 'منتج ب', qty: 5, price: 50 }
])

const listItems = [
  { no: 1, name: 'العميل الأول' },
  { no: 2, name: 'العميل الثاني' },
  { no: 3, name: 'العميل الثالث' },
  { no: 4, name: 'العميل الرابع' }
]
const listSelectedId = ref(1)

const showInfoDialog = () => {
  if (showMessage) {
    showMessage({ title: 'معلومة', message: 'هذه رسالة معلومات بسيطة.', type: 'info' })
  } else {
    toast?.info('MessageDialog غير متاح')
  }
}

const showConfirmDialog = () => {
  if (showMessage) {
    showMessage({
      title: 'تأكيد',
      message: 'هل أنت متأكد من المتابعة؟',
      type: 'warning',
      showCancel: true,
      onConfirm: () => toast?.success('تم التأكيد'),
      onCancel: () => toast?.info('تم الإلغاء')
    })
  } else {
    toast?.warning('MessageDialog غير متاح')
  }
}

const onTabChange = (value) => {
  toast?.info(`تم التبديل إلى: ${value}`)
}

const onModalConfirm = () => {
  toast?.success('تم تأكيد الحفظ')
}

const onModalCancel = () => {
  toast?.info('تم إلغاء العملية')
}

const onModalExtra = () => {
  toast?.info('تم حفظ المحتوى كمسودة')
}

const onDangerConfirm = () => {
  toast?.success('تم حذف العنصر')
}

const onDangerCancel = () => {
  toast?.warning('تم التراجع عن الحذف')
}
</script>
