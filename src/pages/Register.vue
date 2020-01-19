<template>
  <q-page class="flex flex-center column">
    <div class="login-title podcastor-label">
      Register
    </div>
    <q-form @submit="register" class="q-gutter-md">
      <q-input
        class="login-input"
        filled
        dark
        v-model="form.name"
        label="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type login']"
      />

      <q-input
        class="input-login"
        filled
        dark
        v-model="form.email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type email']"
      />

      <q-input
        class="login-input"
        filled type="password"
        dark
        v-model="form.password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type password']"    
      />
      <q-btn class="podcastor-btn" type="submit" label="Register"/>
    </q-form>
  </q-page>
</template>

<script>
  import axios from 'axios';

  export default {
    data: function () {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      register() {
        axios.post('https://podcastor-backend.herokuapp.com/users/register', this.form)
          .then(() => {
            this.$router.replace({
              path: '/login'
            })
          })
          .catch((error) => {
            console.log(error);
          })
      },
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
