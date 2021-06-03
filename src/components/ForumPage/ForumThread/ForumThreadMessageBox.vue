<template>
  <div class="mb-3 ml-auto mr-0" style="width:97%">
    <div
      v-if="new Date(GET_USER.chatBannedUntil) > new Date()"
      v-show="(typeof GET_USER.chatBannedUntil != 'undefined' && GET_USER.chatBannedUntil != null)"
      class="caption accent--text text--lighten-2 mb-3 text-center"
    >Chat banned until {{ GET_USER.chatBannedUntil }}</div>

    <div v-else>
      <v-btn
        v-show="this.button"
        class="caption accent--text text--lighten-2 mb-3"
        text
        height="20px"
        width="100%"
        @click="writeMsg = !writeMsg"
      >
        <span v-if="!writeMsg">
          <v-icon small>keyboard_arrow_down</v-icon>
          <span>Add comment</span>
          <v-icon small>keyboard_arrow_down</v-icon>
        </span>
        <span v-else>
          <v-icon small>keyboard_arrow_up</v-icon>
          <span>Close</span>
          <v-icon small>keyboard_arrow_up</v-icon>
        </span>
      </v-btn>

      <v-slide-y-transition>
        <div v-show="writeMsg">
          <v-list-item class="px-3 pt-3">
            <v-layout column>
              <v-textarea
                v-model="textArea"
                placeholder="Write your message here..."
                outlined
                dark
                rows="2"
                :rules="[this.rules.required]"
              ></v-textarea>
            </v-layout>
          </v-list-item>
          <v-slide-y-transition>
            <div v-show="this.textArea != ''">
              <v-card-actions class="pb-0 mx-2">
                <v-spacer></v-spacer>
                <v-btn right height="22px" text @click="postMsg()">
                  <span class="body-2 accent--text text--lighten-2">Post</span>
                </v-btn>
              </v-card-actions>
              <v-divider class="mt-2" dark></v-divider>
                <v-card class="secondary px-7 pt-7 pb-2 mx-auto my-5" width="100%" dark flat>
                  <v-layout 
                    row
                    class="caption mb-2 d-flex align-center fullRow"
                    style="overflow-x: hidden"
                  >
                    <v-col
                      cols="2"
                      class="text-no-wrap"
                    >
                      <v-row>
                          <v-list-item-avatar class="my-0" size="25">
                            <img :src="GET_USER.profilePicture" />
                          </v-list-item-avatar>
                        <v-list-item-content class="py-0">
                          <v-list-item-subtitle>
                            {{ GET_USER.name }}
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
                      class="text-no-wrap py-1 text-end"
                      style="overflow-x: hidden"
                    >
                      {{ new Date().toISOString().substr(0, 10) }}
                    </v-col>
                    <v-col
                      cols="10"
                      class="text-no-wrap caption pl-6 pt-2 pb-2"
                      style="overflow-x: hidden"
                      v-html="decodeHtml(this.textArea)"
                    >
                      {{ this.textArea }}
                    </v-col>
                  </v-layout>
                </v-card>
              <v-divider class="mb-10" dark></v-divider>
            </div>
          </v-slide-y-transition>
        </div>
      </v-slide-y-transition>
      <div :class="[this.writeMsg ? 'mt-10' : '']"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CommentBox",
  components: { },
  data: () => ({
    writeMsg: false,
    editing: false,
    textArea: "",
    button: true,
    rules: {
      required: value => !!value || "Required",
    }
  }),
  computed: {
    ...mapGetters(["GET_USER"]),
    getUserId() {
      if (this.$store.getters.GET_USER.id > 0) {
        return this.$store.getters.GET_USER.id; // Add user id to its profile link
      }
      return 0;
    },
    getCurrentDate() {
      return new Date().toISOString().substr(0, 10);
    }
  },
  methods: {
    postMsg() {
      if (this.textArea == '') {
        return;
      }
      this.$store
        .dispatch("POST_FORUM_MESSAGE", {
          message: this.textArea,
          forumId: this.$route.params.id,
        })
        .then(data => {
          this.textAreaTitle = "";
          this.textArea = "";
          if (this.button) {
            this.writeMsg = false;
          }
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Comment added!",
            alertClass: "success"
          });
          data['userProfilePicture'] = this.GET_USER.profilePicture;
          data['userName'] = this.GET_USER.name
          this.$emit("clicked", data);
        });
    },
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  },
  created() {
    if (!this.button) {
      this.writeMsg = true;
    }
  }
};
</script>

<style>
</style>