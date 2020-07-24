<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-row style="height: 100%;" justify="center" align="center">
        <v-card height="80%" width="720px"  class="cyan lighten-5">
            <router-view></router-view>
        </v-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
