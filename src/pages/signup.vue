<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('register.title') }}</v-card-title>
      <v-card-subtitle>Let's build amazing products</v-card-subtitle>

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="form.name"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorName"
            :error-messages="errorNameMessage"
            :label="$t('register.name')"
            name="name"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorEmail"
            :error-messages="errorEmailMessage"
            :label="$t('register.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errorPassword"
            :error-messages="errorPasswordMessage"
            :label="$t('register.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignUpDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('register.button') }}</v-btn>

          <div class="caption font-weight-bold text-uppercase my-3">{{ $t('register.orsign') }}</div>

          <!-- external providers list -->
          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignUpDisabled"
            class="mb-2 primary lighten-2 primary--text text--darken-3"
            block
            x-large
            @click="signInProvider(provider)"
          >
            <v-icon small left>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>

          <div class="mt-5 overline">
            {{ $t('register.agree') }}
            <br />
            <router-link to="">{{ $t('common.tos') }}</router-link>
            &
            <router-link to="">{{ $t('common.policy') }}</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('register.account') }}
      <router-link :to="localePath('/signin')" class="font-weight-bold">
        {{ $t('register.signin') }}
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign Up Page Component
|---------------------------------------------------------------------
|
| Template for user sign up with external providers buttons
|
*/
import {mapActions, mapMutations} from "vuex";

export default {
  layout: 'auth',
  data() {
    return {
      // sign up buttons
      isLoading: false,
      isSignUpDisabled: false,

      // form
      isFormValid: true,
      form : {
        email: '',
        password: '',
        name: '',
        role_id:1
      },

      // form error
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      errorNameMessage: '',
      errorEmailMessage: '',
      errorPasswordMessage: '',

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false,

      // external providers
      providers: [{
        id: 'google',
        label: 'Google',
        isLoading: false
      }, {
        id: 'facebook',
        label: 'Facebook',
        isLoading: false
      }],

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    ...mapActions('app', ['register']),
    ...mapMutations('app', ['SHOW_LOADER','SHOW_SNACKBAR']),
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignUpDisabled = true
        this.SHOW_LOADER(true)
        this.register(this.form).then(response => {
          this.isLoading = false
          this.isSignUpDisabled = false
          this.SHOW_LOADER(false)
          this.SHOW_SNACKBAR ( {snackbar:true,color:'green', message:response.message
          })
          this.$router.push('/dashboard/analytics')
        }).catch(error => {
          this.isLoading = false
          this.isSignUpDisabled = false
          this.SHOW_LOADER (false)
          this.SHOW_SNACKBAR ({  snackbar:true,color:'pink',message:error})
        })
      }
    },
    signUp(email, password) {},
    signInProvider(provider) {},
    resetErrors() {
      this.errorName = false
      this.errorEmail = false
      this.errorPassword = false
      this.errorNameMessage = ''
      this.errorEmailMessage = ''
      this.errorPasswordMessage = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }
}
</script>
