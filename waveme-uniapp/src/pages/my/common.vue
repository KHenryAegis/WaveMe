<template>
  <wd-navbar
    fixed
    safeAreaInsetTop
    :title="navbarTitle"
    left-arrow
    @click-left="handleBack"
  />
  
  <view class="image-container">
    <image :src="imageUrl" mode="widthFix" class="content-image" />
  </view>
  
  <tabbar :selected="currentTab" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import tabbar from '@/components/tabbar.vue'

const imageUrl = ref('')
const navbarTitle = ref('')
const currentTab = ref(1) // 个人中心对应的tab

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  
  if (options.url) {
    imageUrl.value = `http://115.159.83.61:9000/${options.url}`
  }
  
  if (options.title) {
    navbarTitle.value = options.title
  }
})

const handleBack = () => {
  uni.switchTab({ url: '/pages/my/index' })
}
</script>

<style scoped>
.image-container {
  padding-top: 100rpx;
}

.content-image {
  width: 100%;
  display: block;
}
</style>