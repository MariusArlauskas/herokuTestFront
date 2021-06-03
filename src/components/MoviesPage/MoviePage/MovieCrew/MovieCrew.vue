<template>
  <v-card
    class="mainContainer transparent"
    style="margin-top: 15px; margin-bottom: 15px"
    width="100%"
    height="auto"
    flat
    dark
  >
    <v-progress-circular
      v-show="!this.noData"
      v-if="typeof this.crew[0] == 'undefined'"
      size="30"
      width="3"
      indeterminate
      color="accent lighten-2"
      style="margin-left:calc(50% - 15px); margin-top:1.5%"
    ></v-progress-circular>
    <div v-show="!this.noData" v-else>
      <v-card class="secondary px-7 pt-7 pb-2 mx-auto" width="80%" flat>
        <router-link 
          v-for="(member, index) in this.crew" :key="index"
          :to="{ name: 'PersonMovies', params: { id: member.id } }"
          class="grey--text text--lighten-2"
          style="text-decoration: none"
        >
          <v-layout 
            row 
            class="caption mb-2 py-2 px-2 d-flex align-center fullRow"
            style="cursor: pointer; overflow-x: hidden"
          >
            <v-flex
              style="height:100%; max-width: 40px; min-width:40px"
            >
              <v-img
                v-show="(typeof member.profile_path != 'undefined' && member.profile_path != null)"
                contain
                :src="member.profile_path"
              ></v-img>
            </v-flex>
            <v-col
              cols="8"
              class="text-no-wrap font-weight-bold"
              style="margin-left:1%; max-width:90%; min-width:25%; overflow-x: hidden"
            >{{ member.name }}</v-col>
            <v-col
              cols="3"
              class="text-no-wrap font-weight-light"
              style="overflow-x: hidden"
            >
              {{ member.job }}
            </v-col>
          </v-layout>
        </router-link>
      </v-card>
    </div>
    <v-flex
      v-show="this.noData"
      class="mt-3 pt-5 text-center grey--text body-2"
    >No crew data found</v-flex>
  </v-card>
</template>

<script>
export default {
  name: "MovieCrew",
  components: {  },
  data: () => ({
    crew: {},
    noData: false
  }),
  methods: {
    getMovieCrew() {
      this.$store
        .dispatch("GET_FULL_MOVIE", this.$route.params.id)
        .then(data => {
          if (data && typeof data.cast != 'undefined') {
            this.crew = data.cast;
          } else {
            this.noData = true;
          }
        });
    }
  },
  beforeMount() {
    this.crew = {};
    this.getMovieCrew();
  },
  watch: {
    "$route.params.id": function() {
      this.crew = {};
      this.getMovieCrew();
    }
  }
};
</script>

<style scoped>
.fullRow {
  width: 100%;
}
.fullRow:hover {
  background-color: var(--v-background-lighten1);
}
</style>