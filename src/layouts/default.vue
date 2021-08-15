<template>
  <v-app>
    <v-idle
      :loop="false"
      :reminders="[5]"
      :wait="5"
      :duration="1800"
      @idle="onidle"
      @remind="onremind"
    />
    <div
      v-shortkey="['ctrl', '/']"
      class="d-flex flex-grow-1"
      @shortkey="onKeyup"
    >
      <!-- Navigation -->
      <v-navigation-drawer
        v-model="drawer"
        app
        floating
        class="elevation-1"
        :right="$vuetify.rtl"
        :light="menuTheme === 'light'"
        :dark="menuTheme === 'dark'"
      >
        <!-- Navigation menu info -->
        <template v-slot:prepend>
          <div class="pa-2">
            <div class="title font-weight-bold text-uppercase primary--text">{{ product.name }}</div>
            <div class="overline grey--text">{{ product.version }}</div>
          </div>
        </template>

        <!-- Navigation menu -->
        <main-menu :menu="navigation.menu" />

        <!-- Navigation menu footer -->
        <template v-slot:append>
          <!-- Footer navigation links -->
          <div class="pa-1 text-center">
            <v-btn
              v-for="(item, index) in navigation.footer"
              :key="index"
              :href="item.href"
              :target="item.target"
              small
              text
            >
              {{ item.key ? $t(item.key) : item.text }}
            </v-btn>
          </div>

        </template>
      </v-navigation-drawer>

      <!-- Toolbar -->
      <v-app-bar
        app
        :color="isToolbarDetached ? 'surface' : undefined"
        :flat="isToolbarDetached"
        :light="toolbarTheme === 'light'"
        :dark="toolbarTheme === 'dark'"
      >
        <v-card class="flex-grow-1 d-flex" :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!isToolbarDetached">
          <div class="d-flex flex-grow-1 align-center">

            <!-- search input mobile -->
            <v-text-field
              v-if="showSearch"
              append-icon="mdi-close"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              hide-details
              solo
              flat
              autofocus
              @click:append="showSearch = false"
            ></v-text-field>

            <div v-else class="d-flex flex-grow-1 align-center">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

              <v-spacer class="d-none d-lg-block"></v-spacer>

              <!-- search input desktop -->
              <v-text-field
                ref="search"
                class="mx-1 hidden-xs-only"
                :placeholder="$t('menu.search')"
                prepend-inner-icon="mdi-magnify"
                hide-details
                filled
                rounded
                dense
              ></v-text-field>

              <v-spacer class="d-block d-sm-none"></v-spacer>

              <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <toolbar-language />

              <div class="hidden-xs-only mx-1">
                <toolbar-currency />
              </div>

              <toolbar-apps />

              <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
                <toolbar-notifications />
              </div>

              <toolbar-user />
            </div>
          </div>
        </v-card>
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" :fluid="!isContentBoxed">
          <v-layout>
            <client-only>
              <snackbar v-if="alert.snackbar"></snackbar>
              <loader v-if="loader"></loader>
              <nuxt />
            </client-only>
          </v-layout>
        </v-container>

        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            <!-- Built with <v-icon small color="pink">mdi-heart</v-icon> <a class="text-decoration-none" href="https://indielayer.com" target="_blank">@indielayer</a> -->
          </div>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'
import ToolbarApps from '../components/toolbar/ToolbarApps'
import ToolbarLanguage from '../components/toolbar/ToolbarLanguage'
import ToolbarCurrency from '../components/toolbar/ToolbarCurrency'
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'
import Snackbar from '../components/Snackbar'
import Loader from '../components/Loader'

export default {
  name: 'Default',
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarApps,
    ToolbarLanguage,
    ToolbarCurrency,
    ToolbarNotifications,
    Snackbar,
    Loader
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      snack : {},
      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached',
      'loader', 'alert'])
  },
  watch : {
    alert (val) {
      if (val.snackbar) {
        this.clear()
      }
    }
  },
  methods: {
    ...mapMutations('app', ['SHOW_SNACKBAR', 'SHOW_LOADER']),
    ...mapActions('app', ['reset']),
    onKeyup(e) {
      this.$refs.search.focus()
    },
    onidle() {
      console.log('in logout')
      this.reset()
      this.$router.push('/signin')
    },
    onremind(time) {
      console.log('here', time)
      // alert seconds remaining to 00:00
      // alert('You have left this browser idle for 30 minutes' + time)
    },
    clear () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this

      const limitedInterval = setInterval(() => { $this.SHOW_SNACKBAR({
        snackbar: false,
        color: '',
        message: ''
      })
      clearInterval(limitedInterval)
      }, 3000)
    }
  }
}
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
.direction {
  direction: rtl;
}
</style>
