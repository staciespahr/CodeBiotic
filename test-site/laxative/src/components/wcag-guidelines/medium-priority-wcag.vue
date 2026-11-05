<script setup lang="ts">
import { wcagCriteria } from './wcag-criteria'

const criteria = wcagCriteria.filter((c) => c.priority === 'Medium')

</script>

<template>
  <table class="vpat-table">
    <thead>
      <tr class="medium-priority-row">
        <th>Criteria</th>
        <th>Level</th>
        <th>Priority</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="criterion in criteria" :key="criterion.id">
        <td>
          <a
            :href="`https://www.w3.org/WAI/WCAG22/Understanding/${criterion.slug}.html`"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ criterion.id }} {{ criterion.name }}
          </a>
        </td>
        <td>{{ criterion.level }}</td>
        <td>{{ criterion.priority }}</td>
      </tr>
    </tbody>
  </table>
</template>