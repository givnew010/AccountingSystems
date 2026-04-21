<template>
  <label
    :for="forId"
    :class="[
      'block text-sm font-medium text-gray-700 mb-1',
      disabled ? 'opacity-70' : ''
    ]"
  >
    <slot />
    <span v-if="required" class="text-red-600"> *</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    forId?: string
    required?: boolean
    disabled?: boolean
  }>(),
  {
    required: false,
    disabled: false
  }
)
</script>
