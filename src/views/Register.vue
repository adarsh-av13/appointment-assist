<template>
  <v-row style="height: 100%;" justify="center" align="center">
    <v-col cols="5">
      <div class="my-2 overline text-uppercase" style="font-size: 2rem !important;">Create a New Account</div>
    </v-col>
    <v-divider class="mx-5" inset vertical></v-divider>
    <v-col cols="5">
      <ConsultantRegisterForm />
    </v-col>
  </v-row>
</template>

<script>
import ConsultantRegisterForm from "@/components/ConsultantRegisterForm.vue";
export default {
  components: {
    ConsultantRegisterForm,
  },
};
</script>

<style>
</style>