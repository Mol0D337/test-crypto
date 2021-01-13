<template>
  <div class="inner" ref="popupWrap">


    <div class="modal">
      <div @click="closePopup" style="font-size: 30px;; text-align: end; cursor: pointer; margin: -10px">&times;</div>

      <div style="display: flex; justify-content: space-between">
        <div class="info">
          <div style="font-size: 30px"><b>{{webSocketInfo.fromsymbol}}</b></div>
          <div><b>PRICE:</b> {{webSocketInfo.price | toFix}} $</div>
          <div><b>LASTVOLUMETO:</b> {{webSocketInfo.LASTVOLUMETO | toFix}}</div>
        </div>

        <div class="info table">
          <div>
            <div><b>LASTVOLUME</b> </div>
            <div><b>VOLUME24HOUR</b> </div>
            <div><b>VOLUMEDAY</b> </div>
            <div><b>VOLUMEHOUR</b> </div>
          </div>

          <div>
            <div>{{webSocketInfo.LASTVOLUME | toFix}}</div>
            <div>{{webSocketInfo.VOLUME24HOUR | toFix}}</div>
            <div>{{webSocketInfo.VOLUMEDAY | toFix}}</div>
            <div>{{webSocketInfo.VOLUMEHOUR | toFix}}</div>
          </div>

        </div>
      </div>


      <line-chart :chart-data="datacollection" :height="300" :width="1000" />

    </div>

  </div>
</template>

<script>
  import LineChart from './LineChart.js';
  import axios from 'axios';
  import toFix from '../filters/toFix'
  import dateUtils from '../utlis/dateUtlis'

  export default {
    components: {
      LineChart
    },

    props: {
      currentItem: {
        type: Object,
        required: false,
        default: () => {}
      }
    },

    data () {
      return {
        connection: null,
        list: {},
        datacollection: null,
      }
    },

    filters: {
      toFix
    },

    computed: {
      webSocketInfo () {
        if (Object.keys(this.list).length && this.list[this.currentItem?.CoinInfo.Name]) {
          return {
            price: this.list[this.currentItem?.CoinInfo.Name].PRICE,
            LASTVOLUMETO: this.list[this.currentItem?.CoinInfo.Name].LASTVOLUMETO,
            fromsymbol: this.list[this.currentItem?.CoinInfo.Name].FROMSYMBOL,
            LASTVOLUME: this.list[this.currentItem?.CoinInfo.Name].LASTVOLUME,
            VOLUME24HOUR: this.list[this.currentItem?.CoinInfo.Name].VOLUME24HOUR,
            VOLUMEDAY: this.list[this.currentItem?.CoinInfo.Name].VOLUMEDAY,
            VOLUMEHOUR: this.list[this.currentItem?.CoinInfo.Name].VOLUMEHOUR,
          };
        } else {
          return { price: '-',
            LASTVOLUMETO: '-',
            fromsymbol: '-',
            LASTVOLUME: '-',
            VOLUME24HOUR: '-',
            VOLUMEDAY: '-',
            VOLUMEHOUR: '-',
          };
        }
      },
    },

    watch: {
      async currentItem () {
        const subRequest = {
          "action": "SubAdd",
          "subs": [`5~CCCAGG~${this.currentItem.CoinInfo.Name}~USD`]
        };

        this.connection.send(JSON.stringify(subRequest));

        await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.currentItem.CoinInfo.Name}&tsym=USD&limit=10`, {
          params: {
            "api_key": '5dab64cdb7d7fe92aa9386d03537c979d13a3c6f736de59b254c6d3fda7bb3e8'
          }
        })
          .then(res => {
            this.datacollection = {
              labels: res.data.Data.Data.map(item => dateUtils(item.time)),
              datasets: [
                {
                  label: 'PRICE CHART',
                  backgroundColor: '#f87979',
                  data: res.data.Data.Data.map(item => item.close)
                }
              ]
            };
          })
          .catch(err => {
            console.log(err);
          })
      }
    },

    mounted () {
      this.connection = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=5dab64cdb7d7fe92aa9386d03537c979d13a3c6f736de59b254c6d3fda7bb3e8');
      this.connected();

      let vm = this;
      document.addEventListener('click', function (item) {
        if (item.target === vm.$refs['popupWrap']) {
          vm.closePopup();
        }
      })
    },

    methods: {
      closePopup() {
        this.$emit('closePopup')
      },

      connected () {
        const conn = this.connection;

        conn.onmessage = (e) => {
          const data = JSON.parse(e.data);

          if (+data.TYPE === 5 && data.PRICE) this.$set(this.list, data.FROMSYMBOL, data);
        };
      }
    }
  }
</script>

<style lang="sass" scoped>
  .inner
    background: rgba(0, 0, 0, .85)
    z-index: 999
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    left: 0

  .modal
    position: absolute
    top: 20%
    left: 22%
    z-index: 99
    padding: 30px
    background: #fff
    border-radius: 10px
    border: 1px solid hsla(0,0%,86.3%,.58)

  .info
    margin-top: 30px
    margin-bottom: 30px
    width: 480px
    height: 125px
    background: #fff
    border: 1px solid hsla(0,0%,86.3%,.58)
    border-radius: 6px
    transition: .5s
    cursor: pointer
    padding: 30px
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.16)

  .table
    display: flex
    justify-content: space-between
</style>
