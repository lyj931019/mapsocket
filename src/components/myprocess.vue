<template>
  <span class="process-bg">
    <span class="process-inner" :style="{width:realRank}"></span>
  </span>
</template>

<script>
  export default {
    name:'myprocess',
    props:{
      rank:Number
    },
    computed:{
      realRank:function(){
        return this.rank+'%'
      }
    }
  }
</script>

<style scoped>
  .process-bg{
    display: inline-block;
    width: 100%;
    background: rgba(255,255,255,0.3);
    height: 0.4rem;
    position: relative;
    border-radius: 5px;
  }
  .process-inner{
    display: inline-block;
    /*width: 70%;*/
    height: 100%;
    background-color: #18f0fc;
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 5px;
  }
</style>
