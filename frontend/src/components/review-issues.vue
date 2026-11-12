<script setup lang="ts">
import { computed, ref } from 'vue'

type Issue = {
  id: number
  name: string
  criterion: string
  criterionName: string
  level: 'A' | 'AA'
  severity: 'error' | 'warning'
  count: number
  description: string
}

const emit = defineEmits<{
  (e: 'viewCorrections', issue: Issue): void
}>()

// Sample data - replace with analyzer results later
const issues = ref<Issue[]>([
  {
    id: 1,
    name: 'Missing alternative text for images',
    criterion: '1.1.1',
    criterionName: 'Non-text Content',
    level: 'A',
    severity: 'error',
    count: 3,
    description:
      'Images must have alternative text that describes their purpose or content.'
  },
  {
    id: 2,
    name: 'Missing form labels',
    criterion: '3.3.2',
    criterionName: 'Labels or Instructions',
    level: 'A',
    severity: 'error',
    count: 2,
    description:
      'Form fields must have labels or instructions that explain what information is required.'
  },
  {
    id: 3,
    name: 'Low color contrast',
    criterion: '1.4.3',
    criterionName: 'Contrast (Minimum)',
    level: 'AA',
    severity: 'warning',
    count: 2,
    description:
      'Text must have sufficient contrast against its background to be readable.'
  },
  {
    id: 4,
    name: 'Heading level structure',
    criterion: '1.3.1',
    criterionName: 'Info and Relationships',
    level: 'A',
    severity: 'warning',
    count: 4,
    description:
      'Headings should communicate the structure and relationships of the page.'
  },
  {
    id: 5,
    name: 'Empty link text',
    criterion: '2.4.4',
    criterionName: 'Link Purpose (In Context)',
    level: 'A',
    severity: 'error',
    count: 1,
    description:
      'Links must have an accessible purpose that users can determine from the link or its context.'
  }
])

const selectedIssue = ref<Issue | null>(issues.value[0] ?? null)

const errorCount = computed(() =>
  issues.value.filter(issue => issue.severity === 'error').length
)

const warningCount = computed(() =>
  issues.value.filter(issue => issue.severity === 'warning').length
)

// Placeholder until backend provides passing checks
const passingChecks = ref(12)
const totalChecks = ref(20)

function selectIssue(issue: Issue) {
  selectedIssue.value = issue
}

function viewCorrections() {
  if (selectedIssue.value) {
    emit('viewCorrections', selectedIssue.value)
  }
}

function downloadReport() {
  const report = {
    issues: issues.value,
    passingChecks: passingChecks.value,
    totalChecks: totalChecks.value
  }

  const blob = new Blob(
    [JSON.stringify(report, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'codebiotic-results.json'
  link.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="review-container">

    <!-- Page Heading -->
    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
      <div>
        <h1 class="review-title">
          Accessibility Analysis Results
        </h1>

        <p class="review-subtitle">
          The following accessibility issues were found in your file.
          Click on an item to view details and see suggested corrections.
        </p>
      </div>

      <button
        type="button"
        class="btn download-btn"
        @click="downloadReport"
      >
        <span aria-hidden="true">↓</span>
        Download Results Report
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">

      <div class="col-md-6 col-xl-3">
        <div class="summary-card error-card">
          <div class="summary-icon error-icon" aria-hidden="true">×</div>
          <div>
            <div class="summary-count">{{ errorCount }}</div>
            <div class="summary-label">Errors</div>
            <div class="summary-level">(Level A)</div>
          </div>
          <p class="summary-description">
            Issues that must be fixed
          </p>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="summary-card warning-card">
          <div class="summary-icon warning-icon" aria-hidden="true">!</div>
          <div>
            <div class="summary-count">{{ warningCount }}</div>
            <div class="summary-label">Warnings</div>
            <div class="summary-level">(Level AA)</div>
          </div>
          <p class="summary-description">
            Issues that should be addressed
          </p>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="summary-card passing-card">
          <div class="summary-icon passing-icon" aria-hidden="true">✓</div>
          <div>
            <div class="summary-count">{{ passingChecks }}</div>
            <div class="summary-label">Passing Checks</div>
          </div>
          <p class="summary-description">
            Accessibility requirements met
          </p>
        </div>
      </div>

      <div class="col-md-6 col-xl-3">
        <div class="summary-card total-card">
          <div class="summary-icon total-icon" aria-hidden="true">i</div>
          <div>
            <div class="summary-count">{{ totalChecks }}</div>
            <div class="summary-label">Total Checks</div>
          </div>
          <p class="summary-description">
            Across WCAG A and AA criteria
          </p>
        </div>
      </div>

    </div>

    <!-- Issues and Details -->
    <div class="row g-4">

      <!-- Issues Table -->
      <div class="col-lg-8">
        <div class="issues-card">
          <div class="table-responsive">
            <table class="table issues-table align-middle">
              <thead>
                <tr>
                  <th scope="col">Issue</th>
                  <th scope="col">WCAG Criteria</th>
                  <th scope="col">Level</th>
                  <th scope="col">Count</th>
                  <th scope="col">
                    <span class="visually-hidden">Select</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="issue in issues"
                  :key="issue.id"
                  :class="{ 'selected-row': selectedIssue?.id === issue.id }"
                >
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <span
                        class="table-status-icon"
                        :class="issue.severity"
                        aria-hidden="true"
                      >
                        {{ issue.severity === 'error' ? '×' : '!' }}
                      </span>
                      {{ issue.name }}
                    </div>
                  </td>

                  <td>
                    <span class="criterion-text">
                      {{ issue.criterion }}
                      {{ issue.criterionName }}
                    </span>
                  </td>

                  <td>
                    <span
                      class="level-badge"
                      :class="issue.level === 'A' ? 'level-a' : 'level-aa'"
                    >
                      {{ issue.level }}
                    </span>
                  </td>

                  <td>{{ issue.count }}</td>

                  <td>
                    <button
                      type="button"
                      class="select-issue-btn"
                      :aria-label="`View details for ${issue.name}`"
                      :aria-pressed="selectedIssue?.id === issue.id"
                      @click="selectIssue(issue)"
                    >
                      ›
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Issue Details -->
      <div class="col-lg-4">
        <div class="details-card">
          <h2 class="details-heading">Issue Details</h2>

          <template v-if="selectedIssue">
            <div class="selected-issue-heading">
              <span
                class="table-status-icon"
                :class="selectedIssue.severity"
                aria-hidden="true"
              >
                {{ selectedIssue.severity === 'error' ? '×' : '!' }}
              </span>

              <div>
                <h3 class="selected-issue-title">
                  {{ selectedIssue.name }}
                </h3>

                <p class="selected-issue-criterion">
                  WCAG {{ selectedIssue.criterion }}
                  {{ selectedIssue.criterionName }}
                  (Level {{ selectedIssue.level }})
                </p>
              </div>
            </div>

            <p class="details-description">
              {{ selectedIssue.description }}
            </p>

            <div class="instances-box">
              <span>{{ selectedIssue.count }} instances found</span>
              <span aria-hidden="true">›</span>
            </div>

            <button
              type="button"
              class="btn corrections-btn w-100"
              @click="viewCorrections"
            >
              → View Details and Suggested Corrections
            </button>
          </template>

          <h3 class="next-heading">Next Steps</h3>

          <ol class="next-steps">
            <li>Select an issue to view details</li>
            <li>Review the suggested corrections</li>
            <li>Apply the corrections to your file</li>
            <li>Download the updated file</li>
          </ol>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.review-container {
  width: 100%;
  max-width: 1400px;
  margin: 30px auto 50px;
  padding: 25px;
  border: 1px solid #dce4ff;
  border-radius: 12px;
  background-color: #f9faff;
  color: #080f3d;
}

.review-title {
  font-size: 30px;
  font-weight: 700;
}

.review-subtitle {
  max-width: 800px;
  font-size: 16px;
  color: #53658e;
}

.download-btn {
  border: 1px solid #dce4ff;
  color: #5946f5;
  background: #f0f0ff;
  padding: 10px 18px;
  font-weight: 500;
}

.download-btn:hover {
  background: #e5e4ff;
  color: #4634d9;
}

/* Summary Cards */
.summary-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 130px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid;
  flex-wrap: wrap;
}

.error-card {
  background-color: #fff3f3;
  border-color: #ffd3d3;
}

.warning-card {
  background-color: #fffbef;
  border-color: #ffedbd;
}

.passing-card {
  background-color: #edfbf5;
  border-color: #bcebd6;
}

.total-card {
  background-color: #f4f5ff;
  border-color: #dce4ff;
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  font-size: 32px;
  font-weight: bold;
}

.error-icon {
  background-color: #ff3838;
}

.warning-icon {
  background-color: #ffae00;
  border-radius: 10px;
}

.passing-icon {
  background-color: #20b77b;
}

.total-icon {
  background-color: #a5a0ff;
}

.summary-count {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.1;
}

.summary-label {
  font-weight: 600;
}

.summary-level {
  font-size: 14px;
  color: #53658e;
}

.summary-description {
  width: 100%;
  margin: 0;
  text-align: center;
  color: #53658e;
  font-size: 13px;
}

/* Issues Table */
.issues-card,
.details-card {
  height: 100%;
  padding: 15px;
  background-color: white;
  border: 1px solid #e2e8ff;
  border-radius: 10px;
}

.issues-table {
  --bs-table-bg: transparent;
  width: 100%;
  color: #080f3d;
}

.issues-table th {
  padding: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.issues-table td {
  padding: 15px 12px;
}

.issues-table .selected-row {
  background-color: #f0f0ff;
  --bs-table-bg: #f0f0ff;
}

.table-status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  font-weight: 600;
}

.table-status-icon.error {
  background-color: #ff3838;
}

.table-status-icon.warning {
  background-color: #ffae00;
  border-radius: 8px;
}

.criterion-text {
  color: #365bdb;
}

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

.select-issue-btn {
  border: none;
  background: transparent;
  color: #253b8f;
  font-size: 30px;
  cursor: pointer;
}

/* Details Panel */
.details-heading {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 15px;
}

.selected-issue-heading {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background-color: #f7f8ff;
  border-radius: 8px;
}

.selected-issue-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.selected-issue-criterion {
  color: #53658e;
  font-size: 13px;
  margin: 5px 0 0;
}

.details-description {
  margin: 15px 0;
  color: #53658e;
  font-size: 15px;
}

.instances-box {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: #f0f0ff;
  border: 1px solid #dce4ff;
  border-radius: 6px;
  margin-bottom: 15px;
}

.corrections-btn {
  background-color: #5946f5;
  color: white;
  padding: 12px;
  font-weight: 600;
}

.corrections-btn:hover {
  background-color: #4634d9;
  color: white;
}

/* Next Steps */
.next-heading {
  margin-top: 22px;
  font-size: 18px;
  font-weight: 700;
}

.next-steps {
  padding-left: 25px;
  color: #53658e;
}

.next-steps li {
  padding: 4px 0;
}

@media (max-width: 768px) {
  .review-container {
    padding: 15px;
  }

  .review-title {
    font-size: 24px;
  }
}
</style>
