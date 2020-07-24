<template>
  <v-row align="center" justify="center" style="height: 100%;">
    <v-col cols="5">
      <span class="display-2">appointment assist</span>
    </v-col>

    <v-divider class="mx-5" inset vertical></v-divider>
    <v-col cols="5">
      <ConsulteeForm />
    </v-col>
  </v-row>
</template>

<script>
import ConsulteeForm from "@/components/ConsulteeForm";
export default {
  components: {
    ConsulteeForm,
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