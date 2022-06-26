<template>
  <div class="search-holder">
    <div class="search-holder__banner">
      <div class="col-xs-12 text-center hero-header-container">
        <h1 class="hero-header">
          Search for recipe
        </h1>
        <div class="search-bar">
          <div class="form-holder">
            <div class="navbarSearch">
              <input
                @change="onChange"
                @keyup="onChange"
                v-model="searchText"
                class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"
                type="text"
                placeholder="For example: Pizza"
              />
            </div>
            <img
              class="icon"
              src="https://hackr.io/assets/images/header-icons/search-header.svg"
              width="23"
              height="23"
            />
          </div>
          <br />
          <div v-if="$root.store.username">
            <div v-if="this.lastSearched">
              Hint! You're last search was: {{ this.lastSearched }}
            </div>
            <div v-else>
              No Last searches
            </div>
          </div>
          <div>
            <br />
            <b-dropdown text="amount">
              <b-dropdown-item @click="switchAmount(5)">5</b-dropdown-item>
              <b-dropdown-item @click="switchAmount(10)">10</b-dropdown-item>
              <b-dropdown-item @click="switchAmount(15)">15</b-dropdown-item>
            </b-dropdown>
          </div>
          <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
              id="input-group-cuisine"
              label-cols-sm="3"
              label="Cuisine:"
              label-for="cuisine"
            >
              <b-form-select
                id="cuisine"
                :options="cuisines"
                v-model="form.cuisine"
              ></b-form-select>
            </b-form-group>
            <br />
          </b-form>
          <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
              id="input-group-diet"
              label-cols-sm="3"
              label="Diet:"
              label-for="diet"
            >
              <b-form-select
                id="diet"
                :options="diets"
                v-model="form.diet"
              ></b-form-select>
            </b-form-group>
          </b-form>
          <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
              id="input-group-intolerance"
              label-cols-sm="3"
              label="Intolerance:"
              label-for="intolerance"
            >
              <b-form-select
                id="intolerance"
                :options="intolerances"
                v-model="form.intolerance"
              ></b-form-select>
            </b-form-group>
            <br />
          </b-form>
  
          <b-button href="#" variant="primary" @click="searchClick">
            Search</b-button
          >

          <b-button href="#" variant="primary" @click="sortByVar('likes')">
            Sort by likes</b-button
          >
          <b-button href="#" variant="primary" @click="sortByVar('length')">
            Sort By length</b-button
          >
          <div v-if="trigger > 0">
            <br />
            <RecipePreviewList
              title="Search results"
              :trigger="trigger"
              :searchQuery="searchText"
              :amount="recipeAmount"
              :cuisine="form.cuisine"
              :diet="form.diet"
              :intolerance="form.intolerance"
              :sort = "sortBy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from "domain";
import RecipePreviewList from "../components/RecipePreviewList";
import cuisine from "../assets/cuisine";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";
export default {
  components: {
    RecipePreviewList,
  },
  computed: {},
  data() {
    return {
      trigger: 0,
      searchText: "",
      recipeAmount: 5,
      lastSearched: "",
      sortBy : "",
      form: {
        cuisine: "",
        diet: "",
        intolerance: "",
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  async created() {
    this.getLastSearched();
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisine);
    this.diets.push(...diet);
    this.intolerances.push(...intolerance);
    // console.log($v);
  },
  methods: {
    onChange() {
      // this.searchText = "Test"
      this.$emit("search", this.searchText);
    },
    searchClick() {
      this.trigger += 1;
      this.getLastSearched(); // Trigger the last seen.
      console.log(this.searchText);
    },
    switchAmount(amount) {
      this.recipeAmount = amount;
    },
    sortByVar(type){
      if (type == "likes"){
        this.sortBy = "aggregateLikes"
      }
      else if (type == "length"){
        this.sortBy = "readyInMinutes"
      }
      console.log("sort by " + type)
      this.trigger += 1;
    },
    async getLastSearched() {
      let response;
      try {
        console.log("http://localhost:3000/users/getLastSearched");
        response = await this.axios.get(
          "http://localhost:3000/users/getLastSearched",
          1
        );
        console.log("Last seen is:");
        console.log(response);
        this.lastSearched = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.search-holder {
  margin-top: 60px;

  &__banner {
    margin: 0 auto;
    width: 80%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }

  &__fullbanner {
    margin: 0 auto;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }

  .hero-header {
    margin: 0 0 25px;
    line-height: 1;
    font-size: 34px;
  }

  .search-bar {
    .form-holder {
      position: relative;
    }

    .form-control {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
      -o-transition: border-color ease-in-out 0.15s,
        box-shadow ease-in-out 0.15s;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }

    .navbar-search-input {
      z-index: 1 !important;
      height: 51px;
      font-size: 18px;
      padding: 6px 18px 7px 45px;
      background-color: #ffffff !important;
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.11);
      border-color: #eeeeee;
    }

    .icon {
      left: 12px;
      font-size: 18px;
      padding-left: 2px;
      opacity: 0.7;
      color: var(--theme-primary-light);
      position: absolute;
      top: 50%;
      left: 17px;
      transform: translateY(-50%) scale(1.1);
      opacity: 0.5;
      z-index: 2;
      transition: all 0.2s linear;
    }
  }
}
</style>
