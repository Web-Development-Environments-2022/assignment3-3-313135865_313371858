<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div id="right">
      <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
    </div>

    <div id="left">
      <RecipePreviewList
        v-if="$root.store.username"
        title="Last Viewed Recipes"
        :class="{
          RandomRecipes: true,
          center: true,
        }"
        disabled
      >
      </RecipePreviewList>
      
      <Welcome v-else> </Welcome>
    </div>
    <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    ></div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Modal from "../components/Modal";
import Welcome from "../components/Welcome.vue";
export default {
  components: {
    RecipePreviewList,
    Welcome,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

#container {
  width: 100%;
}
#left {
  float: left;
  width: 500px;
}
#right {
  float: right;
  width: 500px;
}
</style>
