<template>
  <div class="container">
    <h1 class="title">About us</h1>
    <div class="logo">
      <img src="../assets/Tamar.png" width="150px" class="left" />
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      <img src="../assets/Jonathan.png" width="135px" class="right" />
    </div>
    This website made by Jonathan and Tamar.<br>
    We are two 3rd year students at Software & Information System Engineering departure in Ben Gurion University.
    <br>
    The website was built using Node.js JavaScript runtime environment and
    Vue.js JavaScript framework.
    <br>
    Here's a link to the Swagger API'S documentation:
      <a href="https://app.swaggerhub.com/apis-docs/JonathanP-Git/API/1.0.0">Link to Swagger.</a>
    <br>
    We have another project, a Javascript Pacman game:
    <a href="https://web-development-environments-2022.github.io/assignment2-313371858_313135865/">Link to the game.</a>
    


  </div>
 
</template>

<script>


export default {
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px);
  /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
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
