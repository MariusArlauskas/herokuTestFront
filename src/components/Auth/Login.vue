<template>
  <v-layout style="height: 100%" align-center justify-center>
    <v-flex xs10 sm6 md6 xl5>
      <v-form>
        <v-card
          flat
          dark
          style="border-radius: 40px; margin-bottom: 10%"
          color="secondary"
        >
          <v-toolbar flat color="transparent">
            <v-toolbar-title
              class="text-center font-weight-bold"
              style="width: 100%"
              >Login</v-toolbar-title
            >
          </v-toolbar>
          <v-alert class="ml-7 mr-7" color="error" :value="error" icon="close"
            >The username or password is incorrect!</v-alert
          >

          <v-card-text class="justify-center">
            <v-text-field
              v-model="username"
              prepend-inner-icon="person"
              name="username"
              label="E-mail"
              type="text"
              v-on:keyup.enter="login()"
            ></v-text-field>

            <v-text-field
              v-model="password"
              prepend-inner-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-on:keyup.enter="login()"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="mr-10 ml-10">
            <v-btn to="/signUp" depressed rounded color="transparent"
              >Sign up</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="!this.loginLoad"
              depressed
              rounded
              color="transparent"
              :disabled="this.loginLoad"
              @click="login()"
            >
              <span>
                Login
                <v-icon>keyboard_arrow_right</v-icon>
              </span>
            </v-btn>
            <v-progress-circular
              v-else
              indeterminate
              size="26"
              width="3"
              color="accent lighten-2"
              style="margin-right: 38px"
            ></v-progress-circular>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
    error: false,
    loginLoad: false,
    movies: [],
  }),
  methods: {
    getMovies() {
      var uid = 0;
      if (typeof this.userId != "undefined" || this.userId != null) {
        uid = this.userId;
      }
      this.$store
        .dispatch("GET_WEB_MOST_POPULAR_MOVIES_LIST", { page: 1, userId: uid })
        .then((data) => {
          if (data && data.constructor === Array) {
            this.movies.push(data.slice(0, 3));
          }
        });
    },
    login() {
      this.loginLoad = true;
      this.$store
        .dispatch("LOGIN", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
          this.$store
            .commit("SET_NOTIFICATION", {
              display: true,
              text: "Logged in!",
              alertClass: "success",
            })
            .catch(() => {
              this.error = true;
            });
        })
        .catch(() => {
          this.loginLoad = false;
          this.error = true;
        });
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>

<style scoped>
.v-text-field {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>
