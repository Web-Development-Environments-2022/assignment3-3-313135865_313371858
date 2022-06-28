<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Main Page </router-link>|
      <router-link :to="{ name: 'search' }">Search </router-link>|
      <router-link :to="{ name: 'about' }">About Us </router-link>|
      <span v-if="!$root.store.username">
        <router-link :to="{ name: 'register' }">Register </router-link>|
        <router-link :to="{ name: 'login' }">Login </router-link>|
      </span>
      <span v-else>
        <router-link :to="{ name: 'favorites' }">Favorite Recipes </router-link>|
        <router-link :to="{ name: 'personal' }">Personal Recipes </router-link>|
        <router-link :to="{ name: 'family' }">Family Recipes </router-link>|
        <div id="right">
          Guest: {{ $root.store.username }}
          <button
            type="button"
            class="btn btn-primary"
            style="
        height: 20px;
        line-height: 3px;"
            @click="Logout"
          >
            Logout
          </button>
        </div>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      this.$root.store.logout();
      try {
        const response = await this.axios.post(
          //TODO: need to change to the domain name and the address
          this.$root.store.server_domain + "/Logout"
        );
      } catch {
        this.$forceUpdate();
      }
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#right {
  float: right;
  width: 200px;
}
</style>
