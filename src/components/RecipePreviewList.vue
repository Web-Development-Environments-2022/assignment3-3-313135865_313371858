<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div v-if="no_results">
    No Results!</div>
    <div v-else> 
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    </div>
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
    trigger:{
      type: Number
    },
    searchQuery:{
      type:String,
      required: false
    }
  },
  watch: { 
      	trigger: function() {
          console.log("changed")
          if (this.trigger > 1){
              console.log("Update recipes()")
              this.updateRecipes()
          } // watch it
          
        }
      },
  data() {
    return {
      recipes: [],
      no_results : false
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {

        let response;
        let recipes;
        if (!this.searchQuery){ // Random recipes.
        console.log( "http://localhost:3000" + "/recipes/random")
        response = await this.axios.get("http://localhost:3000" + "/recipes/random",
           //this.$root.store.server_domain
        );

        recipes = response.data.recipes}
        else{ // Search for recipes.
          
        console.log( "http://localhost:3000" + "/recipes/search?searchQuery="+this.searchQuery+"&amount=5")
        response = await this.axios.get("http://localhost:3000" + "/recipes/search?searchQuery="+this.searchQuery+"&amount=5"
        );
        recipes = response.data;
        }

        if (recipes == "No results!"){ // When there are no results.
          this.no_results = true
        }

        else{
          console.log(response);
          this.recipes = [];
          this.recipes.push(...recipes);
          console.log(this.recipes);
        }
        
     
      } catch (error) {
        console.log(error);
       }
    
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>