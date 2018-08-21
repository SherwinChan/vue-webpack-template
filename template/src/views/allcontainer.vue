<template lang="html">
  <div class="all-container">
    <div>all-container</div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  // // 函数节流
  // let throttle = function (fn, interval) {
  //   let _self = fn, // 保存需要被延迟执行的函数引用
  //     timer, // 计时器
  //     firstTime = true; // 是否第一次调用

  //   return function () {
  //     let args = arguments,
  //       _this = this;

  //     if (firstTime) { // 如果是第一次调用, 不需要延迟执行
  //       _self.apply(_this, args);
  //       return firstTime = false;
  //     }

  //     if (timer) { // 如果定时器还在, 说明前一次延迟执行还未完成
  //       clearTimeout(timer);
  //     }

  //     timer = setTimeout(function () {
  //       timer = null;
  //       _self.apply(_this, args);
  //     }, interval || 500);
  //   };
  // };


  export default {
    name: 'allcontainer',
    components: {},
    data() {
      return {}
    },
    computed: {},
    created() {
      console.log("allcontainer created")
    },
    mounted() {
      // const _this = this;
      // this.$store.dispatch("setMinHeight")
      // window.onresize = throttle(function () {
      //   _this.$store.dispatch("setMinHeight")
      //   _this.menuWidth = _this.$refs['menu'].$el.clientWidth || 213.33;
      // }, 500);
    },
    methods: {}
  }
</script>

<style lang="css" scoped>
  .all-container {
    position: relative;
  }
</style>