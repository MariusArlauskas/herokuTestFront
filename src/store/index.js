import Vue from "vue";
import Vuex from "vuex";

import GlobalStore from "./modules/GlobalStore";
import UserStore from "./modules/UserStore";
import Notification from "./modules/NotificationStore";
import MoviesStore from "./modules/MoviesStore";
import FeedStore from "./modules/FeedStore";
import PersonStore from "./modules/PersonStore";
import ForumStore from "./modules/ForumStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    GlobalStore,
    UserStore,
    Notification,
    MoviesStore,
    FeedStore,
    PersonStore,
    ForumStore
  }
});
