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
          <template v-for="i in totalSalesStr">
            <img :src="'./static/img/num'+i+'.png'" alt="" class="num">
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
          <template v-for="i in totalOrdersStr">
            <img :src="'./static/img/num'+i+'.png'" alt="" class="num">
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
  export default {
    name: 'totalsales',
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
      totalSalesStr:function () {
        return this.salesData.totalSales.toString()
      },
      totalOrdersStr:function () {
        return this.salesData.totalOrders.toString()
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .common {
    width: 100%;
    padding: 0 1rem 1.4rem;
    position: relative;
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
    margin-left: -4rem;
  }
  .sales .icon {
    display: inline-block;
    width: 2.2rem;
  }
  .sales .unit{
    font-size: 1.05rem;
  }

  .sales  img.num {
    width: 2.4rem;
    margin:0 0.3rem;
  }
</style>
