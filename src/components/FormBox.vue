<template>
  <v-row style="height: 100%;" justify="center" align="center">
    <v-card height="80%" width="720px" class="cyan lighten-5 pa-5" outlined>
        <slot></slot>
    </v-card>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
.form-header{
  padding: 50px;
}
</style>