<template lang="html">
  <div>
    app.vue
    <router-view></router-view>
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
    methods: {

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