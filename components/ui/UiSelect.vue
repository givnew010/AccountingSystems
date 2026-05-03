<template>
  <div class="relative">
    <select v-bind="$attrs" :id="id" :value="modelValue ?? ''" :disabled="disabled" :class="[
      baseFieldClasses,
      inputSizeClasses(size),
      'appearance-none cursor-pointer',
      (error && errorMessage) ? 'pl-10' : '',
      error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
      $attrs.class || ''
    ]" @change="onChange">
      <slot />
    </select>

    <div class="absolute inset-y-0 flex items-center left-3 gap-2">
      <div v-if="error && errorMessage" class="flex items-center">
        <UiToolTip :text="errorMessage">
          <span tabindex="0">
            <UiIcon :icon="InformationCircleIcon" :size="inputSizeClasses(size)" tone="danger" :decorative="false" />
          </span>
        </UiToolTip>
      </div>

      <span :class="['pointer-events-none']">
        <UiIcon :icon="trailingIcon" :size="inputSizeClasses(size)" tone="muted" decorative />
      </span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import UiIcon from './UiIcon.vue'
import UiToolTip from './UiToolTip.vue'
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    disabled?: boolean
    size?: UiSize
    id?: string
    error?: boolean
    trailingIcon?: any
    errorMessage?: string
  }>(),
  {
    disabled: false,
    size: 'md',
    error: false,
    trailingIcon: ChevronDownIcon,
    errorMessage: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

// const isRtl = computed(() => {
//   if (typeof document === 'undefined') return false
//   return document.documentElement.dir === 'rtl'
// })

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement | null
  emit('update:modelValue', target?.value ?? '')
  emit('change', e)
}
</script>
