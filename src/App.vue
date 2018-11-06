<template>
  <!--<div id="app" :style="{ height: height+'px'}">-->
  <div id="app" style="height:1080px">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      height:1080
    }
  },
  mounted(){
//    let h =
    this.height = window.innerHeight;
    console.log(this.height)
    window.onresize = () => {
      this.height = window.innerHeight;
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #031532;
  width: 100%;
}
</style>
