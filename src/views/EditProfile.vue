<template>
  <div>
    <v-alert type="info" dense text>
      <v-row justify="space-between">
        <span>Complete your profile to continue</span>
        <v-btn color="blue" @click="saveDetails" small text>Save</v-btn>
      </v-row>
    </v-alert>
    <v-row justify="center">
      <v-col cols="5">
        <!-- <v-img src="@/assets/user.png" class="text-center my-5" height="200px" width="200px" position="center"></v-img> -->
        <v-text-field v-model="firstName" placeholder="first name" solo></v-text-field>
        <v-text-field v-model="lastName" placeholder="last name" solo></v-text-field>
        <v-textarea v-model="address" placeholder="address" solo></v-textarea>
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="contactNo" placeholder="contact number" solo></v-text-field>
        <v-row justify="center">
          <span class="gray">Working Days</span>
        </v-row>
        <v-row justify="center">
          <v-checkbox v-for="day in days" :key="day.day" v-model="day.checked" class="ma-1" :label="day.day">day</v-checkbox>
        </v-row>
        <v-row justify="center">
          <span class="grey--text darken-2--text">Working Hours</span>
        </v-row>

        <v-row justify="center">
          <v-col cols="4">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-left="150"
              :nudge-top="300"
              :return-value.sync="startTime"
              transition="scale-transition"
              offset-y
              width="250px"
              min-width="250px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startTime"
                  label="start time"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu1"
                v-model="startTime"
                full-width
                @click:minute="$refs.menu1.save(startTime)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-left="150"
              :nudge-top="300"
              :return-value.sync="endTime"
              transition="scale-transition"
              offset-y
              width="250px"
              min-width="250px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="endTime" label="end time" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="endTime"
                full-width
                @click:minute="$refs.menu2.save(endTime)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      address: "",
      contactNo: "",
      startTime: null,
      endTime: null,
      menu1: false,
      menu2: false,
      days: [
        {
          day: "Mon",
          checked: false  
        },
        {
          day: "Tue",
          checked: false  
        },
        {
          day: "Wed",
          checked: false  
        },
        {
          day: "Thu",
          checked: false  
        },
        {
          day: "Fri",
          checked: false  
        },
        {
          day: "Sat",
          checked: false  
        },
        {
          day: "Sun",
          checked: false  
        }
      ]
    };
  },
  methods: {
    saveDetails() {
      console.log(
        this.firstName,
        this.lastName,
        this.address,
        this.contactNo
      );
      console.log(this.startTime, this.endTime);
      console.log(this.days);
    },
  },
};
</script>

<style>
</style>