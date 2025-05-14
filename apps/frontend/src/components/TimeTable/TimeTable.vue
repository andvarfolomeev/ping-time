<script setup lang="ts">
import {
  DaySlotsService,
  type DaySlotsIndex,
  type ParticipantInfo,
} from "@repo/time-slot";
import { computed, defineProps } from "vue";
import { useSelection, type Selection } from "../../composables";
import DaysHeader from "./DaysHeader.vue";
import TimeLabels from "./TimeLabels.vue";
import { useUserStore } from "../../store";
import type { ModelRef } from "vue";

const props = defineProps<{
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update", selection: Selection): void;
  (e: "hover", participants: ParticipantInfo[]): void;
}>();

const model = defineModel<DaySlotsService>() as ModelRef<DaySlotsService>;

const userStore = useUserStore();

const participants = computed(() => model.value.getParticipants());

const {
  isInSelection,
  startSelection,
  completeSelection,
  selection,
  updateSelectionEnd,
  selectionMode,
} = useSelection();

const isAvailable = (index: DaySlotsIndex) => model.value.count(index) > 0;

const mouseDown = (index: DaySlotsIndex) => {
  if (props.disabled) return;
  startSelection(
    index.dayIndex,
    index.timeIndex,
    isAvailable(index) ? "subtract" : "add",
  );
};

const mouseUp = () => {
  if (props.disabled) return;
  if (!selection.value) return;
  const { start, end } = selection.value;
  model.value.fill(
    { dayIndex: start.x, timeIndex: start.y },
    { dayIndex: end.x, timeIndex: end.y },
    userStore.name,
    selectionMode.value == "add",
  );
  completeSelection();
  emits("update", selection.value!);
};

const mouseOver = (index: DaySlotsIndex) => {
  if (!selection.value) {
    emits("hover", model.value.getParticipantsInfo(index));
  }

  if (props.disabled) return;

  updateSelectionEnd(index.dayIndex, index.timeIndex);
};

const getAlpha = (current: number, max: number) => {
  if (max === 0) return 0;
  const alpha = current / max;
  return Math.max(0, Math.min(alpha, 1));
};

const getTimeCellBackgroud = (index: DaySlotsIndex) => {
  if (isInSelection(index.dayIndex, index.timeIndex)) {
    return "#1e90ff";
  }
  const current = model.value.count(index);
  const max = participants.value.size;
  const alpha = getAlpha(current, max);
  return `rgba(76, 175, 80, ${alpha})`;
};
</script>

<template>
  <div class="time-grid-container">
    <div class="time-grid-scroll">
      <div class="time-grid">
        <TimeLabels />

        <div class="days-grid">
          <DaysHeader :days="model.data.map((days) => days.label)" />

          <div class="days-cells">
            <div
              v-for="(day, dayIndex) in model.data"
              :key="day.label"
              class="day-column"
            >
              <div
                v-for="(_, timeIndex) in day.timeSlots"
                :key="timeIndex"
                class="hour-block"
              >
                <div
                  class="time-cell hour-start"
                  :style="{
                    background: getTimeCellBackgroud({ dayIndex, timeIndex }),
                  }"
                  @mousedown="mouseDown({ dayIndex, timeIndex })"
                  @mouseup="mouseUp()"
                  @mouseover="mouseOver({ dayIndex, timeIndex })"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-grid-container {
  flex: 1;
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 24px;
}

.time-grid-scroll {
  height: 100%;
  overflow-y: auto;
}

.time-grid {
  display: flex;
  min-height: min-content;
}

.days-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.days-cells {
  display: flex;
  flex: 1;
}

.day-column {
  flex: 1;
  border-right: 1px solid #ddd;
}

.hour-block {
  display: flex;
  flex-direction: column;
}

.time-cell {
  height: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.1s;
}

.time-cell.hour-start {
  border-bottom: 1px solid #ddd;
}

.time-cell:hover {
  background-color: #e9ecef;
}

.time-cell.selection {
  background-color: #1e90ff;
}
</style>
