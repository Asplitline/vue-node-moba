<template>
  <div class="card bg-white mt-3 p-3">
    <div class="card-header d-flex fs-xl ai-center pb-3">
      <span class="iconfont" :class="`icon-${icon}`"></span>
      <span class="card-title flex-1 mx-2">{{title}}</span>
      <span class="iconfont icon-menu"></span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/_variables';
// todo 1px border
.card-header {
  border-bottom: 1px solid map-get($colors, 'light-1');
}
</style>