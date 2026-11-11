<script setup lang="ts">

import { ref } from 'vue'
import ProgressBar from './progress-bar.vue'

const currentStep = ref(1)
</script>

<template>
 	<h1 class="mt-4">Improve Your HTML for Accessibility</h1>
	<p>
		Upload an HTML file to find accessibility issues,
		view suggested corrections, and download the updated file.
	</p>

	<ProgressBar :currentStep="currentStep" />

</template>

