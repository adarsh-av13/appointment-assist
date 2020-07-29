<template>
  <FormBox>
    <v-alert type="info" dense text>
      <v-row justify="space-between">
        <span>Complete your profile to continue</span>
        <v-btn color="blue" @click="saveDetails" small text>Save</v-btn>
      </v-row>
    </v-alert>
    <v-row justify="center">
      <v-col cols="5">
        <!-- <v-img src="@/assets/user.png" class="text-center my-5" height="200px" width="200px" position="center"></v-img> -->
        <v-text-field
          v-model="profile.firstName"
          :error-messages="firstNameErrors"
          label="first name"
          @focus="$v.$reset()"
          placeholder="first name"
          solo
        ></v-text-field>
        <v-text-field
          v-model="profile.lastName"
          :error-messages="lastNameErrors"
          label="last name"
          @focus="$v.$reset()"
          placeholder="last name"
          solo
        ></v-text-field>
        <v-textarea
          v-model="profile.address"
          :error-messages="addressErrors"
          label="address"
          @focus="$v.$reset()"
          placeholder="address"
          solo
        ></v-textarea>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="profile.contactNo"
          :error-messages="contactNoErrors"
          type="number"
          label="contact number"
          @focus="$v.$reset()"
          placeholder="contact number"
          solo
        ></v-text-field>
        <v-row justify="center">
          <span class="gray">Working Days</span>
        </v-row>
        <v-row justify="center">
          <v-checkbox
            v-for="day in days"
            :key="day.day"
            v-model="day.checked"
            class="ma-1"
            :label="day.day"
          ></v-checkbox>
        </v-row>
        <v-row justify="center">
          <span class="grey--text darken-2--text">Working Hours</span>
        </v-row>

        <v-row justify="center">
          <v-col cols="4">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :disabled="!isDaysActive"
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
                  :error-messages="startTimeErrors"
                  :disabled="!isDaysActive"
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
              :disabled="!isDaysActive"
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
                <v-text-field
                  v-model="endTime"
                  :error-messages="endTimeErrors"
                  :disabled="!isDaysActive"
                  label="end time"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
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
  </FormBox>
</template>

<script>
import FormBox from "@/components/FormBox.vue";
import { required, requiredIf, maxLength } from "vuelidate/lib/validators";
import api from "@/api/index";
export default {
  components: {
    FormBox,
  },
  computed: {
    isDaysActive() {
      return this.getActiveDays().length !== 0;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.profile.firstName.$dirty) return errors;
      !this.$v.profile.firstName.required &&
        errors.push("This field is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.profile.lastName.$dirty) return errors;
      !this.$v.profile.lastName.required &&
        errors.push("This field is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.profile.address.$dirty) return errors;
      !this.$v.profile.address.required &&
        errors.push("This field is required");
      !this.$v.profile.address.maxLength &&
        errors.push("Maximum length should be 90");
      return errors;
    },
    contactNoErrors() {
      const errors = [];
      if (!this.$v.profile.contactNo.$dirty) return errors;
      !this.$v.profile.contactNo.required &&
        errors.push("Invalid Phone Number");
      !this.$v.profile.contactNo.maxLength &&
        errors.push("Invalid Phone Number");
      return errors;
    },
    startTimeErrors() {
      const errors = [];
      if (!this.$v.startTime.$dirty) return errors;
      this.isDaysActive &&
        !this.$v.startTime.requiredIf &&
        errors.push("This field is required");
      return errors;
    },
    endTimeErrors() {
      const errors = [];
      if (!this.$v.endTime.$dirty) return errors;
      this.isDaysActive &&
        !this.$v.endTime.requiredIf &&
        errors.push("This field is required");
      return errors;
    },
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      menu1: false,
      menu2: false,
      profile: {
        firstName: "",
        lastName: "",
        address: "",
        contactNo: "",
        activeDays: [],
        startTime: null,
        endTime: null,
      },
      days: [
        {
          day: "Mon",
          checked: false,
        },
        {
          day: "Tue",
          checked: false,
        },
        {
          day: "Wed",
          checked: false,
        },
        {
          day: "Thu",
          checked: false,
        },
        {
          day: "Fri",
          checked: false,
        },
        {
          day: "Sat",
          checked: false,
        },
        {
          day: "Sun",
          checked: false,
        },
      ],
    };
  },
  methods: {
    async saveDetails() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("DA");
        this.profile.activeDays = this.getActiveDays();
        if (this.isDaysActive) {
          this.profile.startTime = this.getTime(this.startTime);
          this.profile.endTime = this.getTime(this.endTime);
        }
        let result = await api.saveProfile(this.profile);
        if (result.error === false) {
          console.log(this.profile);
          this.$router.replace({name: 'Dashboard'});
        }
      }
    },
    getActiveDays() {
      let activeDays = this.days
        .map((day, index) => {
          if (day.checked === true) return index;
        })
        .filter((index) => {
          return index !== undefined;
        });
      return activeDays;
    },
    getTime(time) {
      let timeList = time.split(":");
      let date = new Date();
      date.setHours(timeList[0]);
      date.setMinutes(timeList[1]);
      return date;
    },
  },
  validations: {
    profile: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      address: {
        required,
        maxLength: maxLength(90),
      },
      contactNo: {
        required,
        maxLength: maxLength(10),
      },
    },
    startTime: {
      requiredIf: requiredIf(function () {
        return this.isDaysActive;
      }),
    },
    endTime: {
      requiredIf: requiredIf(function () {
        return this.isDaysActive;
      }),
    },
  },
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>