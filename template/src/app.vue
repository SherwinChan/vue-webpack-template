<template lang="html">
  <div>
    app.vue{{#router}}
    <router-view></router-view>{{/router}}
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {

      };
    },
    created() {
      console.log("app created")
    },
    mounted() {
      // this.viewPortInit();
    },
    methods: {
      // getQueryString(name) {
      //   //获取地址栏url的参数，若用vue-router则用$route.query即可       
      //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      //   var r = window.location.search.substr(1).match(reg);
      //   if (r != null) {
      //     return unescape(r[2]);
      //   }
      //   return null;
      // },
      viewPortInit(max_width = 480) {
        // 响应式布局
        // max_width为all-container的max-width
        let doc = document;
        let win = window;
        let docEl = doc.documentElement;
        let resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize";
        let recalc = function () {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          clientWidth = clientWidth > max_width ? max_width : clientWidth;
          // 1242是设计图的宽度，所以除12.42得100单位比例
          let fontsize = parseInt(clientWidth / 12.42) + "px";
          docEl.style.fontSize = fontsize
        };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener("DOMContentLoaded", recalc, false);
      }
    }
  };
</script>
<style lang="css">
  .color-red {
    color: #f00;
  }

  .color-white {
    color: #fff;
  }

  .color-blue {
    color: #0063ea;
  }

  .color-grey {
    color: #eee;
  }

  .color-grey-deep {
    color: #aaa;
  }

  .color-yellow {
    color: #ff0;
  }

  .color-yellow-deep {
    color: #f7ba2a;
  }

  .btn-blue-deep {
    background-color: #0063ea;
    border-color: #0063ea;
  }

  .btn-grey {
    background-color: #ebedf0;
    border-color: #dfe6ec;
    color: #1f2d3d;
  }

  .btn-grey-focus {
    background-color: #eef1f6;
    border-color: #eef1f6;
    color: #999;
  }

  .btn-grey:focus,
  .btn-grey:hover {
    background-color: #eef1f6;
    border-color: #eef1f6;
    color: #999;
  }

  .btn-grey:active {
    background-color: #ddd;
    border-color: #ddd;
    color: #59554f;
    outline: 0;
  }

  .el-list-enter-active,
    {
    transition: all .8s
  }

  .el-list-leave-active {
    transition: all .2s
  }

  .el-list-enter,
  .el-list-leave-active {
    opacity: 0;
    transform: translateY(-30px)
  }
</style>