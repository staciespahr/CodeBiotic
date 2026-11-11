
<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const isDarkMode = ref(false)

watch(
  isDarkMode,
  (darkMode) => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      darkMode ? 'dark' : 'light'
    )
  },
  { immediate: true }
)
</script>

<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid px-4">

      <!-- Logo -->
      <RouterLink class="navbar-brand fw-bold" to="/">
        Code<span class="text-primary">Biotic</span>
      </RouterLink>

      <!-- Mobile Menu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Content -->
      <div
        id="navbarContent"
        class="collapse navbar-collapse"
      >
        <!-- Center Links -->
        <ul class="navbar-nav mx-auto gap-lg-4">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">
              About
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/help">
              Help
            </RouterLink>
          </li>
        </ul>

        <!-- Theme Toggle -->
        <div class="d-flex align-items-center gap-2">
          <span	class="theme-icon" aria-hidden="true" style="font-size: 2rem;">☀︎</span>

          <div class="form-check form-switch m-0">
            <input
              id="themeToggle"
              v-model="isDarkMode"
              class="form-check-input"
              type="checkbox"
              role="switch"
              aria-label="Dark mode"
            />
          </div>

          <span class="theme-icon" aria-hidden="true" style="font-size: 1.5rem;">☾</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 15px 20px;
}

.navbar-brand {
  font-size: 2rem;
  letter-spacing: -1px;
}

.nav-link {
  padding: 8px 24px !important;
  border-radius: 8px;
  text-align: center;
}

.nav-link.router-link-exact-active {
  background-color: rgba(89, 70, 245, 0.1);
  color: #5946f5;
  font-weight: 600;
}

.form-check-input {
  cursor: pointer;
  width: 3rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #5946f5;
  border-color: #5946f5;
}

.theme-icon {
  color: var(--bs-body-color);
}
</style>
