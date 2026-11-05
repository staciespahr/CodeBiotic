/*
links vs butttons
disabled buttons
icons
tooltips
color
size
info areas in multiple spots
tabs
*/

<script setup lang="ts">
import { ref } from 'vue'

const showSmile = ref(false);
const showFrown = ref(false);

function navigateTo(url: string) {
    window.location.href = url;
}
</script>

<template>
    <h1>Buttons</h1>
	<div class="wcag-issues-callout">
        <p class="left-aligned">This page includes the following WCAG criteria mistakes:</p>
        <ul class="left-aligned">
            <li>1.4.1 Use of Color</li>
            <li>3.2.6 Consistent Help</li>
            <li>4.1.2 Name, Role, Value</li>
            <li>2.5.8 Target Size</li>
        </ul>
        <h5 class="left-aligned">Contact</h5>
        <p class="left-aligned">
            If you have any questions please contact us at contact@gmail.com or 555-555-5555.
        </p>
    </div>

    <div class="button-stack">
        <fieldset>
            <legend>Links vs Buttons</legend>
             <div v-if="showSmile"><p>:)</p></div>
            <button @click="showSmile = !showSmile; showFrown = false">Show Smile</button>

            <button @click="navigateTo('https://www.stmartin.edu/admissions')">Apply now</button>
            <a href="https://www.stmartin.edu/">Saint Martin's University</a>
            <a href="https://www.stmartin.edu/" class="no-underline">Saint Martin's University</a>
        </fieldset>

        <fieldset>
            <legend>Disabled Buttons</legend>
            <div v-if="showFrown"><p>:(</p></div>
            <button aria-disabled="true" @click="showFrown = !showFrown; showSmile = false">aria-disabled Button</button>
            <button disabled>Disabled Button</button>
        </fieldset>

        <fieldset>
            <legend>Colors</legend>
            <div>
                <button class="btn-green">GREEN</button>
                <button class="btn-blue">BLUE</button>
                <button class="btn-red">RED</button>
                <button class="btn-yellow">YELLOW</button>
                <button class="btn-dark">DARK</button>
            </div> 
        </fieldset>
         <fieldset>
            <legend>Disabled</legend>
             <div>
                <button disabled class="btn-green">GREEN</button>
                <button disabled class="btn-blue">BLUE</button>
                <button disabled class="btn-red">RED</button>
                <button disabled class="btn-yellow">YELLOW</button>
                <button disabled class="btn-dark">DARK</button>
            </div>
        </fieldset> 

        <fieldset>
            <legend>Sizes</legend>
            <div>
                <button class="btn-small">SMALL</button>
                <button class="btn-medium">MEDIUM</button>
                <button class="btn-large">LARGE</button>
            </div>
        </fieldset>

        <fieldset>
            <legend>TODO</legend>
            <button class="btn-tooltip" title="This is a tooltip">TOOLTIP</button>
        </fieldset>
        
         <fieldset>
        <button class="btn-icon" aria-label="Favorite"></button>
        
        </fieldset>

         <fieldset>
            <legend>TODO</legend>
            <button class="btn-focus-trap">Focus Trap</button>

        </fieldset>
    </div>
</template>
