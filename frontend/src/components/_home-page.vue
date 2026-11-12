<script setup lang="ts">
import { ref } from 'vue'
import ProgressBar from './progress-bar.vue'
import FileUpload from './file-upload.vue'
import AnalysisProgress from './analysis-progress.vue'
import ReviewIssues from './review-issues.vue'
import IssueCorrections from './issue-corrections.vue'
import OutputFile from './output-file.vue'

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

function handleViewCorrections(issue: {
	id: number
	name: string
}) {
	console.log('Selected issue:', issue)
	currentStep.value = 4
}

function handleBackToResults() {
  currentStep.value = 3
}

const updatedCode = ref('')

const analysisSummary = ref({
	totalIssues: 8,
	errors: 5,
	warnings: 3,
	passingChecks: 12,
	correctionsApplied: 0,
	remainingIssues: 8
})

function handleNewAnalysis() {
	currentStep.value = 1
	selectedFile.value = null
	updatedCode.value = ''
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

	<!-- Step 3: Review Issues -->
	<ReviewIssues
		v-if="currentStep === 3"
		@view-corrections="handleViewCorrections"
	/>

	<!-- Step 4: Issue Details and Corrections -->
	<IssueCorrections
		v-if="currentStep === 4"
		@back-to-results="handleBackToResults"
	/>

	<!-- Step 5: Output -->
	<OutputFile
		v-if="currentStep === 5 && selectedFile"
		:file-name="selectedFile.name"
		:updated-code="updatedCode"
		:summary="analysisSummary"
		@new-analysis="handleNewAnalysis"
	/>

  </div>
</template>