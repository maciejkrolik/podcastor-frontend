<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="podcastor-label">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      class="podcastor-btn"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script>
  export default {
    name: 'Error404'
  }
</script>

<style scoped lang="scss">
  img {
    filter: brightness(1000);
  }
</style>
