<template>
  <span class="outside-wrap">
    <img :src="'./static/img/num'+nextNum+'.png'" alt="">
    <span class="wrap" v-if="currentNum">
      <span class="current-up">
        <img :src="'./static/img/num'+currentNum+'.png'" alt="">
      </span>
      <span class="current-down">
        <img :src="'./static/img/num'+currentNum+'.png'" alt="">
      </span>
      <span class="next-down">
        <img :src="'./static/img/num'+nextNum+'.png'" alt="">
      </span>

    </span>
  </span>
</template>
<script>
  export default {
    name:'num',
    props:['nextNum','currentNum']
  }
</script>

<style scoped>
  .outside-wrap{
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    margin: 0 auto;
    display: inline-block;
  }
  .wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    perspective: 800px;
    display: inline-block;
  }

  .wrap img {
    width: 100%;
  }

  .wrap .current-down {
    overflow: hidden;
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #081a42;
    backface-visibility: hidden;
    /*transition: all 1s ease;*/
    transform-style: preserve-3d;
    display: inline-block;
  }

  .wrap .current-down img {
    max-height: none;
    width: 100%;
    position: absolute;
    top: -100%;
    left: 0;
  }
  .wrap .current-up img{
    max-height: none;
    width: 100%;
  }
  .wrap .current-up {
    overflow: hidden;
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #081a42;
    backface-visibility: hidden;
    /*transition: all 1s ease;*/
    transform-style: preserve-3d;
    transform-origin: center bottom;
    display: inline-block;
  }

  .wrap .next-down {
    overflow: hidden;
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #081a42;
    backface-visibility: hidden;
    /*transition: all 1s ease;*/
    transform-style: preserve-3d;
    transform-origin: center top;
    display: inline-block;
    /*transform: rotateX(-180deg);*/
  }

  .wrap .next-down img {
    max-height: none;
    width: 100%;
    position: absolute;
    top: -100%;
    left: 0;
  }

  .wrap:hover .current-up {
    transform: rotateX(180deg);
  }

  .wrap:hover .next-down {
    transform: rotateX(0deg);
  }

  @keyframes nextDown {
    0% {
      transform: rotateX(-180deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }

  @keyframes currentUp {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(180deg);
    }
  }

  .wrap .next-down{
    animation: nextDown 1s;
  }
  .wrap .current-up{
    animation: currentUp 1s;
  }
</style>
