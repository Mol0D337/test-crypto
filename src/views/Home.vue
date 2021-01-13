<template>
  <div>
    <div class="crypto-cars_wrapper">
      <CryptoCard
              @click="clickHandler"
              v-for="(item, i) in getterCryptoList"
              :key="i"
              :info="item"
      />
    </div>


    <Modal
            v-show="isPopup"
            :current-item="currentItem"
            @closePopup="closePopup"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import CryptoCard from '../components/CryptoCard';
  import Modal from '../components/Modal';

  export default {
    name: "MainPage",

    data () {
      return {
        currentItem: {},
        isPopup: false,
      }
    },

    components: {
      CryptoCard,
      Modal
    },

    computed: {
      ...mapGetters([
        'getterCryptoList'
      ])
    },

    created () {
      this.getCryptoList();
    },

    methods: {
      ...mapActions({
        getCryptoList: 'GET_CRYPTO_LIST'
      }),
      closePopup() {
        this.isPopup = false;
      },
      clickHandler (item) {
        this.isPopup = true;
        this.currentItem = item;
      },
    }
  }
</script>

<style lang="sass" scoped>
  .crypto-cars_wrapper
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-gap: 10px
    padding-top: 60px
    max-width: 1650px
    margin: 0 auto 30px

</style>
