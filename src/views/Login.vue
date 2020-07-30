<template>
  <FormBox>
    <v-row style="height: 100%;" justify="center" align="center">
      <v-col cols="6">
        <div class="my-2 overline text-uppercase form-header text-center" style="font-size: 2rem !important;">Login</div>
      </v-col>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-col cols="5">
        <v-alert v-model="showAlert" transition="fade-transition" type="success" text>
          Registration Successful.
          <br />Log in to continue
        </v-alert>
        <v-alert v-model="errorDisplay" transition="fade-transition" type="error" text>
          {{error}}
        </v-alert>
        <ConsultantLoginForm @errorAlert="displayAlert" />
      </v-col>
    </v-row>
  </FormBox>
</template>

<script>
import ConsultantLoginForm from "@/components/ConsultantLoginForm.vue";
import FormBox from "@/components/FormBox.vue";
export default {
  components: {
    ConsultantLoginForm,
    FormBox,
  },
  mounted() {
    this.showAlert = this.alert;
  },
  data() {
    return {
      showAlert: false,
      errorDisplay: false,
      error: ''
    };
  },
  props: {
    alert: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    displayAlert(msg) {
      this.errorDisplay = true;
      this.error = msg;
    }
  },
};
</script>

<style>
</style>