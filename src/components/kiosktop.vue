<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_ranking_kiosk.png" alt="">
    </div>
    <div class="kiosktop">
      <div class="title">
        <ComponentTitle>最佳销售区域</ComponentTitle>
      </div>
      <div v-if="kioskArray" class="kiosk-list">
        <div v-for="(kiosk,index) in sortKioskArray" :key="kiosk.name" class="kiosk-item">
          <span class="name">{{kiosk.key}}</span>
          <span class="line" :style="{width:(10-index)*18+'px'}"></span>
          <span class="count"><span>¥</span>{{kiosk.value}}</span>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
  import ComponentTitle from './component-title.vue'
  export default {
    name:'kiosktop',
    components:{ComponentTitle},
    props:{
      kioskArray:{
        type:Array,
//        default:
      }
    },
    computed:{
      sortKioskArray:function () {
        return this.kioskArray.sort((a, b) => b.value - a.value)
      }
    }
  }
</script>


<style scoped>
  .common{
    width: 100%;
    height: 100%;
    position: relative;
    padding:0 1rem;
  }
  .bg{
    width: 100%;
    height: 100%;
  }
  .bg img{
    width: 100%;
    height: 100%;
  }
  .kiosktop{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 90%;
  }
  .title{
    width: 60%;
    margin: 0 auto 1rem;
    /*padding-top:0.5rem;*/
  }
  .kiosk-list{
    /*padding-top: 1rem;*/
    /*font-size: 1.2rem;*/
  }
  .kiosk-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.3rem;
  }
  .kiosk-item .name{
    color: #18f0fc;
    border:2px solid #18f0fc;
    font-size: 1.1rem;
    padding:2px 4px;
    margin-bottom: 0.4rem;
  }
  .kiosk-item .line{
    display: inline-block;
    border-radius: 5px;
    height: 0.3rem;
    background:rgba(255,255,255,.8);
    margin:0 1rem;
  }
  .count{
    font-size: 0.8rem;

  }
  .count>span{
    margin-right:4px;
  }
</style>
