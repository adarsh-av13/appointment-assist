<template>
  <FormBox>
    <v-row align="center" justify="center" style="height: 100%;">
      <v-col cols="6" class="form-header">
        <span
              class="text-h4 font-weight-light"
              style="letter-spacing: 0.1rem !important"
            >appointment</span><br />
            <span
              class="text-h3 assist"
              style="letter-spacing: 0.9rem !important;"
            >assist</span>
      </v-col>

      <v-divider class="ml-0 mr-3" inset vertical></v-divider>
      <v-col cols="5">
        <ConsulteeForm />
      </v-col>
    </v-row>
  </FormBox>
</template>

<script>
import ConsulteeForm from "@/components/ConsulteeForm";
import FormBox from "@/components/FormBox.vue";
export default {
  components: {
    ConsulteeForm,
    FormBox,
  },
  data() {
    return {
      formActive: false,
    };
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}

</style>