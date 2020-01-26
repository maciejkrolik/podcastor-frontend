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
                       v-bind:podcast="podcast"
                       v-bind:isFavorite="podcast.isFavorite"
                       @play-episode="playEpisode"
                       />
    </div>
  </q-page>
</template>

<script>
  import axios from 'axios';
  import PodcastListItem from "../components/PodcastListItem";

  const URL = 'https://itunes.apple.com/search?entity=podcast&term=';
  const DB_URL = "https://podcastor-backend.herokuapp.com/users/podcasts";

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

        Promise.all([this.getItunesPodcasts(), this.getFavoritePodcasts()])
          .then(([itunesPodcasts, favoritePodcasts]) => {
            itunesPodcasts.data.results.forEach(element => {
              let favorite = favoritePodcasts.data.find(favorite => favorite.trackId === element.trackId);
              if (favorite) {
                element.isFavorite = true;
                element['_id'] = favorite['_id'];
              } else {
                element.isFavorite = false
              }
            });
            this.podcasts = itunesPodcasts.data.results;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          })
      },
      getItunesPodcasts() {
        let endpointUrl;
        if (this.searchValue === '') endpointUrl = URL + 'podcast';
        else endpointUrl = URL + this.searchValue;

        return axios.get(endpointUrl);
      },
      getFavoritePodcasts() {
        return axios.get(DB_URL);
      },
      playEpisode(episode) {
        this.$emit('play-episode', episode);
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
