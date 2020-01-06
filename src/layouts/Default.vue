<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: transparent;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      dark
      content-style="backgroundColor: #0f434d;"
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
  </q-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        leftDrawerOpen: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
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

  body {
    background-image: linear-gradient(to bottom, $gradient-top 0%, $gradient-bottom 800px);
  }
</style>
