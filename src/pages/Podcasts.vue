<template>
  <q-page>
    <div class="container fit row justify-center">
      <q-spinner v-if="loading" color="purple-7" size="3em"/>
      <PodcastListItem v-if="!loading && favoritePodcasts.length !== 0"
                       v-for="podcast in favoritePodcasts"
                       :key="podcast.collectionId"
                       v-bind:podcast="podcast"
                       v-bind:isFavorite="true"
                       @remove-podcast="removePodcast"/>
    </div>

    <div v-if="favoritePodcasts.length === 0 && !loading" class="flex flex-center column">
      <div class="podcastor-label" style="margin-bottom: 0.5%">
        there's nothing yet
      </div>
      <q-btn to="/discover" label="Add something cool" class="podcastor-btn"/>
    </div>
  </q-page>
</template>

<script>
  import PodcastListItem from "../components/PodcastListItem";
  import axios from "axios";

  const URL = "https://podcastor-backend.herokuapp.com/users/podcasts";

  export default {
    data: function () {
      return {
        favoritePodcasts: [],
        loading: false
      }
    },
    methods: {
      getFavoritePodcasts() {
        this.loading = true;

        axios.get(URL)
          .then(response => {
            this.favoritePodcasts = response.data;
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          })
      },
      removePodcast(id) {
        this.favoritePodcasts = this.favoritePodcasts.filter(podcast => podcast['_id'] !== id);
      }
    },
    beforeMount() {
      this.getFavoritePodcasts();
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
</style>

