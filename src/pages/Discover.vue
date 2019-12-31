<template>
  <q-page>
    <div class="podcastor-label" style="text-align: center;">
      Discover
    </div>
    <q-input class="discover-search"
             dark bottom-slots rounded label="Search" debounce="500"
             v-model="searchValue"
             @input="getPodcasts">
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
    <div class="container fit row justify-center">
      <ListItem v-for="podcast in podcasts" :key="podcast.collectionId" v-bind:podcast="podcast"/>
    </div>
  </q-page>
</template>

<script>
  import axios from 'axios';
  import ListItem from '../components/ListItem';

  const URL = 'https://itunes.apple.com/search?entity=podcast&term=';

  export default {
    data: function () {
      return {
        searchValue: '',
        podcasts: []
      }
    },
    methods: {
      getPodcasts: function () {
        axios.get(URL + this.searchValue)
          .then(response => {
            this.podcasts = response.data.results;
          })
          .catch(error => {
            console.log(error);
          })
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

  .discover-search {
    margin: auto;
    width: 75%;
  }
</style>
