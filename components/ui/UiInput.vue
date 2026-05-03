<template>
  <div class="relative">
    <input v-bind="$attrs" :id="id" :value="modelValue ?? ''" :type="type" :placeholder="placeholder"
      :disabled="disabled" :readonly="readonly" :class="[
        baseFieldClasses,
        inputSizeClasses(size),
        error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
        (error && errorMessage) ? 'pl-10' : '',
        $attrs.class || ''
      ]" @input="onInput" @change="$emit('change', $event)" />

    <div v-if="error && errorMessage" class="absolute left-2 inset-y-0 flex items-center">
      <UiToolTip :text="errorMessage">
        <span tabindex="0" class="inline-flex items-center">
          <UiIcon :icon="InformationCircleIcon" :size="size === 'sm' ? 'sm' : 'md'" tone="danger" :decorative="false" />
        </span>
      </UiToolTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from './UiIcon.vue'
import UiToolTip from './UiToolTip.vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    size?: UiSize
    id?: string
    error?: boolean
    errorMessage?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    size: 'md',
    error: false,
    errorMessage: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()


const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>
