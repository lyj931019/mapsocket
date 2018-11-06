<template>
  <div style="width: 100%;height: 100%;" v-if="canShow">
    <div class="title">
      <div class="left">
        <img src="../assets/img/leftside.png" alt="">
      </div>
      <div class="middle">
        <img src="../assets/img/bg_title.png" alt="">
        <div class="title-content">
          <!-- img 中的style 在4k中可能需要删除 -->
          <img src="../assets/img/title.png" style="width: 50%;" alt="">
        </div>
      </div>
      <div class="right">
        <img src="../assets/img/rightside.png" alt="">
      </div>
    </div>
    <div class="container">
      <div class="aside aside-left">
        <div>
          <!--<TotalSales :salesData="salesData"/>-->
          <!--<TotalSalesF :salesData="salesData"/>-->
          <TotalSalesF ref="totalSales" :propSales="salesData"/>
        </div>
        <div>
          <RegionPie :regionArray="regionArray"/>
        </div>
        <div>
          <SkuTop :skuTop="skuTop"/>
        </div>
      </div>
      <div class="section">
        <div>
          <!--<MapWrap ref="newMap" :salesData="salesData"/>-->
          <MapWrap ref="newMap" :propAmount="salesData.amount"/>
        </div>
        <div>
          <Mypline :trend="trend" ref="myline"/>
        </div>
      </div>
      <div class="aside aside-right">
        <div>
          <Online/>
        </div>
        <div>
          <KioskLog :kioskLogs="kiosksLogs"/>
        </div>
        <div>
          <Pie/>
        </div>
        <div>
          <KioskTop :kioskArray="regionArray"/>
        </div>
      </div>
    </div>

    <!--<Map/>-->
    <br>


  </div>
</template>

<script>
  import MyComponents from "../components"
  import siteData from '../assets/siteData';

  export default {
    name: 'home',
    components: MyComponents,
    data() {
      return {
        canShow: false,
        mySocket: null,
        messageArray: [],
        messageQueue: null,
        salesData: {
////          totalSales: 12096,
//          totalSales: 0,
//          amount: '35280.00',
//          totalOrders: 10080,
//          failedOrders: 0
        },
        regionArray: [
//          {key: '广州', value: 3780},
//          {key: '上海', value: 3780},
//          {key: '深圳', value: 3780},
//          {key: '北京', value: 8820},
//          {key: '杭州', value: 2520},
//          {key: '南京', value: 1260},
//          {key: '武汉', value: 1260},
        ],
        kiosksLogs: [
//          {kiosk_id: 'id123', kiosk_name: 'G1-10004', level: 'INFO', subject: '重新启动', date: '2018.01.10 08:23'},
//          {kiosk_id: 'id123', kiosk_name: 'Q1-10011', level: 'WARNING', subject: '开门超过20分钟', date: '2018-01-10 08:02'},
//          {kiosk_id: 'id123', kiosk_name: 'F1-10021', level: 'INFO', subject: '进行补货', date: '2018.01.10 07:42'},
//          {kiosk_id: 'id123', kiosk_name: 'M1-10041', level: 'INFO', subject: '重新启动', date: '2018.01.10 07:17'},
//          {kiosk_id: 'id123', kiosk_name: 'M1-10065', level: 'INFO', subject: '进行补货', date: '2018.01.10 07:05'},
        ],
        skuTop: [
//          {name: '百岁山', value: 1713},
//          {name: '罐装可口可乐', value: 1310},
//          {name: '罐装雪碧', value: 1209},
//          {name: '雀巢', value: 1108},
//          {name: '东鹏特饮', value: 907},
//          {name: '维他茶250ml', value: 806},
//          {name: '加多宝', value: 604},
//          {name: '罐装芬达', value: 504},
//          {name: '红牛', value: 403},
//          {name: '达利园桂圆莲子八宝粥', value: 400},
        ],
        trend: {
          amount: [],
          orders: [],
          count: []
        }
      }
    },
    methods: {
      createSocket() {
        if (this.mySocket) {
          return;
        }
        this.mySocket = new WebSocket("ws://119.29.3.168:2000/map_socket");
      },
      pushMessage(obj, fn_this) {
        fn_this.messageArray.push(obj);
      },
      updateSalesData(order, fn_this) {
        fn_this.salesData.totalSales += order.qty;
        fn_this.salesData.amount += order.price;
        fn_this.salesData.totalOrders++;
      },
      getTime() {
        let d = new Date();
//        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes()) + ':' + this.addZero(d.getSeconds());
        return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes());
      },
      addZero(num) {
        if (num < 10 || parseInt(num) < 10) {
          num = '0' + num
        }
        return num
      },
      updateRegionTop(obj) {
        let activeDot = null;
        for (let dot of siteData) {
          if (obj.kiosk_name == dot.name) {
            activeDot = dot;
            break;
          }
        }
        if (activeDot) {
          for (let item of this.regionArray) {
            if (activeDot.addr.indexOf(item.key) > -1) {
              item.value = parseInt(obj.price) + parseInt(item.value);
//              this.sortRegionTop();
              break;
            }
          }
        }
      },
      sortRegionTop() {
        this.regionArray.sort((a, b) => b.value - a.value);
      },
      updateSkuTop(obj) {
        for (let item of this.skuTop) {
          if (obj.subject.indexOf(item.name) > -1) {
            item.value += obj.qty;
            break;
          }
        }
      },
      updateTrend(obj) {
        let hour = new Date().getHours();
        if (hour <= this.trend.amount.length) {
          this.trend.amount[hour] += obj.price;
          this.trend.count[hour] += obj.qty;
          this.trend.orders[hour] += 1;
        } else {
          this.trend.amount.push(0);
          this.trend.count.push(0);
          this.trend.orders.push(0);
          this.updateTrend(obj);
        }
      },
      onMessage(message, fn_this) {
        let obj = {
          kiosk_id: 'id123',
          kiosk_name: 'F1-10023',
          level: 'INFO',
          subject: '重新启动',
          date: '2018-01-10 08:23',
          price: 0,
          qty: 0
        };
        obj.kiosk_id = message.kiosk_id;
        obj.kiosk_name = message.kiosk_name;
        obj.subject = message.subject;
        obj.date = fn_this.getTime();
        obj.level = message.level;
        obj.price = message.price;
        obj.qty = message.qty;
        if (obj.qty > 0) {
          fn_this.updateSalesData({qty: obj.qty, price: obj.price}, fn_this);
          fn_this.updateRegionTop(obj);
          fn_this.updateSkuTop(obj);
          fn_this.updateTrend(obj);
        }
        fn_this.updateLogList(obj);
        for (let item of siteData) {
          if (obj.kiosk_name == item.name) {
            fn_this.$refs.newMap.onMessage(obj);
            break;
          }
        }
//        fn_this.$refs.newMap.onMessage(obj);
        if (obj.qty > 0) {
          fn_this.$refs.totalSales.changeAll(obj.qty);
          let d = new Date().getHours();
          fn_this.trend.amount[d] = parseInt(obj.price)+parseInt(fn_this.trend.amount[d]);
          fn_this.trend.orders[d] = parseInt(1)+parseInt(fn_this.trend.orders[d]);
          fn_this.trend.count[d] = parseInt(obj.qty) +parseInt(fn_this.trend.count[d]);
          fn_this.$refs.myline.onMessage(obj.qty);

        }
//        console.log(fn_this.$refs.newMap)

      },
      updateLogList(obj) {
        this.kiosksLogs.splice(0, 0, obj);
        this.kiosksLogs = this.kiosksLogs.slice(0, 5);
      },
      getAdd(fn_this) {
        fn_this.$http({
          method: 'get',
          url: 'history/count.php',
        }).then((res) => {
          console.log(1312321)
          console.log(res.data.data);
          let kiosk_price = res.data.data.kiosk_price
          let pro_qty = res.data.data['product_qty']
          console.log('ewqdsa')
          console.log(res.data.data['product_qty']);
          for (let item of kiosk_price) {
            for (let dot of siteData) {
              if (item.kiosk_name == dot.name) {
                for (let re of fn_this.regionArray) {
                  if (dot.addr.indexOf(re.key) > -1) {
                    re.value = parseInt(re.value);
                    re.value += parseInt(item.count_price);
//                    re.value =re.value;
                    console.log(re.value)
                    console.log(fn_this.regionArray)
                    break;
                    break;
                    break;
                  }
                }
              }
            }
          }
          for (let pro of pro_qty) {
            for (let item of fn_this.skuTop) {
              if (pro.subject.indexOf(item.name) > -1) {
                item.value = parseInt(item.value) + parseInt(pro.count_qty);
              }
            }
          }
          fn_this.$http({
            method: 'get',
            url: 'history/message.php',
          }).then((res) => {
            console.log(res.data.data);
            fn_this.kiosksLogs = res.data.data;
            fn_this.kiosksLogs.length = 5;
            fn_this.$http({
              method: 'get',
              url: 'history/time.php',
            }).then((res) => {
              console.log(res.data.data);
              let t = res.data.data;
              for (let key in t) {
                fn_this.trend.amount[key] = parseInt(t[key].price) +parseInt(fn_this.trend.amount[key]);
                fn_this.trend.orders[key] = parseInt(t[key].order)+parseInt(fn_this.trend.orders[key]);
                fn_this.trend.count[key] = parseInt(t[key].qty)+parseInt(fn_this.trend.count[key]);
              }
              fn_this.$http({
                method: 'get',
                url: 'history/total.php',
              }).then((res) => {
                console.log(res.data.data);
                let total = res.data.data;
                fn_this.salesData.totalSales = parseInt(fn_this.salesData.totalSales) + parseInt(total.total_qty) + '';
                fn_this.salesData.amount = parseInt(fn_this.salesData.amount) + parseInt(total.total_price) + '';
                fn_this.salesData.totalOrders = parseInt(fn_this.salesData.totalOrders) + parseInt(total.total_order) + '';
                fn_this.canShow = true;
              });
            });
          });


        });

      }
    },
    beforeCreate() {
      let _this = this;
      this.$http({
        method: 'get',
        url: 'fake/get.php',
      }).then((res) => {
        console.log(res.data.data);
        let resData = res.data.data;
        console.log(resData)
        let data = JSON.parse(resData);
//        let data = eval("("+resData+")");
//        let data = resData;
//        Vue.set(_this.salesData,totalSales,_this.salesData.totalSales)
        console.log(data);
        _this.salesData = data.salesData;
        _this.regionArray = data.regionArray;
        _this.kiosksLogs = data.kiosksLogs;
        _this.skuTop = data.skuTop;
//        _this.trend = data.trend;
        for (let i of data.trend['amount']) {
          _this.trend['amount'].push(parseInt(i));
        }
        console.log(data.trend['orders']);
        for (let i of data.trend['orders']) {
          _this.trend['orders'].push(parseInt(i));
          console.log(parseInt(i))
        }
        console.log(_this.trend.orders)
        for (let i of data.trend.count) {
          _this.trend['count'].push(parseInt(i));
        }
        _this.getAdd(_this);
      });

    },
    mounted() {
      let _this = this;
      this.createSocket();
      this.mySocket.onopen = function () {
        console.log('open');
      };

      this.mySocket.onmessage = function (evt) {
        if (_this.canShow) {
          _this.pushMessage(JSON.parse(evt.data), _this);
        }
      };

      this.mySocket.onclose = function (evt) {
        console.log('onMessageArrived');
        console.log(evt);
      };

      this.mySocket.onerror = function (evt) {
        console.log('ws err');
        console.log(evt)
      };
      if (this.messageQueue) {
        clearInterval(this.messageQueue);
        this.messageQueue = null;
      }
      this.messageQueue = setInterval(() => {
        console.log('父组件的消息队列+轮询');
        if (_this.messageArray.length > 0) {
          let item = _this.messageArray.shift();
          _this.onMessage(item, _this);

        }
//        console.log(_this.messageArray);
//        console.log(_this.salesData);

      }, 2000)
    },

  }
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7%;
  }

  .title .middle {
    position: relative;
  }

  .title .title-content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 4k 下可能需要修改 */
  .title .left {
    margin-right: -20px;
  }

  .title .right {
    margin-left: -20px;
  }

  /* --4k */

  .container {
    width: 100%;
    height: 93%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .container .aside {
    width: 24%;
    height: 100%;
  }

  .container .section {
    width: 52%;
    height: 100%;
  }

  .aside-left > div:nth-child(1) {
    width: 100%;
    height: 26%;
  }

  .aside-left > div:nth-child(2) {
    width: 100%;
    height: 22%;
  }

  .aside-left > div:nth-child(3) {
    width: 100%;
    height: 51%;
  }

  .section > div:nth-child(1) {
    width: 100%;
    height: 65%;
  }

  .section > div:nth-child(2) {
    width: 100%;
    height: 35%;
  }

  .aside-right > div:nth-child(1) {
    width: 100%;
    height: 14%;
  }

  .aside-right > div:nth-child(2) {
    width: 100%;
    height: 24.5%;
  }

  .aside-right > div:nth-child(3) {
    width: 100%;
    height: 21%;
    /*height: 44%;*/
  }

  .aside-right > div:last-child {
    width: 100%;
    height: 40%;
    /*height: 44%;*/
  }

</style>
