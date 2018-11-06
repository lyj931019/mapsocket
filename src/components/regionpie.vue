<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_payment.png" alt="">
    </div>

    <div class="pie">
      <div class="pie-title">
        <ComponentTitle>各区域支付比例</ComponentTitle>
      </div>
      <div id="region"></div>
    </div>

  </div>
</template>

<script>
  import ComponentTitle from './component-title.vue'

  export default {
    name: 'regionpie',
    components: {ComponentTitle},
    props:{
      regionArray:{
        type:Array,
      }
    },
    data() {
      return {
        pie: null,
        option : {
          color: [ '#f4fb3f','#4effcf','#3c5cff','#0bff39','#a34bfd','#ffc05c','#de28db','#29beff'],
//          tooltip : {
//            trigger: 'item',
//            formatter: "{b} : {c} ({d}%)"
//          },
//          legend: {
//            // orient: 'vertical',
//            // top: 'middle',
//            bottom: 10,
//            left: 'center',
//            data: ['广州', '上海','深圳','北京','杭州','南京','武汉','其他']
//          },
          series : [
            {
              type: 'pie',
              radius : '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data:[
                {value:3780, name: '广州'},
                {value:3780, name: '上海'},
                {value:3780, name: '深圳'},
                {value:8820, name: '北京'},
                {value:2520, name: '杭州'},
                {value:1260, name: '南京'},
                {value:1260, name: '武汉'},
                {value:10080, name: '其他'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.pie = this.$echarts.init(document.getElementById('region'));
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
  #region {
    width: 100%;
    height: 148px;
    margin: auto;
  }

  .pie {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 80%;
  }
  .pie-title{
    width: 60%;
    margin: auto;
  }
</style>
