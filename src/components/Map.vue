<template>
  <div class="map-container">
    <!--<h1 @click="test()">这是新的地图组件</h1>-->
    <div class="sales-title">
      <span class="font">销售总额</span>
      <template v-if="amountCurrent">
        <template v-for="(item,index) in amount">
          <template v-if="item == '.'">
            <span class="dot"></span>
          </template>
          <template v-else>
            <template v-if="amountCurrent[index]!='a'">
                <span class="flip_wrap">
                  <Num :nextNum="item" :currentNum="amountCurrent[index]"/>
                </span>

            </template>
            <template v-else>
                <span class="flip_wrap">
                  <Num :nextNum="item" />
                </span>

            </template>
          </template>
        </template>
      </template>
      <template v-else>
        <template v-for="(item,index) in amount">
          <template v-if="item == '.'">
            <span class="dot"></span>
          </template>
          <template v-else>
             <span class="flip_wrap">
                 <Num :nextNum="item" />
              </span>
          </template>
        </template>
      </template>
      <span class="font">元</span>
    </div>
    <div id="map-wrap"></div>
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
  import Num from './num.vue'
  export default {
    name: 'map-wrap',
    components:{Num},
    props:{
      propAmount:{
        type:String
      }
    },
//    props: {
//      salesData: {
//        type: Object,
////        totalSales
//        default: {
//          totalSales: Number,
//          amount: Number,
//          totalOrders: Number,
//          failedOrders: Number
//        }
//      }
//    },
//    computed: {
//      amountStr: function () {
//        return this.salesData.amount.toFixed(0)
//      }
//    },
    data() {
      return {
        amount: '35280.00',
        amountCurrent: null,
        map: null,
        content: [],
        infoWindow: [],
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
        doAction: false,
        windowId:0,
      }
    },
    methods: {
      initMap() {
        let _this = this;
        let AMap = this.AMap = window.AMap
        this.map = new AMap.Map('map-wrap', {
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
        info_body.innerHTML = `<div class="info-header">${obj.kiosk_name}</div>`;
        if (obj.price > 0) {
          info_body.innerHTML += `
            <div class="info-sale">
              <table></table>
              <div class="info-pro"><span class="omit">${obj.subject}</span> ${obj.qty}件</div>
            </div>
            <div class="info-subject">¥ ${obj.price}</div>
          `;
        } else {
          let html = `
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
          `;
          info_body.innerHTML += html
        }

        div.appendChild(info_body);
        info.appendChild(div);
        // 定义底部内容
        console.log(info)
        return info;
      },
      closeInfoWindow() {
        this.map.clearInfoWindow();
      },

      createSocket() {
        if (this.mySocket) {
          return;
        }
        this.mySocket = new this.$ws("ws://119.29.3.168:2000/map_socket");
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
        console.log(this)
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
        let activeMarker = null;
        this.infoWindow[this.windowId].setContent(this.createInfoWindow(obj));
        console.log(123);
        this.infoWindow[this.windowId].open(this.map, center);
        if(this.windowId = this.infoWindow.length-1){
          this.windowId = 0;
        }else{
          this.windowId++;
        }
        if(obj.price>0){
          this.changeAmount(obj.price);
        }

//        setTimeout(() => {
//          activeMarker = null;
//          this.closeInfoWindow();
//        }, 20000)


      },
      updateSalesData(order, fn_this) {
        fn_this.salesData.totalSales += order.qty;
        fn_this.salesData.amount += order.price;
        fn_this.salesData.totalOrders++;
      },
      test() {
        this.infoWindow[0].open(this.map, [118.940335, 27.986321]);
      },
      moveTo(zoom, center) {
        this.map.setZoomAndCenter(zoom, center);
      },
      changeAmount(ran) {
        let _this = this;
        let currentNum = _this.amount;
        let nextNum = parseInt(_this.amount);
        nextNum = parseInt(nextNum)+ran;
        let currentStr = '';
        let nextStr = nextNum+'';
        for (let i = 0; i < nextStr.length; i++) {
          if (nextStr[i] != currentNum[i]) {
            currentStr += currentNum[i];
          }else{
            currentStr += 'a';
          }
        }
        let len = nextStr.length - currentStr.length;
//        let a = '';
//        for (let i = 0; i < len; i++) {
//          a += 'a';
//        }
        _this.amountCurrent = currentStr;
        _this.amount = parseInt(nextStr)+'';
        setTimeout(() => {
          _this.amountCurrent = null;
        }, 1000);
      }
    },
    mounted() {
      this.amount = this.propAmount;
      this.initMap();
      this.infoWindow.push(new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: '',
        offset: new AMap.Pixel(123,3.75)
      }));
      this.infoWindow.push(new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: '',
        offset: new AMap.Pixel(123,3.75)
      }));
      this.infoWindow.push(new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: '',
        offset: new AMap.Pixel(123,3.75)
      }));

      let _this = this;


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

  #map-wrap {
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

  .flip_wrap{
    width: 3.2rem;
    margin: 0 0.4rem;
  }
  /*.sales-title img.int {*/
    /*width: 3.2rem;*/
    /*margin: 0 0.4rem;*/
  /*}*/

  .sales-title span.font {
    margin: 0 1rem;
  }

  .dot{
    margin: 0 0.6rem 2.4rem;
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: #18f0fc;
  }
</style>
