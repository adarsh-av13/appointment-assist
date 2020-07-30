<template>
  <v-row>
      <v-col>
          <v-row v-for="consultant in consultants" :key="consultant._id">
          <Profile :profile="consultant" />
          </v-row>
      </v-col>
  </v-row>
</template>

<script>
import api from '@/api/index';
import Profile from '@/views/Profile.vue';
export default {
    async created(){
        let result = await api.getAllConsultants();
        this.consultants = result;
        console.log(result);
    },
    components: {
        Profile,
    },
    data() {
        return {
            consultants: [],
        }
    }
}
</script>

<style>

</style>