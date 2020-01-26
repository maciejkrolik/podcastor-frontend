<template>
  <q-page class="flex flex-center column">
    <div class="podcastor-title">
      Podcastor
    </div>
    <div class="podcastor-label" style="margin-bottom: 0.5%">
      find your next big thing
    </div>
    <q-btn to="/register" class="podcastor-btn home-btn" label="Register" style="margin-top: 5%"/>
    <q-btn to="/login" class="podcastor-btn home-btn" label="Login" style="margin-top: 1%"/>
  </q-page>
</template>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .q-page {
    background-image: linear-gradient($gradient-home-top, $gradient-bottom);
  }

  .home-btn {
    margin: 1em;
    min-width: 10em;
  }
</style>
