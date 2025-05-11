<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: white;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 8px;
}
</style>
