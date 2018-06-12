<template lang="html">
  <div class="spinner-wrap">
    <div class="complete-text" v-if="complete">{{completeText}}</div>
    <template v-else>
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
      <div class="text">正在加载</div>
    </template>
  </div>

</template>

<script>
  export default {
    name: 'loading-spinner',
    props: {
      complete: {
        type: Boolean,
        default: false
      },
      completeText: {
        type: String,
        default: '没有搜索结果'
      }
    }
  }
</script>

<style lang="css" scoped>
  .spinner-wrap {
    margin: 25px auto;
    text-align: center;
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
  }

  .text {
    margin-left: 10px;
    position: relative;
    top: -3px;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #1a1a1a;
  }

  .complete-text {
    height: 24px;
    line-height: 24px;
    color: #1a1a1a;
    text-align: center;
  }

  .cube1,
  .cube2 {
    background-color: #22a3e5;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: cubemove 1.8s infinite ease-in-out;
    animation: cubemove 1.8s infinite ease-in-out;
  }

  .cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  @-webkit-keyframes cubemove {
    25% {
      -webkit-transform: translateX(12px) rotate(-90deg) scale(0.5)
    }
    50% {
      -webkit-transform: translateX(12px) translateY(12px) rotate(-180deg)
    }
    75% {
      -webkit-transform: translateX(0px) translateY(12px) rotate(-270deg) scale(0.5)
    }
    100% {
      -webkit-transform: rotate(-360deg)
    }
  }

  @keyframes cubemove {
    25% {
      transform: translateX(12px) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(12px) rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translateX(12px) translateY(12px) rotate(-179deg);
      -webkit-transform: translateX(12px) translateY(12px) rotate(-179deg);
    }
    50.1% {
      transform: translateX(12px) translateY(12px) rotate(-180deg);
      -webkit-transform: translateX(12px) translateY(12px) rotate(-180deg);
    }
    75% {
      transform: translateX(0px) translateY(12px) rotate(-270deg) scale(0.5);
      -webkit-transform: translateX(0px) translateY(12px) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
</style>