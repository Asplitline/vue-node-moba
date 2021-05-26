<template>
  <div>
    <m-card :title="title" :icon="icon">
      <div class="nav jc-between py-3">
        <div class="nav-item" :class="{active:active===i}" v-for="(item,i) in categories"
          :key="i" @click="swiper.slideTo(i)">
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
      <swiper ref="cardSwiper" :options="cardSwiperOptions"
        @slide-change="active = swiper.activeIndex">
        <swiper-slide v-for="(category,i) in categories" :key="i" class="px-2">
          <slot name="list" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </m-card>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import mCard from '@/components/mCard'
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  components: {
    mCard,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.cardSwiper.swiper
    }
  },
  data() {
    return {
      cardSwiperOptions: {
        autoHeight: true
      },
      active: 0
    }
  },
  mounted() {
    console.log(this.swiper)
  }
}
</script>

<style lang="scss" scoped>
</style>