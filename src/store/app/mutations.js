export default {
  SHOW_SNACKBAR(state, data) {
    state.alert = data;
  },
  SHOW_LOADER(state, data) {
    state.loader = data;
  },
  SET_USER(state, data) {
    state.user = {
      bearerToken: data.token,
      user: data.user,
      isAuthenticated: true
    };
  },
  RESET_USER(state) {
    state.user = {
      bearerToken: null,
      user: null,
      isAuthenticated: false
    };
  },
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },

  COUNTRIES_LIST(state, data) {
    state.countries = data;
  },
  /**
   * Theme and Layout
   */
  setGlobalTheme: (state, theme) => {
    this.$vuetify.framework.theme.dark = theme === 'dark'
    state.globalTheme = theme
  },
  setRTL: (state, isRTL) => {
    this.$vuetify.framework.rtl = isRTL
    state.isRTL = isRTL
  },
  setContentBoxed: (state, isBoxed) => {
    state.isContentBoxed = isBoxed
  },
  setMenuTheme: (state, theme) => {
    state.menuTheme = theme
  },
  setToolbarTheme: (state, theme) => {
    state.toolbarTheme = theme
  },
  setTimeZone: (state, zone) => {
    state.time.zone = zone
  },
  setTimeFormat: (state, format) => {
    state.time.format = format
  },
  setCurrency: (state, currency) => {
    state.currency = currency
  },
  setToolbarDetached: (state, isDetached) => {
    state.isToolbarDetached = isDetached
  }
}
