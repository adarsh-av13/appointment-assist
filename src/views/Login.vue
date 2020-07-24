<template>
  <v-row style="height: 100%;" justify="center" align="center">
    <v-col cols="5">
      <div class="my-2 overline text-uppercase" style="font-size: 2rem !important;">Login</div>
    </v-col>
    <v-divider class="mx-5" inset vertical></v-divider>
    <v-col cols="5">
      <v-alert v-model="showAlert" transition="fade-transition" type="success" text>Registration Successful. Log in to continue</v-alert>
      <ConsultantLoginForm />
    </v-col>
  </v-row>
</template>

<script>
import ConsultantLoginForm from "@/components/ConsultantLoginForm.vue";
export default {
  components: {
    ConsultantLoginForm,
  },
  mounted(){
    this.showAlert = this.alert;
    setTimeout(function() {
      console.log("okay",this.showAlert);
      this.showAlert = false;
    }, 5000);
  },
  data() {
    return {
      showAlert: false,
    };
  },
  props: {
    alert: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
  }
};
</script>

<style>
</style>