<template>
  <q-page class="flex flex-center column">
    <q-card v-if="!isLoading" dark class="profile-card">
      <q-card-section>
        <q-input
          v-model="profile.name"
          filled
          dark
          label="Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type name']"
        />

        <q-input
          v-model="profile.email"
          filled type="email"
          dark
          disable
          label="Email"
          lazy-rules
          :rules="[
          val => val && val.length > 0 || 'Please type email',
          val => val && /^.+@.+\..+$/.test(val) || 'This is not an email'
        ]"
        />

        <q-input
          v-model="changedPassword"
          filled type="password"
          dark
          label="Password"
          lazy-rules
          :rules="[
          val => val && val.length > 0 || 'Please type password',
          val => val && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(val) || 'Min 8 characters, one special character, upper and lower case letter and a number'
        ]"
        />

        <div class="flex flex-center column">
          <q-btn @click="saveProfile" class="podcastor-btn profile-btn" type="submit" label="Change profile data"/>
          <q-btn @click="logoutAll" class="podcastor-btn profile-btn" type="submit"
                 label="Logout from all devices"/>
          <q-spinner v-if="isDataLoading" class="spinner" color="purple-7" size="3em"/>
        </div>
      </q-card-section>
    </q-card>
    <q-spinner v-if="isLoading" class="spinner" color="purple-7" size="3em"/>
  </q-page>
</template>

<script>
  import axios from 'axios';
  import {Notify} from 'quasar';
  import {mapActions} from 'vuex';

  const URL = 'https://podcastor-backend.herokuapp.com/users/profile';

  export default {
    data: function () {
      return {
        isLoading: true,
        isDataLoading: false,
        profile: '',
        changedPassword: ''
      }
    },
    methods: {
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      getProfile() {
        this.isLoading = true;

        axios.get(URL)
          .then((response) => {
            this.profile = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      saveProfile() {
        this.isDataLoading = true;

        axios.post(URL, {
          name: this.profile.name,
          password: this.changedPassword
        })
          .then(() => {
            Notify.create('Changed profile data');
          })
          .catch(error => {
            console.log(error);
            Notify.create('Error while changing profile data');
          })
          .finally(() => {
            this.isDataLoading = false;
          });
      },
      logoutAll() {
        this.isDataLoading = true;

        axios.post('https://podcastor-backend.herokuapp.com/users/logoutall')
          .then(() => {
            this.$router.replace({
              path: '/'
            })
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isDataLoading = false;
          })
      }
    },
    beforeMount() {
      this.getProfile();
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/quasar.variables.scss';

  .profile-card {
    background-color: $gradient-bottom;
  }

  .profile-btn {
    margin: 1em;
    min-width: 15em;
  }
</style>
