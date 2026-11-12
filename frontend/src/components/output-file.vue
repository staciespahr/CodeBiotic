<script setup lang="ts">
import { computed } from 'vue'

type AnalysisSummary = {
  totalIssues: number
  errors: number
  warnings: number
  passingChecks: number
  correctionsApplied: number
  remainingIssues: number
}

const props = defineProps<{
  fileName: string
  updatedCode: string
  summary: AnalysisSummary
}>()

const emit = defineEmits<{
  (e: 'newAnalysis'): void
}>()

const outputFileName = computed(() => {
  const lastDot = props.fileName.lastIndexOf('.')

  if (lastDot === -1) {
    return `${props.fileName}_accessible.html`
  }

  const name = props.fileName.slice(0, lastDot)
  const extension = props.fileName.slice(lastDot)

  return `${name}_accessible${extension}`
})

const fileSize = computed(() => {
  const bytes = new Blob([props.updatedCode]).size
  return `${(bytes / 1024).toFixed(1)} KB`
})

const summaryRows = computed(() => [
  { label: 'Total issues found', value: props.summary.totalIssues },
  { label: 'Errors', value: props.summary.errors },
  { label: 'Warnings', value: props.summary.warnings },
  { label: 'Passing checks', value: props.summary.passingChecks },
  { label: 'Corrections applied', value: props.summary.correctionsApplied },
  { label: 'Remaining issues', value: props.summary.remainingIssues },
  { label: 'File size', value: fileSize.value }
])

function downloadFile() {
  const blob = new Blob(
    [props.updatedCode],
    { type: 'text/plain;charset=utf-8' }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = outputFileName.value
  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
}

function startNewAnalysis() {
  emit('newAnalysis')
}
</script>

<template>
  <section class="output-container">
    <div class="row g-4">

      <!-- Left Column -->
      <div class="col-lg-8">
        <h1 class="output-title">
          Accessible File Ready for Download
        </h1>

        <p class="output-subtitle">
          All selected corrections have been applied to your file.
        </p>

        <!-- Success Message -->
        <div class="success-card">
          <div class="success-icon" aria-hidden="true">
            ✓
          </div>

          <h2>Your updated file is ready!</h2>

          <p>
            Your approved accessibility corrections have been
            applied based on WCAG 2.2 Level A and AA guidelines.
          </p>
        </div>

        <!-- File Information -->
        <div class="output-file-card">
          <div class="d-flex align-items-center gap-3">
            <div class="file-icon" aria-hidden="true">
              📄
            </div>

            <div>
              <div class="file-name">
                {{ outputFileName }}
              </div>

              <div class="file-description">
                Updated file with applied corrections
              </div>
            </div>
          </div>

          <span class="file-size">
            {{ fileSize }}
          </span>
        </div>

        <!-- Download Button -->
        <button
          type="button"
          class="btn download-file-btn w-100"
          @click="downloadFile"
        >
          <span aria-hidden="true">↓</span>
          Download Updated File
        </button>

        <!-- New Analysis Button -->
        <button
          type="button"
          class="btn new-analysis-btn w-100"
          @click="startNewAnalysis"
        >
          Start a New Analysis
        </button>
      </div>

      <!-- Right Column -->
      <div class="col-lg-4">

        <!-- Summary -->
        <div class="summary-card">
          <h2>Summary of Changes</h2>

          <div class="summary-table">
            <div
              v-for="row in summaryRows"
              :key="row.label"
              class="summary-row"
            >
              <span>{{ row.label }}</span>
              <strong>{{ row.value }}</strong>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="next-steps-card">
          <h2>Next Steps</h2>

          <ol class="next-steps">
            <li>Download the updated file</li>
            <li>Review the changes in your code</li>
            <li>Test the file with a screen reader (e.g., NVDA)</li>
            <li>Run another analysis if needed</li>
          </ol>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.output-container {
  width: 100%;
  max-width: 1400px;
  margin: 30px auto 50px;
  padding: 25px;
  border: 1px solid #dce4ff;
  border-radius: 12px;
  background-color: #f9faff;
  color: #080f3d;
}

.output-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
}

.output-subtitle {
  font-size: 17px;
  color: #53658e;
  margin-bottom: 25px;
}

/* Success Card */
.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 30px;
  border: 1px solid #bcebd6;
  border-radius: 10px;
  background-color: #edfbf5;
  text-align: center;
  margin-bottom: 20px;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #20b77b;
  color: white;
  font-size: 42px;
  margin-bottom: 15px;
}

.success-card h2 {
  font-size: 22px;
  font-weight: 700;
}

.success-card p {
  color: #53658e;
  font-size: 16px;
  max-width: 650px;
  margin: 0;
}

/* File Card */
.output-file-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #dce4ff;
  border-radius: 10px;
  background-color: white;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  min-width: 65px;
  border-radius: 8px;
  background-color: #eef0ff;
  font-size: 32px;
}

.file-name {
  font-size: 17px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.file-description,
.file-size {
  color: #53658e;
  font-size: 15px;
}

/* Buttons */
.download-file-btn {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #5946f5;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.download-file-btn:hover {
  background-color: #4634d9;
  color: white;
}

.new-analysis-btn {
  padding: 15px;
  border: 1px solid #dce4ff;
  background-color: #f9faff;
  color: #080f3d;
  font-size: 17px;
  font-weight: 600;
}

.new-analysis-btn:hover {
  background-color: #eef0ff;
}

/* Summary */
.summary-card,
.next-steps-card {
  padding: 22px;
  border: 1px solid #e2e8ff;
  border-radius: 10px;
  background-color: white;
}

.summary-card h2,
.next-steps-card h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
}

.summary-table {
  border: 1px solid #e2e8ff;
  border-radius: 8px;
  overflow: hidden;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 15px;
  border-bottom: 1px solid #e2e8ff;
  color: #53658e;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row strong {
  color: #080f3d;
}

/* Next Steps */
.next-steps-card {
  margin-top: 15px;
}

.next-steps {
  list-style: none;
  counter-reset: step;
  padding: 0;
  margin: 0;
}

.next-steps li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 0;
  color: #53658e;
  counter-increment: step;
}

.next-steps li::before {
  content: counter(step);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background-color: #e8e6ff;
  color: #5946f5;
  font-weight: 700;
}

/* Dark Mode */
:global([data-bs-theme="dark"]) .output-container {
  background-color: #191d35;
  border-color: #353b60;
  color: #f5f6ff;
}

:global([data-bs-theme="dark"]) .output-file-card,
:global([data-bs-theme="dark"]) .summary-card,
:global([data-bs-theme="dark"]) .next-steps-card {
  background-color: #232842;
  border-color: #353b60;
}

:global([data-bs-theme="dark"]) .success-card {
  background-color: #163c32;
  border-color: #246e55;
}

:global([data-bs-theme="dark"]) .summary-row strong {
  color: #f5f6ff;
}

:global([data-bs-theme="dark"]) .output-subtitle,
:global([data-bs-theme="dark"]) .file-description,
:global([data-bs-theme="dark"]) .file-size,
:global([data-bs-theme="dark"]) .summary-row,
:global([data-bs-theme="dark"]) .next-steps li,
:global([data-bs-theme="dark"]) .success-card p {
  color: #c0c9e4;
}

:global([data-bs-theme="dark"]) .new-analysis-btn {
  background-color: #30365a;
  color: #f5f6ff;
}

@media (max-width: 768px) {
  .output-container {
    padding: 15px;
  }

  .output-title {
    font-size: 24px;
  }

  .output-file-card {
    flex-wrap: wrap;
  }
}
</style>