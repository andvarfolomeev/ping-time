<script setup lang="ts">
const formatHour = (timeIndex: number) => {
  const hour = timeIndex.toString().padStart(2, "0");
  return `${hour}:00`;
};
</script>

<template>
  <div class="time-labels">
    <div class="day-header-spacer"></div>
    <div v-for="hour in 24" :key="hour" class="hour-block">
      <div class="time-label">{{ formatHour(hour - 1) }}</div>
      <div class="time-label quarter">:15</div>
      <div class="time-label quarter">:30</div>
      <div class="time-label quarter">:45</div>
    </div>
  </div>
</template>

<style scoped>
.time-labels {
  min-width: 80px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  user-select: none;
}

.day-header-spacer {
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.time-label {
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
  border-bottom: 1px solid #eee;
}

.time-label.quarter {
  color: #999;
  font-size: 0.7rem;
  background-color: #fafafa;
}
</style>
