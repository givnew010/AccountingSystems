<template>
  <aside class="bg-white shadow-md p-2 w-[250px] lg:block h-screen flex flex-col">
    <div class="flex justify-between items-center mb-4 shrink-0">
      <h2 class="text-2xl font-semibold text-gray-700">{{ title }}</h2>
    </div>

    <div class="mb-1.5 space-y-1 shrink-0">
      <Input
        id="listSearchTerm"
        type="text"
        v-model="searchTerm"
        placeholder="ابحث..."
        :disabled="readOnly"
      />
      <div class="flex space-x-2 rtl:space-x-reverse">
        <ComboBox
          id="listFilterStatus"
          :modelValue="filterStatus"
          @update:modelValue="$emit('update:filterStatus', $event)"
          :options="filterOptions"
          class="w-full"
          :disabled="readOnly"
          :enableSearch="false"
        />
      </div>
      <!-- Record Navigation Buttons -->
      <div v-if="itemsToDisplay && itemsToDisplay.length > 0" class="mt-4 flex justify-between items-center">
        <button
          @click="navigatePrevious"
          :disabled="!canNavigatePreviousInternal || readOnly"
          :class="['p-1 rounded-md flex items-center text-sm text-gray-700', !canNavigatePreviousInternal || readOnly ? 'opacity-50' : 'hover:bg-gray-200']">
         <Icon name="heroicons:chevron-right-16-solid" class="w-7 h-7" />
          السابق
        </button>
        <span class="text-xs text-gray-500">
          {{ internalCurrentRecordIndex + 1 }} / {{ itemsToDisplay.length }}
        </span>
        <button
          @click="navigateNext"
          :disabled="!canNavigateNextInternal || readOnly"
          :class="['p-1 rounded-md flex items-center text-sm text-gray-700', !canNavigateNextInternal || readOnly ? 'opacity-50' : 'hover:bg-gray-200']">
          التالي
           <Icon name="heroicons:chevron-left-16-solid" class="w-7 h-7" />
        </button>
      </div>
    </div>
<!-- ListItem -->
      <Scrollbar class="flex-1 min-h-0 flex flex-col h-[72.5%]">
        <div v-if="itemsToDisplay && itemsToDisplay.length > 0" class="space-y-0.5">
          <div v-for="item in itemsToDisplay" :key="item.id"
              :ref="el => setItemRef(el, item.id)"
              @click="!readOnly && $emit('select-item', item.id)"
              :class="['py-1 px-2.5 rounded-md', readOnly ? 'cursor-default opacity-60' : 'cursor-pointer hover:bg-blue-100 transition-colors',
               selectedItemId === item.id ? 'bg-blue-200 border-l-4 border-blue-500' : 'bg-gray-50']">
            <div class="flex justify-between items-center">
              <div class="flex-grow min-w-0">
                <div class="flex items-baseline space-x-1 rtl:space-x-reverse truncate">
                  <span class="font-medium text-gray-800 text-sm shrink-0">{{ item.no + ' #' }}</span>
                  <span class="text-xs text-gray-600">{{ item.name }}</span>
                </div>
              </div>
              <span :class="['px-2 py-0.5 text-xs rounded-full whitespace-nowrap ml-2 shrink-0', itemStatusClass(item.status)]">
                {{ itemStatusText(item.status) }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-center py-4">لا توجد بيانات لعرضها.</p>
      </Scrollbar>
  </aside>
</template>

<script setup>
import { watch, toRefs, ref, computed } from 'vue';
// Assuming Input, Select, Scrollbar are auto-imported or correctly pathed
// import Input from '~/components/systemDesign/Input.vue';
// import Select from '~/components/systemDesign/Select.vue';
// import Scrollbar from '~/components/systemDesign/Scrollbar.vue';
const itemRefs = ref({});

function setItemRef(el, id) {
  if (el) {
    itemRefs.value[id] = el;
  }
}

const props = defineProps({
  title: String,
  // 'items' prop now receives the full (filtered and sorted) list from the parent
  items: { 
    type: Array,
    default: () => []
  }, 
  selectedItemId: [String, Number, null],
  // Search/filter/sort props remain, as parent still controls this for the list passed here
  filterStatus: String,
  // sortBy: String,
  readOnly: { type: Boolean, default: false },
});

const emit = defineEmits([
  'select-item', // This event is now also used for navigation
  // 'sort-items',  // If parent needs to re-sort the full list
  'update:filterStatus',
  // 'update:sortBy',
  // 'navigate-previous' and 'navigate-next' are handled internally now
]);

const searchTerm = ref('');

// Use a computed property for the items to display to ensure reactivity
const itemsToDisplay = computed(() => {
  let result = (props.items || []).slice();
  // فلترة البحث داخليًا
  if (searchTerm.value && searchTerm.value.trim() !== '') {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    result = result.filter(item =>
      (item.name || '').toLowerCase().includes(lowerSearchTerm) ||
      (item.id.toString() || '').toLowerCase().includes(lowerSearchTerm)
    );
  }
  // فلترة الحالة
  if (props.filterStatus && props.filterStatus !== 'all') {
    result = result.filter(item => item.status === props.filterStatus);
  }
  return result.reverse();
});

const internalCurrentRecordIndex = computed(() => {
  if (!props.selectedItemId || !itemsToDisplay.value) return -1;
  return itemsToDisplay.value.findIndex(item => item.id === props.selectedItemId);
});

const canNavigatePreviousInternal = computed(() => internalCurrentRecordIndex.value > 0);
const canNavigateNextInternal = computed(() => 
  internalCurrentRecordIndex.value !== -1 && 
  internalCurrentRecordIndex.value < (itemsToDisplay.value.length - 1)
);

const navigatePrevious = () => {
  if (canNavigatePreviousInternal.value) {
    const newIndex = internalCurrentRecordIndex.value - 1;
    if (itemsToDisplay.value[newIndex]) {
      emit('select-item', itemsToDisplay.value[newIndex].id);
    }
  }
};

const navigateNext = () => {
  if (canNavigateNextInternal.value) {
    const newIndex = internalCurrentRecordIndex.value + 1;
    if (itemsToDisplay.value[newIndex]) {
      emit('select-item', itemsToDisplay.value[newIndex].id);
    }
  }
};

const filterOptions = ref([
  { value: 'all', text: 'كل الحالات' },
  { value: 'paid', text: 'مدفوعة' },
  { value: 'unpaid', text: 'غير مدفوعة' },
  { value: 'draft', text: 'مسودة' },
  { value: 'active', text: 'نشط' },
]);

// const sortOptions = ref([
//   { value: 'invoiceDate', text: 'التاريخ' },
//   { value: 'invoiceNumber', text: 'الرقم' },
//   { value: 'netTotal', text: 'الإجمالي' },
//   { value: 'customerName', text: 'الاسم' },
// ]);

// Auto-select first item logic
watch(() => props.items, (newItems, oldItems) => {
  // Only auto-select if the list is new/changed and no item is currently selected by parent
  if (newItems && newItems.length > 0 && !props.selectedItemId) {
    const isInitialLoadOrDataRefreshed = !oldItems || oldItems.length === 0;
    const listContentChanged = JSON.stringify(newItems) !== JSON.stringify(oldItems);

    if (isInitialLoadOrDataRefreshed || listContentChanged) {
        emit('select-item', newItems[newItems.length - 1].id);
    }
  }
}, { immediate: true, deep: true }); // immediate true to try and select on initial load

const itemStatusText = (status) => {
  const statuses = {
    paid: 'مدفوعة', unpaid: 'غير مدفوعة', draft: 'مسودة',
    cancelled: 'ملغاة', active: 'نشط', 'معرّف': 'معرّف'
  };
  return statuses[status] || status;
};

const itemStatusClass = (status) => {
  const classes = {
    paid: 'bg-green-100 text-green-700', unpaid: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-200 text-gray-600', cancelled: 'bg-red-100 text-red-700',
    active: 'bg-blue-100 text-blue-700', 'معرّف': 'bg-indigo-100 text-indigo-700',
  };
  return classes[status] || 'bg-gray-100 text-gray-500';
};

watch(() => props.selectedItemId, async (newId) => {
  await nextTick(); // ننتظر تحديث DOM
  const el = itemRefs.value[newId];
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // أو 'start' حسب الرغبة
    });
  }
});

</script>
