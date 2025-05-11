<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  participants:
    | {
        name: string;
        available?: boolean;
      }[]
    | undefined;
}>();
</script>

<template>
  <div class="participants-list">
    <div
      class="participant"
      v-for="(participant, index) in participants"
      :key="index"
    >
      <span class="participant-name">{{ participant.name }}</span>
      <span class="participant-status">{{
        participant.available ? "✓" : "-"
      }}</span>
    </div>
  </div>
</template>

<style>
.participants-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.participant {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;
}

.participant-status {
  color: #4caf50;
}
</style>
