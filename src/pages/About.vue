<template>
  <div class="container">
    <h1 class="title">About us</h1>
    <div class="logo">
				<img src="../assets/Logo.png" class="logo" />
	</div>
    This website made by Jonathan and Tamar.<br>
    We used J QUERY to implement the registration and login using validator template<br>
    The difficulties we encountered:<br>
    <li>The work consists of many small and important tasks that each depend on the other. Our ambition was to create the bulk of the required functionality and in the next step to add design.</li>
    <li>Functionality of wind movement.	</li>
    <li>Failure to eat a score for some of the characters.	</li>
	
  </div>
</template>

<script>
export default {
  components: {

  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
