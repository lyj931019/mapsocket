<template>
  <div class="title-bg">
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name:'component-title',
  }
</script>

<style scoped>
  .title-bg{
    background:url("../assets/img/bg_title2.png") center center no-repeat;
    width: 100%;
    height: 1.8rem;
    line-height:1.8rem;
    -webkit-background-size: 100%;
    background-size: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    /*padding-top:0.2rem;*/
  }
</style>
