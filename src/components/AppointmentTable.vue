<template>
  <v-data-table :headers="headers" :items="appointments" :items-per-page="5" class="elevation-1"></v-data-table>
</template>

<script>
import api from "@/api/index";
export default {
  async created() {
    let result = await api.getAppointments();
    this.appointments = result.appointments;
    this.appointments.forEach((appointment) => {
      appointment.date = appointment.date.substr(0,10);
    });
  },
  data() {
    return {
      headers: [
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phone_no" },
        { text: "Token Number", value: "token_no" },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
      ],
      appointments: [],
    };
  },
};
</script>

<style>
</style>