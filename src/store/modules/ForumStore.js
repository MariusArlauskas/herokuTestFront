import axios from "axios";

const state = {
};

const getters = {
};

const actions = {
  GET_FORUM: (commit, { page }) => {
    return new Promise((resolve, reject) => {
      axios.get('forum/page/' + page)
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    })
  },
  GET_FORUM_MESSAGES: (commit, { forumId, page }) => {
    return new Promise((resolve, reject) => {
      axios.get('forum/' + forumId + '/messages/page/' + page)
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    })
  },
  POST_FORUM: (commit, { title, message }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`forum`, { title: title, message: message })
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  },
  DELETE_FORUM: (commit, { id }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`forum/` + id)
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  },
  POST_FORUM_MESSAGE: (commit, { message, forumId }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`forum/` + forumId + `/messages`, { message: message, forumId: forumId })
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  },
  SEARCH_FORUM: (commit, { search, page }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('forum/find', { search: search, page: page })
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  },
};

const mutations = {
};

export default {
  state,
  getters,
  mutations,
  actions
};
