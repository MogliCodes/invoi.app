<template>
  <FullCalendar :options="calendarOptions" />
  <UModal v-model="isOpen">
    <template #default>
      <section class="p-5">
        <BaseHeadline text="Add time slot" type="h2" />
        <div class="flex flex-col gap-5">
          <div>
            <label for="">Client</label>
            <USelect
              @change="handleClientChange"
              v-model="selectedClient"
              placeholder="Select client"
              :options="clients"
              value-attribute="_id"
              option-attribute="company"
            >
              <template #label>
                {{ selectedClient?.company }}
              </template>
            </USelect>
          </div>
          <div v-if="selectedClient">
            <label for="">Projects</label>
            <USelect
              @change="handleClientChange"
              v-model="selectedProject"
              placeholder="Select client"
              :options="projects"
              option-attribute="title"
              value-attribute="_id"
            >
              <template #label>
                {{ selectedClient?.company }}
              </template>
            </USelect>
          </div>
          <div v-if="selectedClient">
            <label for="">Service</label>
            <USelect
              @change="handleClientChange"
              v-model="selectedTask"
              placeholder="Select client"
              :options="['Design', 'Development', 'Testing']"
              value-attribute="company"
            >
              <template #label>
                {{ selectedClient?.company }}
              </template>
            </USelect>
          </div>
          <BaseButton text="Save" @click="submitTimeSlot" />
        </div>
      </section>
    </template>
  </UModal>
</template>

<script setup>
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuthStore } from "~/stores/auth.store";

const isOpen = ref(false);
const selectedClient = ref(null);
const selectedProject = ref(null);
const selectedTask = ref(null);
const showProjects = ref(false);

const authStore = useAuthStore();
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: clients } = useFetch(`${backendBaseUrl}/restapi/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const projects = ref();

async function handleClientChange() {
  console.log("Client changed:", selectedClient.value);
  const response = await $fetch(
    `/api/clients/projects/client/${selectedClient.value}/get`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
    }
  );
  projects.value = response;
}

const calendarOptions = ref({
  plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "timeGridWeek,timeGridDay",
  },
  selectable: true, // enable selection
  editable: true, // enable event dragging and resizing
  select: handleDateSelect,
  eventDrop: handleEventChange,
  eventResize: handleEventChange,
  events: [], // initial events, can be empty
  eventContent: renderEventContent, // function to render custom event content
});

const slotStart = ref(null);
const slotEnd = ref(null);
const slotAllDay = ref(null);
const info = ref(null);

function handleDateSelect(info) {
  isOpen.value = true;
  slotStart.value = info.start;
  slotEnd.value = info.end;
  slotAllDay.value = info.allDay;
  info.view.calendar.unselect(); // clear date selection
}

function submitTimeSlot() {
  // Prompt the user for event details
  const client = selectedClient.value;
  const project = selectedProject.value;
  const task = selectedTask.value;

  if (client && project && task) {
    // Create a new event with additional properties
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${client} - ${project} - ${task}`,
      start: slotStart.value,
      end: slotEnd.value,
      allDay: slotAllDay.value,
      extendedProps: {
        client,
        project,
        task,
      },
      color: "#3836BA",
      textColor: "white",
    };

    // Add the new event to the calendar
    calendarOptions.value.events.push(newEvent);

    // Optionally, you can call a method to save the event to a server here
  }
  isOpen.value = false;
}

function handleEventChange(info) {
  console.log("Event changed:", info);
  console.log(info.event.id);
  const event = calendarOptions.value.events.find(
    (event) => event.id === info.event.id
  );
  const index = calendarOptions.value.events.indexOf(event);
  console.log("Event changed:", event);
  console.log("Event changed:", index);

  event.start = info?.event.start;
  event.end = info?.event.end;
  console.log("Event changed:", event);
  calendarOptions.value.events.splice(index, 1, event);
}

function renderEventContent(info) {
  // Custom rendering for event content
  const { client, project, task } = info.event.extendedProps;

  return {
    html: `
      <div class="fc-event-title">${client}</div>
      <div class="fc-event-title">${project}</div>
      <div class="fc-event-title">${task}</div>
    `,
  };
}
</script>

<style>
/* Optional: Add custom styles for event rendering */
.fc-event-title {
  font-size: 0.85em;
  font-weight: bold;
}
</style>
