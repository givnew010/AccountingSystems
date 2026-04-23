<template>
  <div
    :class="[
      'fixed top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50 overflow-x-hidden',
      'hidden md:flex md:flex-col',
      sidebarStore.isCollapsed ? 'w-16' : 'w-64',
      'right-0'
    ]"
  >
    <!-- Header -->
    <div
      class="flex w-full items-center border-b border-gray-200 p-2 transition-all duration-300 ease-in-out"
    >
      <button
        type="button"
        @click="sidebarStore.toggleCollapse"
        :class="[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-50',
          sidebarStore.isCollapsed ? 'mx-auto' : 'ms-auto'
        ]"
      >
        <Bars3Icon
          v-if="sidebarStore.isCollapsed"
          class="h-6 w-6 text-gray-600 transition-opacity duration-300"
        />
        <XMarkIcon
          v-else
          class="h-6 w-6 text-gray-600 transition-opacity duration-300"
        />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav-scroll flex-1 min-h-0 px-2 py-4 overflow-y-auto overflow-x-hidden">
      <ul class="space-y-2">
        <li v-for="item in navigationStructure" :key="item.type === 'group' ? item.id : item.name">
          <!-- رابط عادي -->
          <template v-if="item.type === 'link'">
            <NuxtLink
              v-if="item.path !== '#'"
              :to="item.path"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden',
                'hover:bg-blue-50 hover:text-blue-600',
                route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              ]"
              @click="onNavigate"
            >
              <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
              <span
                :class="[
                  'text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
                  sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                ]"
              >
                {{ item.label }}
              </span>
            </NuxtLink>
            <button
              v-else
              type="button"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden text-right',
                'hover:bg-blue-50 hover:text-blue-600 text-gray-600'
              ]"
              @click="onNavigate"
            >
              <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
              <span
                :class="[
                  'text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
                  sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                ]"
              >
                {{ item.label }}
              </span>
            </button>
          </template>

          <!-- مجموعة dropdown -->
          <template v-else-if="item.type === 'group'">
            <div>
              <button
                type="button"
                :class="[
                  'flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden',
                  isGroupActive(item) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                ]"
                @click="onGroupClick(item)"
              >
                <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
                <span
                  :class="[
                    'min-w-0 flex-1 text-start text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
                    sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
                  ]"
                >
                  {{ item.label }}
                </span>
                <ChevronDownIcon
                  class="ms-auto h-4 w-4 flex-shrink-0 transition-transform duration-200"
                  :class="expandedGroups[item.id] ? 'rotate-180' : ''"
                />
              </button>
              <ul
                v-if="!sidebarStore.isCollapsed && expandedGroups[item.id]"
                class="mt-1 mr-2 space-y-1 border-r-2 border-gray-100 pr-3"
              >
                <li v-for="child in item.children" :key="child.name">
                  <NuxtLink
                    :to="child.path"
                    class="flex items-center gap-3 rounded-lg px-2 py-2 text-right text-sm font-medium transition-colors overflow-hidden"
                    :class="
                      route.path === child.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    "
                    @click="onNavigate"
                  >
                    <component :is="child.icon" class="w-5 h-5 flex-shrink-0" />
                    <span class="truncate">{{ child.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </template>
        </li>
      </ul>
    </nav>

    <!-- User Info -->
    <div class="border-t border-gray-200 p-4 overflow-x-hidden overflow-y-hidden flex-shrink-0">
      <!-- شريط مفتوح: نص + أفاتار + خروج في سطر واحد -->
      <div v-if="!sidebarStore.isCollapsed" class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
          <img
            :src="avatarSrc"
            alt="صورة المستخدم"
            class="h-10 w-10 min-h-10 min-w-10 flex-shrink-0 rounded-full border border-gray-200 object-cover"
          />
          <div class="min-w-0 flex-1 overflow-hidden transition-all duration-300">
            <p class="truncate text-sm font-medium text-gray-900">{{ authStore.user?.name || 'مستخدم' }}</p>
            <p class="truncate text-xs text-gray-500">{{ authStore.user?.role || 'بدون دور' }}</p>
          </div>
        </div>
        <button
          type="button"
          title="تسجيل الخروج"
          aria-label="تسجيل الخروج"
          class="flex shrink-0 items-center justify-center rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-600"
          @click="logout"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5" />
        </button>
      </div>

      <!-- شريط مغلق: أفاتار متوسط، ثم زر خروج يظهر بعد انتهاء انتقال العرض -->
      <div v-else class="flex flex-col items-center gap-2">
        <div class="flex w-full justify-center">
          <img
            :src="avatarSrc"
            alt="صورة المستخدم"
            class="h-10 w-10 min-h-10 min-w-10 rounded-full border border-gray-200 object-cover"
          />
        </div>
        <button
          v-if="showCompactLogout"
          type="button"
          title="تسجيل الخروج"
          aria-label="تسجيل الخروج"
          class="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-600"
          @click="logout"
        >
          <ArrowRightOnRectangleIcon class="h-6 w-6 flex-shrink-0" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  RectangleGroupIcon,
  BanknotesIcon,
  ChevronDownIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon,
  TagIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  CubeIcon,
  TruckIcon,
  ShoppingBagIcon,
  ArrowUturnLeftIcon,
  ShoppingCartIcon,
  BeakerIcon
} from '@heroicons/vue/24/outline'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const avatarSrc = computed(() => {
  const userName = authStore.user?.name?.trim() || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3b82f6&color=ffffff&bold=true`
})

const SIDEBAR_TRANSITION_MS = 300
const showCompactLogout = ref(false)
let compactLogoutTimer = null

watch(
  () => sidebarStore.isCollapsed,
  (collapsed) => {
    if (compactLogoutTimer) {
      clearTimeout(compactLogoutTimer)
      compactLogoutTimer = null
    }
    if (collapsed) {
      showCompactLogout.value = false
      compactLogoutTimer = setTimeout(() => {
        showCompactLogout.value = true
        compactLogoutTimer = null
      }, SIDEBAR_TRANSITION_MS)
    } else {
      showCompactLogout.value = false
    }
  }
)

onBeforeUnmount(() => {
  if (compactLogoutTimer) clearTimeout(compactLogoutTimer)
})

const navigationStructure = [
  { type: 'link', name: 'dashboard', path: '/', label: 'الصفحة الرئيسية', icon: HomeIcon },
  {
    type: 'group',
    id: 'basic',
    label: 'الواجهات الأساسية',
    icon: RectangleGroupIcon,
    children: [
      { name: 'branches', path: '/branches', label: 'الفروع', icon: BuildingStorefrontIcon },
      { name: 'warehouses', path: '/warehouses', label: 'المستودعات', icon: ArchiveBoxIcon },
      { name: 'categories', path: '/categories', label: 'التصنيفات', icon: TagIcon },
      { name: 'units', path: '/units', label: 'الواحدات', icon: ScaleIcon },
      { name: 'currencies', path: '/currencies', label: 'العملات', icon: CurrencyDollarIcon },
      { name: 'products', path: '/products', label: 'المنتجات', icon: CubeIcon },
      { name: 'customers', path: '/customers', label: 'العملاء', icon: UsersIcon },
      { name: 'suppliers', path: '/suppliers', label: 'الموردين', icon: TruckIcon }
    ]
  },
  {
    type: 'group',
    id: 'invoices',
    label: 'الفواتير',
    icon: BanknotesIcon,
    children: [
      { name: 'sales', path: '/sales', label: 'فأتورة المبيعات', icon: ShoppingBagIcon },
      { name: 'sales-return', path: '/sales-return', label: 'فأتورة مرتجع المبيعات', icon: ArrowUturnLeftIcon },
      { name: 'purchases', path: '/purchases', label: 'فأتورة المشتريات', icon: ShoppingCartIcon },
      { name: 'purchase-return', path: '/purchase-return', label: 'فأتورة مرتجع المشتريات', icon: ArrowUturnLeftIcon }
    ]
  },
  { type: 'link', name: 'reports', path: '/reports', label: 'التقارير', icon: ChartBarIcon },
  { type: 'link', name: 'users', path: '/users', label: 'المستخدمين', icon: UsersIcon },
  { type: 'link', name: 'settings', path: '#', label: 'الإعدادات', icon: Cog6ToothIcon },
  { type: 'link', name: 'test', path: '/test', label: 'التجريبة', icon: BeakerIcon }
]

const expandedGroups = ref({
  basic: false,
  invoices: false
})

function isGroupActive(group) {
  return group.children.some((c) => route.path === c.path)
}

function syncExpandedFromRoute() {
  const path = route.path
  const matchedGroup = navigationStructure.find(
    (item) => item.type === 'group' && item.children.some((c) => c.path === path)
  )

  Object.keys(expandedGroups.value).forEach((groupId) => {
    expandedGroups.value[groupId] = matchedGroup ? groupId === matchedGroup.id : false
  })
}

watch(() => route.path, syncExpandedFromRoute, { immediate: true })

function onGroupClick(group) {
  if (sidebarStore.isCollapsed) {
    sidebarStore.expandSidebar()
    Object.keys(expandedGroups.value).forEach((groupId) => {
      expandedGroups.value[groupId] = groupId === group.id
    })
  } else {
    const nextState = !expandedGroups.value[group.id]
    Object.keys(expandedGroups.value).forEach((groupId) => {
      expandedGroups.value[groupId] = false
    })
    expandedGroups.value[group.id] = nextState
  }
}

function onNavigate() {
  sidebarStore.collapseSidebar()
  sidebarStore.closeMobileMenu()
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar-nav-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar-nav-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
</style>
