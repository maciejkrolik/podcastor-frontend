<template>
  <q-card dark class="details-card">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{podcast.trackName}}</div>
      <q-space/>
      <q-btn icon="close" flat round dense v-close-popup/>
    </q-card-section>

    <q-card-section class="podcast-description">
      <div v-if="loading">
        <q-spinner class="details-spinner self-center" size="2rem"/>
      </div>
      <div v-if="!loading">
        <p v-html="rss.description"/>
        <div v-for="episode in rss.items" :key="episode.guid">
          <q-icon name="play_arrow"/>
          <p>{{episode.title}}</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import RssParser from 'rss-parser';

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
        parser.parseURL('https://cors-anywhere.herokuapp.com/' + this.podcast.feedUrl + '?format=xml')
          .then(response => {
            this.rss = response;
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
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
