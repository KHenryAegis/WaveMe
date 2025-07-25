<template>
  <div id="app-container">
    <!-- Loading 状态 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>
    </div>
    
    <!-- 动态加载模板组件 -->
    <component 
      v-else
      :is="currentTemplateComponent" 
      :bracelet-id="braceletId"
      :template-data="templateData"
      :title="templateTitle"
    >
      <template #tabbar>
        <BraceletTabbar
          :current-tab-index="currentTabIndex"
          :tabs="tabs"
          :template-type="currentTemplate"
          :style-config="templateStyleConfig"
          @switch-tab="switchToTab"
          @prev-tab="prevTab"
          @next-tab="nextTab"
        />
      </template>
    </component>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BraceletTabbar from '~/components/BraceletTabbar.vue'

// 动态加载模板组件
const DefaultTemplate = defineAsyncComponent(() => import('~/components/templates/DefaultTemplate.vue'))
const AdxTemplate = defineAsyncComponent(() => import('~/components/templates/AdxTemplate.vue'))
const MinimalTemplate = defineAsyncComponent(() => import('~/components/templates/MinimalTemplate.vue'))

const route = useRoute()
const router = useRouter()

// 获取手环ID
const braceletId = route.params.id

// 当前选中的标签页
const currentTabIndex = ref(0)

// 定义标签页数据
const tabs = [
  { name: 'home', title: 'Home' },
  { name: 'photo-wall', title: 'ADX照片墙' },
  { name: 'tools', title: 'Tools' },
  { name: 'settings', title: 'Settings' }
]

// 当前模板
const currentTemplate = ref('default')
const templateData = ref({})
const isLoading = ref(true)

// 模板组件映射
const templateComponents = {
  default: DefaultTemplate,
  adxdefault: AdxTemplate,
  minimal: MinimalTemplate
}

// 模板配置映射
const templateConfigs = {
  default: {
    tabbarBackground: 'rgba(255, 255, 255, 0.9)',
    primaryColor: '#667eea',
    cardBackground: '#ffffff',
    data: {
      greeting: "Hi, I'm Lambert :)",
      description: ['fullstack dev', 'fandom of Muelle'],
      tags: ['技术', '产品', '后端', '站长']
    },
    title: 'Home Page'
  },
  adxdefault: {
    tabbarBackground: 'rgba(26, 26, 26, 0.9)',
    primaryColor: '#ff6b35',
    cardBackground: '#1a1a1a',
    data: {
      greeting: "AdventureX2025 限定纪念页",
      description: ['Creative Design & Development', 'Digital Innovation Hub'],
      tags: ['创意', '设计', 'ADX', '视觉']
    },
    title: 'ADX Creative Studio'
  },
  minimal: {
    tabbarBackground: 'rgba(255, 255, 255, 0.8)',
    primaryColor: '#667eea',
    cardBackground: '#ffffff',
    data: {
      greeting: "简约设计美学",
      description: ['Less is More', 'Clean & Simple'],
      tags: ['简约', '设计', '美学', '纯净']
    },
    title: 'Minimal Design'
  }
}

// 计算属性
const currentTemplateComponent = computed(() => {
  return templateComponents[currentTemplate.value] || templateComponents.default
})

const templateStyleConfig = computed(() => {
  const config = templateConfigs[currentTemplate.value] || templateConfigs.default
  return {
    tabbarBackground: config.tabbarBackground,
    primaryColor: config.primaryColor,
    cardBackground: config.cardBackground
  }
})

const templateTitle = computed(() => {
  const config = templateConfigs[currentTemplate.value] || templateConfigs.default
  return config.title
})

// 获取模板信息
const fetchTemplate = async () => {
  try {
    isLoading.value = true
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟API调用
    const mockResponse = {
      template: braceletId === 'adx001' ? 'adxdefault' : 'default'
    }
    
    currentTemplate.value = mockResponse.template
    const config = templateConfigs[currentTemplate.value]
    templateData.value = config.data
    
    console.log('使用模板:', currentTemplate.value)
  } catch (error) {
    console.error('Failed to fetch template:', error)
    currentTemplate.value = 'default'
    templateData.value = templateConfigs.default.data
  } finally {
    isLoading.value = false
  }
}

// 切换标签页
const switchToTab = (index) => {
  currentTabIndex.value = index
  const tab = tabs[index]
  
  if (tab.name === 'home') {
    return
  } else if (tab.name === 'photo-wall') {
    router.push(`/bracelet/${braceletId}/adx`)
  } else if (tab.name === 'tools') {
    router.push(`/bracelet/${braceletId}/tool`)
  } else if (tab.name === 'settings') {
    router.push(`/bracelet/${braceletId}/settings`)
  }
}

const prevTab = () => {
  if (currentTabIndex.value > 0) {
    switchToTab(currentTabIndex.value - 1)
  }
}

const nextTab = () => {
  if (currentTabIndex.value < tabs.length - 1) {
    switchToTab(currentTabIndex.value + 1)
  }
}

// 生命周期
onMounted(() => {
  fetchTemplate()
})
</script>

<style>
#app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.loading-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  background-color: black;
  position: relative;
  overflow: hidden;
}

.loading-spinner {
  text-align: center;
  z-index: 10;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 添加背景动画效果 */
.loading-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: wave 3s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
}
</style>
