<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  created() {
    if (localStorage.eleToken) { //看下tonken是存在吗
      const decode = jwt_decode(localStorage.eleToken);
      const UserId = localStorage.eleUserId
      //token 存到vuex中
      this.$store.dispatch("setAuthentication", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
      this.$store.dispatch("setUserId", UserId);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
