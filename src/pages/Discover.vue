<template>
  <q-page class="">
    <div class="podcastor-label" style="text-align: center;">
      Discover
    </div>
    <div class="container fit row justify-center">
      <ListItem v-for="podcast in podcasts" :key="podcast.id" v-bind:podcast="podcast"/>
    </div>
  </q-page>
</template>

<script>
  import ListItem from '../components/ListItem';

  export default {
    data: function () {
      return {
        podcasts: [
          {id: 0, title: 'Test title', isSubscribed: 'false'},
          {id: 1, title: 'Test title', isSubscribed: 'false'},
          {id: 2, title: 'Test title', isSubscribed: 'false'},
          {id: 3, title: 'Test title', isSubscribed: 'false'},
          {id: 4, title: 'Test title', isSubscribed: 'false'},
          {id: 5, title: 'Test title', isSubscribed: 'false'},
          {id: 6, title: 'Test title', isSubscribed: 'false'},
          {id: 7, title: 'Test title', isSubscribed: 'false'},
        ]
      }
    },
    components: {
      ListItem
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 1em;
  }
</style>
