<template>
  <q-page class="flex flex-center column">
    <div class="login-title podcastor-label">
      Login
    </div>
    <q-form @submit="submit" class="q-gutter-md">
      <q-input
        class="input-login"
        filled
        dark
        v-model="form.email"
        label="Email"
        lazy-rules
        :rules="[ 
          val => val && val.length > 0 || 'Please type email',
          val => val && /^.+@.+\..+$/.test(val) || 'This is not an email'
        ]"     
      />

      <q-input
        class="login-input"
        filled type="password"
        dark
        v-model="form.password"
        label="Password"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type password']"
      />
      <q-btn class="podcastor-btn" type="submit" label="Login"/>
    </q-form>
  </q-page>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    data: function () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),
      submit() {
        this.signIn(this.form)
          .then(() => {
            this.$router.replace({
              path: '/podcasts'
            })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .input-login {
    min-width: 25em;
  }

  .login-title {
    margin-bottom: 1%;
  }

  .q-page {
    background-image: linear-gradient($gradient-home-top, $gradient-bottom);
  }
</style>
