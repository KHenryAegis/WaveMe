<template>
  <div :style="getAppBackgroundStyle()">
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userBraceletColor = ref('blue') // 默认颜色
const isLoading = ref(false)

// --- Mock API 函数 ---
/**
 * 模拟从后端获取用户手环颜色
 */
const fetchUserBraceletColor = async (userId) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Mock数据：根据不同用户ID返回不同颜色
  const mockColors = {
    'adx001': 'blue',
    'adx002': 'purple', 
    'adx003': 'green',
    'user001': 'orange',
    'user002': 'red',
    'user003': 'pink'
  }
  
  return {
    bracelet_color: mockColors[userId] || 'blue',
    user_id: userId
  }
}

// --- 颜色映射配置 ---
const colorGradients = {
  blue: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%)',
  purple: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 25%, #ce93d8 50%, #ba68c8 75%, #ab47bc 100%)',
  green: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 25%, #a5d6a7 50%, #81c784 75%, #66bb6a 100%)',
  orange: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 25%, #ffcc80 50%, #ffb74d 75%, #ffa726 100%)',
  red: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 25%, #ef9a9a 50%, #e57373 75%, #ef5350 100%)',
  pink: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 25%, #f48fb1 50%, #f06292 75%, #ec407a 100%)'
}

/**
 * 根据手环颜色获取应用背景样式
 */
const getAppBackgroundStyle = () => {
  const gradient = colorGradients[userBraceletColor.value] || colorGradients.blue
  return {
    background: gradient,
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

/**
 * 从路由参数获取用户ID并更新颜色
 */
const updateUserColor = async () => {
  const userId = route.params.id
  if (userId && typeof userId === 'string') {
    try {
      isLoading.value = true
      const userData = await fetchUserBraceletColor(userId)
      userBraceletColor.value = userData.bracelet_color
      console.log(`用户 ${userId} 的手环颜色: ${userBraceletColor.value}`)
    } catch (error) {
      console.error('获取用户手环颜色失败:', error)
      // 保持默认颜色
    } finally {
      isLoading.value = false
    }
  }
}

// 监听路由变化
watch(() => route.params.id, updateUserColor, { immediate: true })

// 组件挂载时初始化
onMounted(() => {
  updateUserColor()
})
</script>

<style>
/* Global styles that apply to the whole application */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

body {
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
