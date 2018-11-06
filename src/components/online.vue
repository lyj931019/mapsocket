<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_sum_machine.png" alt="">
    </div>
    <div class="content">
      <div class="online-rank">
        <img src="../assets/img/icon_online.png" alt="">
        <span>
          <MyProcess :rank="99"/>
        </span>
        <img src="../assets/img/icon_offline.png" alt="">
      </div>
      <div class="online-count">
        <span>在线<span class="num">1014</span>台</span>
        <span>离线<span class="num">12</span>台</span>
      </div>
    </div>
  </div>
</template>

<script>
  import MyProcess from './myprocess.vue'
  export default {
    name:'online',
    components:{MyProcess},
  }
</script>

<style scoped>
  .common{
    width: 100%;
    height: 100%;
    padding: 0 1rem .4rem;
    position: relative;
  }
  .common .bg{
    width: 100%;
    height: 100%;
  }
  .common .bg img{
    width: 100%;
    height: 100%;
  }
  .content{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 75%;
    height: 50%;
    /*background-color: #fff;*/
  }
  .online-rank{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  .online-rank img{
    width: 1.4rem;
  }
  .online-rank>span{
    display: inline-block;
    margin: 0 0.5rem;
    width: 70%;
  }
  .online-count{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .online-count .num{
    font-size: 1.5rem;
    margin-left:0.2rem;
  }
</style>
