<template>
  <aside class="p-2 my-2 mr-2 w-36 sm:w-48 md:w-60 lg:w-72 xl:w-80 bg-white rounded-lg h-full flex flex-col overflow-hidden flex-shrink-0"
    :class="{ 'opacity-50 pointer-events-none': disabled }">
    <!-- Header -->
    <div class="pt-4 pb-3 flex-shrink-0">
      <h1 class="text-2xl font-bold text-gray-900 mb-[18px] mr-2">{{ title }}</h1>

      <!-- Search -->
      <div class="mb-1.5">
        <input v-model="searchQuery" type="text" :placeholder="searchPlaceholder" :disabled="disabled"
          class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
      </div>

      <!-- Filter -->
      <div class="mb-1.5" v-if="showStatusFilter">
        <select v-model="statusFilter" :disabled="disabled"
          class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      <!-- Record Navigation Buttons -->
      <div v-if="paginatedItems && paginatedItems.length > 0" class="flex justify-between items-center">
        <button @click="navigatePrevious" :disabled="!canNavigatePreviousInternal || disabled"
          :class="['p-1 rounded-md flex items-center text-sm text-gray-700', !canNavigatePreviousInternal || disabled ? 'opacity-50' : 'hover:bg-gray-200']">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          السابق
        </button>
        <span class="text-xs text-gray-500">
          {{ internalCurrentRecordIndex + 1 }} / {{ paginatedItems.length }}
        </span>
        <button @click="navigateNext" :disabled="!canNavigateNextInternal || disabled"
          :class="['p-1 rounded-md flex items-center text-sm text-gray-700', !canNavigateNextInternal || disabled ? 'opacity-50' : 'hover:bg-gray-200']">
          التالي
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- ListItem -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="paginatedItems.length > 0" class="space-y-0.5 pb-3">
        <div v-for="item in paginatedItems" :key="item.id" :ref="el => setItemRef(el, item.id)"
          @click="onItemClick(item)" class="cursor-pointer hover:bg-blue-100 rounded-md p-2.5 transition-colors" :class="{
            'bg-blue-200': selectedItemId && selectedItemId === item.id,
            'bg-gray-50': !selectedItemId || selectedItemId !== item.id
          }">
          <div class="flex justify-between items-center">
            <div class="flex-grow min-w-0">
              <div class="flex items-baseline space-x-1 rtl:space-x-reverse truncate">
                <span class="font-medium text-gray-800 text-sm shrink-0">{{ item.no + ' #' }}</span>
                <span class="text-xs text-gray-600">{{ item.name }}</span>
              </div>
            </div>
            <span v-if="item.status"
              :class="['px-2 py-0.5 text-xs rounded-full whitespace-nowrap ml-2 shrink-0', itemStatusClass(item.status)]">
              {{ itemStatusText(item.status) }}
            </span>
          </div>
        </div>
      </div>
      <!-- Empty State -->
      <div v-if="paginatedItems.length === 0" class="text-center py-8 text-gray-500">
        لا توجد بيانات متاحة
      </div>
    </div>


  </aside>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const itemRefs = ref({});

function setItemRef(el, id) {
  if (el) {
    itemRefs.value[id] = el;
  }
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  searchPlaceholder: {
    type: String,
    default: 'البحث...'
  },
  showStatusFilter: {
    type: Boolean,
    default: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selectedItemId: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['select-item'])

const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)

// Filtered items based on search and status
const filteredItems = computed(() => {
  let filtered = props.items.reverse()

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(item => item.status === statusFilter.value)
  }

  return filtered
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / props.itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return filteredItems.value.slice(start, end)
})

// Navigation
const internalCurrentRecordIndex = computed(() => {
  if (!props.selectedItemId || !paginatedItems.value) return -1;
  return paginatedItems.value.findIndex(item => item.id === props.selectedItemId);
});

const canNavigatePreviousInternal = computed(() => internalCurrentRecordIndex.value > 0);
const canNavigateNextInternal = computed(() =>
  internalCurrentRecordIndex.value !== -1 &&
  internalCurrentRecordIndex.value < (paginatedItems.value.length - 1)
);

// Reset to first page when filters change
const resetPagination = () => {
  currentPage.value = 1
}

// Watch for selectedItemId to scroll into view
watch(() => props.selectedItemId, async (newId) => {
  await nextTick(); // Wait for DOM update
  const el = itemRefs.value[newId];
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
});

// Navigation methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const onItemClick = (item) => {
  if (!props.disabled) {
    emit('select-item', item.id)
  }
}

const navigatePrevious = () => {
  if (canNavigatePreviousInternal.value) {
    const newIndex = internalCurrentRecordIndex.value - 1;
    if (paginatedItems.value[newIndex]) {
      emit('select-item', paginatedItems.value[newIndex].id);
    }
  }
};

const navigateNext = () => {
  if (canNavigateNextInternal.value) {
    const newIndex = internalCurrentRecordIndex.value + 1;
    if (paginatedItems.value[newIndex]) {
      emit('select-item', paginatedItems.value[newIndex].id);
    }
  }
};

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR'
  }).format(amount || 0)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ar-SA')
}

const itemStatusText = (status) => {
  const statuses = {
    paid: 'مدفوعة', unpaid: 'غير مدفوعة', draft: 'مسودة',
    cancelled: 'ملغاة', active: 'نشط', inactive: 'غير نشط'
  };
  return statuses[status] || status;
};

const itemStatusClass = (status) => {
  const classes = {
    paid: 'bg-green-100 text-green-700', unpaid: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-200 text-gray-600', cancelled: 'bg-red-100 text-red-700',
    active: 'bg-blue-100 text-blue-700', inactive: 'bg-red-100 text-red-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-500';
};
</script>