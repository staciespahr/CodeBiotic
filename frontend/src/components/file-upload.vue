<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'fileSelected', file: File | null): void
  (e: 'startAnalysis', file: File): void
}>()

const selectedFile = ref<File | null>(null)
const errorMessage = ref('')
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

function validateFile(file: File) {
  const fileName = file.name.toLowerCase()

  if (!fileName.endsWith('.html') && !fileName.endsWith('.vue')) {
    errorMessage.value =
      'Please upload a supported file (.html or .vue).'
    return
  }

  selectedFile.value = file
  errorMessage.value = ''
  emit('fileSelected', file)
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    validateFile(file)
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false

  const files = event.dataTransfer?.files

  if (!files || files.length === 0) return

  if (files.length > 1) {
    errorMessage.value = 'Please upload one HTML file at a time.'
    return
  }

  validateFile(files[0]!)
}

function removeFile() {
  selectedFile.value = null
  errorMessage.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  emit('fileSelected', null)
}

function startAnalysis() {
  if (selectedFile.value) {
    emit('startAnalysis', selectedFile.value)
  }
}
</script>

<template>
  <div class="file-upload-container">

    <!-- Upload Card -->
    <div class="upload-card">

      <!-- Drag and Drop Area -->
      <div
        class="drop-zone"
        :class="{ dragging: isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <!-- File Icon -->
        <svg
          class="file-icon"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <polyline points="10 13 8 15 10 17"/>
          <polyline points="14 13 16 15 14 17"/>
        </svg>

        <h2 class="upload-title">
            Drag and Drop Your HTML or Vue File
        </h2>

        <p class="upload-or">or</p>

        <!-- Hidden File Input -->
        <input
            ref="fileInput"
            type="file"
            accept=".html,.vue,text/html"
            class="visually-hidden"
            tabindex="-1"
            @change="handleFileChange"
            />

        <!-- Select File Button -->
        <button
          type="button"
          class="btn select-file-btn"
          @click="openFilePicker"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 16V4"/>
            <path d="m7 9 5-5 5 5"/>
            <path d="M20 16.5a4.5 4.5 0 0 0-2.5-8.2 6 6 0 0 0-11 1.6A4 4 0 0 0 7 18h2"/>
            <path d="M15 20h4"/>
          </svg>
          Select File
        </button>

       <p class="supported-type">
            Supported file types: .html, .vue
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="alert alert-danger mt-3 mb-0"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <!-- Selected File -->
      <div
        v-if="selectedFile"
        class="selected-file"
      >
        <div class="d-flex align-items-center gap-3">
          <div class="selected-file-icon" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="8" y1="13" x2="16" y2="13"/>
              <line x1="8" y1="17" x2="16" y2="17"/>
            </svg>
          </div>

          <div>
            <div class="file-name">
              {{ selectedFile.name }}
            </div>
            <div class="file-status">
              Ready to analyze
            </div>
          </div>
        </div>

        <button
          type="button"
          class="remove-file-btn"
          :aria-label="`Remove ${selectedFile.name}`"
          @click="removeFile"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- Start Analysis Button -->
    <div class="text-center mt-3">
      <button
        type="button"
        class="btn analysis-btn mb-4"
        :disabled="!selectedFile"
        @click="startAnalysis"
      >
        <span aria-hidden="true">→</span>
        Start Analysis
      </button>
    </div>

  </div>
</template>

<style scoped>
.file-upload-container {
  width: 100%;
  max-width: 1150px;
  margin: 25px auto;
}

/* Outer Card */
.upload-card {
  padding: 20px;
  border: 1px solid #dce4ff;
  border-radius: 10px;
  background-color: rgba(245, 247, 255, 0.5);
}

/* Drag and Drop Area */
.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  padding: 20px;
  border: 2px dashed #d6e0ff;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.2s, border-color 0.2s;
}

.drop-zone.dragging {
  background-color: rgba(89, 70, 245, 0.08);
  border-color: #5946f5;
}

/* File Icon */
.file-icon {
  color: #4940b8;
  margin-bottom: 10px;
}

/* Text */
.upload-title {
  font-size: 24px;
  font-weight: 600;
  color: #080f3d;
  margin-bottom: 8px;
}

.upload-or {
  color: #53658e;
  margin-bottom: 12px;
}

.supported-type {
  font-size: 14px;
  color: #53658e;
  margin-top: 10px;
  margin-bottom: 0;
}

/* Select File Button */
.select-file-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 220px;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: #5946f5;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.select-file-btn:hover {
  background-color: #4634d9;
  color: white;
}

/* Selected File */
.selected-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px 15px;
  border: 1px solid #dce4ff;
  border-radius: 8px;
  background-color: white;
}

.selected-file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background-color: #eef2ff;
  color: #25218b;
}

.file-name {
  font-size: 15px;
  font-weight: 500;
  color: #080f3d;
  overflow-wrap: anywhere;
}

.file-status {
  font-size: 13px;
  color: #53658e;
}

.remove-file-btn {
  border: none;
  background: transparent;
  color: #53658e;
  font-size: 28px;
  cursor: pointer;
}

.remove-file-btn:hover {
  color: #dc3545;
}

/* Analysis Button */
.analysis-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 280px;
  padding: 12px 24px;
  background-color: #5946f5;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.analysis-btn:hover:not(:disabled) {
  background-color: #4634d9;
  color: white;
}

.analysis-btn:disabled {
  background-color: #c9c8eb;
  border-color: #c9c8eb;
  color: white;
  opacity: 1;
  cursor: not-allowed;
}

/* Keyboard Focus */
.select-file-btn:focus-visible,
.analysis-btn:focus-visible,
.remove-file-btn:focus-visible {
  outline: 3px solid #5946f5;
  outline-offset: 3px;
}

/* Dark Mode */
:global([data-bs-theme="dark"]) .upload-card {
  background-color: #191d35;
  border-color: #353b60;
}

:global([data-bs-theme="dark"]) .drop-zone {
  border-color: #4b527a;
}

:global([data-bs-theme="dark"]) .upload-title,
:global([data-bs-theme="dark"]) .file-name {
  color: #f5f6ff;
}

:global([data-bs-theme="dark"]) .selected-file {
  background-color: #232842;
  border-color: #4b527a;
}

:global([data-bs-theme="dark"]) .upload-or,
:global([data-bs-theme="dark"]) .supported-type,
:global([data-bs-theme="dark"]) .file-status {
  color: #c0c9e4;
}

@media (max-width: 600px) {
  .upload-title {
    font-size: 19px;
  }

  .upload-card {
    padding: 12px;
  }

  .analysis-btn {
    min-width: 0;
    width: 100%;
  }
}
</style>