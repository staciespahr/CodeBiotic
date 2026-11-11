<script setup lang="ts">
defineProps<{
  currentStep: number
}>()

const steps = [
  'Upload',
  'Analyze',
  'Review Issues',
  'Apply Corrections',
  'Output'
]
</script>

<template>
  <div
    class="progress-container"
    role="group"
    aria-label="Analysis progress"
  >
    <ol class="progress-steps">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="progress-step"
        :class="{
          active: currentStep === index + 1,
          completed: currentStep > index + 1
        }"
        :aria-current="currentStep === index + 1 ? 'step' : undefined"
      >
        <div class="step-circle">
          {{ index + 1 }}
        </div>

        <span class="step-label">
          {{ step }}
        </span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  max-width: 1150px;
  margin: 40px auto 25px;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}

.progress-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: #53658e;
}

/* Connecting lines */
.progress-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: calc(50% + 30px);
  width: calc(100% - 60px);
  height: 2px;
  background-color: #dce4f7;
}

/* Numbered circles */
.step-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #eef2ff;
  border: 2px solid #dce4f7;
  color: #53658e;
  font-size: 18px;
  font-weight: 500;
}

/* Step labels */
.step-label {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

/* Active step */
.progress-step.active .step-circle {
  background-color: #5946f5;
  border-color: #5946f5;
  color: white;
}

.progress-step.active .step-label {
  color: #5946f5;
  font-weight: 600;
}

/* Completed steps */
.progress-step.completed .step-circle {
  background-color: #5946f5;
  border-color: #5946f5;
  color: white;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .step-circle {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }

  .step-label {
    font-size: 11px;
  }

  .progress-step:not(:last-child)::after {
    top: 16px;
    left: calc(50% + 22px);
    width: calc(100% - 44px);
  }
}
</style>
