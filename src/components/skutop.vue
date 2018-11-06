<template>
  <div class="common">
    <div class="bg">
      <img src="../assets/img/bg_ranking_pro.png" alt="">
    </div>
    <div class="skutop">
      <div class="title">
        <ComponentTitle>销售最佳商品</ComponentTitle>
      </div>
      <div class="process-container" v-if="skuTop">
        <div class="process-item" v-for="(sku,index) in sortSkuTop" :key="sku.name">
          <p class="name">{{sku.name}}</p>
          <MyProcess :rank="85-index*10"/>
          <p class="count">{{sku.value}}件</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import MyProcess from './myprocess.vue'
  import ComponentTitle from './component-title.vue'
  export default {
    name:'skutop',
    components:{MyProcess,ComponentTitle},
    props:{
      skuTop:{
        type:Array,
      }
    },
    computed:{
      sortSkuTop:function () {
        let arr = this.skuTop.sort((a, b) => b.value - a.value);
        arr.splice(7,3);
        return arr;
      }
    }
  }
</script>

<style scoped>
  .common{
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 1rem;
  }
  .common .bg{
    width: 100%;
    height: 100%;
  }
  .common .bg img{
    width: 100%;
    height: 100%;
  }
  .skutop{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    padding:5%;
  }
  .skutop .title{
    padding-top: 1.5rem;
    width: 60%;
    margin:0 auto 1.7rem;
  }

  .process-container{
    width: 80%;
    margin: 0 auto;
    font-size: 0.9rem;

  }
  .process-item{
    margin-bottom: 0.8rem;
    line-height: 0.9rem;
  }

  .count{
    text-align: right;
  }
</style>
