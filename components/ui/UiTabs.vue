<template>
  <div class="w-full min-w-0" :style="containerStyle">
    <UiScroll
      horizontal
      :size="scrollSize"
      max-width="100%"
      class="w-full min-w-0 overflow-x-auto overflow-y-hidden"
    >
      <div
        role="tablist"
        :aria-label="ariaLabel || 'tabs'"
        class="inline-flex min-w-max items-center gap-1 border-b border-gray-200"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="isActive(tab.key) ? 'true' : 'false'"
          :disabled="!!tab.disabled"
          :class="[
            'px-3 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap',
            isActive(tab.key)
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50',
            tab.disabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          @click="selectTab(tab.key)"
        >
          <span class="inline-flex items-center gap-2">
            <UiIcon v-if="tab.icon" :icon="tab.icon" size="sm" decorative />
            {{ tab.label }}
          </span>
        </button>
      </div>
    </UiScroll>

    <div class="pt-4">
      <slot
        name="default"
        :active-key="activeKey"
        :active-tab="activeTab"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TabItem {
  key: string
  label: string
  disabled?: boolean
  icon?: any
}

const props = withDefaults(
  defineProps<{
    tabs: TabItem[]
    modelValue?: string
    ariaLabel?: string
    width?: string | number
    maxWidth?: string | number
    scrollSize?: 'sm' | 'md' | 'lg'
  }>(),
  {
    modelValue: '',
    ariaLabel: '',
    width: '',
    maxWidth: '',
    scrollSize: 'md'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const firstEnabledKey = computed(() => {
  const firstEnabled = props.tabs.find(t => !t.disabled)
  return firstEnabled?.key ?? ''
})

const activeKey = computed(() => {
  if (!props.tabs.length) return ''
  const hasCurrent = props.tabs.some(t => t.key === props.modelValue && !t.disabled)
  return hasCurrent ? (props.modelValue as string) : firstEnabledKey.value
})

const activeTab = computed(() => props.tabs.find(t => t.key === activeKey.value) ?? null)

const isActive = (key: string) => key === activeKey.value

const toCss = (v?: string | number) =>
  v == null || v === '' ? undefined : typeof v === 'number' ? `${v}px` : v

const containerStyle = computed(() => ({
  width: toCss(props.width) ?? '100%',
  maxWidth: toCss(props.maxWidth)
}))

const selectTab = (key: string) => {
  const tab = props.tabs.find(t => t.key === key)
  if (!tab || tab.disabled || key === activeKey.value) return
  emit('update:modelValue', key)
  emit('change', key)
}
</script>

