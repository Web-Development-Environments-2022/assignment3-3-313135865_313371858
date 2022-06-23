<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            {{recipe.instructions}}
            <ul>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },

  
  async created() {
    try {
      let response;
      try {

        console.log("http://localhost:3000/users/personalRecipe")
        response = await this.axios.get("http://localhost:3000/users/personalRecipe");
        console.log(response)


      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }


      var result = response.data.filter(obj => {
        return obj.id === this.$route.params.recipeId
        })

      this.recipe = result[0]

      console.log(this.recipe)
      console.log(this.recipe.title)
    //   this.recipe =  {
    //     instructions,
    //     extendedIngredients,
    //     popularity,
    //     readyInMinutes,
    //     image,
    //     title
    //   } = result;

    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
