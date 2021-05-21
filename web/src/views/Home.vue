<template>
  <div class="home">
    <!-- swiper -->
    <swiper ref="mySwiper" :options="swiperOptions" :auto-destroy="true">
      <swiper-slide v-for="i in 4" :key="i">
        <img class="w100" src="../assets/83e82bb6ff4ed4f9803580d5b4af72f0.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination text-right m-pagenation" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <!-- nav-icons -->
    <!-- tag 外层 pt-3  内层 mb-3 -->
    <div class="nav-icons bg-white mt-3">
      <div class="d-flex flex-wrap pt-3">
        <div class="nav-item text-center mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="text-dark-1 fs-sm">爆料站</div>
        </div>
      </div>
      <div class="bg-light fs-sm text-center py-1">
        <i class="sprite sprite-arrow mr-1"></i>
        <span class="text-grey-2">收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->
    <!-- card-list -->
    <m-card-list title="新闻详情" icon="Menu" :categories="categories">
      <template #list="{category}">
        <router-link tag="div" to="/" v-for="(news,i) in category.newsList" :key="i"
          class="d-flex jc-bettwen mb-3">
          <span class="mr-2 fs-xxs tag">{{category.name}}</span>
          <span class="flex-1 fs-lg text-ellipsis mr-3">{{news.title}}</span>
          <span class="text-time fs-sm mt-1">{{news.createdAt | time }}</span>
        </router-link>
      </template>
    </m-card-list>
    <!-- end of card-list -->
  </div>
</template>

<script>
// done Swiper -> swiper
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import mCardList from '@/components/mCardList'
import dayjs from 'dayjs'
export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    mCardList
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 1500
        }
      },
      categories: ['热门', '新闻', '公告', '活动', '赛事'].map((i) => ({
        name: i,
        list: new Array(5).fill({}).map((item) => ({
          category: i,
          title: '体验服专区福利升级，专区功能恢复使用',
          time: '05/20'
        }))
      }))
    }
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('news/list')
      this.categories = data
    }
  },
  filters: {
    time(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables.scss';
.m-pagenation {
  .swiper-pagination-bullet {
    border-radius: 0.153846rem;
    opacity: 1;
    background-color: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:last-child {
      border-right: none;
    }
  }
}
.sprite {
  display: inline-block;
  background: url('../assets/sprite.png') no-repeat 0 0;
  background-size: 28.846154rem;
  &.sprite-news {
    width: 1.769231rem;
    height: 1.538462rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-arrow {
    background-position: 38.577% 52.076%;
    width: 0.769231rem;
    height: 0.769231rem;
  }
}
span.tag {
  display: inline-block;
  padding: 0 0.153846rem;
  border-radius: 0.153846rem;
  // ques display error
  border: 1px solid #000;
}
</style>