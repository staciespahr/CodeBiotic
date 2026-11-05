<script setup lang="ts">
import { wcagCriteria, type WCAGCriterion } from './wcag-criteria'

const criteria = wcagCriteria

function getRowClass(criterion: WCAGCriterion) {
  if (criterion.priority === 'High') {
    return 'high-priority-row'
  }
  else if (criterion.priority === 'Medium') {
    return 'medium-priority-row'
  }
  else if (criterion.priority === 'Low') {
    return 'not-included-row'
  }
}
</script>

<template>
  <table class="vpat-table">
    <thead>
      <tr>
        <th>Criteria</th>
        <th>Level</th>
        <th>Priority</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="criterion in criteria" :key="criterion.id" :class="getRowClass(criterion)">
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