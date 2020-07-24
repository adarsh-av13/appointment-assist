<template>
  <nav>
    <v-toolbar class="cyan darken-3" dark>
      <v-toolbar-title>
        <router-link class="white--text text-decoration-none" :to="{name: 'Home'}">
          <div class="logo">
            <span class="headline font-weight-light" style="letter-spacing: 0.1rem !important">appointment</span>
            <span class="text-h4 assist" style="letter-spacing: 0.7rem !important; line-height: 1rem !important">assist</span>
          </div>
        </router-link>
      </v-toolbar-title>
      <!-- <v-toolbar-items> -->
      <v-spacer></v-spacer>
      <router-link :to="{name: 'Register'}">
        <v-btn class="text--white text-decoration-underline" text>Register as a Consultant</v-btn>
      </router-link>
      <router-link :to="{name: 'Login'}">
        <v-btn class="text--white text-decoration-underline" text>Login as a Consultant</v-btn>
      </router-link>
      <!-- </v-toolbar-items> -->
    </v-toolbar>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.assist {
  margin-right: 0.1rem;
  margin-left: 0.1rem;
}
</style>