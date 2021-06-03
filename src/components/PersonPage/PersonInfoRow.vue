<template>
  <v-card class="topContainer secondary" max-height="290px" min-height="290px" dark flat>
    <v-layout
      v-if="(typeof this.person != 'undefined' || this.person != {})" 
      justify-center
      row
      style="padding: 20px 120px 20px 7%; height:290px; width:100%"
    >
      <v-spacer></v-spacer>
      <v-card class="transparent" style="width: 15%" flat></v-card>
      <v-card img class="transparent" flat max-width="12%" max-height="100%" min-width="180px">
        <v-img
          v-if="(typeof this.person.picture != 'undefined' && this.person.picture != null)"
          contain
          max-height="100%"
          max-width="100%"
          :src="this.person.picture"
        ></v-img>
      </v-card>
      <v-spacer></v-spacer>
      <v-card class="py-0 transparent" style="min-width:553px; width: 65%; height: 100%" flat>
        <v-card-title class="font-italic font-weight-thin pb-4 pt-0" style="overflow-y: hidden">
          {{ this.person.name }}
        </v-card-title>
        <v-card-text
          class="desc"
          style="height: 80%; overflow-y: scroll; white-space: pre-line;"
        >{{ this.person.biography }}</v-card-text>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "PersonInfoRow",
  data: () => ({
    person: {}
  }),
  methods: {
    getPersonInfo() {
      this.$store
        .dispatch("GET_PERSON_INFO", this.$route.params.id)
        .then(data => {
          this.person = data;
        });
    }
  },
  beforeMount() {
    this.getPersonInfo();
  },
  watch: {
    "$route.params.id": function() {
      this.getPersonInfo();
    }
  }
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
.colorIndicator {
  border-radius: 50%;
  padding: 2px;
  margin: 0px;
  width: 15px;
  height: 15px;
}
</style>