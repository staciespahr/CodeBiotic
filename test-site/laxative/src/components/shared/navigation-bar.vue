<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const theme = ref<'light' | 'dark'>('light')
const isButtonsPage = computed(() => route.path === '/buttons')

watch(
  theme,
  (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  },
  { immediate: true }
)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar-container">
      <div class="navbar-brand">
        <a href="/">&#x1F48A CodeBiotic</a>
      </div>

      <div class="navbar-links" :class="{ 'buttons-page-links': isButtonsPage }">
        <a href="/wcag-guidelines">WCAG Guidelines</a>
        <a href="/application">Application</a>
        <a href="/buttons">Buttons</a>
        <a href="/tables">Tables</a>

        <button
          type="button"
          class="theme-switch"
          role="switch"
          :aria-checked="theme === 'dark'"
          :aria-label="`Dark mode: ${theme === 'dark' ? 'on' : 'off'}`"
          @click="toggleTheme"
        >
          <span class="theme-icon" aria-hidden="true">☀</span>

          <span class="switch-track">
            <span class="switch-thumb"></span>
          </span>

          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </div>
  </nav>
</template>