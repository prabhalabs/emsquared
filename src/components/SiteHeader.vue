<script setup>
import { ref } from 'vue'

const open = ref(false)
const logoSrc = `${import.meta.env.BASE_URL}logo-480.png`
</script>

<template>
  <header class="glass sticky top-0 z-20">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
      <router-link to="/" class="flex items-center gap-2.5" @click="open = false">
        <img :src="logoSrc" alt="" width="36" height="24" class="h-9 w-auto" />
        <span class="font-display text-[17px] font-semibold text-ink">EM Squared Chess</span>
      </router-link>

      <button
        type="button"
        class="flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
        :aria-expanded="open"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span class="block h-0.5 w-5 rounded-full bg-ink" />
        <span class="block h-0.5 w-5 rounded-full bg-ink" />
        <span class="block h-0.5 w-5 rounded-full bg-ink" />
      </button>

      <nav
        class="absolute left-0 right-0 top-full flex-col items-start gap-0 overflow-hidden border-b border-border bg-card transition-[max-height] duration-200 sm:static sm:flex sm:flex-row sm:items-center sm:gap-7 sm:overflow-visible sm:border-0 sm:bg-transparent"
        :class="open ? 'flex max-h-52' : 'hidden max-h-0 sm:flex'"
      >
        <router-link
          to="/"
          class="w-full border-t border-border px-6 py-3.5 text-[14.5px] font-medium text-muted hover:text-ink sm:w-auto sm:border-0 sm:p-0"
          active-class="text-primary"
          @click="open = false"
        >
          Home
        </router-link>
        <router-link
          to="/privacy"
          class="w-full border-t border-border px-6 py-3.5 text-[14.5px] font-medium text-muted hover:text-ink sm:w-auto sm:border-0 sm:p-0"
          active-class="text-primary"
          @click="open = false"
        >
          Privacy Policy
        </router-link>
      </nav>
    </div>
  </header>
</template>
