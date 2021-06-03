<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text rounded class="mt-2 search float-right" v-on="on">
        Search
        <v-icon>search</v-icon>
      </v-btn>
    </template>

    <v-card
      style="position: absolute; top:10%; left:30%"
      class="d-flex justify-center"
      width="40%"
      min-width="200px"
      flat
      color="transparent"
    >
      <v-tabs 
        background-color="secondary" 
        style="max-width: 290px; border-style: solid; border-color: var(--v-secondary-lighten2); border-bottom: none;"
        fixed-tabs
        show-arrows
        height="25px"
        class=""
        dark
        >
        <v-tab 
          class="caption" 
          @click="searchObject = index; movies = []" 
          v-for="(value, index) in allSearchObjects" :key="index"
        >
          {{ index }}
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card
      style="border-radius:25px; position: absolute; top:15%; left:30%"
      width="40%"
      min-width="200px"
      color="secondary lighten-1"
    >
      <v-form @submit.prevent="searchRecord()">
        <v-text-field
          style="overflow: hidden"
          prepend-inner-icon="search"
          dark
          hint="search"
          placeholder="Search for a record"
          dense
          hide-details
          clearable
          rounded
          outlined
          v-model="title"
          autofocus
        ></v-text-field>
      </v-form>
    </v-card>

    <v-card
      dark
      v-show="movies.length > 0"
      style="border-radius:10px; position: absolute; top:22%; left:25%; overflow-y: scroll"
      class="noScrollbar"
      width="50%"
      min-width="200px"
      height="60%"
      color="secondary lighten-1"
    >
      <div v-for="(movie, index) in this.movies" :key="index">
        <v-layout
          @click="closeDialog(movie.movieId)"
          class="fullRow caption font-weight-light mx-0 my-0"
          align-center
          style="height: 50px; width:100%; cursor:pointer"
          row
        >
          <v-flex v-show="searchObject != 'FORUM'" style="height:40px; margin-left: 10px; max-width: 40px; min-width:40px">
            <v-img
              v-if="(typeof movie.posterPath !== 'undefined' && movie.posterPath !== null)"
              height="100%"
              :src="movie.posterPath"
            ></v-img>
            <v-img
              v-else
              style="background:var(--v-background-lighten1)"
              height="100%"
              width="100%"
            ></v-img>
          </v-flex>
          <v-col
            class="text-no-wrap body-1 font-weight-medium"
            style="margin-left:1%; max-width:70%; min-width:70%; overflow-x: hidden"
          >{{ movie.title }}</v-col>
        </v-layout>
        <v-divider v-if="index != Object.keys(movies).length - 1"></v-divider>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SearchDialog",
  data: () => ({
    dialog: false,
    title: "",
    movies: [],
    searchObject: "MOVIES",
    allSearchObjects: {
      MOVIES: "MovieMainWall",
      PERSON: "PersonMovies",
      FORUM: "ForumThread",
      USERS: "ProfileMainWall",
    }
  }),
  methods: {
    closeDialog(id) {
      this.movies = [];
      this.dialog = false;
      this.$router.push({
        name: this.allSearchObjects[this.searchObject],
        params: { id: id }
      });
    },
    searchRecord() {
      this.movies = [];
      this.$store
        .dispatch("SEARCH_" + this.searchObject, { search: this.title })
        .then(data => {
          if (data && data.constructor === Array) {
            switch(this.searchObject) {
              case "PERSON":
                data = this.convertPeopleData(data);
                break;
              case "FORUM":
                data = this.convertForumData(data);
                break;
              case "USERS":
                data = this.convertUsersData(data);
                break;
            }
            this.movies = data;
          }
        })
        .catch(() => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Nothing found!!",
            alertClass: "error"
          });
        });
    },
    convertPeopleData(data) {
      var newData = [];
      data.forEach(item => {
        var tempItem = [];
        tempItem["title"] = item["name"];
        tempItem["posterPath"] = item["profile_path"];
        tempItem["movieId"] = item["id"];
        newData.push(tempItem);
      });
      return newData;
    },
    convertForumData(data) {
      var newData = [];
      data.forEach(item => {
        var tempItem = [];
        tempItem["title"] = item["title"];
        tempItem["movieId"] = item["id"];
        newData.push(tempItem);
      });
      return newData;
    },
    convertUsersData(data) {
      var newData = [];
      data.forEach(item => {
        var tempItem = [];
        tempItem["posterPath"] = item["profilePicture"];
        tempItem["title"] = item["name"];
        tempItem["movieId"] = item["id"];
        newData.push(tempItem);
      });
      return newData;
    }
  }
};
</script>

<style scoped>
.search {
  margin-right: 15%;
}
.fullRow {
  width: 100%;
}
.fullRow:hover {
  background-color: var(--v-background-lighten2);
}
</style>