<template>
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      :timeout="timeout"
      :color="alert.color"
      bottom right
    >
      {{ alert.message }}
<!--      <template v-slot:action="{ attrs }">-->
<!--        <v-btn-->
<!--          color="red"-->
<!--          text-->
<!--          v-bind="attrs"-->
<!--        >-->
<!--          Close-->
<!--        </v-btn>-->
<!--      </template>-->
    </v-snackbar>
</template>

<script>
import {mapState} from "vuex";
export default {
name: "Snackbar.vue",
  data(){
    return{
      multiLine: true,
      timeout: 1500,
      snackbar: true
    }
  },
  computed:{
  ...mapState('app',['alert'])
  }
}
</script>

<style scoped>

</style>
