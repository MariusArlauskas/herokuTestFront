<template>
  <v-card class="background lighten-1 py-1 px-1" flat dark>
    <v-layout class="background mx-0 my-0" style="width:100%" row>
      <v-card class="transparent px-3 pb-3" width="100%" flat>
        <v-layout
          class="caption font-weight-light mx-0 my-0"
          align-center
          style="height: 50px; width:100%"
          row
        >
          <v-col cols="8" class="pl-3 pt-2 title font-weight-medium">Users</v-col>
          <v-col cols="4">
            <v-form @submit.prevent="getUser()">
              <v-text-field
                style="overflow: hidden"
                prepend-inner-icon="search"
                dark
                placeholder="Search for user by id"
                dense
                hide-details
                clearable
                rounded
                outlined
                v-model="searchUserId"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-layout>
        <v-layout v-if="typeof this.user.id != 'undefined'" class="mx-0 mt-3 mb-4 listHeader" style="height: 35px; width:100%" row>
          <v-col
            class="px-0 text-center"
            style="margin-left: 2%; max-width:calc(15% + 30px); min-width:calc(15% + 30px);"
          >Name</v-col>
          <v-col
            class="px-0 text-center"
            style="margin-left: 1%; max-width:30%; min-width:30%;"
          >Email</v-col>
          <v-col
            class="px-0 pl-3 text-start"
            style="margin-left:1%; max-width:15%; min-width:15%"
          >Joined at</v-col>
          <v-col class="px-0 text-center" style="margin-left:1%; max-width:13%; min-width:13%">Role</v-col>
          <v-col class="px-0 pl-3 text-start" style="margin-left:2%; min-width:11%">Banned status</v-col>
        </v-layout>
        <v-progress-circular
          v-show="this.searching"
          size="30"
          width="3"
          indeterminate
          color="accent lighten-2"
          style="margin-left:calc(50% - 15px); margin-top: 7%; margin-bottom: 7%"
        ></v-progress-circular>
        <v-container v-if="(typeof this.user.id != 'undefined')" class="py-0 px-0">
          <UserItem :item="this.user" />
        </v-container>
      </v-card>
      <v-flex v-show="this.noData" class="mb-5 pt-5 text-center grey--text body-2">No users found</v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import UserItem from "./UserItem";
export default {
  name: "AdminUsers",
  components: { UserItem },
  data: () => ({
    user: {},
    noData: false,
    searching: false,
    searchUserId: ''
  }),
  methods: {
    getUser() {
      this.user = {};
      this.searching = true;
      this.noData = false;
      this.$store
        .dispatch("GET_USER_BY_ID", { id: this.searchUserId })
        .then(data => {
          if (typeof data.id != 'undefined') {
            this.user = data;
          } else {
            this.noData = true;
          }
          this.searching = false;
        })
        .catch(() => {
          this.noData = true;
          this.searching = false;
        });
    }
  },
};
</script>

<style scoped>
</style>