<script setup lang="ts">
import { tableData } from './table_data'
</script>

<template>
    <h3>Bad Table</h3>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Color</th>
                <th>Size</th>
                <th>Type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in tableData" :key="row.item">
                <td>{{ row.item }}</td>
                <td>{{ row.color }}</td>
                <td>{{ row.size }}</td>
                <td>{{ row.type }}</td>
                <td>
                    <button>X</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>