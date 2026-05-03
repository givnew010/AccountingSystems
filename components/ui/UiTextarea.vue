<template>
  <div class="relative">
    <textarea
      v-bind="$attrs"
      :id="id"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :class="[
        baseFieldClasses,
        inputSizeClasses(size),
        'resize-none',
        error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
        (error && errorMessage) ? 'pl-10' : '',
        $attrs.class || ''
      ]"
      @input="onInput"
      @change="$emit('change', $event)"
    />

    <div v-if="error && errorMessage" class="absolute left-2 inset-y-0 flex items-center">
      <UiToolTip :text="errorMessage">
        <span tabindex="0" class="inline-flex items-center">
          <UiIcon :icon="InformationCircleIcon" :size="size === 'sm' ? 'sm' : 'md'" tone="danger" :decorative="false" :label="errorMessage" />
        </span>
      </UiToolTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'
import UiToolTip from './UiToolTip.vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    size?: UiSize
    id?: string
    rows?: number
    error?: boolean
    errorMessage?: string
  }>(),
  {
    placeholder: '',
    disabled: false,
    readonly: false,
    size: 'md',
    rows: 3,
    error: false,
    errorMessage: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>

