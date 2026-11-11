<script setup lang="ts">

import { ref } from 'vue'
import ProgressBar from './progress-bar.vue'
import FileUpload from './file-upload.vue';

const currentStep = ref(1)

function handleFileSelected(file: File | null) {
  console.log('Selected file:', file?.name)
}

function handleStartAnalysis(file: File) {
  console.log('Starting analysis:', file.name)

  // Later, send the file to your FastAPI backend.
  currentStep.value = 2
}
</script>

<template>
 	<h1 class="mt-4">Improve Your HTML for Accessibility</h1>
	<p>
		Upload an HTML file to find accessibility issues,
		view suggested corrections, and download the updated file.
	</p>

	<ProgressBar :currentStep="currentStep" />

	<FileUpload
      @file-selected="handleFileSelected"
      @start-analysis="handleStartAnalysis"
    />

</template>

