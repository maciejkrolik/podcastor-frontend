<template>
  <q-card dark class="details-card">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{podcast.trackName}}</div>
      <q-space/>
      <q-btn id="btn-close-details" icon="close" flat round dense v-close-popup/>
    </q-card-section>

    <q-card-section class="podcast-description row justify-center">
      <div v-if="loading">
        <q-spinner class="details-spinner self-center" size="2rem"/>
      </div>
      <div v-if="!loading">
        <p v-html="rss.description"/>
        <EpisodeItem v-for="episode in rss.items" :key="episode.guid" v-bind:episode="episode"
                     @play-episode="playEpisode"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import RssParser from 'rss-parser';
  import EpisodeItem from "./EpisodeItem";
  import {Platform} from 'quasar'

  let parser = new RssParser();

  export default {
    props: ['podcast'],
    name: 'PodcastDetails',
    data: function () {
      return {
        loading: true,
        rss: ''
      }
    },
    methods: {
      getEpisodes() {
        this.loading = true;

        let requestUrl = '';
        if (Platform.is.electron) {
          requestUrl = this.podcast.feedUrl + '?format=xml'
        } else {
          requestUrl = 'https://cors-anywhere.herokuapp.com/' + this.podcast.feedUrl + '?format=xml'
        }

        parser.parseURL(requestUrl)
          .then(response => {
            this.rss = response;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

      playEpisode(episode) {
        this.$emit('play-episode', episode);
      },
    },
    components: {
      EpisodeItem
    },
    mounted() {
      this.getEpisodes();
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .details-card {
    background-color: $gradient-bottom;
  }

  .podcast-description {
    margin: 0 auto;
    text-align: justify;
  }

  .details-spinner {
    margin: 2rem;
  }
</style>
