<template>
  <div class="box row no-wrap">
    <div @click="podcastDetailsDialog = true" class="box-container row no-wrap">
      <q-img class="list-item-img" :src="podcast.artworkUrl600" alt="Podcast logo"/>
      <div class="box-title self-center">
        {{podcast.collectionName}}
      </div>
    </div>
    <q-btn @click="changeFavoriteState()"
           class="list-item-btn self-center"
           flat
           rounded
           :color="iconColor"
           :icon="icon"/>
    <q-dialog v-model="podcastDetailsDialog">
      <PodcastDetails v-bind:podcast="podcast" @play-episode="playEpisode"/>
    </q-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import PodcastDetails from "./PodcastDetails";
  import {Notify} from "quasar";

  const URL = "https://podcastor-backend.herokuapp.com/users";

  export default {
    props: ['podcast', 'isFavorite'],
    name: 'PodcastListItem',
    data: function () {
      return {
        podcastDetailsDialog: false,
        isFavoriteMutable: this.isFavorite,
        icon: '',
        iconColor: ''
      }
    },
    methods: {
      changeFavoriteState() {
        if (this.isFavoriteMutable) {
          this.removeFromFavorite();
          this.$emit('remove-podcast', this.podcast['_id']);
        } else {
          this.addToFavorite();
        }
        this.isFavoriteMutable = !this.isFavoriteMutable;
        this.setIcon()
      },
      addToFavorite() {
        axios.post(URL + '/addpodcast', {
          collectionId: this.podcast.collectionId,
          trackId: this.podcast.trackId,
          trackName: this.podcast.trackName,
          collectionName: this.podcast.collectionName,
          feedUrl: this.podcast.feedUrl,
          artworkUrl600: this.podcast.artworkUrl600
        })
          .then(() => {
            Notify.create(this.podcast.collectionName + ' added to favorites ❤');
          })
          .catch((error) => {
            console.log(error);
          })
      },
      removeFromFavorite() {
        axios.delete(URL + '/podcasts/' + this.podcast['_id'])
          .then(() => {
            Notify.create(this.podcast.collectionName + ' removed from favorites');
          })
          .catch((error) => {
            console.log(error);
          });
      },
      setIcon() {
        if (this.isFavoriteMutable) {
          this.icon = 'remove';
          this.iconColor = 'red';
        } else {
          this.icon = 'add';
          this.iconColor = 'green';
        }
      },
      playEpisode(episode) {
        this.$emit('play-episode', episode);
      }
    },
    beforeMount() {
      this.setIcon();
    },
    components: {
      PodcastDetails
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .list-item-img {
    width: 6em;
    min-width: 6em;
    margin: 0.5em;
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
    max-height: 8em;
    overflow: hidden;
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

  .favorite {
    icon: 'remove'
  }
</style>
