<template>
  <div
    :class="[
      'ui-scroll',
      horizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden',
      `ui-scroll--${size}`,
      $attrs.class || ''
    ]"
    :style="containerStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type ScrollSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    maxHeight?: string | number
    height?: string | number
    maxWidth?: string | number
    horizontal?: boolean
    size?: ScrollSize
  }>(),
  {
    horizontal: false,
    size: 'md'
  }
)

const toCss = (v?: string | number) =>
  v == null ? undefined : typeof v === 'number' ? `${v}px` : v

const containerStyle = computed(() => ({
  maxHeight: toCss(props.maxHeight),
  height: toCss(props.height),
  maxWidth: toCss(props.maxWidth)
}))
</script>

<style scoped>
.ui-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.ui-scroll--sm { scrollbar-width: thin; }
.ui-scroll--md { scrollbar-width: thin; }
.ui-scroll--lg { scrollbar-width: auto; }

.ui-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.ui-scroll--sm::-webkit-scrollbar { width: 6px; height: 6px; }
.ui-scroll--lg::-webkit-scrollbar { width: 12px; height: 12px; }

.ui-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.ui-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.ui-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
  background-clip: content-box;
}
.ui-scroll::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
