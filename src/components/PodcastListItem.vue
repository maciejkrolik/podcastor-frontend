<template>
  <div class="box row no-wrap">
    <div @click="podcastDetailsDialog = true" class="box-container row no-wrap">
      <q-img class="list-item-img" :src="podcast.artworkUrl600" alt="Podcast logo"/>
      <div class="box-title self-center">
        {{podcast.collectionName}}
      </div>
    </div>
    <q-btn class="list-item-btn self-center" color="green" flat rounded icon="add"/>
    <q-dialog v-model="podcastDetailsDialog">
      <PodcastDetails v-bind:podcast="podcast"/>
    </q-dialog>
  </div>
</template>

<script>
  import PodcastDetails from "./PodcastDetails";

  export default {
    props: ['podcast'],
    name: 'PodcastListItem',
    data: function () {
      return {
        podcastDetailsDialog: false,
      }
    },
    components: {
      PodcastDetails
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .list-item-img {
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
    font-size: 1em;
    padding: 2%;
  }

  .box-container {
    flex-grow: 1;
    cursor: pointer;
  }

  .list-item-btn {
    margin: 0.5em;
    height: 2.5em;
    width: 2.5em;
  }
</style>
