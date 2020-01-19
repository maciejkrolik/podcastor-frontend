<template>
  <q-page>
    <q-input class="discover-search"
             color="purple-7"
             dark bottom-slots rounded label="Search" debounce="500"
             v-model="searchValue"
             @input="getPodcasts">
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
    <div class="container fit row justify-center">
      <q-spinner v-if="loading" color="purple-7" size="3em"/>
      <PodcastListItem v-if="!loading"
                       v-for="podcast in podcasts"
                       :key="podcast.collectionId"
                       v-bind:podcast="podcast"/>
    </div>
  </q-page>
</template>

<script>
  import axios from 'axios';
  import PodcastListItem from "../components/PodcastListItem";

  const URL = 'https://itunes.apple.com/search?entity=podcast&term=';

  export default {
    data: function () {
      return {
        searchValue: '',
        podcasts: [],
        loading: false,
      }
    },
    methods: {
      getPodcasts: function () {
        this.loading = true;

        let endpointUrl;
        if (this.searchValue === '') endpointUrl = URL + 'podcast';
        else endpointUrl = URL + this.searchValue;

        axios.get(endpointUrl)
          .then(response => {
            this.podcasts = response.data.results;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          })
      }
    },
    beforeMount() {
      this.getPodcasts();
    },
    components: {
      PodcastListItem
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
