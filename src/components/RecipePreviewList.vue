<template>
  <b-container>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
      <div v-if="no_results">
        No Results!
      </div>
      <div v-else>
        <b-row>
          <b-row v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
          </b-row>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    trigger: {
      type: Number,
    },
    searchQuery: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    cuisine: {
      type: String,
      required: false,
    },
    diet: {
      type: String,
      required: false,
    },
    intolerance: {
      type: String,
      required: false,
    },
    sort: {
      type:String,
      required : false
    },

  },
  watch: {
    trigger: function() {
      console.log("changed");
      if (this.trigger > 1) {
        console.log("Update recipes()");
        this.updateRecipes();
      } // watch it
    },
  },
  data() {
    return {
      recipes: [],
      no_results: false,
      loading : true
    };
  },
  created(){
    console.log("created")
    console.log(this.loading)
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      this.no_results = false;
      this.loading = true;
      try {
        if (this.title == "Explore This Recipes") {
          // Random recipes.
         await this.randomRecipes();
        } else if (this.title == "Search results") {
          // Search for recipes.
          await this.searchRecipes();
        } else if (this.title == "Favorite Recipes") {
          await this.favoriteRecipes();
        } else if (this.title == "Personal Recipes") {
          await this.personalRecipes();
        } else if (this.title == "Family Recipes") {
          await this.familyRecipes();
        } else if (this.title == "Last Watched Recipes") {
          await this.lastViewedRecipes();
        }
         this.loading = false
         console.log("loading has been reset")
        
      } catch (error) {
        console.log(error);
      }
    },
    async randomRecipes() {
      let response;
      let recipes;
      console.log(this.$root.store.server_domain + "/recipes/random");
      response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/random",
        { withCredentials: true }
        //this.$root.store.server_domain
      );

      recipes = response.data.recipes;
      console.log(response);
      this.recipes = [];
      this.recipes.push(...recipes);
      console.log(this.recipes);
    },

    async searchRecipes() {
      let response;
      let recipes;
      console.log(
        this.$root.store.server_domain +
          "/recipes/search?searchQuery=" +
          this.searchQuery +
          "&amount=" +
          this.amount +
          "&cuisine=" +
          this.cuisine +
          "&diet=" +
          this.diet +
          "&intolerance=" +
          this.intolerance +
          "&sort=" +
          this.sort,
        { withCredentials: true }
      );
      response = await this.axios.get(
        this.$root.store.server_domain +
          "/recipes/search?searchQuery=" +
          this.searchQuery +
          "&amount=" +
          this.amount +
          "&cuisine=" +
          this.cuisine +
          "&diet=" +
          this.diet +
          "&intolerance=" +
          this.intolerance +
          "&sort=" +
          this.sort,
        { withCredentials: true }
      );
      recipes = response.data;

      if (recipes == "No results!") {
        // When there are no results.
        this.no_results = true;
      } else {
        console.log(response);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes)

      }
    },
    async favoriteRecipes() {
      let response;
      let recipes;
      console.log(this.$root.store.server_domain + "/users/favorites");
      response = await this.axios.get(this.$root.store.server_domain + "/users/favorites", {
        withCredentials: true,
      });

      recipes = response.data;
      console.log(response);
      this.recipes = [];
      this.recipes.push(...recipes);
      console.log(this.recipes);
    },
    async personalRecipes() {
      let response;
      let recipes;
      console.log(this.$root.store.server_domain +
       "/users/personalRecipe");

      response = await this.axios.get(
        this.$root.store.server_domain + "/users/personalRecipe",
        { withCredentials: true }
      );

      recipes = response.data;
      console.log(response);
      this.recipes = [];
      this.recipes.push(...recipes);
      console.log(this.recipes);
    },
    async familyRecipes() {
      let response;
      let recipes;
      console.log(this.$root.store.server_domain + "/users/familyRecipes");
      response = await this.axios.get(
        this.$root.store.server_domain + "/users/familyRecipes",
        { withCredentials: true }
      );

      recipes = response.data;
      console.log(response);
      this.recipes = [];
      this.recipes.push(...recipes);
      console.log(this.recipes);
    },
    async lastViewedRecipes() {
      let response;
      let recipes;
      console.log(this.$root.store.server_domain + "/users/getLastSeen");

      response = await this.axios.get(
        this.$root.store.server_domain + "/users/getLastSeen",
        { withCredentials: true }
      );

      recipes = response.data;
      console.log(response);
      this.recipes = [];
      this.recipes.push(...recipes);
      console.log(this.recipes);
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.row {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px;
  margin-left: -15px;
}
</style>
