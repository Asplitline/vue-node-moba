<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
 
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'carrousel',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoHeight: true
        // Some Swiper option/callback...
      }
    }
  },
  computed: {
    // swiper() {
    //   return this.$refs.mySwiper
    // }
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log('Current Swiper instance object', this.swiper)
    //   this.swiper.slideTo(3, 1000, false)
    // })
    this.$nextTick(() => {
      console.log(this.$refs.mySwiper)
    })
  }
}
</script> 