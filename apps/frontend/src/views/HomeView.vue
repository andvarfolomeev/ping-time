<script setup lang="ts">
import { ref } from "vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { useUserStore } from "../store";
import router from "../router";
import { client } from "../api";

const userStore = useUserStore();

const title = ref("");
const username = ref("");

const saveUsername = () => {
  userStore.login(username.value);
};

const createSync = async () => {
  const { id } = await client.sync
    .$post({ json: { title: title.value } })
    .then((res) => res.json());
  router.push(`/sync/${id}`);
};
</script>

<template>
  <div class="home-wrapper">
    <div class="content">
      <h1 class="project-name">Ping Time</h1>
      <div v-if="!userStore.isLoggedIn" class="form">
        <TextInput
          placeholder="Username"
          v-model="username"
          @keyup.enter="saveUsername"
        />
        <Button label="Save" @click="saveUsername" />
      </div>
      <div v-else class="form">
        <TextInput
          placeholder="Sync name"
          v-model="title"
          @keyup.enter="createSync"
        />
        <Button label="Create" @click="createSync" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Arial", sans-serif;
}

.home-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  text-align: center;
}

.project-name {
  font-size: 2rem;
  font-weight: 600;
  color: #4caf50;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
