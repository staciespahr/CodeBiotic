<template>
    <div class="home-page">
        You can find more information about WCAG at the following link:
        <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
			WCAG
		</a>

        <div class="wcag-tabs">
            <div class="wcag-tab-list" role="tablist" aria-label="WCAG criteria">
                <button
                    id="wcag-tab"
                    class="wcag-tab"
                    type="button"
                    role="tab"
                    aria-controls="wcag-panel"
                    :aria-selected="activeTab === 0"
                    tabindex="0"
                    @click="activeTab = 0"
                    @keydown="handleTabKeydown($event, 0)"
                >
                    WCAG 2.2
                </button>
                <button
                    id="high-priority-criteria-tab"
                    class="wcag-tab"
                    type="button"
                    role="tab"
                    aria-controls="high-priority-criteria-panel"
                    :aria-selected="activeTab === 1"
                    tabindex="0"
                    @click="activeTab = 1"
                    @keydown="handleTabKeydown($event, 1)"
                >
                    High Priority Criteria
                </button>
                <button
                    id="medium-priority-criteria-tab"
                    class="wcag-tab"
                    type="button"
                    role="tab"
                    aria-controls="medium-priority-criteria-panel"
                    :aria-selected="activeTab === 2"
                    tabindex="0"
                    @click="activeTab = 2"
                    @keydown="handleTabKeydown($event, 2)"
                >
                    Medium Priority Criteria
                </button>
                <button
                    id="low-priority-criteria-tab"
                    class="wcag-tab"
                    type="button"
                    role="tab"
                    aria-controls="low-priority-criteria-panel"
                    :aria-selected="activeTab === 3"
                    tabindex="0"
                    @click="activeTab = 3"
                    @keydown="handleTabKeydown($event, 3)"
                >
                    Low Priority Criteria
                </button>
            </div>

            <section
                id="wcag-panel"
                class="wcag-tab-panel"
                role="tabpanel"
                aria-labelledby="wcag-tab"
                tabindex="0"
                v-show="activeTab === 0"
            >
                <WCAGCriteriaTable />
            </section>
            <section
                id="high-priority-criteria-panel"
                class="wcag-tab-panel"
                role="tabpanel"
                aria-labelledby="high-priority-criteria-tab"
                tabindex="0"
                v-show="activeTab === 1"
            >
                <HighPriorityWCAG />
            </section>
            <section
                id="medium-priority-criteria-panel"
                class="wcag-tab-panel"
                role="tabpanel"
                aria-labelledby="medium-priority-criteria-tab"
                tabindex="0"
                v-show="activeTab === 2"
            >
                <MediumPriorityWCAG />
            </section>
            <section
                id="low-priority-criteria-panel"
                class="wcag-tab-panel"
                role="tabpanel"
                aria-labelledby="low-priority-criteria-tab"
                tabindex="0"
                v-show="activeTab === 3"
            >
                <LowPriorityWCAG />
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WCAGCriteriaTable from './wcag-criteria-table.vue'
import HighPriorityWCAG from './high-priority-wcag.vue'
import MediumPriorityWCAG from './medium-priority-wcag.vue'
import LowPriorityWCAG from './low-priority-wcag.vue'

const activeTab = ref(0)

function handleTabKeydown(event: KeyboardEvent, currentIndex: number) {
    const tabs = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    if (!tabs?.length) return

    let nextIndex: number

    switch (event.key) {
        case 'ArrowRight':
            nextIndex = (currentIndex + 1) % tabs.length
            break
        case 'ArrowLeft':
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
            break
        case 'Home':
            nextIndex = 0
            break
        case 'End':
            nextIndex = tabs.length - 1
            break
        default:
            return
    }
    event.preventDefault()
    activeTab.value = nextIndex
    activeTab.value = nextIndex
    tabs?.[nextIndex]?.focus()
}
</script>