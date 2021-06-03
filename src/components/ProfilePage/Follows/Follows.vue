<template>
  <v-card
    class="mainContainer transparent mt-6 mx-auto"
    width="70%"
    height="auto"
    flat
    dark
  >
    <v-progress-circular
      v-show="!this.noData"
      v-if="typeof this.follows[0] == 'undefined' && this.follows[0] == null"
      size="30"
      width="3"
      indeterminate
      color="accent lighten-2"
      style="margin-left:calc(50% - 15px); margin-top:1.5%"
    ></v-progress-circular>
    <div v-show="!this.noData" v-else>
      <v-layout
        row
      >
        <v-card class="secondary px-3 py-3 " width="100%" flat>
          <v-container style="width:auto; float:left" class="py-0 px-0" v-for="item in this.follows" :key="item.id">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar 
                  class="mx-2 my-1"
                  size="60"
                  v-bind="attrs"
                  v-on="on"
                >
                  <router-link :to="{ name: 'ProfileMainWall', params: { id: item.id } }">
                    <img
                      :src="item.profilePicture"
                    >
                  </router-link>
                </v-avatar>
              </template>
                <span>{{ item.name }}</span>
            </v-tooltip>
          </v-container>
        </v-card>
      </v-layout>
    </div>
    <v-flex
      v-show="this.noData"
      class="mt-3 pt-5 text-center grey--text body-2"
    >No follows</v-flex>
  </v-card>
</template>

<script>
export default {
  name: "ProfileFollowsList",
  data: () => ({
    follows: [],
    noData: false,
  }),
  computed: {},
  methods: {
    formatHref(id) {
      return "/profle/" + id
    },
    getFollows() {
      this.$store
        .dispatch("GET_USER_FOLLOWS", this.$route.params.id)
        .then(data => {
          if (data[0] && data.constructor === Array) {
            this.follows = data;
          } else {
            this.noData = true;
          }
        })
        .catch(() => {});
    },
    notify(msg, color) {
      this.$store
        .commit("SET_NOTIFICATION", {
          display: true,
          text: msg,
          alertClass: color
        })
    }
  },
  mounted() {
    this.getFollows();
  }
}
</script>

<style scoped>

</style>