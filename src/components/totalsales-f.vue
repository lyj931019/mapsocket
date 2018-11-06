<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_summery.png" alt="">
    </div>
    <div class="board">
      <!--<div>今日销售情况</div>-->
      <div class="sales">
        <p>销售总量</p>
        <p>
          <img src="../assets/img/icon_saleqty.png" alt="" class="icon">
          <template v-if="totalSalesCurrent">
            <template v-for="(item,index) in totalSales.toString()">
              <template v-if="totalSalesCurrent[index]!='a'">
                <span class="flip_wrap">
                  <Num :nextNum="item" :currentNum="totalSalesCurrent[index]"/>
                </span>

              </template>
              <template v-else>
                <span class="flip_wrap">
                  <Num :nextNum="item" />
                </span>

              </template>
            </template>
          </template>
          <template v-else>
            <template v-for="(item,index) in totalSales.toString()">
              <span class="flip_wrap">
                 <Num :nextNum="item" />
              </span>

            </template>
          </template>
          <span class="unit">件</span>
        </p>
      </div>
      <!--<p>-->
      <!--销售总额:{{salesData.amount.toFixed(2)}}-->
      <!--</p>-->
      <div class="hr"></div>
      <div class="sales">
        <p>订单总量</p>
        <p>
          <img src="../assets/img/icon_orderqty.png" alt="" class="icon">
          <template v-if="totalOrdersCurrent">
            <template v-for="(item,index) in totalOrders.toString()">
              <template v-if="totalOrdersCurrent[index]!='a'">
                <span class="flip_wrap">
                  <Num :nextNum="item" :currentNum="totalOrdersCurrent[index]"/>
                </span>

              </template>
              <template v-else>
                <span class="flip_wrap">
                  <Num :nextNum="item" />
                </span>

              </template>
            </template>
          </template>
          <template v-else>
            <template v-for="(item,index) in totalOrders.toString()">
              <span class="flip_wrap">
                 <Num :nextNum="item" />
              </span>

            </template>
          </template>
          <span class="unit">笔</span>
        </p>
      </div>
      <!--<p>-->
      <!--失败订单:{{salesData.failedOrders}}-->
      <!--</p>-->
    </div>
  </div>
</template>

<script>
  import Num from './num.vue'
  export default {
    name: 'totalsales-f',
    components:{Num},
    props:{
      propSales:{
        type:Object
      }
    },
    data(){
      return {
        totalSales:12096,
        totalSalesCurrent:null,
        totalOrders:10080,
        totalOrdersCurrent:null
      }
    },
    methods:{
      changeTotalSales(ran){
        let _this = this;
        let currentNum = _this.totalSales;
        let nextNum = parseInt(_this.totalSales);
        nextNum += ran;
        let currentStr = '';
        let nextStr = nextNum+'';
        for (let i = 0; i < nextStr.length; i++) {
          if (nextStr[i] != currentNum[i]) {
//            console.log(currentNum[i])
            currentStr += currentNum[i]+'';
          }else{
            currentStr += 'a';
          }
        }
        let len = nextStr.length - currentStr.length;
//        let a = '';
//        for (let i = 0; i < len; i++) {
//          a += 'a';
//        }
        _this.totalSalesCurrent = currentStr;
        _this.totalSales = parseInt(nextNum)+'';
        console.log(_this.totalSalesCurrent)
        console.log(_this.totalSales)
        setTimeout(() => {
          _this.totalSalesCurrent = null;
        }, 1000);
      },
      changeTotalOrders(ran){
        let _this = this;
        let currentNum = _this.totalOrders;
        let nextNum = parseInt(_this.totalOrders);
        nextNum += ran;
        let currentStr = '';
        let nextStr = nextNum+'';
        for (let i = 0; i < nextStr.length; i++) {
          if (nextStr[i] != currentNum[i]) {
            currentStr += currentNum[i]+'';
          }else{
            currentStr += 'a';
          }
        }
        let len = nextStr.length - currentStr.length;
//        let a = '';
//        for (let i = 0; i < len; i++) {
//          a += 'a';
//        }
        _this.totalOrdersCurrent = currentStr;
        _this.totalOrders = parseInt(nextNum)+'';
        console.log(_this.totalOrdersCurrent)
        console.log(_this.totalOrders)
        setTimeout(() => {
          _this.totalOrdersCurrent = null;
        }, 1000);
      },
      changeAll(qty){
        this.changeTotalOrders(1);
        this.changeTotalSales(qty);
      }
    },
    mounted(){
      this.totalSales = this.propSales.totalSales;
      this.totalOrders = this.propSales.totalOrders;
    }
  }
</script>

<style scoped>
  .common {
    width: 100%;
    padding: 0 1rem .4rem;
    position: relative;
    height: 100%;
  }
  .bg{
    width: 100%;
    height: 100%;
  }
  .bg img{
    width: 100%;
    height: 100%;
  }
  .board {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    padding-top:1.8rem;
  }
  .sales:nth-child(3){
    padding-top: 0.9rem;
  }

  .hr {
    width: 80%;
    height: 2px;
    border-radius: 50%;
    background-color: #18f0fc;
    margin: 0.2rem;
  }

  .sales p:nth-child(1) {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  .sales p:nth-child(2){
    margin-bottom: 0.9rem;
    /*margin-left: -4rem;*/
  }
  .sales .icon {
    display: inline-block;
    width: 2.2rem;
  }
  .sales .unit{
    font-size: 1.05rem;
  }

  .sales  img.num {
    /*width: 2.4rem;*/
    /*margin:0 0.3rem;*/
  }
  .flip_wrap{
    width:41px;
    height:50px;
    display: inline-block;
    text-align: center;
    margin: 0 6px;
  }
  .flip{
    width:100%;
    height:100%;
    backface-visibility:hidden;
    /*transition: all 1s ease;*/
    transform-style: preserve-3d;
    /*animation: myFilp 2 infine;*/

  }
  .side{
    width:100%;
    height:100%;
  }
  .front{
    z-index:2;
  }
  /*.back{*/
    /*transform:rotateX(180deg);*/
  /*}*/
  /*.flip_wrap:hover .flip{*/
    /*transform:rotateX(360deg);*/
  /*}*/
  @keyframes myFilp {
    0%,100%{
      transform:rotateX(0deg);
    }
    99%{
      transform:rotateX(0deg);
    }
  }
</style>
