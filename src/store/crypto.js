import axios from 'axios';
const API_KEY = '5dab64cdb7d7fe92aa9386d03537c979d13a3c6f736de59b254c6d3fda7bb3e8';

export const crypto = {
  state: {
    cryptoList: []
  },
  actions: {
    async GET_CRYPTO_LIST ({commit}) {
      await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull`, {
        params: {
          'api_key': API_KEY,
          tsym: 'USD',
          limit: 20
        }
      })
        .then(res => {
          commit('SET_CRYPTO_LIST', res.data.Data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mutations: {
    SET_CRYPTO_LIST (state, list) {
      state.cryptoList = list;
    }
  },
  getters: {
    getterCryptoList: state => state.cryptoList
  }
};
