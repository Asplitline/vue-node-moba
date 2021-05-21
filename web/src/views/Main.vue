<template>
  <div>
    <div class="topbar bg-black py-2 px-4 d-flex ai-center jc-between">
      <img src="../assets/logo.png" alt="" height="30">
      <div class="mx-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-min">团队成就更多</div>
      </div>
      <a class="bg-primary btn text-dark-1">立即下载</a>
    </div>
    <div class="bg-primary">
      <div class="nav nav-inverse pt-3 pb-2 jc-around">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">IP新游</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>