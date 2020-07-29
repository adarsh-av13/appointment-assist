<template>
  <FormBox>
    <v-row style="height: 100%;" justify="center" align="center">
      <v-col cols="5">
        <div
          class="my-2 overline text-uppercase"
          style="font-size: 2rem !important;"
        >Create a New Account</div>
      </v-col>
      <v-divider class="mx-5" inset vertical></v-divider>
      <v-col cols="5">
        <v-alert v-model="showAlert" transition="fade-transition" type="error" text>{{error}}</v-alert>
        <ConsultantRegisterForm @errorAlert="displayAlert" />
      </v-col>
    </v-row>
  </FormBox>
</template>

<script>
import ConsultantRegisterForm from "@/components/ConsultantRegisterForm.vue";
import FormBox from "@/components/FormBox.vue";
export default {
  components: {
    ConsultantRegisterForm,
    FormBox,
  },
  data() {
    return {
      error: "",
      showAlert: false,
    };
  },
  methods: {
    displayAlert(msg) {
      this.showAlert = true;
      this.error = msg;
    }
  }
};
</script>

<style>
</style>