<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  days: string[];
}>();
</script>

<template>
  <div class="days-header">
    <div v-for="day in days" :key="day" class="day-header">
      {{ day }}
    </div>
  </div>
</template>

<style scoped>
.days-header {
  height: 40px;
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
}

.day-header {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #2c3e50;
  border-right: 1px solid #ddd;
}
</style>
