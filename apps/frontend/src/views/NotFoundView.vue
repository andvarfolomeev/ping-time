<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/Button.vue";
import router from "../router";

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="not-found-wrapper">
    <div class="content">
      <h1 class="error-code">404</h1>
      <p class="error-message">Page Not Found</p>
      <Button label="Go Home" @click="goHome" />
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Arial", sans-serif;
}

.not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  text-align: center;
}

.error-code {
  font-size: 4rem;
  font-weight: 700;
  color: #757575;
  margin-bottom: 10px;
}

.error-message {
  font-size: 1.5rem;
  color: #757575;
  margin-bottom: 20px;
}
</style>
