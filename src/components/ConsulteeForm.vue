<template>
  <v-form>
    <!-- <div class="my-5">Fill your details to get started</div> -->
    <v-text-field
      v-model="consultee.first_name"
      :error-messages="firstNameErrors"
      placeholder="First name"
      solo
    ></v-text-field>
    <v-text-field
      v-model="consultee.last_name"
      :error-messages="lastNameErrors"
      placeholder="Last name"
      solo
    ></v-text-field>
    <v-text-field
      v-model="consultee.email"
      :error-messages="emailErrors"
      placeholder="E-mail"
      solo
    ></v-text-field>
    <v-text-field
      v-model="consultee.phone_no"
      :error-messages="phoneNoErrors"
      placeholder="Phone No"
      solo
    ></v-text-field>
    <v-row justify="center" align="center">
      <v-btn class="teal darken-5" width="90%" @click="goIn()" large dark>Start</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
export default {
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.consultee.first_name.$dirty) return errors;
      !this.$v.consultee.first_name.required &&
        errors.push("This field is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.consultee.last_name.$dirty) return errors;
      !this.$v.consultee.last_name.required &&
        errors.push("This field is required");
      return errors;
    },
    phoneNoErrors() {
      const errors = [];
      if (!this.$v.consultee.phone_no.$dirty) return errors;
      !this.$v.consultee.phone_no.required &&
        errors.push("Invalid Phone Number");
      !this.$v.consultee.phone_no.maxLength &&
        errors.push("Invalid Phone Number");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.consultee.email.$dirty) return errors;
      !this.$v.consultee.email.email && errors.push("Must be valid e-mail");
      !this.$v.consultee.email.required &&
        errors.push("This field is required");
      return errors;
    },
  },
  data() {
    return {
      consultee: {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
      },
    };
  },
  methods: {
    goIn() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('set_consultee_details', this.consultee);
        this.$router.push({ name: "Home" });
      }
    },
  },
  validations: {
    consultee: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      phone_no: {
        required,
        maxLength: maxLength(10),
      },
      email: {
        required,
        email,
      },
    },
  },
};
</script>

<style>
</style>