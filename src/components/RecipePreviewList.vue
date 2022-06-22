<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    previewType:{
      type:String,
      required: false
    },
    searchQuery:{
      type:String,
      required: false
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
    console.log("test monuted")
  },
  methods: {
    async updateRecipes() {
      try {
        let response;
        let recipes;
        if (!this.previewType){
        console.log( "http://localhost:3000" + "/recipes/random")
        response = await this.axios.get("http://localhost:3000" + "/recipes/random",
           //this.$root.store.server_domain
        );
        recipes = response.data.recipes}
        else{
        console.log( "http://localhost:3000" + "/recipes/search?searchQuery="+this.searchQuery+"&amount=5")
        response = await this.axios.get("http://localhost:3000" + "/recipes/search?searchQuery="+this.searchQuery+"&amount=5"
        );
        recipes = response.data.results;
        }
        console.log(response);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
       }
      // try {
      //   console.log( "http://localhost:3000" + "/recipes/random")
      //   const response = await this.axios.get(
      //      "http://localhost:3000" + "/recipes/random",
      //      //this.$root.store.server_domain
      //   );
      //   console.log(response);
      //   const recipes = response.data.recipes;
      //   this.recipes = [];
      //   this.recipes.push(...recipes);
      //   console.log(this.recipes);
      // } catch (error) {
      //   console.log(error);
      // }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
