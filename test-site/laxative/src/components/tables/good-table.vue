<script setup lang="ts">
import { tableData } from './table_data'
</script>

<template>
    <h3>Good Table</h3>
    <table>
        <caption class="sr-only">Produce inventory</caption>
        <thead>
            <tr>
                <td />
                <th scope="col">Color</th>
                <th scope="col">Size</th>
                <th scope="col">Type</th>
                <td />
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in tableData" :key="row.item">
                <th scope="row">{{ row.item }}</th>
                <td>{{ row.color }}</td>
                <td>{{ row.size }}</td>
                <td>{{ row.type }}</td>
                <td>
                    <button type="button" :aria-label="`Remove ${row.color}`">X</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>