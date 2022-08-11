<template>
  <button ref="fileInput" type="submit" @click="onFileSelected" class="mr-20">anc</button>
  <button @click="fileInput?.click()">Pick Files</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLDivElement>()

function onFileSelected(event: any) { console.log("Event: " + event) }
</script>