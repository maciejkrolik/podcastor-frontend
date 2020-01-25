<template>
  <q-card class="episode-card" dark bordered>
    <q-card-section>
      <q-btn
        color="grey"
        round
        flat
        dense
        icon="play_arrow"
        @click="playEpisode(episode)"
      />
      {{episode.title}}
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-section>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section class="text-subitle2">
          <p v-html="episode['content:encoded']"/>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
  export default {
    props: ['episode'],
    name: 'EpisodeItem',
    data: function () {
      return {
        expanded: false,
      }
    },
    methods: {
      playEpisode(episode) {
        this.$emit('play-episode', episode);
      },
    },
  }
</script>

<style scoped lang="scss">
  .episode-card {
    margin-top: 1rem;
  }
</style>
