<template>
  <v-card 
    class="mainContainer transparent"
    style="margin-top: 15px; margin-bottom: 15px"
    width="100%"
    height="auto"
    flat
    dark
  >
    <ForumNewThreadBox v-show="GET_USER" @clicked="childAction" />
    <router-link 
      v-for="(item, index) in this.dataList" :key="item.id"
      :to="{ name: 'ForumThread', params: { id: item.id } }"
      class="grey--text text--lighten-2 py-0 px-0"
      style="text-decoration: none"
    >
      <v-card class="secondary px-3 pb-0 mx-auto mb-5" flat>
        <v-layout 
          row
          class="caption mb-2 d-flex align-center fullRow"
          style="cursor: pointer; overflow-x: hidden"
        >
          <v-col
            cols="10"
            class="text-h6 text-no-wrap py-1"
            style="overflow-x: hidden"
          >
            {{ item.title }}
          </v-col>
          <v-col
            cols="1"
            class="py-1 text-end align-self-center"
          >
            <v-btn
              v-show="GET_USER.id == item.userId && !(typeof GET_USER.chatBannedUntil != 'undefined' && GET_USER.chatBannedUntil != null && new Date(GET_USER.chatBannedUntil) > new Date())"
              class="mb-1 mr-3"
              color="accent lighten-2"
              right
              x-small
              icon
              @click.prevent="deleteForum(index)"
            >
              <v-icon size="16">delete</v-icon>
            </v-btn>
            <v-icon size="15" class="pb-1 pr-1">comment</v-icon>  
            <span class="body-2 font-weight-thin">{{ item.messageCount ? item.messageCount : 0 }}</span>
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
            class="text-no-wrap caption pl-6 pt-0 pb-2"
            style="overflow-x: hidden"
            v-html="decodeHtml(item.message)"
          >
            {{ item.message }}
          </v-col>
        </v-layout>
      </v-card>
    </router-link>
    <v-progress-circular
      v-show="!this.pagesEnd"
      v-if="typeof this.dataList[0] == 'undefined' && this.dataList[0] == null"
      size="30"
      width="3"
      indeterminate
      color="accent lighten-2"
      style="margin-left:calc(50% - 30px); margin-top:2%"
    ></v-progress-circular>
    <infinite-loading
      ref="infiniteHandler"
      v-show="!this.pagesEnd"
      v-else
      spinner="spiral"
      @infinite="infiniteHandler"
    ></infinite-loading>
    <v-flex
      v-show="this.pagesEnd"
      class="mt-3 pb-5 text-center grey--text body-2"
    >No more forum threads found!</v-flex>
  </v-card>
</template>

<script>
import ForumNewThreadBox from './ForumNewThreadBox';
import InfiniteLoading from "vue-infinite-loading";
import { mapGetters } from "vuex";
export default {
  name: "Forum",
  components: { InfiniteLoading, ForumNewThreadBox },
  data: () => ({
    pagesLoaded: 0,
    dataList: [],
    pagesEnd: false,
    dialog: false
  }),
  computed: {
    ...mapGetters(["GET_USER"])
  },
  methods: {
    deleteForum(index) {
      this.$store
        .dispatch("DELETE_FORUM", {
          id: this.dataList[index].id
        })
        .then(() => {
          this.dataList.splice(index, 1);
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Forum thread deleted!",
            alertClass: "success"
          });
        });
    },
    getForum() {
      this.$store
        .dispatch("GET_FORUM", {
          page: this.pagesLoaded
        })
        .then(data => {
          if (typeof data[0] == "undefined") {
            this.pagesEnd = true;
            return;
          }
          this.dataList = [...this.dataList, ...data];
          this.pagesLoaded += 1;
        })
        .catch(() => {
          this.pagesEnd = true;
        });
    },
    childAction(data) {
      this.dataList = [...[data], ...this.dataList];
    },
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    shortenDate(date) {
      return date.substr(0, 10);
    },
    infiniteHandler($state) {
      setTimeout(() => {
        if (this.pagesEnd) {
          $state.complete();
        } else {
          $state.loaded();
          this.getForum();
        }
      }, 1500);
    }
  },
  mounted() {
    this.getForum();
  }
};
</script>

<style scoped>
.fullRow:hover {
  background-color: var(--v-background-lighten1);
}
</style>