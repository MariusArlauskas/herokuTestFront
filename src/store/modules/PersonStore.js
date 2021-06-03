import axios from "axios";

const state = {
};

const getters = {
};

const actions = {
  GET_PERSON_INFO: (commit, id) => {
    return new Promise((resolve, reject) => {
      axios
        .get('person/' + id)
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
  SEARCH_PERSON: (commit, { search }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('person/find', { search: search })
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
