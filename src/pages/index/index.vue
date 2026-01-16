<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import XySwiper from '@/components/XySwiper.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import XyGuess from '@/components/XyGuess.vue'
import Skeleton from './components/Skeleton.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { XyGuessInstance } from '@/types/global'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

// 请求轮播图数据
const bannerList = ref([] as BannerItem[])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI(1)
  bannerList.value = res.result
}

// 获取前台分类列表
const categoryList = ref([] as CategoryItem[])
const getCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref([] as HotItem[])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
// 是否加载骨架图
const isLoading = ref(true)
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getCategoryData(), getHomeHotData()])
  isLoading.value = false
})

const guessRef = ref<XyGuessInstance>()
// 页面滚动到底部加载更多
const onScrolltoLow = () => {
  guessRef.value?.getmore()
}
// 下拉刷新
const isrefresh = ref(false)
const onRefresh = async () => {
  isrefresh.value = true
  // 清空猜你喜欢的数据
  guessRef.value.resetData()
  // 重新获取数据
  await Promise.all([
    getHomeBannerData(),
    getCategoryData(),
    getHomeHotData(),
    guessRef.value?.getmore(),
  ])
  isrefresh.value = false
}
</script>

<template>
  <CustomNavbar class="cunstomnavbar" />
  <scroll-view
    refresher-enabled
    :refresher-triggered="isrefresh"
    @refresherrefresh="onRefresh"
    @scrolltolower="onScrolltoLow"
    class="scroll-view"
    scroll-y
  >
    <Skeleton v-if="isLoading" />
    <template v-else>
      <XySwiper :List="bannerList" />
      <CategoryPanel :List="categoryList" />
      <HotPanel :List="hotList" />
      <XyGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.scroll-view {
  flex: 1;
}
</style>
