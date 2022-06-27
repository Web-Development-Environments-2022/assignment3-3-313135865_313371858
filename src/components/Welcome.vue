<template>
  <div>
    <h3>
      Welcome to Cloud Recipe
    </h3>
    <br />
    <h4>
    Sign-up or Login to enjoy a variety of options such as saving recipes to favorites, creating personal and family lists and much more.
    <br>
    </h4>
    <br />
    <b-button href="#" @click="onLogIn" variant="primary"> Login</b-button>
    <b-button href="#" @click="onRegister" variant="primary"> Sign-Up</b-button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    onLogIn() {
      this.$router.replace("/login");
    },
    onRegister() {
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px);
  /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  margin: 5px;
}
</style>
