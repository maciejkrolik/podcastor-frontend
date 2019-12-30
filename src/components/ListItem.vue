<template>
  <div class="box row jus">
    <img class="list-item-img" src="../assets/quasar-logo-full.svg" alt="Podcast logo">
    <div class="box-title">
      {{podcast.id}} {{podcast.title}}
    </div>
    <q-btn class="list-item-btn" align="end" label="Click"/>
  </div>
</template>

<script>
  export default {
    props: ['podcast'],
    name: 'ListItem'
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .list-item-img {
    max-height: 100%;
    padding: 0.5em;
    height: auto;
  }

  .box {
    width: 30em;
    height: 8em;
    margin: 0.5em;
    background-color: $list-item-bg;
    border-radius: 10px;
    padding: 10px;
  }

  .box-title {
    color: white;
  }

  .list-item-btn {
    float: right;
  }
</style>
