<template>
    <div>
        <!-- Using value -->
        <b-button v-b-modal="'my-modal'">Show Modal</b-button>

        <!-- The modal -->
        <b-modal id="my-modal">Hello From My Modal!</b-modal>
    </div>
</template>

<script>
    import { BButton, BModal, VBModal } from "bootstrap-vue";

    export default {
        components: {
            BButton,
            BModal
        },

        directives: { 
            'b-modal': VBModal 
        },
    }
</script>

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