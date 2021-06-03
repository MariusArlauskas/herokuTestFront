<template>
  <v-flex class="mx-0 px-0" style="margin-top: -9px; width:100">
    <ProfileInfoRow :user="this.user" />
    <v-divider class="secondary lighten-1"></v-divider>
    <v-tabs background-color="secondary" dark>
      <v-tab :to="{name: 'ProfileMainWall'}" :router="true" class="tab font-weight-light">Main</v-tab>
      <v-tab :to="{name: 'ProfileMoviesList'}" :router="true" class="font-weight-light">Movies</v-tab>
      <v-tab :to="{name: 'ProfileForum'}" :router="true" class="font-weight-light">Forum</v-tab>
      <v-tab :to="{name: 'FollowsList'}" :router="true" class="font-weight-light">Following ( {{ this.getFollowingCount }} )</v-tab>
      <v-tab :to="{name: 'FollowersList'}" :router="true" class="font-weight-light">Followers ( {{ this.getFollowersCount }} )</v-tab>
    </v-tabs>
    <router-view :userId="this.user.id" />
  </v-flex>
</template>

<script>
import ProfileInfoRow from "./ProfileInfoRow";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: { ProfileInfoRow },
  data: () => ({
    user: {}
  }),
  computed: {
    ...mapGetters(["GET_API_URL", "GET_USER"]),
    getFollowingCount() {
      if (typeof this.user.followingUsers == 'undefined') {
        return 0;
      }
      return this.user.followingUsers.length;
    },
    getFollowersCount() {
      if (typeof this.user.followers == 'undefined') {
        return 0;
      }
      return this.user.followers.length;
    }
  },
  methods: {
    setUserFromId() {
      this.$store
        .dispatch("GET_USER_PROFILE_BY_ID", {
          id: this.$route.params.id
        })
        .then(data => {
          this.user = data;
        });
    }
  },
  beforeMount() {
    this.setUserFromId();
  },
  watch: {
    "$route.params.id": function() {
      this.setUserFromId();
    }
  }
};
</script>

<style scoped>
.tab {
  margin-left: 10%;
}
</style>
