<script setup lang="ts">
import { computed, ref } from 'vue'

type Instance = {
  id: number
  originalCode: string
  correctedCode: string
  explanation: string
  status: 'pending' | 'approved' | 'skipped'
}

type Issue = {
  id: number
  name: string
  criterion: string
  criterionName: string
  level: 'A' | 'AA'
  severity: 'error' | 'warning'
  description: string
  instances: Instance[]
}

const emit = defineEmits<{
  (e: 'backToResults'): void
  (e: 'correctionApproved', issueId: number, instanceId: number): void
}>()

// Sample data - replace with analyzer and corrector results
const issues = ref<Issue[]>([
  {
    id: 1,
    name: 'Missing alternative text for images',
    criterion: '1.1.1',
    criterionName: 'Non-text Content',
    level: 'A',
    severity: 'error',
    description:
      'Images must have alternative text that describes their purpose or content.',
    instances: [
      {
        id: 1,
        originalCode: '<img src="image.jpg">',
        correctedCode:
          '<img src="image.jpg" alt="Description of image">',
        explanation:
          'This image is missing alternative text. Alternative text provides a text description of the image for screen reader users and is required for informative images under WCAG 1.1.1.',
        status: 'pending'
      },
      {
        id: 2,
        originalCode: '<img src="logo.png">',
        correctedCode:
          '<img src="logo.png" alt="Company logo">',
        explanation:
          'This image needs alternative text that communicates its purpose.',
        status: 'pending'
      },
      {
        id: 3,
        originalCode: '<img src="banner.jpg">',
        correctedCode:
          '<img src="banner.jpg" alt="Website banner">',
        explanation:
          'Provide alternative text appropriate to the image context.',
        status: 'pending'
      }
    ]
  },
  {
    id: 2,
    name: 'Missing form labels',
    criterion: '3.3.2',
    criterionName: 'Labels or Instructions',
    level: 'A',
    severity: 'error',
    description:
      'Form inputs must have appropriate labels or instructions.',
    instances: [
      {
        id: 1,
        originalCode: '<input type="text" id="name">',
        correctedCode:
          '<label for="name">Name</label>\n<input type="text" id="name">',
        explanation:
          'The label identifies the purpose of the input field.',
        status: 'pending'
      },
      {
        id: 2,
        originalCode: '<input type="email" id="email">',
        correctedCode:
          '<label for="email">Email</label>\n<input type="email" id="email">',
        explanation:
          'A visible label helps users understand what information is expected.',
        status: 'pending'
      }
    ]
  },
  {
    id: 3,
    name: 'Low color contrast',
    criterion: '1.4.3',
    criterionName: 'Contrast (Minimum)',
    level: 'AA',
    severity: 'warning',
    description:
      'Text must have sufficient contrast against its background.',
    instances: [
      {
        id: 1,
        originalCode: '<p style="color: #aaa">Hello</p>',
        correctedCode:
          '<p style="color: #595959">Hello</p>',
        explanation:
          'Normal text generally requires a contrast ratio of at least 4.5:1.',
        status: 'pending'
      }
    ]
  },
  {
    id: 4,
    name: 'Heading level structure',
    criterion: '1.3.1',
    criterionName: 'Info and Relationships',
    level: 'A',
    severity: 'warning',
    description:
      'Heading structure should communicate the organization of content.',
    instances: [
      {
        id: 1,
        originalCode: '<div class="heading">About Us</div>',
        correctedCode: '<h2>About Us</h2>',
        explanation:
          'Semantic headings help assistive technology users navigate the page.',
        status: 'pending'
      }
    ]
  },
  {
    id: 5,
    name: 'Empty link text',
    criterion: '2.4.4',
    criterionName: 'Link Purpose (In Context)',
    level: 'A',
    severity: 'error',
    description:
      'Users must be able to determine the purpose of a link.',
    instances: [
      {
        id: 1,
        originalCode: '<a href="/about"></a>',
        correctedCode: '<a href="/about">About Us</a>',
        explanation:
          'Descriptive link text communicates the destination or purpose.',
        status: 'pending'
      }
    ]
  }
])

const selectedIssueIndex = ref(0)
const selectedInstanceIndex = ref(0)
const filter = ref('all')

const selectedIssue = computed(
  () => issues.value[selectedIssueIndex.value]
)

const selectedInstance = computed(
  () => selectedIssue.value?.instances[selectedInstanceIndex.value]
)

const filteredIssues = computed(() => {
  if (filter.value === 'all') return issues.value

  return issues.value.filter(issue =>
    issue.level === filter.value ||
    issue.severity === filter.value
  )
})

function selectIssue(issue: Issue) {
  const index = issues.value.findIndex(item => item.id === issue.id)

  if (index !== -1) {
    selectedIssueIndex.value = index
    selectedInstanceIndex.value = 0
  }
}

function nextInstance() {
  if (!selectedIssue.value) return

  if (selectedInstanceIndex.value <
      selectedIssue.value.instances.length - 1) {
    selectedInstanceIndex.value++
  }
}

function previousInstance() {
  if (selectedInstanceIndex.value > 0) {
    selectedInstanceIndex.value--
  }
}

function nextIssue() {
  if (selectedIssueIndex.value < issues.value.length - 1) {
    selectedIssueIndex.value++
    selectedInstanceIndex.value = 0
  }
}

function applyCorrection() {
  if (!selectedIssue.value || !selectedInstance.value) return

  selectedInstance.value.status = 'approved'

  emit(
    'correctionApproved',
    selectedIssue.value.id,
    selectedInstance.value.id
  )

  // Move to the next instance if available
  if (selectedInstanceIndex.value <
      selectedIssue.value.instances.length - 1) {
    nextInstance()
  } else {
    nextIssue()
  }
}

function skipCorrection() {
  if (!selectedInstance.value) return

  selectedInstance.value.status = 'skipped'

  if (selectedInstanceIndex.value <
      selectedIssue.value!.instances.length - 1) {
    nextInstance()
  } else {
    nextIssue()
  }
}

async function copyCode(code: string) {
  await navigator.clipboard.writeText(code)
}
</script>

<template>
  <section class="corrections-container">

    <!-- Heading -->
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
      <div>
        <h1 class="page-title">
          Issue Details and Corrections
        </h1>

        <p class="page-subtitle">
          Review each accessibility issue, see the details,
          and apply the suggested correction to your file.
        </p>
      </div>

      <button
        type="button"
        class="btn back-btn"
        @click="emit('backToResults')"
      >
        ← Back to Results
      </button>
    </div>

    <div class="row g-4">

      <!-- Left: Issue List -->
      <div class="col-lg-5">
        <div class="issues-panel">

          <div class="issues-header">
            <h2>Accessibility Issues ({{ issues.length }})</h2>

            <select
              v-model="filter"
              class="form-select issue-filter"
              aria-label="Filter accessibility issues"
            >
              <option value="all">All Issues</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="A">Level A</option>
              <option value="AA">Level AA</option>
            </select>
          </div>

          <div
            v-for="issue in filteredIssues"
            :key="issue.id"
            class="issue-row"
            :class="{
              selected: selectedIssue?.id === issue.id
            }"
          >
            <button
              type="button"
              class="issue-select-btn"
              :aria-pressed="selectedIssue?.id === issue.id"
              @click="selectIssue(issue)"
            >
              <span
                class="status-icon"
                :class="issue.severity"
                aria-hidden="true"
              >
                {{ issue.severity === 'error' ? '×' : '!' }}
              </span>

              <span class="issue-text">
                <strong>{{ issue.name }}</strong>
                <small>
                  {{ issue.criterion }}
                  {{ issue.criterionName }}
                </small>
              </span>

              <span
                class="level-badge"
                :class="issue.level === 'A' ? 'level-a' : 'level-aa'"
              >
                {{ issue.level }}
              </span>

              <span class="instance-count">
                {{ issue.instances.length }}
                {{ issue.instances.length === 1 ? 'instance' : 'instances' }}
              </span>

              <span class="arrow" aria-hidden="true">›</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Right: Correction Details -->
      <div class="col-lg-7">
        <div v-if="selectedIssue && selectedInstance" class="details-panel">

          <!-- Issue Heading -->
          <div class="details-header">
            <div class="d-flex align-items-start gap-3">
              <span
                class="status-icon"
                :class="selectedIssue.severity"
                aria-hidden="true"
              >
                {{ selectedIssue.severity === 'error' ? '×' : '!' }}
              </span>

              <div>
                <h2>{{ selectedIssue.name }}</h2>

                <p class="criterion-label">
                  WCAG {{ selectedIssue.criterion }}
                  {{ selectedIssue.criterionName }}
                  (Level {{ selectedIssue.level }})
                </p>

                <p class="issue-description">
                  {{ selectedIssue.description }}
                </p>
              </div>
            </div>

            <div class="instance-navigation">
              <span class="level-badge level-a">
                {{ selectedIssue.level }}
              </span>

              <span>
                {{ selectedIssue.instances.length }} instances
                in your file
              </span>

              <div class="navigation-controls">
                <button
                  type="button"
                  aria-label="Previous instance"
                  :disabled="selectedInstanceIndex === 0"
                  @click="previousInstance"
                >
                  ‹
                </button>

                <span>
                  {{ selectedInstanceIndex + 1 }}
                  of {{ selectedIssue.instances.length }}
                </span>

                <button
                  type="button"
                  aria-label="Next instance"
                  :disabled="selectedInstanceIndex === selectedIssue.instances.length - 1"
                  @click="nextInstance"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <!-- Selected Instance -->
          <div class="instance-content">

            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3>Selected Instance</h3>

              <button
                type="button"
                class="btn context-btn"
              >
                View in Context
              </button>
            </div>

            <!-- Code Comparison -->
            <div class="row g-3">

              <!-- Original Code -->
              <div class="col-md-6">
                <div class="code-card original-code">
                  <h4>Original Code (Not Accessible)</h4>

                  <div class="code-content">
                    <button
                      type="button"
                      class="copy-btn"
                      aria-label="Copy original code"
                      @click="copyCode(selectedInstance.originalCode)"
                    >
                      ⧉
                    </button>

                    <pre><code>{{ selectedInstance.originalCode }}</code></pre>
                  </div>
                </div>
              </div>

              <!-- Suggested Correction -->
              <div class="col-md-6">
                <div class="code-card corrected-code">
                  <h4>Suggested Correction</h4>

                  <div class="code-content">
                    <button
                      type="button"
                      class="copy-btn"
                      aria-label="Copy suggested correction"
                      @click="copyCode(selectedInstance.correctedCode)"
                    >
                      ⧉
                    </button>

                    <pre><code>{{ selectedInstance.correctedCode }}</code></pre>
                  </div>
                </div>
              </div>

            </div>

            <!-- Explanation -->
            <div class="explanation-box">
              <div class="explanation-icon" aria-hidden="true">▤</div>

              <div>
                <h3>Explanation</h3>
                <p>{{ selectedInstance.explanation }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="row g-3">
              <div class="col-md-6">
                <button
                  type="button"
                  class="btn apply-btn w-100"
                  :disabled="selectedInstance.status === 'approved'"
                  @click="applyCorrection"
                >
                  ✓ Apply This Correction
                </button>
              </div>

              <div class="col-md-6">
                <button
                  type="button"
                  class="btn skip-btn w-100"
                  @click="skipCorrection"
                >
                  Skip to Next Issue →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.corrections-container {
  width: 100%;
  max-width: 1500px;
  margin: 30px auto 50px;
  padding: 20px;
  color: #080f3d;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
}

.page-subtitle {
  color: #53658e;
  font-size: 16px;
}

.back-btn,
.context-btn {
  border: 1px solid #dce4ff;
  background-color: #f3f3ff;
  color: #5946f5;
  font-weight: 600;
  padding: 10px 20px;
}

/* Panels */
.issues-panel,
.details-panel {
  height: 100%;
  border: 1px solid #e2e8ff;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
}

/* Issue List */
.issues-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 18px;
}

.issues-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.issue-filter {
  max-width: 180px;
}

.issue-row {
  border-top: 1px solid #e2e8ff;
}

.issue-row.selected {
  background-color: #f0f0ff;
  border-left: 3px solid #5946f5;
}

.issue-select-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 18px;
  border: none;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.issue-select-btn:hover {
  background-color: rgba(89, 70, 245, 0.05);
}

.issue-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
}

.issue-text strong {
  font-size: 15px;
}

.issue-text small {
  color: #53658e;
  font-size: 13px;
}

.instance-count {
  font-size: 13px;
  color: #53658e;
  white-space: nowrap;
}

.arrow {
  font-size: 28px;
  color: #253b8f;
}

/* Status Icons */
.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 50%;
  color: white;
  font-size: 28px;
  font-weight: 600;
}

.status-icon.error {
  background-color: #ff3838;
}

.status-icon.warning {
  background-color: #ffae00;
  border-radius: 8px;
}

/* WCAG Level */
.level-badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 6px;
  font-weight: 600;
}

.level-a {
  background-color: #ffe8e8;
  color: #dc2626;
}

.level-aa {
  background-color: #fff2cd;
  color: #b77900;
}

/* Details */
.details-header {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 25px;
  border-bottom: 1px solid #e2e8ff;
}

.details-header h2 {
  font-size: 20px;
  font-weight: 700;
}

.criterion-label,
.issue-description {
  color: #53658e;
  font-size: 14px;
}

.instance-navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 120px;
  font-size: 13px;
  color: #53658e;
}

.navigation-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navigation-controls button {
  border: none;
  background: transparent;
  color: #253b8f;
  font-size: 25px;
  cursor: pointer;
}

.navigation-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Instance Content */
.instance-content {
  padding: 25px;
}

.instance-content h3 {
  font-size: 18px;
  font-weight: 700;
}

/* Code Comparison */
.code-card {
  border: 1px solid #e2e8ff;
  border-radius: 8px;
  overflow: hidden;
}

.code-card h4 {
  padding: 12px 15px;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.original-code h4 {
  background-color: #fff0f0;
  color: #dc2626;
}

.corrected-code h4 {
  background-color: #eafaf2;
  color: #168451;
}

.code-content {
  position: relative;
  padding: 15px;
  background-color: #f9faff;
  min-height: 130px;
}

.code-content pre {
  margin: 0;
  overflow-x: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 13px;
  padding-right: 25px;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid #dce4ff;
  border-radius: 5px;
  background: #f3f3ff;
  color: #253b8f;
  padding: 3px 8px;
}

/* Explanation */
.explanation-box {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  padding: 18px;
  border: 1px solid #e2e8ff;
  border-radius: 8px;
  background-color: #f9faff;
}

.explanation-icon {
  font-size: 30px;
  color: #080f3d;
}

.explanation-box h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.explanation-box p {
  color: #53658e;
  font-size: 14px;
  margin: 0;
}

/* Action Buttons */
.apply-btn {
  padding: 12px;
  background-color: #5946f5;
  color: white;
  font-weight: 600;
}

.apply-btn:hover {
  background-color: #4634d9;
  color: white;
}

.skip-btn {
  padding: 12px;
  border: 1px solid #dce4ff;
  background-color: #f9faff;
  color: #080f3d;
  font-weight: 600;
}

.skip-btn:hover {
  background-color: #eef0ff;
}

@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
  }

  .instance-navigation {
    align-items: flex-start;
  }

  .issue-select-btn {
    flex-wrap: wrap;
  }

  .page-title {
    font-size: 24px;
  }
}
</style>
