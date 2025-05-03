<script setup lang="ts">
import { ref, watch } from "vue";
import { useSelection } from "../composables";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DaySlot = {
  label: string;
  slots: Array<TimeSlot>;
};

type TimeSlot = {
  available: boolean;
};

const slots = ref<Array<DaySlot>>(
  days.map((day) => ({
    label: day,
    slots: Array.from({ length: 48 }, () => ({ available: false })),
  })),
);

function isAvailable(currentDayIndex: number, currentTimeIndex: number) {
  return slots.value[currentDayIndex].slots[currentTimeIndex].available;
}

const { isInSelection, startSelection, completeSelection, updateSelectionEnd } =
  useSelection((start, end, logicalOperation) => {
    for (let i = start.x; i <= end.x; i++) {
      for (let j = start.y; j <= end.y; j++) {
        slots.value[i].slots[j].available = logicalOperation == "add";
      }
    }
  });

function formatHour(h: number) {
  return `${h}`;
}
</script>

<template>
  <table class="calendar-table">
    <thead>
      <tr>
        <th>Time</th>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(_, timeIndex) in 48" :key="timeIndex">
        <td class="time-label">
          {{ timeIndex % 4 === 0 ? formatHour(Math.floor(timeIndex)) : "" }}
        </td>
        <td
          v-for="(_, dayIndex) in slots"
          :key="`${dayIndex}-${timeIndex}`"
          class="time-slot"
          :class="{
            available: isAvailable(dayIndex, timeIndex),
            overlay: isInSelection(dayIndex, timeIndex),
          }"
          @mousedown="
            startSelection(
              dayIndex,
              timeIndex,
              isAvailable(dayIndex, timeIndex) ? 'subtract' : 'add',
            )
          "
          @mouseup="completeSelection()"
          @mouseover="updateSelectionEnd(dayIndex, timeIndex)"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: sans-serif;
  font-size: 12px;
  user-select: none;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0;
  text-align: center;
}

th {
  background: #f5f5f5;
  height: 24px;
}

.time-label {
  width: 60px;
  background: #f0f0f0;
}

.time-slot {
  height: 10px;
  background: #fff0f0;
  cursor: pointer;
}

.td {
  white-space: nowrap;
  overflow: hidden;
}

td.time-slot.available {
  background-color: green;
}
td.time-slot.overlay {
  background-color: blue;
}
</style>
