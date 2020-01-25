<template>
  <q-page class="flex flex-center column login-page">
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
    <q-spinner v-if="form.loading" class="spinner" color="purple-7" size="3em"/>
  </q-page>
</template>

<script>
  import {mapActions} from 'vuex';
  import {Notify} from "quasar";

  export default {
    data: function () {
      return {
        form: {
          email: '',
          password: '',
          loading: false,
        }
      }
    },
    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),
      submit() {
        this.form.loading = true;

        this.signIn(this.form)
          .then(() => {
            this.$router.replace({
              path: '/podcasts'
            })
          })
          .catch((err) => {
            this.form.loading = false;
            console.log(err);
            Notify.create('Wrong credentials');
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .login-page {
    text-align: center;
  }

  .input-login {
    min-width: 25em;
  }

  .login-title {
    margin-bottom: 1%;
  }

  .q-page {
    background-image: linear-gradient($gradient-home-top, $gradient-bottom);
  }

  .spinner {
    position: relative;
    top: 20px;
  }
</style>
