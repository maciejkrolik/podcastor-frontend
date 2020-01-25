<template>
  <q-layout view="lHh Lpr fFf">
    <q-header style="background-color: transparent;" v-bind:class="{'drawer-open': leftDrawerOpen}">
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
      content-style="backgroundColor: #0f434d;"
      overlay
    >
      <q-list padding>
        <q-item>
          Logged as {{user.name}}
        </q-item>
        <q-item to="/podcasts" @click="leftDrawerOpen = !leftDrawerOpen" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="music_note"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Podcasts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/discover" @click="leftDrawerOpen = !leftDrawerOpen" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="language"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Discover</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/profile" @click="leftDrawerOpen = !leftDrawerOpen" exact clickable v-ripple>
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
      <router-view/>
    </q-page-container>

    <q-footer 
      bordered 
      elevated 
      class="text-white" 
      style="backgroundColor: #1a082e; height: 60px"
    >
      <q-media-player
        type="audio"
        :sources="sources"
        background-color="transparent"
        dense
        dark
        :autoplay="true"
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
        sources : [
          {
            src: 'https://aidolofficial.podomatic.com/enclosure/2017-04-26T10_27_10-07_00.mp3',
            type: 'audio/mp3'
          }
        ],
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      }),
      title() {
        return this.$route.meta.title;
      },
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
      }
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

  .drawer-open {
    left: 300px;
  }

  .q-media, .q-media__controls, .q-media__controls--row  {
    height: 100% !important;
  }

  .q-media__controls--row {
    align-content: center;
    margin: 0 3vw;
  }

</style>
