<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <div v-if="!this.favorite">
          <b-button href="#" @click="addToFavorites()" variant="primary">
            Add to favorites</b-button
          >
        </div>
        <div v-else>
          <b-button href="#" @click="removeFromFavorites()" variant="sub">
            Remove from favorites</b-button
          >
        </div>
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
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
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
  components: {},
  data() {
    return {
      recipe: null,
      favorite: false,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        console.log(
         this.$root.store.server_domain + "/recipes/recipeFullDetails?recipeId=" +
            this.$route.params.recipeId
        );
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/recipeFullDetails?recipeId=" +
            this.$route.params.recipeId,
          { withCredentials: true }
        );
        // "https://test-for-3-2.herokuapp.com/recipes/info",

        // this.$root.store.server_domain + "/recipes/info",
        // {
        //   params: { id: this.$route.params.recipeId }
        // }

        // console.log("response.status", response.status);

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response);
      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      } = response.data;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      };

      this.recipe = _recipe;
      this.checkIfFavorite();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addToFavorites() {
      let response;
      const recipe = { recipeId: this.$route.params.recipeId };
      console.log(recipe);
      console.log(this.$root.store.server_domain + "/users/favorites");
      response = await this.axios.post(
        this.$root.store.server_domain 
        + "/users/favorites",
        recipe,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      this.favorite = true;
    },
    async checkIfFavorite() {
      let response;
      const recipe = { recipeId: this.$route.params.recipeId };
      console.log(
        this.$root.store.server_domain + "/users/existInFavorites?recipeId=" +
          this.$route.params.recipeId
      );
      response = await this.axios.get(
        this.$root.store.server_domain + "/users/existInFavorites?recipeId=" +
          this.$route.params.recipeId,
        {
          withCredentials: true,
        }
      );

      if (response.data == true) {
        this.favorite = true;
      }
      console.log(response);
    },
    async removeFromFavorites() {
      let response;
      const recipe = { recipeId: this.$route.params.recipeId };
      console.log(this.$root.store.server_domain + "/users/removeFromFavorites");
      response = await this.axios.post(
       this.$root.store.server_domain + "/users/removeFromFavorites",
        recipe,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      this.favorite = false;
    },
  },
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

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  margin: 10px;
}

.btn-sub {
  color: #fff;
  background-color: #363a3e;
  border-color: #363a3e;
  margin: 10px;
}
/* .recipe-header{

} */
</style>
