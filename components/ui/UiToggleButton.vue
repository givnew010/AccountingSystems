<template>
  <!-- Group mode: multiple options -->
  <div
    v-if="options && options.length"
    :class="[
      'inline-flex items-center rounded-full p-1 select-none',
      sizeClasses.group,
      disabled ? 'opacity-60 cursor-not-allowed' : '',
      colorClasses.groupBg
    ]"
    role="group"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :disabled="disabled"
      @click="selectOption(opt.value)"
      :class="[
        'rounded-full font-medium transition-colors whitespace-nowrap',
        sizeClasses.groupBtn,
        modelValue === opt.value
          ? colorClasses.groupActive
          : colorClasses.groupInactive,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      ]"
    >
      {{ opt.label }}
    </button>
  </div>

  <!-- Switch mode: boolean -->
  <button
    v-else
    type="button"
    role="switch"
    :aria-checked="!!modelValue"
    :disabled="disabled"
    @click="toggle"
    :class="[
      'relative inline-flex items-center rounded-full transition-colors flex-shrink-0',
      sizeClasses.track,
      modelValue ? colorClasses.trackOn : colorClasses.trackOff,
      variant === 'outline' && !modelValue ? 'border-2 ' + colorClasses.outlineOff : '',
      variant === 'outline' && modelValue ? 'border-2 ' + colorClasses.outlineOn : '',
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <!-- Off label/icon (visible when ON, on the right side of the track) -->
    <span
      v-if="modelValue && (onLabel || onIcon)"
      :class="['absolute font-bold', sizeClasses.label, colorClasses.labelOn, isRtl ? 'right-3' : 'left-3']"
    >
      <UiIcon v-if="onIcon" :icon="onIcon" :size="iconSize" decorative />
      <template v-else>{{ onLabel }}</template>
    </span>
    <span
      v-if="!modelValue && (offLabel || offIcon)"
      :class="['absolute font-bold', sizeClasses.label, colorClasses.labelOff, isRtl ? 'left-3' : 'right-3']"
    >
      <UiIcon v-if="offIcon" :icon="offIcon" :size="iconSize" decorative />
      <template v-else>{{ offLabel }}</template>
    </span>

    <!-- Knob -->
    <span
      :class="[
        'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-all flex items-center justify-center',
        sizeClasses.knob,
        modelValue ? sizeClasses.knobOn : sizeClasses.knobOff
      ]"
    >
      <UiIcon
        v-if="modelValue && knobOnIcon"
        :icon="knobOnIcon"
        :size="iconSize"
        :class="colorClasses.knobIcon"
        decorative
      />
      <UiIcon
        v-else-if="!modelValue && knobOffIcon"
        :icon="knobOffIcon"
        :size="iconSize"
        :class="colorClasses.knobIcon"
        decorative
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

type Size = 'sm' | 'md' | 'lg'
type Color = 'primary' | 'success' | 'danger' | 'gray'
type Variant = 'solid' | 'outline'
interface Option { label: string; value: any }

const props = withDefaults(
  defineProps<{
    modelValue?: any
    options?: Option[]
    onLabel?: string
    offLabel?: string
    onIcon?: Component
    offIcon?: Component
    knobOnIcon?: Component
    knobOffIcon?: Component
    size?: Size
    color?: Color
    variant?: Variant
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    size: 'md',
    color: 'primary',
    variant: 'solid',
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
}>()

const isRtl = computed(() => {
  if (typeof document === 'undefined') return false
  return document.documentElement.dir === 'rtl'
})

const toggle = () => {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}

const selectOption = (value: any) => {
  if (props.disabled) return
  emit('update:modelValue', value)
  emit('change', value)
}

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'xs'
    case 'lg': return 'sm'
    case 'md':
    default: return 'sm'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        track: 'h-6 w-12',
        knob: 'w-5 h-5',
        knobOn: 'left-0.5',
        knobOff: 'right-0.5',
        label: 'text-[10px]',
        group: 'text-xs',
        groupBtn: 'px-3 py-1'
      }
    case 'lg':
      return {
        track: 'h-9 w-20',
        knob: 'w-7 h-7',
        knobOn: 'left-1',
        knobOff: 'right-1',
        label: 'text-sm',
        group: 'text-base',
        groupBtn: 'px-6 py-2'
      }
    case 'md':
    default:
      return {
        track: 'h-8 w-16',
        knob: 'w-6 h-6',
        knobOn: 'left-1',
        knobOff: 'right-1',
        label: 'text-xs',
        group: 'text-sm',
        groupBtn: 'px-5 py-1.5'
      }
  }
})

const colorClasses = computed(() => {
  const base = {
    primary: {
      trackOn: 'bg-purple-600',
      trackOff: 'bg-gray-200',
      outlineOn: 'border-purple-600 bg-purple-600',
      outlineOff: 'border-gray-300 bg-gray-100',
      labelOn: 'text-white',
      labelOff: 'text-gray-500',
      knobIcon: 'text-purple-600',
      groupBg: 'bg-purple-600',
      groupActive: 'bg-white text-purple-700',
      groupInactive: 'bg-transparent text-white hover:bg-white/10'
    },
    success: {
      trackOn: 'bg-green-600',
      trackOff: 'bg-gray-200',
      outlineOn: 'border-green-600 bg-green-600',
      outlineOff: 'border-gray-300 bg-gray-100',
      labelOn: 'text-white',
      labelOff: 'text-gray-500',
      knobIcon: 'text-green-600',
      groupBg: 'bg-green-600',
      groupActive: 'bg-white text-green-700',
      groupInactive: 'bg-transparent text-white hover:bg-white/10'
    },
    danger: {
      trackOn: 'bg-red-600',
      trackOff: 'bg-gray-200',
      outlineOn: 'border-red-600 bg-red-600',
      outlineOff: 'border-gray-300 bg-gray-100',
      labelOn: 'text-white',
      labelOff: 'text-gray-500',
      knobIcon: 'text-red-600',
      groupBg: 'bg-red-600',
      groupActive: 'bg-white text-red-700',
      groupInactive: 'bg-transparent text-white hover:bg-white/10'
    },
    gray: {
      trackOn: 'bg-gray-700',
      trackOff: 'bg-gray-200',
      outlineOn: 'border-gray-700 bg-gray-700',
      outlineOff: 'border-gray-300 bg-gray-100',
      labelOn: 'text-white',
      labelOff: 'text-gray-500',
      knobIcon: 'text-gray-700',
      groupBg: 'bg-gray-700',
      groupActive: 'bg-white text-gray-800',
      groupInactive: 'bg-transparent text-white hover:bg-white/10'
    }
  }
  return base[props.color]
})
</script>
