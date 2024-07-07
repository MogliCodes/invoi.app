<template>
  <FullCalendar v-if="!pending" :options="calendarOptions" />
  <UModal v-model="isOpen">
    <template #default>
      <section class="p-5">
        <BaseHeadline text="Add time slot" type="h2" />
        <div class="flex flex-col gap-5">
          <div>
            <label for="">Client</label>
            <USelect
              v-model="selectedClient"
              placeholder="Select client"
              :options="clients as Array<unknown>"
              value-attribute="_id"
              option-attribute="company"
              @change="handleClientChange"
            >
              <template #leading>
                {{ selectedClient?.company }}
              </template>
            </USelect>
          </div>
          <div v-if="selectedClient">
            <label for="">Projects</label>
            <USelect
              v-model="selectedProject"
              placeholder="Select client"
              :options="projectsPerClient"
              option-attribute="title"
              value-attribute="_id"
              @change="handleClientChange"
            >
              <template #label>
                {{ selectedClient?.company }}
              </template>
            </USelect>
          </div>
          <div v-if="selectedClient">
            <label for="">Service</label>
            <USelect
              v-model="selectedTask"
              placeholder="Select client"
              :options="services"
              option-attribute="name"
              value-attribute="_id"
              @change="handleClientChange"
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

<script setup lang="ts">
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuthStore } from "~/stores/auth.store";

const isOpen = ref(false);
const selectedClient = ref();
const selectedProject = ref();
const selectedTask = ref();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const projectsPerClient = ref();

const { data: clients } = useFetch<Array<Client>>(
  `${backendBaseUrl}/restapi/client`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

const { data: projects } = useFetch("/api/clients/projects/get", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const { data: services } = useFetch(`/api/services/`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    Userid: authStore.userId,
  },
});

const {
  data: timeRecords,
  pending,
  refresh,
} = useFetch("/api/time-records/get", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

if (!timeRecords.value) {
  // rerender fullcalendar
}

if (!timeRecords.value) {
  timeRecords.value = [];
}

type TimeRecord = {
  _id: string;
  clientId: string;
  projectId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
};

type TimeRecordInfo = {
  start: Date;
  end: Date;
  allDay: boolean;
  view: any;
  event: any;
};

function getClientName(clientId: string) {
  const client = clients?.value?.find(
    (client: Client) => client._id === clientId
  );
  return client?.company;
}

function getProjectName(projectId: string) {
  const project = projects?.value?.find(
    (project: any) => project._id === projectId
  );
  return project?.title;
}

function getServiceName(serviceId: string) {
  const service = services?.value?.find(
    (service: any) => service._id === serviceId
  );
  return service?.name;
}

async function handleClientChange() {
  console.log("Client changed:", selectedClient.value);
  projectsPerClient.value = await $fetch(
    `/api/clients/projects/client/${selectedClient.value}/get`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
    }
  );
}

const formattedTimeRecords = timeRecords.value.map((record: TimeRecord) => {
  console.log("Record:", record.startTime);
  const formattedRecord = {
    ...record,
    id: record._id,
    start: record.startTime,
    end: record.endTime,
    client: getClientName(record.clientId),
    project: getProjectName(record.projectId),
    task: getServiceName(record.serviceId),
  };
  console.log("Formatted Record:", formattedRecord);
  return formattedRecord;
});
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
  events: formattedTimeRecords, // initial events, can be empty
  eventContent: renderEventContent, // function to render custom event content
});
const slotStart = ref();
const slotEnd = ref();
const slotAllDay = ref();

function handleDateSelect(info: TimeRecordInfo) {
  if (!info.start || !info.end) return;
  isOpen.value = true;
  slotStart.value = info.start;
  slotEnd.value = info.end;
  slotAllDay.value = info.allDay;
  info.view.calendar.unselect(); // clear date selection
}

async function submitTimeSlot() {
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
        client: getClientName(client),
        project: getProjectName(project),
        task: getServiceName(task),
      },
      color: "#3836BA",
      textColor: "white",
    };

    const eventBody = {
      userId: authStore.userId,
      clientId: client,
      projectId: project,
      serviceId: task,
      startTime: slotStart.value,
      endTime: slotEnd.value,
    };

    await $fetch("/api/time-records", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventBody),
    });

    // Add the new event to the calendar
    calendarOptions.value.events.push(newEvent);

    // Optionally, you can call a method to save the event to a server here
  }
  isOpen.value = false;
  console.table(calendarOptions.value.events);
}

async function handleEventChange(info: TimeRecordInfo) {
  console.log("Event changed:", info);
  const event = calendarOptions.value.events.find(
    (event: TimeRecord) => event._id === info.event.id
  );
  console.log("Event:", event);
  const index = calendarOptions.value.events.indexOf(event);
  event.start = info?.event.start;
  event.end = info?.event.end;
  calendarOptions.value.events.splice(index, 1, event);

  const eventBody = {
    userId: authStore.userId,
    clientId: event.clientId,
    projectId: event.projectId,
    serviceId: event.serviceId,
    startTime: event.start,
    endTime: event.end,
  };

  await $fetch(`/api/time-records/${event._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventBody),
  });

  refresh();
}

function renderEventContent(info: TimeRecordInfo) {
  // Custom rendering for event content
  const { client, project, task } = info.event.extendedProps;

  return {
    html: `
      <div class="fc-event-title line-clamp-1">${client}</div>
      <div class="fc-event-title">${project}</div>
      <div class="fc-event-title text-secondary-30">${task}</div>
    `,
  };
}

console.table(calendarOptions.value.events);
</script>

<style>
.fc-v-event {
  background-color: #3836ba;
  border: none;
  padding: 4px;
  @apply rounded-l-none;
  @apply rounded-r-lg;
}
.fc-event-title {
  font-size: 0.9rem;
}

.fc-v-event .fc-event-title:first-child {
  font-weight: bold;
}

.fc-v-event .fc-event-title:nth-child(3) {
  font-style: italic;
}
</style>
