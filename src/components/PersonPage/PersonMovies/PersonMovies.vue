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
      v-if="typeof this.person.movies == 'undefined' && this.person.movies == null"
      size="30"
      width="3"
      indeterminate
      color="accent lighten-2"
      style="margin-left:calc(50% - 15px); margin-top:1.5%"
    ></v-progress-circular>
    <div v-show="!this.noData" v-else>
      <v-card class="secondary px-7 pt-7 pb-2 mx-auto" width="80%" flat>
        <router-link 
          v-for="(movie, index) in this.person.movies" :key="index"
          :to="{ name: 'MovieMainWall', params: { id: movie.id } }"
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
                contain
                :src="movie.poster_path"
              ></v-img>
            </v-flex>
            <v-col
              cols="8"
              class="text-no-wrap"
              style="margin-left:1%; max-width:90%; min-width:25%; overflow-x: hidden"
            >{{ movie.original_title }}</v-col>
            <v-col
              cols="3"
              class="text-no-wrap font-weight-light"
              style="overflow-x: hidden"
            >
              {{ movie.job }}
            </v-col>
          </v-layout>
        </router-link>
      </v-card>
    </div>
    <v-flex
      v-show="this.noData"
      class="mt-3 pt-5 text-center grey--text body-2"
    >Participated in no movies</v-flex>
  </v-card>
</template>

<script>
export default {
  name: "PersonMovies",
  components: {  },
  data: () => ({
    person: {},
    noData: false
  }),
  methods: {
    getPersonInfo() {
      this.$store
        .dispatch("GET_PERSON_INFO", this.$route.params.id)
        .then(data => {
          if (data && typeof data.movies != 'undefined') {
            this.person = data;
          } else {
            this.noData = true;
          }
        });
    }
  },
  beforeMount() {
    this.person = {};
    this.getPersonInfo();
  },
  watch: {
    "$route.params.id": function() {
      this.person = {};
      this.getPersonInfo();
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