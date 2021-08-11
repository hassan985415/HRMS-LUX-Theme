<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">Welcome</v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            :validate-on-blur="false"
            :error="error"
            :label="$t('login.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('login.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="primary"
            @click="submit"
            >{{ $t("login.button") }}</v-btn
          >

          <div class="caption font-weight-bold text-uppercase my-3">
            {{ $t("login.orsign") }}
          </div>

          <!-- external providers list -->
          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignInDisabled"
            class="mb-2 primary lighten-2 primary--text text--darken-3"
            block
            x-large
            to="/"
          >
            <v-icon small left>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">
            {{ errorProviderMessages }}
          </div>

          <div class="mt-5">
            <router-link :to="localePath('/auth/forgot-password')">
              {{ $t("login.forgot") }}
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t("login.noaccount") }}
      <router-link :to="localePath('/signup')" class="font-weight-bold">
        {{ $t("login.create") }}
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
import {mapActions, mapMutations} from "vuex";
export default {
  name: "signin.vue",
  layout: "auth",
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      form: {
        email: "",
        password: ""
      },

      // form error
      error: false,
      errorMessages: "",

      errorProvider: false,
      errorProviderMessages: "",

      // show password field
      showPassword: false,

      providers: [
        {
          id: "google",
          label: "Google",
          isLoading: false
        },
        {
          id: "facebook",
          label: "Facebook",
          isLoading: false
        }
      ],

      // input rules
      rules: {
        required: value => (value && Boolean(value)) || "Required",
        email: [
          val => (val || "").length > 0 || "This email field is required",
          val =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
            "E-mail must be valid"
        ],
        password: [
          value => !!value || "This field is required",
          value => (value && value.length >= 6) || "minimum 6 characters"
        ]
      }
    };
  },
  methods: {
    ...mapActions("app", ["login"]),
    ...mapMutations("app", ["SHOW_LOADER", "SHOW_SNACKBAR"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.isSignInDisabled = true;
        this.signIn();
      }
    },
    async signIn() {
      this.SHOW_LOADER(true);
      await this.login(this.form)
        .then(response => {
          this.isLoading = false;
          this.isSignInDisabled = false;
          this.$router.push("/dashboard/analytics");
          // this.$store.commit('SHOW_SNACKBAR',{  snackbar:true,color:'green',message:response.data.message})

          this.SHOW_SNACKBAR({
            snackbar: true,
            color: "green",
            message: response.data.message
          });

          this.SHOW_LOADER(false);
          this.$router.push("/dashboard/analytics");
          // this.$router.push('/setup')
        })
        .catch(error => {
          this.isLoading = false;
          this.isSignInDisabled = false;
          this.SHOW_LOADER (false)
          this.SHOW_SNACKBAR({  snackbar:true,color:'red',message:error.response.data.message})
        });
    },
    signInProvider(provider) {},
    resetErrors() {
      this.error = false;
      this.errorMessages = "";

      this.errorProvider = false;
      this.errorProviderMessages = "";
    }
  }
};
</script>
