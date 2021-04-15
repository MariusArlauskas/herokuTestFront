import axios from "axios";

const state = {
};

const getters = {
};

const actions = {
  GET_MESSAGES: (commit, { page, id, onlyFollowing = false }) => {
    return new Promise((resolve, reject) => {
      axios.get('messages/' + page + '/' + id + '/' + (onlyFollowing ? "true" : "false"))
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
  GET_MESSAGES_FOLLOWING: (commit, { page, id }) => {
    return new Promise((resolve, reject) => {
      axios.get('messages/following/' + page + '/' + id)
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
  GET_USERS_MESSAGES: (commit, { offset, userId }) => {
    return axios.get('users/' + userId + '/messages/' + offset)
      .then(({ data, status }) => {
        if (status === 200) {
          return data;
        }
      })
  },
  GET_MOVIE_MESSAGES: (commit, { offset, movieId }) => {
    return axios.get('movies/' + movieId + '/messages/' + offset)
      .then(({ data, status }) => {
        if (status === 200) {
          return data;
        }
      })
  },
  POST_MESSAGE: (commit, { message, parentId, movieId, id = 0 }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`messages`, { message: message, parentId: parentId, movieId: movieId, id: id })
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
  DELETE_MESSAGE: (commit, { id }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`messages/` + id)
        .then(({ data, status }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  }
};

const mutations = {
};

export default {
  state,
  getters,
  mutations,
  actions
};
