<template>
  <v-layout class="mainContainer">
    <ProfileFeed />
  </v-layout>
</template>

<script>
import ProfileFeed from "./ProfileFeed";
export default {
  name: "ProfileMainWall",
  components: { ProfileFeed }
};
</script>

<style scoped>
</style>