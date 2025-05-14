<script setup lang="ts">
import { ref } from "vue";
import { DaySlotsService, type ParticipantInfo } from "@repo/time-slot";
import TimeTable from "../components/TimeTable/TimeTable.vue";
import Tabs from "../components/Tabs.vue";
import Sidebar from "../components/Sidebar.vue";
import ParticipantsList from "../components/ParticipantsList.vue";
import { onMounted } from "vue";
import { client } from "../api";
import { useUserStore } from "../store";
import { onUnmounted } from "vue";
import router from "../router";
import Button from "../components/Button.vue";

const props = defineProps<{ id: string }>();

const eventName = ref("");

let userActivity = ref(new DaySlotsService());
let groupActivity = ref(DaySlotsService.createSeeded());

const userStore = useUserStore();

const tabs = ref([
  {
    title: "My Activity",
    name: "my-activity",
  },
  {
    title: "Group Activity",
    name: "group-activity",
  },
]);

const onChangeTimeTable = async (): Promise<void> => {
  await client.sync[":id"].$patch({
    param: { id: props.id },
    header: { username: userStore.name },
    json: userActivity.value.data,
  });
  await updateData();
};

const updateData = async () => {
  const response = await client.sync[":id"].$get({ param: { id: props.id } });
  if (response.status == 404) {
    router.push("/not-found");
    return;
  }
  const { title, daySlots } = await response.json();
  eventName.value = title;
  groupActivity.value = new DaySlotsService(daySlots);
  userActivity.value = groupActivity.value.extractUserActivity(userStore.name);
};

onMounted(updateData);

const participants = ref<ParticipantInfo[]>();
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="event-name">{{ eventName }}</h1>
    </header>

    <div class="main-content">
      <Tabs :tabs="tabs">
        <template #my-activity>
          <TimeTable v-model="userActivity" @update="onChangeTimeTable" />
          <Sidebar></Sidebar>
        </template>
        <template #group-activity>
          <TimeTable
            :disabled="true"
            v-model="groupActivity"
            @update="onChangeTimeTable"
            @hover="
              (timeSlotParticipants) => (participants = timeSlotParticipants)
            "
          />
          <Sidebar>
            <Button label="Update table" @click="updateData" />
            <ParticipantsList :participants="participants" />
          </Sidebar>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Arial", sans-serif;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #4caf50;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.event-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
