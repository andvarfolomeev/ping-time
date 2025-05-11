<script setup lang="ts">
import { defineModel } from "vue";

const model = defineModel<string>();
</script>

<template>
  <input type="text" v-model="model" class="input" v-bind="$attrs" />
</template>

<style scoped>
.input {
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  outline: none;
}

.input:focus {
  border-color: #4caf50;
}
</style>
