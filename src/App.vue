<template>
  <div id="q-app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      layout() {
        return (this.$route.meta.layout || 'default') + '-layout';
      }
    }
  }
</script>
