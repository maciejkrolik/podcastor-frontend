<template>
  <q-page class="flex flex-center column register-page">
    <div class="login-title podcastor-label">
      Register
    </div>
    <q-form @submit="register" class="q-gutter-md">
      <q-input
        class="input-login"
        filled
        dark
        v-model="form.name"
        label="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type name']"        
      />

      <q-input
        class="input-login"
        filled type="email"
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
        class="input-login"
        filled type="password"
        dark
        v-model="form.password"
        label="Password"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Please type password',
          val => val && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(val) || 'Min 8 characters, one special character, upper and lower case letter and a number'
        ]"    
      />
      <q-btn 
        class="podcastor-btn" 
        type="submit" 
        label="Register"
        :loading="loading1"
      />
    </q-form>
    <q-spinner v-if="form.loading" class="spinner" color="purple-7" size="3em"/>
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
          password: '',
          loading: false,
        }
      }
    },
    methods: {
      register() {
        this.form.loading = true;

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

  .register-page {
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
