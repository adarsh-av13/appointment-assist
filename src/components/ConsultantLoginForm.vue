<template>
  <div>
    <v-form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="email"
        placeholder="email"
        @focus="$v.$reset()"
        @blur="$v.email.$touch()"
        required
        solo
      />
      <v-text-field
        v-model="password"
        type="password"
        placeholder="password"
        :error-messages="passwordErrors"
        @focus="$v.$reset()"
        @blur="$v.password.$touch()"
        required
        solo
      ></v-text-field>
      <v-row justify="center">
        <v-btn @click="login" class="teal darken-5" width="90%" large dark>Login</v-btn>
      </v-row>
    </v-form>
    <v-container my-5>
      <v-row justify="center">
        <span>New here?</span>
        <router-link :to="{name: 'Register'}">
          <span class="teal--text text-decoration-underline link">Register</span>
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import api from "@/api/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      showAlert: false,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("This field is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("This field is required");
      !this.$v.password.minLength &&
        errors.push("Password must be atleast 8 characters long");
      return errors;
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let result = await api.login(this.email, this.password);
        if (result.error === false) {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.$emit("errorAlert", result.msg);
        }
      }
    },
  },
};
</script>

<style>
</style>