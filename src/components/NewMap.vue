<template>
  <div class="map-container">
    <!--<h1 @click="test()">这是新的地图组件</h1>-->
    <div class="sales-title">
      <span class="font">销售总额</span>
      <template v-for="i in amountStr">
        <img :src="'./static/img/num'+i+'.png'" alt="" class="int">
      </template>
      <span class="font">元</span>
    </div>
    <div id="newMap"></div>
    <!--<button @click="moveTo(14,[113.559937,22.388519])">-->
    <!--定位到珠海-->
    <!--</button>-->
    <!--<button @click="moveTo(4,[108, 34])">-->
    <!--回到原始图-->
    <!--</button>-->

  </div>
</template>

<script>
  import siteData from '../assets/siteData';
  //  import remoteLoad from '../assets/remoteLoad';
  //  import {MapKey} from '../assets/config';

  export default {
    name: 'NewMap',
    props: {
      salesData: {
        type: Object,
//        totalSales
        default: {
          totalSales: Number,
          amount: Number,
          totalOrders: Number,
          failedOrders: Number
        }
      }
    },
    computed: {
      amountStr: function () {
        return this.salesData.amount.toFixed(0)
      }
    },
    data() {
      return {
        map: null,
        content: [],
        infoWindow: null,
        title: '',
        mySocket: null,
        circleMarkers: [],
        center: [108, 38],
        circleOption: {
          radius: 3,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: '#18f0fc',
          fillOpacity: 0.5,
          zIndex: 10
        },
        circleActiveOption: {
          radius: 12,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'rgb(70,25,255)',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgb(200,22,0)',
          fillOpacity: 0.5,
          zIndex: 20
        },
        action: null,
        doAction: false
      }
    },
    methods: {
      initMap() {
        let _this = this;
        let AMap = this.AMap = window.AMap
        this.map = new AMap.Map('newMap', {
          zoom: 4,
          center: [108, 38],
          dragEnable: false,
          doubleClickZoom: false,
          scrollWheel: false,
          mapStyle: 'amap://styles/f7ead324458cf9f1c57107c031a43db6'
        });
        for (var i = 0; i < siteData.length; i += 1) {
          let center = siteData[i].value;
          let name = siteData[i].name;
          let circleMarker = new AMap.CircleMarker({
            center: center,
            radius: 5,//3D视图下，CircleMarker半径不要超过64px
            strokeColor: 'white',
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: '#18f0fc',
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: 'pointer',
            clickable: true,
            extData: {
              kiosk_name: name
            }
          })
          circleMarker.setMap(this.map);
          _this.circleMarkers.push(circleMarker);
//          AMap.event.addListener(circleMarker, 'click', function () {
//            _this.map.setZoomAndCenter(13, center);
//          });
        }


      },
      createInfoWindow(obj) {

        var info = document.createElement("div");
        info.className = "info-container";
        var table = document.createElement('table');

        var div = document.createElement('div');

        div.appendChild(table);

        // 定义中部内容
        var info_body = document.createElement("div");
        info_body.className = "info-body";
        if (obj.price > 0) {
          info_body.innerHTML = `
            <div class="info-sale">
              <table></table>
              <div class="info-header">${obj.kiosk_name}</div>
              <div class="info-pro"><span class="omit">${obj.subject}</span> ${obj.qty}件</div>
            </div>
            <div class="info-subject">¥ ${obj.price}</div>
          `;
        } else {
          let html = `
          <div class="info-body">
            <div class="info-icon">`;
          if (obj.subject.indexOf('补货') > 1) {
            html +=
              `<img src="./static/img/icon_replenishment.png" alt="">`
          } else if (obj.subject.indexOf('开门') > 1) {
            html +=
              `<img src="./static/img/icon_overtime.png" alt="">`
          } else {
            html +=
              `<img src="./static/img/icon_reboot.png" alt="">`
          }
          html += `
            </div>
            <div class="info-subject">${obj.subject}</div>

          </div>
          `;
          info_body.innerHTML = html
        }

        div.appendChild(info_body);
        info.appendChild(div);
        // 定义底部内容
        return info;
      },
      closeInfoWindow() {
        this.map.clearInfoWindow();
      },

      createSocket() {
        if (this.mySocket) {
          return;
        }
        this.mySocket = new WebSocket("ws://119.29.3.168:2000/map_socket");
      },
      getSitePosition(name) {
        for (let i = 0; i < siteData.length; i++) {
          if (name == siteData[i].name) {
            return siteData[i].value
          }
        }
        return []
      },
      onMessage(message) {
        let obj = {
          kiosk_id: 'id123',
          kiosk_name: 'F1-10023',
          level: 'INFO',
          subject: '重新启动',
          date: '2018-01-10 08:23',
          price: 0,
          qty: 0
        }
        obj.kiosk_id = message.kiosk_id;
        obj.kiosk_name = message.kiosk_name;
        obj.subject = message.subject;
        obj.level = message.level;
        obj.price = message.price;
        obj.qty = message.qty;
        let center = this.getSitePosition(obj.kiosk_name);
        this.moveTo(8, center);
        let activeMarker = null;
//        for(let m of this.circleMarkers){
//          if(m.getExtData().kiosk_name == obj.kiosk_name){
//            m.setOptions(this.circleActiveOption);
//            activeMarker = m;
//            break;
//          }
//        }
        setTimeout(() => {
          this.infoWindow.setContent(this.createInfoWindow(obj));
          this.infoWindow.open(this.map, center);
          setTimeout(() => {
            this.map.setZoom(4);
//          activeMarker.setOptions(this.circleOption);
            activeMarker = null;
            this.closeInfoWindow();
            setTimeout(() => {
              this.map.setCenter([108, 38])
            }, 2000)
          }, 10000)
        }, 2000)


      },
      updateSalesData(order, fn_this) {
        fn_this.salesData.totalSales += order.qty;
        fn_this.salesData.amount += order.price;
        fn_this.salesData.totalOrders++;
      },
      test() {
        this.infoWindow.open(this.map, [118.940335, 27.986321]);
      },
      moveTo(zoom, center) {
        this.map.setZoomAndCenter(zoom, center);
      },
    },
    mounted() {
      this.initMap();
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: '<h1>dsadsa</h1>>',
        offset: new AMap.Pixel(246, 7.5)
      });


      let _this = this;
//      if(this.action){
//        clearInterval(this.action)
//        this.action = null;
//      }
//      this.action = setInterval(()=>{
//          if(this.doAction){
//
//          }
//      },20000)


    }
  }
</script>

<style scoped>
  .map-container {
    background: url("../assets/img/border_map.png") 0 0 no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    width: 100%;
    padding: 2px;
    height: 100%;
  }

  #newMap {
    width: 96%;
    height: 85%;
    margin: 0 auto;
  }

  .sales-title {
    height: 15%;
    text-align: center;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .sales-title img.int {
    width: 3.2rem;
    margin: 0 0.4rem;
  }

  .sales-title span.font {
    margin: 0 1rem;
  }

  /*.info {*/
  /*border: solid 1px silver;*/
  /*}*/

  /*div.info-top {*/
  /*position: relative;*/
  /*background: none repeat scroll 0 0 #F9F9F9;*/
  /*border-bottom: 1px solid #CCC;*/
  /*border-radius: 5px 5px 0 0;*/
  /*}*/

  /*div.info-top div {*/
  /*display: inline-block;*/
  /*color: #333333;*/
  /*font-size: 14px;*/
  /*font-weight: bold;*/
  /*line-height: 31px;*/
  /*padding: 0 10px;*/
  /*}*/

  /*div.info-top img {*/
  /*position: absolute;*/
  /*top: 10px;*/
  /*right: 10px;*/
  /*transition-duration: 0.25s;*/
  /*}*/

  /*div.info-top img:hover {*/
  /*box-shadow: 0px 0px 5px #000;*/
  /*}*/

  /*div.info-middle {*/
  /*font-size: 12px;*/
  /*padding: 6px;*/
  /*line-height: 20px;*/
  /*}*/

  /*div.info-bottom {*/
  /*height: 0px;*/
  /*width: 100%;*/
  /*clear: both;*/
  /*text-align: center;*/
  /*}*/

  /*div.info-bottom img {*/
  /*position: relative;*/
  /*z-index: 104;*/
  /*}*/

  /*span {*/
  /*margin-left: 5px;*/
  /*font-size: 11px;*/
  /*}*/

  /*.info-middle img {*/
  /*float: left;*/
  /*margin-right: 6px;*/
  /*}*/

</style>
