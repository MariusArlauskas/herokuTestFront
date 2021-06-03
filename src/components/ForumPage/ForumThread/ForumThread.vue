<template>
  <v-layout class="mainContainer mt-5" column>
    <v-card 
      v-if="(typeof this.forum['id'] != 'undefined' && this.forum['id'] != null)"
      class="secondary px-5 pt-5 mb-4 mx-auto" 
      width="100%"
      dark 
      flat
    >
      <v-layout 
        row
        class="caption mb-2 d-flex align-center"
        style="overflow-x: hidden"
      >
        <v-col
          cols="8"
          class="text-h6 text-no-wrap py-1"
          style="overflow-x: hidden"
        >
          {{ this.forum.title }}
        </v-col>
        <v-col
          cols="2"
          class="text-no-wrap text-end"
        >
          <v-row>
            <v-list-item-content class="py-0">
              <v-list-item-subtitle>
                <router-link
                  class="grey--text text--lighten-1 pr-4"
                  style="text-decoration: none"
                  :to="{ name: 'ProfileMainWall', params: { id: this.forum.userId } }"
                >{{ this.forum.userName }}</router-link>
              </v-list-item-subtitle>
            </v-list-item-content>
            <router-link :to="{ name: 'ProfileMainWall', params: { id: this.forum.userId } }">
              <v-list-item-avatar class="my-0" size="25">
                <img :src="this.forum.profilePicture" />
              </v-list-item-avatar>
            </router-link>
          </v-row>
        </v-col>
        <v-col
          cols="2"
          class="text-no-wrap py-1 text-end"
          style="overflow-x: hidden"
        >
          {{ this.forum.postDate }}
        </v-col>
        <v-col
          cols="12"
          class="caption pl-6 pt-2 pb-2"
          style="overflow-x: hidden"
          v-html="decodeHtml(this.forum.message)"
        >
          {{ this.forum.message }}
        </v-col>
      </v-layout>
    </v-card>
    <ForumThreadMessageBox v-show="(GET_USER && typeof this.forum['id'] != 'undefined')" @clicked="childAction" />
    <v-card
      class="secondary px-5 pt-5 mb-4 ml-auto mr-0" width="97%" dark flat
      v-for="(item, index) in this.messages"
      :key="item.id"
    >
      <v-layout 
        row
        class="caption mb-2 d-flex align-center fullRow"
        style="overflow-x: hidden"
      >
        <v-col cols="2" class="text-no-wrap">
          <v-row>
            <router-link :to="{ name: 'ProfileMainWall', params: { id: item.userId } }">
              <v-list-item-avatar class="my-0" size="25">
                <img :src="item.userProfilePicture" />
              </v-list-item-avatar>
            </router-link>
            <v-list-item-content class="py-0">
              <v-list-item-subtitle>
                <router-link
                  class="grey--text text--lighten-1"
                  style="text-decoration: none"
                  :to="{ name: 'ProfileMainWall', params: { id: item.userId } }"
                >{{ item.userName }}</router-link>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-row>
        </v-col>
        <v-col
          cols="8"
          class="text-h6 text-no-wrap py-1"
          style="overflow-x: hidden"
        >
        </v-col>
        <v-col 
          cols="1"
          class="py-1 text-end"
          style="overflow-x: hidden"
        >
            <v-btn
              v-show="GET_USER.id == item.userId && !(typeof GET_USER.chatBannedUntil != 'undefined' && GET_USER.chatBannedUntil != null && new Date(GET_USER.chatBannedUntil) > new Date())"
              style="margin-top:-1px;"
              color="accent lighten-2"
              right
              x-small
              icon
              @click.prevent="deleteMsg(index)"
            >
              <v-icon size="17">delete</v-icon>
            </v-btn>
        </v-col>
        <v-col
          cols="1"
          class="text-no-wrap py-1 text-end"
          style="overflow-x: hidden"
        >
          {{ shortenDate(item.postDate) }}
        </v-col>
        <v-col
          cols="10"
          class="text-no-wrap caption pl-6 pt-2 pb-2"
          style="overflow-x: hidden"
          v-html="decodeHtml(item.message)"
        >
          {{ item.message }}
        </v-col>
      </v-layout>
    </v-card>
    <v-progress-circular
      v-show="!this.pagesEnd"
      v-if="typeof this.messages[0] == 'undefined' && this.messages[0] == null"
      size="30"
      width="3"
      indeterminate
      color="accent lighten-2"
      style="margin-left: calc(50% - 15px); margin-top:6.5%"
    ></v-progress-circular>
    <infinite-loading v-show="!this.pagesEnd" v-else spinner="spiral" @infinite="infiniteHandler"></infinite-loading>
    <v-flex
      v-show="this.pagesEnd"
      class="mt-3 mb-5 ml-auto mr-0 text-center grey--text body-2"
      style="width: 97%"
    >No more messages found</v-flex>
  </v-layout>
</template>

<script>
import ForumThreadMessageBox from './ForumThreadMessageBox';
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "ForumThread",
  components: { InfiniteLoading, ForumThreadMessageBox },
  data: () => ({
    messages: [],
    forum: [],
    pagesEnd: false,
    pagesLoaded: 0
  }),
  computed: {
    ...mapGetters(["GET_USER"]),
  },
  methods: {    
    deleteMsg(index) {
      this.$store
        .dispatch("DELETE_MESSAGE", {
          id: this.messages[index].id
        })
        .then(() => {
          this.messages.splice(index, 1);
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Comment deleted!",
            alertClass: "success"
          });
        });
    },
    getMessages() {
      this.$store
        .dispatch("GET_FORUM_MESSAGES", { page: this.pagesLoaded, forumId: this.$route.params.id})
        .then(data => {
          if (typeof data == "undefined" || data == null || data == "") {
            this.pagesEnd = true;
            return;
          }
          if (typeof data['messages'][0] == "undefined") {
            this.pagesEnd = true;
          } else {
            this.messages = [...this.messages, ...data["messages"]];
          }
          if (typeof data['forum'] != "undefined") {
            this.forum = data["forum"];
          }
          this.pagesLoaded++;
        })
        .catch(() => {
          this.pagesEnd = true;
        });
    },
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    shortenDate(date) {
      return date.substr(0, 10);
    },
    childAction(data) {
      this.messages = [...[data], ...this.messages];
    },
    infiniteHandler($state) {
      setTimeout(() => {
        if (this.pagesEnd) {
          $state.complete();
        } else {
          this.getMessages();
          $state.loaded();
        }
      }, 1500);
    }
  },
  beforeMount() {
    this.getMessages();
  },
  watch: {
    "$route.params.id": function() {
      this.messages = [];
      this.forum = [];
      this.pagesLoaded = 0;
      this.pagesEnd = false;
      this.getMessages();
    }
  }
};
</script>

<style>
</style>