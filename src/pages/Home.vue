<template>
  <q-page class="flex flex-center column">
    <div class="podcastor-title">
      Podcastor
    </div>
    <div class="podcastor-label" style="margin-bottom: 0.5%">
      find your next big thing
    </div>
    <q-btn class="podcastor-btn" label="Register" style="margin-top: 5%"/>
    <q-btn class="podcastor-btn" label="Login" style="margin-top: 1%"/>
    <q-btn to="/podcasts" class="podcastor-btn" label="Go to podcasts" style="margin-top: 3%"/>
  </q-page>
</template>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .q-page {
    background-image: linear-gradient($gradient-home-top, $gradient-bottom);
  }
</style>
