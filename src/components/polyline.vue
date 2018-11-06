<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_tendency.png" alt="">
    </div>
    <div class="histogram">
      <div class="title">
        <ComponentTitle>销售趋势</ComponentTitle>
      </div>
      <div id="mypline"></div>
    </div>

  </div>
</template>

<script>
  import ComponentTitle from './component-title.vue'

  export default {
    name: 'mypline',
    components: {ComponentTitle},
    props: {
      trend: {
        type:Object
      }
    },
    data() {
      return {
        chartOption: null,
        colors: ['#8141f9', '#e975fe', '#F90000'],
        pastWeek: [],
        mypline: null
      }
    },
    methods: {
      getPastWeek() {
        this.pastWeek = [];
        this.pastWeek[0] = '今日';
        this.pastWeek[1] = '昨日';
        let temp;
        let d = new Date();
        for (let i = 2; i < 7; i++) {
          temp = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i);
          this.pastWeek[i] = temp.getMonth() + 1 + '-' + temp.getDate();
        }
        this.pastWeek.reverse();
      },
      onMessage(obj){
        let d = new Date().getHours();
        console.log(d)
        console.log(this.trend.amount[d]);
//        this.trend.amount[d] = parseInt(obj.price)+parseInt(this.trend.amount[d]);
//        this.trend.orders[d] = parseInt(1)+parseInt(this.trend.orders[d]);
//        this.trend.count[d] = parseInt(obj.qty) +parseInt(this.trend.count[d]);

        if(this.mypline){this.mypline.setOption(this.chartOption,true)}
      }
    },
    beforeMount() {
      this.getPastWeek();
      let _this = this;
      this.chartOption = {
        textStyle: {
          color: 'rgba(255, 255, 255, 1)'
        },
        color: ['#12fc42', '#1ebdfc', '#f3fe3f'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
//            dataView: {show: true, readOnly: false},
//            magicType: {show: true, type: ['line', 'bar']},
//            restore: {show: true},
//            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['销售额', '销售量', '订单量'],
          textStyle: {
            color: 'rgba(255, 255, 255, 1)'
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['00', '01', '02', '03', '04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销售额',
            min: 0,
            max: 15000,
            interval: 5000,
            axisLabel: {
              formatter: '¥{value}'
            }
          },
          {
            type: 'value',
            name: '销售量/订单量',
            min: 0,
            max: 4500,
            interval: 1500,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            data: _this.trend.amount,
            symbolSize: 8,
            symbol: 'circle'
          },
          {
            name: '销售量',
            type: 'bar',
            yAxisIndex: 1,
            data: _this.trend.count,
            barWidth: 8
          },
          {
            name: '订单量',
            type: 'bar',
            yAxisIndex: 1,
            data: _this.trend.orders,
            barWidth: 8
          }
        ]
      };
    },
    mounted() {
      this.mypline = this.$echarts.init(document.getElementById('mypline'));
      this.mypline.setOption(this.chartOption);
    }
  }

</script>

<style scoped>
  .common {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 1rem 0;
  }

  .bg {
    width: 100%;
    height: 100%;
  }

  .bg img {
    width: 100%;
    height: 100%;
  }

  .histogram {
    position: absolute;
    width: 96%;
    height: 78%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .histogram .title {
    width: 30%;
    margin: auto;
  }

  #mypline {
    width: 100%;
    height: 97%;
    margin-top: 2%;
  }
</style>
