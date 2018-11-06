<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_inform.png" alt="">
    </div>
    <div class="kiosklog">
      <div class="title">
        <ComponentTitle>最新通知</ComponentTitle>
      </div>
      <div v-if="kioskLogs" class="log-list">
        <div v-for="(log,index) in kioskLogs" :key="log.name" class="log-item">
          <span class="date">{{log.date}}</span>
          <span class="dot"></span>
          <span class="content">{{log.kiosk_name}}&nbsp;{{log.subject}}</span>
        </div>
        <div class="line"></div>
      </div>
    </div>


  </div>
</template>

<script>
  import ComponentTitle from './component-title.vue'
  export default{
    name:'kiosklog',
    components:{ComponentTitle},
    props:{
      kioskLogs:Array
    }
  }
</script>

<style scoped>
  .common{
    width: 100%;
    height: 100%;
    position: relative;
    padding:0 1rem .4rem;
  }
  .common .bg{
    width: 100%;
    height: 100%;
  }
  .common .bg img{
    width: 100%;
    height: 100%;
  }
  .kiosklog{
    position: absolute;
    left: 0;
    top: 10%;
    right: 0;
    margin: auto;
    width: 80%;
    height: 72%;
  }
  .title{
    width: 60%;
    margin:0 auto 0.7rem;
  }
  .log-list{
    position: relative;
  }
  .log-item{
    font-size: 0.8rem;
    margin-bottom: 0.6rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2%;
  }
  .log-item .date{
    width: 36%;
    color: #999999;
    /*margin-left: 2%;*/
  }
  .log-item .dot{
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #999999;
    display: inline-block;
    margin: 0 1rem 0 0.2rem;
  }
  .log-item .content{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 58%;
    display: inline-block;
  }
  .log-list .line{
    border-left: 1px solid #999;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 38.35%;
  }
</style>
