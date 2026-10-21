<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' }, // 'primary' | 'secondary'
  disabled: { type: Boolean, default: false },
  target: { type: String, default: null },
})

const tag = computed(() => {
  if (props.disabled) return 'span'
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const bindAttrs = computed(() => {
  if (props.disabled) return {}
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: props.target, rel: props.target === '_blank' ? 'noopener noreferrer' : undefined }
  return { type: 'button' }
})

const variantClass = computed(() => {
  if (props.disabled) return 'cursor-not-allowed bg-disabled text-disabled-ink'
  return props.variant === 'secondary'
    ? 'border border-border bg-card text-ink hover:border-primary/40 hover:bg-secondary-soft'
    : 'bg-primary text-ivory hover:bg-primary-hover'
})

const rippleRef = ref(null)
let rippleTimer = null

function handleClick(event) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  const el = rippleRef.value
  if (!el) return
  const rect = event.currentTarget.getBoundingClientRect()
  el.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)
  el.classList.remove('is-active')
  // eslint-disable-next-line no-unused-expressions
  el.offsetWidth // force reflow so the animation restarts
  el.classList.add('is-active')
  clearTimeout(rippleTimer)
  rippleTimer = setTimeout(() => el.classList.remove('is-active'), 650)
}
</script>

<template>
  <component
    :is="tag"
    v-bind="bindAttrs"
    class="relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-[15px] font-semibold transition-colors duration-150"
    :class="variantClass"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="!disabled"
      ref="rippleRef"
      class="ripple"
      :class="variant === 'secondary' ? 'text-primary' : 'text-ivory'"
    />
  </component>
</template>
