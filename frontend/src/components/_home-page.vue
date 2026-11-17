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

// progress for analysis
const isOrganizing = ref(false)
const organizedHtml = ref<unknown>(null)
const analysisError = ref('')
let uploadController: AbortController | null = null

function handleFileSelected(file: File | null) {
  selectedFile.value = file
}

async function handleStartAnalysis(file: File) {
	selectedFile.value = file
	currentStep.value = 2

	isOrganizing.value = true
	organizedHtml.value = null
	analysisError.value = ''

	try {
		const formData = new FormData()
		formData.append('file', file)

		uploadController = new AbortController()
		const response = await fetch('http://127.0.0.1:8000/upload', {
			method: 'POST',
			body: formData,
			signal: uploadController.signal
		})

		if (!response.ok) {
			throw new Error(`Upload failed: ${response.status}`)
		}

		const result = await response.json()

		// Save the actual organizer output
		organizedHtml.value = result.organized

		console.log('HTML organization complete:', result)

	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return
		}

		analysisError.value =
		error instanceof Error ? error.message : 'Something went wrong.'

		console.error('Backend error:', error)

		} finally {
			isOrganizing.value = false
	}
}

function handleCancelAnalysis() {
  // Cancel the backend request
  uploadController?.abort()
  uploadController = null

  // Reset analysis state
  isOrganizing.value = false
  organizedHtml.value = null
  analysisError.value = ''

  // Return to upload page
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
		:is-organizing="isOrganizing"
		:organization-complete="organizedHtml !== null"
		:error-message="analysisError"
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