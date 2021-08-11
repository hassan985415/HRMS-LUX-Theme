<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    if (!this.user.isAuthenticated) {
      this.$router.replace("/signin");
    } else {
      this.$router.replace("/dashboard/analytics");
    }
  },
  computed : {
    ...mapState('app',['user'])
  },
};
</script>
