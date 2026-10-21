// v-reveal: adds 'reveal' + toggles 'is-visible' once the element scrolls into view.
// Pairs with the .reveal / .reveal.is-visible rules in style.css.
export const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    el.__revealObserver = observer
  },
  unmounted(el) {
    el.__revealObserver?.disconnect()
  },
}
