<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    if (!this.user.isAuthenticated) {
      this.$router.replace("/signin");
    } else {
      this.$router.replace("/dashboard/analytics");
    }
  },
  methods: {
    ...mapActions("app", ["user"])
  }
};
</script>
