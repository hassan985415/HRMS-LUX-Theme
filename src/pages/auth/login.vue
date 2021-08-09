<template>
  <div class="register-card">
    <div class="custom-container custom-height">
      <v-card class="card-radius">
        <v-row>
          <v-col cols="12" md="7" sm="12" class="card-align">
            <div class="bg-left-section">
              <div class="left-section">
                <img
                  class="logo img-fluid"
                  src="/INJAZAT-Logo.png"
                  alt="logo"
                />
                <div class="mb-5 mt-10">
                  <h2 class="heading">{{ $t("sing_in_heading") }}</h2>
                </div>
                <div class="mt-10">
                  <p class="description">{{ $t("sing_in_subheading") }}</p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" sm="12" class="custom-card-padding">
            <div class="right-section">
              <div class="text-center">
                <img
                  class="img-height img-fluid"
                  src="/INJAZAT-Logo.png"
                  alt="logo"
                />
              </div>
              <v-form ref="form">
                <v-text-field
                  v-model="form.email"
                  class="input-field  mt-2"
                  :placeholder="$t('email')"
                  :rules="rules.email"
                  required
                  solo
                  color="#00afaa"
                  rounded
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  class="input-field"
                  :placeholder="$t('password')"
                  :rules="rules.password"
                  required
                  solo
                  type="password"
                  color="#00afaa"
                  rounded
                  outlined
                  @keypress.enter="Login"
                ></v-text-field>
                <div class=" text-center">
                  <v-btn
                    large
                    class="log-in-btn white-text"
                    outlined
                    rounded
                    @click="Login"
                  >
                    {{ $t("log_in") }}</v-btn>
                </div>
                <div class="mt-4 mb-2">
                  <span
                    class="forgot-pass"
                    @click="$router.push('/auth/forgot-Password')"
                  >{{ $t("lost_password") }}</span>
                  <br />
                  <span class="forgot-pass">{{
                    $t("dont_have_an_account")
                  }}</span>
                  <nuxt-link class="auth-link" to="/auth/register">{{
                    $t("sign_up")
                  }}</nuxt-link>
                </div>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginVue',
  // layout: 'authLayout',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          (val) => (val || '').length > 0 || 'This email field is required',
          (val) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
            'E-mail must be valid'
        ],
        password: [
          (value) => !!value || 'This field is required',
          (value) => (value && value.length >= 6) || 'minimum 6 characters'
        ]
      }
    }
  },
  methods: {
    ...mapActions('app', ['login']),

    async Login() {
      if (this.$refs.form.validate()) {
        this.SHOW_LOADER ( true)
        await this.login(this.form)
          .then((response) => {
            console.log('login res', response)
            // this.$store.commit('SHOW_SNACKBAR',{  snackbar:true,color:'green',message:response.data.message})

            // this.$store.commit('SHOW_LOADER', false)
            // this.$router.push('/setup')
          })
          .catch((error) => {
            console.log('login catch block', error.response.data.message)
            // this.$store.commit('SHOW_LOADER', false)
            // this.$store.commit('SHOW_SNACKBAR',{  snackbar:true,color:'red',message:error.response.data.message})
          })
      }
    }
  }
}
</script>
