<template>
  <div class="inline">
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success" class="buttonCreate"
      >Create A Recipe</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" @ok="onRegister" @show="onReset" @hidden="onReset"
      >Create you're own recipe !
        <br />
        <br />
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-group-title"
          label-cols-sm="3"
          label="Title:"
          label-for="title"
        >
          <b-form-input
            id="title"
            v-model="$v.form.title.$model"
            placeholder="Ex: Pancake"
            type="text"
            :state="validateState('title')"
          >
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">
            recipe's title is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-image"
          label-cols-sm="3"
          label="Image URL:"
          label-for="image"
        >
          <b-form-input
            id="image"
            v-model="$v.form.image.$model"
            placeholder="Ex: https://pancake.jpg"
            type="text"
            :state="validateState('image')"
          >
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.image.required">
            recipe's image is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-time"
          label-cols-sm="3"
          label="Duration:"
          label-for="time"
        >
          <b-form-input
            id="time"
            v-model="$v.form.time.$model"
            placeholder="Ex: 45 (In minutes)"
            type="text"
            :state="validateState('time')"
          >
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.time.required">
            recipe's duration is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.time.numeric">
            Insert time with numbers
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-ingredients"
          label-cols-sm="3"
          label="Ingredients:"
          label-for="ingredients"
        >
          <b-form-input
            id="ingredients"
            v-model="$v.form.ingredients.$model"
            placeholder="Ex: sugar, eggs.."
            type="text"
            :state="validateState('ingredients')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.ingredients.required">
            recipe's ingredients is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-instructions"
          label-cols-sm="3"
          label="Instructions:"
          label-for="instructions"
        >
          <b-form-input
            id="instructions"
            v-model="$v.form.instructions.$model"
            placeholder="Ex: Mix the content togther"
            type="text"
            :state="validateState('instructions')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.instructions.required">
            recipe's instructions is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-serving"
          label-cols-sm="3"
          label="Serving:"
          label-for="serving"
        >
          <b-form-input
            id="serving"
            v-model="$v.form.serving.$model"
            placeholder="Ex:    4"
            type="text"
            :state="validateState('serving')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.serving.required">
            recipe's serving is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.serving.numeric">
            Serving amount should be in numbers
          </b-form-invalid-feedback>
        </b-form-group>

        <div>
          <b-form-checkbox
            id="vegan"
            v-model="vegan"
            name="vegan"
            value="true"
            unchecked-value="false"
          >
            Vegan
          </b-form-checkbox>
          <b-form-checkbox
            id="vegetarian"
            v-model="vegetarian"
            name="vegetarian"
            value="true"
            unchecked-value="false"
          >
            Vegetarian
          </b-form-checkbox>
          <!-- <b-form-checkbox id="glutenFree" v-model="glutenFree" name="glutenFree" value="true"
                        unchecked-value="false">
                        Gluten Free
                    </b-form-checkbox> -->
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BButton, BModal, VBModal, BFormCheckbox } from "bootstrap-vue";
import { required, alpha, numeric } from "vuelidate/lib/validators";

export default {
  name: "modal",
  data() {
    return {
      form: {
        title: "",
        image: "",
        time: "",
        ingredients: "",
        instructions: "",
        serving: "",
      },
      vegan: "false",
      vegetarian: "false",
      // gluten_free: 'false',
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      image: {
        required,
      },
      time: {
        required,
        numeric,
      },
      ingredients: {
        required,
      },
      instructions: {
        required,
      },
      serving: {
        required,
        numeric,
      },
    },
  },
  components: {
    BButton,
    BModal,
    BFormCheckbox,
  },

  directives: {
    "b-modal": VBModal,
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async CreateRecipe() {
      try {
        console.log("http://localhost:3000" + "/personalRecipe");
        const response = await this.axios.post(
          "http://localhost:3000" + "/users/personalRecipe",
          {
            title: this.form.title,
            image: this.form.image,
            readyInMinutes: this.form.time,
            extendedIngredients: this.form.ingredients,
            instructions: this.form.instructions,
            servings: this.form.serving,
            vegan: this.vegan,
            vegetarian: this.vegetarian,

            //TODO: add Gluten Free
            // glutenFree: this.glutenFree,
          },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister(bvModalEvent) {
      // console.log("register method ca.lled");
      this.$v.form.$touch();
      // bvModalEvent.preventDefault()
      if (this.$v.form.$anyError) {
        return;
      }
      this.CreateRecipe();
    },
    onReset() {
      this.form = {
        title: "",
        image: "",
        time: "",
        ingredients: "",
        instructions: "",
        serving: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style>
.buttonCreate {
  width: 183px;
}
</style>
<!-- let recipe_details = {
      image: req.body.image,
      title: req.body.title,
      readyInMinutes: req.body.readyInMinutes,
      popularity: 0,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      have_seen: 0,
      saved_to_favorite: 0,
      extendedIngredients: req.body.extendedIngredients,
      instructions: req.body.instructions,
      servings: req.body.servings
    } -->
