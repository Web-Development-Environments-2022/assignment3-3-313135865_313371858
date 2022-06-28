<template>
  <div>
    <div :class="seen">
      <router-link
        v-if="!recipe.user_id"
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
        tag="li"
      >
        <b-card
          :img-src="recipe.image"
          img-width="250px"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <h5>
            {{ recipe.title }}
          </h5>
          <b-card-text>
            <b-badge
              v-if="this.favorite"
              @click="removeFromFavorites"
              variant="success"
              >Favorite</b-badge
            >
            <b-badge
              v-if="!this.favorite"
              @click="addToFavorites"
              variant="danger"
              >Not Favorite</b-badge
            >
            &nbsp;
            <b-badge>Duration: {{ recipe.readyInMinutes }} </b-badge>
            &nbsp;
            <b-badge>Likes: {{ recipe.aggregateLikes }} </b-badge>
            &nbsp;
            <b-badge v-if="recipe.glutenFree" variant="primary"
              >Gluten Free</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegetarian" variant="success"
              >Vegetarian</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegan" variant="info">Vegan</b-badge>
          </b-card-text>
        </b-card>
      </router-link>

      <router-link
        v-else-if="!recipe.recipe_owner"
        :to="{
          name: 'dbrecipes',
          params: { recipeId: recipe.id, recipeType: 'Personal' },
        }"
        class="recipe-preview"
        tag="li"
      >
        <b-card
          :img-src="recipe.image"
          img-width="250px"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <h5>
            {{ recipe.title }}
          </h5>
          <b-card-text>
            <b-badge>Duration: {{ recipe.readyInMinutes }} </b-badge>
            &nbsp;
            <b-badge>Likes: 0 </b-badge>
            &nbsp;
            <b-badge v-if="recipe.glutenFree" variant="primary"
              >Gluten Free</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegetarian" variant="success"
              >Vegetarian</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegan" variant="info">Vegan</b-badge>
          </b-card-text>
        </b-card>
      </router-link>

      <router-link
        v-else
        :to="{
          name: 'dbrecipes',
          params: { recipeId: recipe.id, recipeType: 'Family' },
        }"
        class="recipe-preview"
        tag="li"
      >
        <b-card
          :img-src="recipe.image"
          img-width="250px"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <h5>
            {{ recipe.title }}
          </h5>
          <b-card-text>
            <b-badge>Duration: {{ recipe.readyInMinutes }} </b-badge>
            &nbsp;
            <b-badge>Likes: {{ recipe.aggregateLikes }} </b-badge>
            &nbsp;
            <b-badge v-if="recipe.glutenFree" variant="primary"
              >Gluten Free</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegetarian" variant="success"
              >Vegetarian</b-badge
            >
            &nbsp;
            <b-badge v-if="recipe.vegan" variant="info">Vegan</b-badge>
          </b-card-text>
        </b-card>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    if (typeof this.recipe.image === "undefined") {
      this.recipe.image =
        "https://image.shutterstock.com/image-photo/blank-vintage-recipe-cooking-book-600w-504504346.jpg";
    }
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });

    let response;
    console.log(
      this.$root.store.server_domain +
        "/users/getHasSeen?recipeId=" +
        this.recipe.id
    );
    response = await this.axios.get(
      this.$root.store.server_domain +
        "/users/getHasSeen?recipeId=" +
        this.recipe.id,
      {
        withCredentials: true,
      }
    );
    if (response.data == true) {
      this.seen = "seen";
    }

    let responseFavorites;
    console.log(
      this.$root.store.server_domain +
        "/users/existInFavorites?recipeId=" +
        this.recipe.id
    );
    responseFavorites = await this.axios.get(
      this.$root.store.server_domain +
        "/users/existInFavorites?recipeId=" +
        this.recipe.id,
      {
        withCredentials: true,
      }
    );

    if (responseFavorites.data == true) {
      this.favorite = true;
    }
  },
  data() {
    return {
      image_load: false,
      seen: "no_seen",
      favorite: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addToFavorites() {
      event.stopPropagation();
      let response;
      const recipe = { recipeId: this.recipe.id };
      console.log(recipe);
      console.log(this.$root.store.server_domain + "/users/favorites");
      response = await this.axios.post(
        this.$root.store.server_domain + "/users/favorites",
        recipe,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      this.favorite = true;
    },
    async removeFromFavorites() {
      event.stopPropagation();
      let response;
      const recipe = { recipeId: this.recipe.id };
      console.log(
        this.$root.store.server_domain + "/users/removeFromFavorites"
      );
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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.seen {
  filter: brightness(90%);
}

.no_seen {
}

.mb-3:hover {
  filter: brightness(95%);
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  max-height: 166px;
  width: 300px;
  padding: 1.25rem;
}
</style>
