<template>
  <div class="article-detail" v-if="model">
    <div class="info-title p-2 d-flex ai-center border-bottom">
      <router-link to="/">
        <span class="iconfont icon-fenxiang text-blue"></span>
      </router-link>
      <span class="text-blue flex-1 pl-1 fs-lg">{{model.title}}</span>
      <div class="text-grey fs-xs">{{model.createdAt | time}}</div>
    </div>
    <div v-html="model.content" class="article-content p-3"></div>
    <div class="px-3">
      <div class="border-top py-2">
        <i class="iconfont icon-link"></i>
        <strong class="text-blue">相关资讯</strong>
      </div>
    </div>
    <div class="px-3 py-1">
      <router-link class="mb-2" tag="div" v-for="i in model.related" :key="i._id"
        :to="`/article/${i._id}`">
        {{i.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: null
    }
  },
  watch: {
    // id变化 调用fetchData
    id: 'fetchData'
    //
    // id() {
    //   this.fetchData()
    // }
  },
  filters: {
    time(val) {
      return dayjs(val).format('YYYY/MM/DD')
    }
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get(`/article/${this.id}`)
      this.model = data
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss">
.article-content {
  img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }
  p {
    margin: 0;
    padding: 0.5rem;
    line-height: 1.75;
    font-size: 1.230769rem;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>