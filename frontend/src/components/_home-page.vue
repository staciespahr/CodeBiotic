<script setup lang="ts">
import { ref } from 'vue'
import ProgressBar from './progress-bar.vue'
import FileUpload from './file-upload.vue'
import AnalysisProgress from './analysis-progress.vue'

const currentStep = ref(1)
const selectedFile = ref<File | null>(null)

function handleFileSelected(file: File | null) {
  selectedFile.value = file
}

function handleStartAnalysis(file: File) {
  selectedFile.value = file
  currentStep.value = 2
}

function handleCancelAnalysis() {
  currentStep.value = 1
}
</script>

<template>
  <div class="container">

    <h1 class="mt-4">
      Improve Your HTML for Accessibility
    </h1>

    <p>
      Upload an HTML or Vue file to find accessibility issues,
      view suggested corrections, and download the updated file.
    </p>

    <ProgressBar :currentStep="currentStep" />

    <!-- Step 1: Upload -->
    <FileUpload
      v-if="currentStep === 1"
      @file-selected="handleFileSelected"
      @start-analysis="handleStartAnalysis"
    />

    <!-- Step 2: Analyze -->
    <AnalysisProgress
      v-if="currentStep === 2 && selectedFile"
      :file="selectedFile"
      @cancel="handleCancelAnalysis"
    />

  </div>
</template>