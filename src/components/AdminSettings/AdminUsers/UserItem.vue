<template>
  <v-layout
    class="fullRow caption font-weight-light mx-0 my-0"
    align-center
    style="height: 50px; width:100%; cursor:pointer"
    row
    @click="jump()"
  >
    <v-avatar style="height:30px; margin-left: 20px; max-width: 30px; min-width:30px">
      <img :src="this.item.profilePicture" />
    </v-avatar>
    <v-col
      class="text-no-wrap"
      style="max-width:20%; min-width:20%; overflow-x: hidden"
    >
      <span class="accent--text text--lighten-2 caption pr-1" v-show="GET_USER.role == 'Admin'">( UID-{{this.item.id}} )</span>{{ this.item.name }}
    </v-col>
    <v-col
      class="text-no-wrap"
      style="margin-left:1%; max-width:25%; min-width:25%; overflow-x: hidden"
    >{{ this.item.email }}</v-col>
    <v-col
      class="text-no-wrap"
      style="margin-left:1%; max-width:15%; min-width:15%"
    >{{ this.item.registerDate }}</v-col>
    <v-col
      v-on:click.stop
      class="text-no-wraps pt-3 pb-0"
      style="margin-left:1%; max-width:13%; min-width:13%; margin-top: -2px"
    >
      <v-select
        height="20px"
        class="caption"
        dense
        :items="roles"
        v-model="chosenRole"
        item-text="name"
        item-value="realName"
        @change="changeUserRole"
      ></v-select>
    </v-col>
    <v-col
      v-on:click.stop
      class="text-no-wrap pt-3 pb-0"
      style="margin-left:2%; max-width:11%; min-width:11%; margin-bottom: -4px"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            height="20px"
            class="pb-0 pt-1 my-0 caption"
            name="chatBannedUntil"
            v-model="chatBannedUntil"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          no-title
          v-model="chatBannedUntil"
          :min="getCurrentDate"
          :max="getMaxDate"
          @change="saveChatBannedUntil"
          style="border-radius: 0px"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-container class="colorIndicator" :style="'margin-right:1%; background:' + getBanColor"></v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserItem",
  components: {},
  data: () => ({
    menu: false,
    chatBannedUntil: null,
    roles: [
      { name: "User", realName: "ROLE_USER" },
      { name: "Admin", realName: "ROLE_ADMIN" }
    ],
    chosenRole: ""
  }),
  props: {
    item: Object
  },
  computed: {
    ...mapGetters(["GET_USER"]),
    getBanColor() {
      if (this.item.chatBannedUntil.length == 0) {
        return "var(--v-success-base);";
      }
      if (new Date(this.item.chatBannedUntil) > new Date()) {
        return "var(--v-error-darken1);";
      } else {
        return "var(--v-success-base);";
      }
    },
    getMaxDate() {
      var d = new Date();
      d.setFullYear(d.getFullYear() + 6);
      return d.toISOString().substr(0, 10);
    },
    getCurrentDate() {
      var d = new Date();
      return d.toISOString().substr(0, 10);
    }
  },
  methods: {
    jump() {
      this.$router.push({
        name: "ProfileMainWall",
        params: { id: this.item.id }
      });
    },
    changeUserRole() {
      this.$store
        .dispatch("CHANGE_USER_ROLE", {
          id: this.item.id,
          role: this.chosenRole
        })
        .then(() => {
          this.item.role = this.chosenRole;
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: this.item.name + " role got changed!",
            alertClass: "success"
          });
        })
        .catch(() => {
          this.pagesEnd = true;
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Error. Please try again!",
            alertClass: "error"
          });
        });
    },
    saveChatBannedUntil(date) {
      this.$refs.menu.save(date);
      this.$store
        .dispatch("CHAT_BAN_USER", {
          id: this.item.id,
          chatBannedUntil: date
        })
        .then(() => {
          this.item.chatBannedUntil = date;
          this.item.role = this.chosenRole;
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: this.item.name + " got chat banned until " + date + " !",
            alertClass: "success"
          });
        });
    }
  },
  mounted() {
    this.chosenRole = this.item.role;
    this.chatBannedUntil = this.item.chatBannedUntil;
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
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
.colorIndicator {
  border-radius: 50%;
  padding: 2px;
  margin: 0px;
  width: 20px;
  height: 20px;
}
</style>