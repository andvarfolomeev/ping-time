<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  label: string;
}>();
</script>

<template>
  <button class="button" v-bind="$attrs">{{ label }}</button>
</template>

<style scoped>
.button {
  padding: 8px 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}
</style>
