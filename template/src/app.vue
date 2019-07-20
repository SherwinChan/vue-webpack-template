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
<style lang="scss">
  .mu-list .mu-item {
    height: auto;
    padding: 0;
    border-bottom: 1px solid #eee;
  }

  div.mint-toast {
    z-index: 99999999;
  }

  div.mint-indicator {
    position: relative;
    z-index: 99999999;
  }

  .no-tips {
    padding: .35rem 0;
    font-size: .6rem;
    text-align: center;

    .img-nodata {
      width: 7rem;
    }

    .no-more {
      font-size: .5rem;
      color: #aaa;
    }
  }

  @supports (-webkit-line-clamp: 2) and (display: -webkit-box) and (-webkit-box-orient: vertical) {

    .text-flow-2,
    .text-flow-3,
    .text-flow-4 {
      font-size: .5rem;
      line-height: .675rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .text-flow-2 {
      height: 1.35rem;
      -webkit-line-clamp: 2;

    }

    .text-flow-3 {
      height: 2.025rem;
      -webkit-line-clamp: 3;
    }

    .text-flow-4 {
      height: 2.76rem;
      -webkit-line-clamp: 4;
    }
  }

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

  .el-list-enter-active {
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