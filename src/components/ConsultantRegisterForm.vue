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
      />
      <v-text-field
        v-model="confirmPwd"
        type="password"
        placeholder="confirm password"
        :error-messages="confirmPasswordErrors"
        @focus="$v.$reset()"
        @blur="$v.confirmPwd.$touch()"
        required
        solo
      />
      <v-row justify="center">
        <v-btn class="teal darken-5" @click="register" width="90%" large dark>Register</v-btn>
      </v-row>
    </v-form>
    <v-container my-5>
      <v-row justify="center">
        <span>Already A User? &nbsp; &#160;</span>
        <router-link :to="{name: 'Login'}">
          <span class="teal--text text-decoration-underline link">Login</span>
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import api from "@/api/index";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPwd: "",
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
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPwd.$dirty) return errors;
      !this.$v.confirmPwd.required && errors.push("This field is required");
      !this.$v.confirmPwd.sameAsPassword &&
        errors.push("Passwords do not match");
      return errors;
    },
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let result = await api.register(this.email, this.password);
        if (result.error == false) {
          this.$router.push({ name: "Login", params: { alert: true } });
        } else {
          this.$emit("errorAlert", result.msg);
        }
      }
    },
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPwd: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>

<style>
</style>