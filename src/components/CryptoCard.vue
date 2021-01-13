<template>
  <div class="crypto-card" @click="clickHandler">
    <div class="crypto-card__price" style="text-transform: uppercase">{{info.CoinInfo.FullName}}</div>

    <div class="crypto-wrapper">
      <div class="crypto-card__left">
        <img :src="`https://www.cryptocompare.com${info.CoinInfo.ImageUrl}`" class="crypto-card__image"/>
        <div class="crypto-card__name">
          <div class="crypto-card__title" >{{info.CoinInfo.Name}}</div>
          <div class="crypto-card__price">{{info.DISPLAY.USD.PRICE}}</div>
        </div>
      </div>

      <div>
        <div>
          <div>↑ High hour</div>
          <div class="crypto-card__hour" style="color: #53a800">{{info.DISPLAY.USD.HIGHHOUR}}</div>
        </div>
        <div>
          <div>↓ Low hour</div>
          <div class="crypto-card__hour" style="color: red;">{{info.DISPLAY.USD.LOWHOUR}}</div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import toFix from '../filters/toFix'
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },

    filters: {
      toFix
    },

    methods: {
      clickHandler () {
        this.$emit('click', this.info);
      },
    }
  }
</script>

<style lang="sass" scoped>
.crypto-card
  width: 390px
  height: 155px
  background: #fff
  border: 1px solid hsla(0,0%,86.3%,.58)
  border-radius: 6px
  transition: .5s
  cursor: pointer
  padding: 30px

  &__image
    width: 55px
    height: 55px
    margin-top: 10px
    margin-right: 15px

  &__title
    margin-bottom: 10px

  &__price
    font-weight: 600
    font-size: 20px

  &__left
    display: flex

  &__name
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    margin-top: 10px

.crypto-card:hover
  box-shadow: 5px 5px 25px 0 rgba(46,61,73,.16)

.crypto-wrapper
  display: flex
  align-items: center
  justify-content: space-between


</style>
