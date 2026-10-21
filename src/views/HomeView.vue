<script setup>
import AppButton from '../components/AppButton.vue'

const playStoreUrl = '[Google Play URL]'
const playStoreReady = playStoreUrl !== '[Google Play URL]'

const features = [
  {
    title: 'Play',
    body: 'Pass the phone for local two-player games, or challenge the built-in Stockfish-powered AI at a difficulty tuned to you. No matchmaking queue, no signup.',
  },
  {
    title: 'Learn',
    body: 'Dozens of interactive lessons — piece movement, special rules like castling and en passant, tactical motifs such as forks and pins, and classic endgame technique. You play every position, not watch a video.',
  },
  {
    title: 'Analyze',
    body: 'Branch into variations from any position and ask a real engine what it thinks, or run a finished game through engine-assisted review to find your blunders, mistakes, and missed wins.',
  },
  {
    title: 'Your games',
    body: 'Resume an in-progress game or revisit any finished one from your history — saved privately, only on your device.',
  },
]
</script>

<template>
  <div>
    <section class="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
      <div v-reveal class="max-w-2xl">
        <p class="text-[12.5px] font-bold uppercase tracking-[0.14em] text-primary">
          Every move matters
        </p>
        <h1 class="mt-3.5 font-display text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] text-ink">
          A cinematic chess app for players who actually want to get better.
        </h1>
        <p class="mt-5 max-w-xl text-lg text-muted">
          EM² Chess pairs a hand-crafted board with a real chess engine, interactive
          lessons, and tools built for analysis — not just play. No account, no ads,
          no internet connection required.
        </p>
        <div class="mt-8 flex flex-wrap gap-3.5">
          <AppButton :href="playStoreUrl" :disabled="!playStoreReady">
            Get it on Google Play →
          </AppButton>
          <AppButton to="/privacy" variant="secondary">
            Read the privacy policy →
          </AppButton>
        </div>
        <p class="mt-4 text-[13.5px] text-muted-dim">
          Coming soon to Google Play — this listing will link here once published.
        </p>
      </div>
    </section>

    <section class="border-t border-border bg-card py-20">
      <div class="mx-auto max-w-5xl px-6">
        <div v-reveal>
          <h2 class="font-display text-[clamp(26px,4vw,36px)] font-bold text-ink">
            Everything you need, nothing you don't
          </h2>
          <p class="mt-3 max-w-md text-[17px] text-muted">
            Four ways to spend time with the board, all available the moment you
            open the app.
          </p>
        </div>

        <div class="mt-11 grid gap-5 sm:grid-cols-2">
          <article
            v-for="(feature, i) in features"
            :key="feature.title"
            v-reveal
            :style="{ transitionDelay: `${i * 70}ms` }"
            class="rounded-xl border border-border bg-background p-7"
          >
            <h3 class="font-display text-[19px] font-semibold text-primary">
              {{ feature.title }}
            </h3>
            <p class="mt-2.5 text-[15px] text-muted">{{ feature.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-ink py-20 sm:py-24">
      <div class="mx-auto max-w-5xl px-6">
        <div v-reveal class="max-w-2xl">
          <p class="text-[12.5px] font-bold uppercase tracking-[0.14em] text-secondary">
            Why EM²
          </p>
          <h2 class="mt-3 font-display text-[clamp(24px,3.4vw,30px)] font-bold text-ivory">
            Built offline-first, on purpose
          </h2>
          <p class="mt-4 text-[16px] text-ivory/75">
            EM² Chess doesn't request internet access and runs its chess engine
            entirely on your device. Online multiplayer and friend challenges are
            on the roadmap — those screens exist in the app today, clearly marked
            "coming soon" — and will always be optional when they ship.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
