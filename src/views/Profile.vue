<template>
  <FormBox>
    <v-row justify="center">
      <v-col cols="5">
        <!-- <v-img src="@/assets/user.png" class="text-center my-5" height="200px" width="200px" position="center"></v-img> -->
        <v-text-field v-model="profile.firstName" disabled solo></v-text-field>
        <v-text-field v-model="profile.lastName" disabled solo></v-text-field>
        <v-textarea v-model="profile.address" disabled solo></v-textarea>
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="profile.contactNo" disabled solo></v-text-field>
      </v-col>
    </v-row>
  </FormBox>
</template>

<script>
import api from '@/api/index'
export default {
  async created() {
    let result = await api.getProfile();
    if(result.error === false) {
      this.profile.firstName = result.firstName;
      this.profile.lastName = result.lastName;
      this.profile.contactNo = result.contactNo;
      this.profile.address = result.address;
    }
  },
  data() {
    return {
      profile: {
        firstName: "",
        lastName: "",
        address: "",
        contactNo: "",
        activeDays: [],
        startTime: '',
        endTime: '',
      },
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
};
</script>