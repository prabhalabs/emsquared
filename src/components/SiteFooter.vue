<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-7">
      <p class="text-sm text-muted">© {{ year }} Prabha Labs. All rights reserved.</p>
      <nav class="flex gap-5 text-sm">
        <router-link to="/privacy" class="text-muted hover:text-ink">Privacy Policy</router-link>
        <a href="mailto:bhanu.chander.00001@gmail.com" class="text-muted hover:text-ink">Contact</a>
      </nav>
    </div>
  </footer>
</template>
