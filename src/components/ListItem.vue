<template>
  <div class="box row">
    <img class="list-item-img" :src="podcast.artworkUrl600" alt="Podcast logo">
    <div class="box-title">
      {{podcast.collectionName}}
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
    height: 7em;
    width: 7em;
    padding: 0.5em;
  }

  .box {
    width: 30em;
    height: 8em;
    margin: 0.5em;
    background-color: $list-item-bg;
    border-radius: 10px;
    padding: 0.5em;
  }

  .box-title {
    color: white;
  }

  .list-item-btn {
    float: right;
  }
</style>
