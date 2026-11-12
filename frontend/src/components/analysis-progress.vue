<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
file: File
}>()

const emit = defineEmits<{
(e: 'cancel'): void
}>()

// Current analysis progress
const currentStage = ref(2)

const stages = [
{
	title: 'File uploaded successfully',
	description: 'Your file has been received and is ready for analysis.'
},
{
	title: 'Organizing code (backend process)',
	description: 'Your file is being organized into sections.'
},
{
	title: 'Analyzing for accessibility issues',
	description: 'Scanning the organized code for WCAG compliance issues.'
},
{
	title: 'Generating suggested corrections',
	description: 'Creating recommended fixes for identified issues.'
},
{
	title: 'Finalizing results',
	description: 'Preparing the analysis results for review.'
}
]

// Calculate progress percentage
const progress = computed(() =>
Math.round(((currentStage.value + 1) / stages.length) * 100)
)

// File information
const fileType = computed(() =>
props.file.name.split('.').pop()?.toUpperCase() || ''
)

const fileSize = computed(() =>
`${(props.file.size / 1024).toFixed(1)} KB`
)

const uploadedAt = ref(
new Date().toLocaleString()
)

function cancelAnalysis() {
emit('cancel')
}
</script>

<template>
<div class="analysis-container">

	<!-- Heading -->
	<h1 class="analysis-title">
		Analyzing Your File
	</h1>

	<p class="analysis-subtitle">
		CodeBiotic is scanning your file for accessibility
		issues based on WCAG guidelines.
	</p>

	<div class="row g-4">

	<!-- Left Column -->
	<div class="col-lg-8">

		<!-- Progress Bar -->
		<div class="d-flex align-items-center gap-3">
		<div
			class="progress flex-grow-1"
			role="progressbar"
			aria-label="Analysis progress"
			:aria-valuenow="progress"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div
			class="progress-bar"
			:style="{ width: progress + '%' }"
			></div>
		</div>

		<span class="progress-percent">
			{{ progress }}%
		</span>
		</div>

		<p class="progress-description">
			{{ stages[currentStage]?.description }}
		</p>

		<!-- Analysis Stages -->
		<div class="stages-card">
		<div
			v-for="(stage, index) in stages"
			:key="index"
			class="stage-item"
			:class="{ 'stage-active': currentStage === index }"
		>
			<!-- Status Icon -->
			<div
			class="stage-icon"
			:class="{
				completed: index < currentStage,
				active: index === currentStage,
				pending: index > currentStage
			}"
			aria-hidden="true"
			>
			<span v-if="index < currentStage">✓</span>
			<span v-else-if="index === currentStage" class="spinner"></span>
			</div>

			<!-- Stage Text -->
			<div>
			<h2 class="stage-title">
				{{ stage.title }}
			</h2>

			<p class="stage-description">
				{{ stage.description }}
			</p>
			</div>
		</div>
		</div>

		<!-- Cancel Button -->
		<button
			type="button"
			class="btn cancel-btn mt-4"
			@click="cancelAnalysis"
		>
			Cancel Analysis
		</button>

	</div>

	<!-- Right Column -->
	<div class="col-lg-4">

		<!-- File Information -->
		<div class="file-info-card">
		<h2 class="card-heading">
			File Information
		</h2>

		<div class="file-preview">
			<div class="file-preview-icon" aria-hidden="true">
				📄
			</div>

			<div>
			<div class="file-name">
				{{ file.name }}
			</div>

			<div class="file-meta">
				{{ fileType }} File
			</div>

			<div class="file-meta">
				{{ fileSize }}
			</div>
			</div>
		</div>

		<div class="file-detail">
			<span>Uploaded:</span>
			<span>{{ uploadedAt }}</span>
		</div>

		<div class="file-detail">
			<span>File type:</span>
			<span>.{{ fileType.toLowerCase() }}</span>
		</div>

		<div class="file-detail">
			<span>File size:</span>
			<span>{{ fileSize }}</span>
		</div>
		</div>

		<!-- Information Message -->
		<div class="wait-card mt-4">
		<div class="info-icon" aria-hidden="true">
			i
		</div>

		<div>
			<h2 class="card-heading mb-2">
			Please wait
			</h2>

			<p class="mb-0">
			This process may take a few moments
			depending on the size of your file.
			</p>
		</div>
		</div>

	</div>
	</div>
</div>
</template>

<style scoped>
.analysis-container {
	width: 100%;
	max-width: 1400px;
	margin: 30px auto;
	padding: 30px;
	border: 1px solid #dce4ff;
	border-radius: 12px;
	background-color: #f9faff;
	color: #080f3d;
}

/* Heading */
.analysis-title {
	font-size: 32px;
	font-weight: 700;
	margin-bottom: 8px;
}

.analysis-subtitle {
	font-size: 18px;
	color: #53658e;
	margin-bottom: 25px;
}

/* Progress Bar */
.progress {
	height: 28px;
	background-color: #e9ecf3;
	border-radius: 8px;
}

.progress-bar {
	background-color: #5946f5;
	border-radius: 8px;
	transition: width 0.3s ease;
}

.progress-percent {
	font-size: 20px;
	font-weight: 700;
	min-width: 55px;
}

.progress-description {
	margin-top: 10px;
	color: #53658e;
	font-size: 16px;
}

/* Stages Card */
.stages-card {
	padding: 15px;
	border: 1px solid #e2e8ff;
	border-radius: 10px;
	background-color: white;
}

.stage-item {
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 12px 15px;
	border-radius: 8px;
}

.stage-active {
	background-color: #f0f0ff;
}

/* Stage Icons */
.stage-icon {
	width: 44px;
	height: 44px;
	min-width: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}

.stage-icon.completed {
	background-color: #5946f5;
	color: white;
	font-size: 26px;
}

.stage-icon.active {
	background-color: #5946f5;
}

.stage-icon.pending {
	background-color: #cbd0dc;
}

/* Spinner */
.spinner {
	width: 22px;
	height: 22px;
	border: 5px solid white;
	border-top-color: transparent;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
to {
	transform: rotate(360deg);
}
}

.stage-title {
	font-size: 17px;
	font-weight: 600;
	margin-bottom: 5px;
}

.stage-description {
	color: #53658e;
	font-size: 15px;
	margin: 0;
}

/* Cancel Button */
.cancel-btn {
	padding: 10px 30px;
	border: 1px solid #c5cde0;
	border-radius: 8px;
	background-color: transparent;
	color: #080f3d;
	font-weight: 500;
}

.cancel-btn:hover {
	background-color: #e9ecf5;
	border-color: #aab4cc;
}

/* File Information */
.file-info-card {
	padding: 22px;
	border: 1px solid #e2e8ff;
	border-radius: 10px;
	background-color: white;
}

.card-heading {
	font-size: 20px;
	font-weight: 600;
}

.file-preview {
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 15px;
	border: 1px solid #e2e8ff;
	border-radius: 8px;
	margin: 15px 0 20px;
}

.file-preview-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 65px;
	height: 65px;
	background-color: #eef0ff;
	border-radius: 8px;
	font-size: 32px;
}

.file-name {
	font-size: 17px;
	font-weight: 600;
	overflow-wrap: anywhere;
}

.file-meta {
	color: #53658e;
	font-size: 15px;
}

.file-detail {
	display: flex;
	justify-content: space-between;
	gap: 10px;
	margin-top: 15px;
	font-size: 15px;
}

.file-detail span:last-child {
	text-align: right;
}

/* Please Wait */
.wait-card {
	display: flex;
	align-items: flex-start;
	gap: 20px;
	padding: 22px;
	background-color: #eef0ff;
	border: 1px solid #dce4ff;
	border-radius: 10px;
}

.info-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	min-width: 44px;
	border-radius: 50%;
	background-color: #5946f5;
	color: white;
	font-size: 25px;
	font-weight: bold;
}

.wait-card p {
	color: #53658e;
	font-size: 15px;
}

/* Dark Mode */
:global([data-bs-theme="dark"]) .analysis-container {
	background-color: #191d35;
	border-color: #353b60;
	color: #f5f6ff;
}

:global([data-bs-theme="dark"]) .stages-card,
:global([data-bs-theme="dark"]) .file-info-card {
	background-color: #232842;
	border-color: #353b60;
}

:global([data-bs-theme="dark"]) .stage-active,
:global([data-bs-theme="dark"]) .wait-card {
	background-color: #30365a;
	border-color: #4b527a;
}

:global([data-bs-theme="dark"]) .file-preview {
	border-color: #4b527a;
}

:global([data-bs-theme="dark"]) .analysis-subtitle,
:global([data-bs-theme="dark"]) .progress-description,
:global([data-bs-theme="dark"]) .stage-description,
:global([data-bs-theme="dark"]) .file-meta,
:global([data-bs-theme="dark"]) .wait-card p {
	color: #c0c9e4;
}

:global([data-bs-theme="dark"]) .cancel-btn {
	color: #f5f6ff;
}

@media (max-width: 768px) {
.analysis-container {
	padding: 15px;
}

.analysis-title {
	font-size: 25px;
}

.analysis-subtitle {
	font-size: 16px;
}

.stage-item {
	gap: 12px;
	padding: 12px 8px;
}
}

@media (prefers-reduced-motion: reduce) {
.spinner {
	animation: none;
}

.progress-bar {
	transition: none;
}
}
</style>
