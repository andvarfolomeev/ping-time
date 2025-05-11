<script setup lang="ts">
import { computed, ref } from "vue";

const { tabs } = defineProps<{
  tabs: {
    name: string;
    title: string;
  }[];
}>();

const activeTabName = ref(tabs.at(0)?.name);
</script>

<template>
  <div class="vertical-tabs">
    <button
      class="tab-button"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeTabName = tab.name"
      :class="{ active: activeTabName == tab.name }"
    >
      <span class="vertical-text">{{ tab.title }}</span>
    </button>
  </div>
  <template v-for="(tab, index) in tabs" :key="index">
    <template v-if="activeTabName == tab.name">
      <slot
        :name="tab.name"
        class="tab-content"
        :class="{
          active: true,
        }"
      ></slot>
    </template>
  </template>
</template>

<style scoped>
.vertical-tabs {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  width: 48px;
  position: relative;
  z-index: 1;
}

.tab-button {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  padding: 16px 4px;
  background: none;
  border: none;
  border-left: 2px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.2s;
  white-space: nowrap;
  min-height: 120px;
}

.tab-button:hover {
  color: #2c3e50;
  background-color: #eee;
}

.tab-button.active {
  color: #4caf50;
  border-left-color: #4caf50;
  background-color: white;
  font-weight: 500;
}

.vertical-text {
  display: inline-block;
}
</style>
