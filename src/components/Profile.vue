<template>
  <v-row justify="end">
    <v-col cols="12">
      <v-row align="center" class="px-2">
        <v-col>
          <v-row align="center" class="px-2">
            <div
              class="text-overline mx-5"
              style="font-size: 2rem !important; font-weight: 300;"
            >{{profile.first_name + ' ' + profile.last_name }}</div>
            <span
              class="body-1 cyan darken-3 white--text"
              style="font-size: 1rem !important; font-weight: 300; border-radius: 0.5rem; padding: 0.1rem;"
            >{{profile.field}}</span>
          </v-row>
        </v-col>
        <v-btn v-if="!isAuthenticated" @click="$emit('bookClick')" class="cyan--text" depressed>Book</v-btn>
        <v-btn v-else depressed>Edit</v-btn>
      </v-row>

      <v-row align="center" class="mx-5">
        <v-col cols="5" class="py-1">
          <v-row align="center">
            <v-icon size="1rem" color="cyan darken-3">mdi-phone</v-icon>
            <span
              class="body-1 mx-2"
              style="font-size: 1rem !important; font-weight: 300;"
            >{{profile.phone_no}}</span>
          </v-row>
        </v-col>
        <v-col cols="7" class="py-1">
          <v-row class="mx-1" justify="end" align="center">
            <span
              class="body-1"
              style="font-size: 1rem !important; font-weight: 300 !important"
              ma-3
            >Active Days:</span>
            <span v-for="(day, index) in days" :key="day">
              <v-icon v-if="isActive(index)" color="green" size="1rem">mdi-square</v-icon>
              <v-icon v-else size="1rem">mdi-square</v-icon>
            </span>
          </v-row>
        </v-col>
      </v-row>

      <v-row align="center" class="mx-5 my-0">
        <v-col cols="5" class="py-1">
          <v-row align="center">
            <v-icon size="1rem" color="cyan darken-3">mdi-google-maps</v-icon>
            <span
              class="body-1 mx-2"
              style="font-size: 1rem !important; font-weight: 300;"
            >{{profile.address}}</span>
          </v-row>
        </v-col>
        <v-col cols="7" class="py-1">
          <v-row class="mx-1" justify="end" align="center">
            <div
              class="body-1"
              style="font-size: 1rem !important; font-weight: 300 !important"
              ma-3
            >Active Hours:</div>
            <span
              class="body-1"
              style="font-size: 1rem !important; font-weight: 500 !important"
            >{{profile.start_time}} to {{profile.end_time}}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  created() {
    let date = new Date(this.profile.start_time.toString());
    let hours = date.getHours();
    if (hours < 0) hours = "0" + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    this.profile.start_time = hours + ":" + mins;
    date = new Date(this.profile.end_time.toString());
    hours = date.getHours();
    if (hours < 0) hours = "0" + hours;
    mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    this.profile.end_time = hours + ":" + mins;
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  methods: {
    isActive(index) {
      return this.profile.active_days.indexOf(index) !== -1;
    },
    getTime() {},
  },
  props: {
    profile: Object,
  },
};
</script>


