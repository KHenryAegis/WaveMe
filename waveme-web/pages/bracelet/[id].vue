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
      :current-tab-index="currentTabIndex"
      :tabs="tabs"
      @switch-tab="switchToTab"
      @prev-tab="prevTab"
      @next-tab="nextTab"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'


// 动态加载模板组件
const DefaultTemplate = defineAsyncComponent(() => import('~/components/templates/Default.vue'))
const AdxTemplate = defineAsyncComponent(() => import('~/components/templates/Adx.vue'))
const AcademicTemplate = defineAsyncComponent(() => import('~/components/templates/Academic.vue'))
const DailyHobbiesTemplate = defineAsyncComponent(() => import('~/components/templates/DailyHobbies.vue'))
const MinimalTemplate = defineAsyncComponent(() => import('~/components/templates/Minimal.vue'))

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
let currentTemplate = ref('academic') // 默认使用学术模板
const templateData = ref({})
const isLoading = ref(true)

// 模板组件映射
const templateComponents = {
  default: DefaultTemplate,
  adxdefault: AdxTemplate,
  academic: AcademicTemplate,
  dailyhobbies: DailyHobbiesTemplate,
  minimal: MinimalTemplate
}

// 模板配置映射
const templateConfigs = {
  default: {
    tabbarBackground: 'rgba(255, 255, 255, 0.9)',
    primaryColor: '#667eea',
    cardBackground: '#ffffff',
    data: {
      greeting: "Hi, I'm Wave! :)",
      description: ['随身艺术', '自在终端'],
      tags: ['双NFC手饰', '个性化模版定制', '你的艺术终端']
    },
    title: 'Wave！'
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
  academic: {
    tabbarBackground: 'rgba(47, 79, 79, 0.9)',
    primaryColor: '#2F4F4F',
    cardBackground: '#f8f9fa',
    data: {
      greeting: "学术研究者",
      description: ['Academic Researcher', 'Knowledge Seeker'],
      tags: ['学术', '研究', '论文', '知识']
    },
    title: 'Academic Profile'
  },
  dailyhobbies: {
    tabbarBackground: 'rgba(255, 182, 193, 0.9)',
    primaryColor: '#FF69B4',
    cardBackground: '#fff5f8',
    data: {
      greeting: "生活爱好者",
      description: ['Daily Life Enthusiast', 'Hobby Collector'],
      tags: ['生活', '爱好', '日常', '兴趣']
    },
    title: 'Daily Hobbies'
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
  // return templateComponents[currentTemplate.value] || templateComponents.academic
  return templateComponents[currentTemplate.value] || templateComponents.academic
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

    currentTemplate.value== 'academic'
    console.log('使用模板11:', currentTemplate.value)
  } catch (error) {
    console.error('Failed to fetch template:', error)
    currentTemplate.value = 'default'
    currentTemplate.value== 'academic'
    templateData.value = templateConfigs.default.data
  } finally {
    isLoading.value = false
  }
}

// 切换标签页
const switchToTab = (index) => {
  currentTabIndex.value = index
  // 不再使用路由跳转，只是简单切换tab状态
  console.log('切换到标签页:', index, tabs[index])
}

const prevTab = () => {
  if (currentTabIndex.value > 0) {
    currentTabIndex.value = currentTabIndex.value - 1
    console.log('切换到上一个标签页:', currentTabIndex.value)
  }
}

const nextTab = () => {
  if (currentTabIndex.value < tabs.length - 1) {
    currentTabIndex.value = currentTabIndex.value + 1
    console.log('切换到下一个标签页:', currentTabIndex.value)
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
  min-height: 100vh;
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
