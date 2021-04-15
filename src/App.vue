<template>
  <v-app>
    <Header />
    <ProfileBar v-if="GET_USER.id && drawer" />
    <v-main
      class="mainBackground"
      :style="
        [
          this.$vuetify.breakpoint.md ||
          this.$vuetify.breakpoint.lg ||
          this.$vuetify.breakpoint.xl
            ? 'padding-top: 60px;'
            : 'padding-top: 5px;',
        ] + ' height:auto; width:100%'
      "
    >
      <router-view />
    </v-main>
    <Footer />
    <Notification />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/navBars/Header";
import Footer from "./components/navBars/Footer";
import ProfileBar from "./components/navBars/ProfileBar";
import Notification from "./components/Notification";
export default {
  name: "App",
  components: { Header, Footer, ProfileBar, Notification },
  data: () => ({}),
  methods: {
    getUser() {
      this.$store.dispatch("SET_USER");
    }
  },
  computed: {
    ...mapGetters(["GET_USER_DRAWER", "GET_USER"]),
    drawer: {
      get() {
        return this.$store.getters.GET_USER_DRAWER;
      },
      set() {},
    },
  },
  beforeMount() {
    this.getUser();
  }
};
</script>

<style>
.mainBackground {
  background: var(--v-background-base);
  /* background-image: url("~@/assets/bgpic.jpg"); */
}
.mainContainer {
  margin-left: 10.5%;
  margin-right: 10.5%;
  max-width: 79%;
}

html::-webkit-scrollbar {
  display: none;
}
html {
  scrollbar-width: none;
}
.noScrollbar {
  scrollbar-width: none;
}
.noScrollbar::-webkit-scrollbar {
  display: none;
}
/* .whiteTransparent {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
} */
</style>
