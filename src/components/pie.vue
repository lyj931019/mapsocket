<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_payment.png" alt="">
    </div>

    <div class="pie">
      <div class="pie-title">
        <ComponentTitle>支付占比</ComponentTitle>
      </div>
      <div id="pie"></div>
    </div>

  </div>
</template>

<script>
  import ComponentTitle from './component-title.vue'

  export default {
    name: 'pie',
    components: {ComponentTitle},
    data() {
      return {
        pie: null,
        option: {
//          tooltip: {
//            trigger: 'item',
//            formatter: "{a} <br/>{b}: {c} ({d}%)",
//            color:'#fff'
//          },
          color: ['#09abef', '#4afe8e'],
//          legend: {
//            orient: 'vertical',
//            x: 'left',
//            data:['支付宝支付','微信支付']
//          },
          series: [
            {
              name: '支付占比',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
//              label: {
//                normal: {
//                  show: false,
//                  position: 'center'
//                },
//                emphasis: {
//                  show: true,
//                  textStyle: {
//                    fontSize: '15',
//                    fontWeight: 'bold'
//                  }
//                }
//              },
              label: {
                textStyle: {
                  fontSize: '15'
                }
              },
              labelLine: {
                normal: {
                  show: true,
                },
              },
              data: [
                {value: 420, name: '支付宝支付'},
                {value: 580, name: '微信支付'},
              ]
            }
          ]
        }
      }
    },
    mounted() {
      this.pie = this.$echarts.init(document.getElementById('pie'));
      this.pie.setOption(this.option);
    }
  }
</script>


<style scoped>
  .common {
    width: 100%;
    padding:0 1rem 0.4rem;
    position: relative;
    height: 100%;
  }
  .common .bg{
    width: 100%;
    height: 100%;
  }
  .common .bg img{
    width: 100%;
    height: 100%;
  }
  #pie {
    width: 100%;
    height: 140px;
    margin: auto;
  }

  .pie {
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 62%;
  }
  .pie-title{
    width: 60%;
    margin: auto;
  }
</style>
