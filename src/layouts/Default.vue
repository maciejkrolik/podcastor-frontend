<template>
  <q-layout view="lHh Lpr fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title class="podcastor-label">{{title}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      dark
      elevated
      content-style="backgroundColor: #1a082e;"
      behavior="mobile"
    >
      <q-list padding>
        <q-item v-if="user">
          Logged as {{user.name}}
        </q-item>
        <q-item to="/podcasts" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="music_note"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Podcasts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/discover" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="language"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Discover</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/profile" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="people"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item @click="signOut" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="exit_to_app"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view @play-episode="playEpisode"/>
    </q-page-container>

    <q-footer
      v-if="episode"
      bordered
      elevated
      class="text-white"
      style="backgroundColor: black"
    >
      <div class="text-center" style="background-color: black">
        {{episode.title}}
      </div>
      <q-media-player
        type="audio"
        ref="mediaplayer"
        :source="episode.enclosure.url"
        background-color="black"
        dense
        dark
        :showSpinner="false"
        autoplay
      />
    </q-footer>
  </q-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        leftDrawerOpen: false,
        episode: null,
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      }),
      title() {
        return this.$route.meta.title;
      }
    },
    methods: {
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      signOut() {
        this.signOutAction()
          .then(() => {
            this.$router.replace({
              path: '/'
            })
          })
      },

      playEpisode(episode) {
        this.episode = episode;
        console.log(episode);
        document.getElementById('btn-close-details').click();
      },
    }
  }
</script>

<style lang="scss">
  @import 'src/css/quasar.variables.scss';

  .q-header {
    background-color: transparent;
  }

  .q-layout {
    background-image: linear-gradient(to bottom, $gradient-top 0%, $gradient-bottom 800px);
  }

  .q-media__controls--row {
    align-content: center;
    margin: 0 3vw;
  }

</style>
