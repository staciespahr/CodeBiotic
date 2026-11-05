<script setup lang="ts">
import BadTable from './bad-table.vue'
import GoodTable from './good-table.vue'
</script>

<template>
    <h1>Tables</h1>
	<div class="wcag-issues-callout">
        <p>This page includes the following WCAG criteria mistakes:</p>
        <ul class="left-aligned">
            <li>1.3.1 Info and Relationships</li>
            <li>3.2.6 Consistent Help</li>
            <li>4.1.2 Name, Role, and Value</li>
        </ul>
        <p class="left-aligned">
            <b>Contact Information:</b> If you have any questions please contact us at contact@gmail.com or 555-555-5555.
        </p>
    </div>

    <BadTable />
    <GoodTable />
</template>