<template>
  <v-card class="topContainer secondary" max-height="290px" min-height="290px" dark flat>
    <v-layout
      justify-center
      v-if="this.user.name"
      row
      style="padding: 20px 20px 20px 7%; height:290px; width:100%"
    >
      <v-card
        class="py-0 transparent"
        :style="[this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs ? 'width: 90%;' : 'width: 50%;'] + ' min-width:250px; height: 100%'"
        flat
      >
        <v-card-title class="font-italic font-weight-thin pb-4 pt-0 justify-center">About me</v-card-title>
        <v-card-text
          class="desc"
          style="height: 80%; overflow-y: scroll; white-space: pre-line;"
          v-html="decodeHtml(this.user.description)"
        ></v-card-text>
      </v-card>
      <v-spacer class="hidden-sm-and-down" style="max-width:5%"></v-spacer>
      <v-card
        img
        class="transparent hidden-sm-and-down my-auto"
        flat
        max-width="12%"
        max-height="100%"
        min-width="180px"
      >
        <v-img contain max-height="100%" max-width="100%" :src="this.user.profilePicture"></v-img>
      </v-card>
      <v-spacer style="max-width:5%"></v-spacer>
      <v-card
        class="transparent hidden-sm-and-down"
        style="min-width: 15%; padding-right:80px"
        flat
      >
        <v-btn v-show="this.user.id == getLoggedInUserId()" text outlined color="accent">
          <router-link
            class="accent--text text--lighten-2"
            :to="{ name: 'ProfileEditProfile', params: { id: this.user.id } }"
          >Edit profile</router-link>
        </v-btn>

        <v-card-title class="font-weight-thin caption pb-1 pt-3 px-0">Name</v-card-title>
        <v-row class="mx-0 h1">{{ this.user.name }}<span class="accent--text text--lighten-2 caption pl-2" v-show="GET_USER.role == 'Admin'">( UID-{{this.user.id}} )</span></v-row>
        <v-card-title class="font-weight-thin caption pb-1 pt-3 px-0">Age</v-card-title>
        <v-row class="mx-0">{{ userAge }}</v-row>
        <v-card-title class="font-weight-thin caption pb-1 pt-3 px-0">Registered from</v-card-title>
        <v-row class="mx-0">{{ this.user.registerDate }}</v-row>

        <v-btn 
          v-show="this.user.id != getLoggedInUserId() && GET_USER"
          text
          outlined
          class="blue--text text--darken-1 mt-5"
          @click="folowUser()"
        >
          <span v-if="isFollowed">UnFollow</span>
          <span v-else>Follow</span>
        </v-btn>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileInfoRow",
  props: {
    user: Object
  },
  computed: {
    ...mapGetters(["GET_USER"]),
    userAge() {
      return new Date().getFullYear() - parseInt(this.user.birthDate);
    },
    isFollowed() {
      if (typeof this.GET_USER.followingUsers == 'undefined') {
        return false;
      }
      return this.GET_USER.followingUsers.includes(this.user.id);
    }
  },
  methods: {
    folowUser() {
      this.$store
        .dispatch("FOLLOW_USER", {
          userId: this.GET_USER.id,
          followedUserId: this.user.id
        })
        .then(() => {
          if (typeof this.GET_USER.followingUsers == "undefined") {
            this.GET_USER.followingUsers = [];
          }
          var msg = "Now following this user!";
          var color = "success";
          if (this.isFollowed) {
            var index = this.GET_USER.followingUsers.indexOf(this.user.id);
            this.GET_USER.followingUsers.splice(index, 1);
            msg = "Not following this user anymore!";
            color = "warning";
          } else {
            this.GET_USER.followingUsers.push(this.user.id);
          }
          this.notify(msg, color);
        })
        .catch(() => {
          this.notify("error", "error");
        });
    },
    getLoggedInUserId() {
      return this.$store.getters.GET_USER.id; // Add user id to its profile link
    },
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
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
};
</script>

<style scoped>
.topContainer {
  width: 100%;
  border-radius: 0%;
  max-height: 35%;
  height: 35%;
}
.desc::-webkit-scrollbar {
  display: none;
}
.desc {
  scrollbar-width: none;
}
div a {
  text-decoration: none;
}
</style>