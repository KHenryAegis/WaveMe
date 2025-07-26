<template>
  <div class="adx-template" :style="containerStyle">
    <!-- 烟花特效 Canvas (最高层级) -->
    <canvas ref="fireworksCanvas" class="adx-fireworks-canvas"></canvas>
    
    <!-- ADX背景特效 -->
    <div class="adx-background-effects">
      <div class="floating-particles"></div>
      <div class="glow-orbs"></div>
    </div>
    
    <main class="home-page">
      <!-- 动态内容区域 -->
      <component 
        :is="currentPageComponent" 
        :home-data="pageData.home"
        :photo-data="pageData.photos"
        :tools-data="pageData.tools"
        :settings-data="pageData.settings"
      />
    </main>

    <!-- ADX 模板的 Tabbar -->
    <div class="adx-tabbar-section">
      <button 
        class="adx-nav-btn prev-btn" 
        @click="prevTab" 
        :disabled="currentTabIndex === 0"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <div class="adx-tabbar-container">
        <div class="adx-tabbar">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['adx-tab-item', { active: currentTabIndex === index }]"
            @click="switchToTab(index)"
          >
            <div class="adx-tab-dot"></div>
          </div>
        </div>
      </div>

      <button 
        class="adx-nav-btn next-btn" 
        @click="nextTab" 
        :disabled="currentTabIndex === tabs.length - 1"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AdxHomePage from '~/components/adx/AdxHomePage.vue'
import AdxPhotoWall from '~/components/adx/AdxPhotoWall.vue'
import AdxTools from '~/components/adx/AdxTools.vue'
import AdxSettings from '~/components/adx/AdxSettings.vue'

const props = defineProps({
  braceletId: String,
  templateData: Object,
  title: {
    type: String,
    default: 'ADX Creative Studio'
  },
  currentTabIndex: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['switchTab', 'prevTab', 'nextTab'])

const fireworksCanvas = ref(null)
let animationId = null

// 页面组件映射
const pageComponents = {
  0: AdxHomePage,    // Home
  1: AdxPhotoWall,   // Photo Wall
  2: AdxTools,       // Tools
  3: AdxSettings     // Settings
}

// 当前页面组件
const currentPageComponent = computed(() => {
  return pageComponents[props.currentTabIndex] || AdxHomePage
})

// Mock数据 - 后续可以从API获取
const pageData = ref({
  home: {
    title: 'ADX Creative Studio',
    greeting: 'AdventureX2025 限定纪念页',
    description: ['Creative Design & Development', 'Digital Innovation Hub'],
    braceletInfo: `手环ID: ${props.braceletId}`,
    tags: ['创意', '设计', 'ADX', '视觉'],
    socialLinks: [
      { name: 'github', label: 'Github', url: 'https://github.com' },
      { name: 'wechat', label: 'Wechat', url: '#' },
      { name: 'linkedin', label: '领英', url: 'https://www.linkedin.com' }
    ]
  },
  photos: {
    title: 'ADX 照片墙',
    subtitle: '记录精彩瞬间，分享创意灵感',
    photos: [
      {
        url: 'https://picsum.photos/400/300?random=1',
        title: 'ADX 2025 启动仪式',
        description: '全新的创意之旅正式开始',
        date: '2025-01-15'
      },
      {
        url: 'https://picsum.photos/400/300?random=2',
        title: '设计工作坊',
        description: '与顶尖设计师交流学习',
        date: '2025-01-20'
      },
      {
        url: 'https://picsum.photos/400/300?random=3',
        title: '创意展示',
        description: '展示最新的设计作品',
        date: '2025-01-25'
      },
      {
        url: 'https://picsum.photos/400/300?random=4',
        title: '团队合作',
        description: '协作创造无限可能',
        date: '2025-01-30'
      }
    ]
  },
  tools: {
    title: 'AdX 创造集',
    subtitle: 'AdX2025 创造的作品',
    tools: [
      {
        id: 1,
        name: '色彩生成器',
        description: '智能生成和谐配色方案',
        icon: 'fas fa-palette',
        docUrl: 'https://docs.colorhunt.co'
      },
      {
        id: 2,
        name: '字体匹配器',
        description: '找到完美的字体组合',
        icon: 'fas fa-font',
        docUrl: 'https://help.fontpair.co'
      },
      {
        id: 3,
        name: '灵感收集器',
        description: '收集和整理设计灵感',
        icon: 'fas fa-lightbulb',
        docUrl: 'https://help.pinterest.com'
      },
      {
        id: 4,
        name: 'AI设计助手',
        description: '人工智能辅助设计',
        icon: 'fas fa-robot',
        docUrl: 'https://help.figma.com'
      }
    ]
  },
  settings: {
    title: '个性化设置',
    subtitle: '自定义你的ADX体验',
    sections: [
      {
        id: 'appearance',
        name: '外观设置',
        icon: 'fas fa-paint-brush',
        settings: [
          {
            id: 'theme',
            name: '主题模式',
            description: '选择你喜欢的视觉主题',
            type: 'select',
            value: 'dark',
            options: [
              { value: 'dark', label: '暗黑模式' },
              { value: 'light', label: '明亮模式' },
              { value: 'auto', label: '跟随系统' }
            ]
          },
          {
            id: 'animations',
            name: '动画效果',
            description: '启用页面过渡和动画效果',
            type: 'switch',
            value: true
          },
          {
            id: 'particles',
            name: '粒子特效',
            description: '显示背景粒子动画',
            type: 'switch',
            value: true
          }
        ]
      },
      {
        id: 'privacy',
        name: '隐私设置',
        icon: 'fas fa-shield-alt',
        settings: [
          {
            id: 'analytics',
            name: '数据分析',
            description: '允许收集匿名使用数据以改进服务',
            type: 'switch',
            value: false
          },
          {
            id: 'location',
            name: '位置服务',
            description: '允许访问位置信息',
            type: 'switch',
            value: false
          }
        ]
      },
      {
        id: 'notifications',
        name: '通知设置',
        icon: 'fas fa-bell',
        settings: [
          {
            id: 'push_notifications',
            name: '推送通知',
            description: '接收重要更新和消息',
            type: 'switch',
            value: true
          },
          {
            id: 'email_notifications',
            name: '邮件通知',
            description: '接收邮件形式的通知',
            type: 'switch',
            value: true
          },
          {
            id: 'notification_frequency',
            name: '通知频率',
            description: '设置接收通知的频率',
            type: 'select',
            value: 'daily',
            options: [
              { value: 'realtime', label: '实时' },
              { value: 'daily', label: '每日汇总' },
              { value: 'weekly', label: '每周汇总' }
            ]
          }
        ]
      }
    ]
  }
})

const containerStyle = computed(() => ({
  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%)',
  fontFamily: "'Orbitron', monospace",
  textAlign: 'center',
  color: '#fff',
  position: 'relative',
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

const switchToTab = (index) => {
  emit('switchTab', index)
}

const prevTab = () => {
  if (props.currentTabIndex > 0) {
    emit('prevTab')
  }
}

const nextTab = () => {
  if (props.currentTabIndex < props.tabs.length - 1) {
    emit('nextTab')
  }
}

// ADX 烟花效果 (适配ADX主题色彩)
const initFireworks = () => {
  if (!fireworksCanvas.value) return
  
  const canvas = fireworksCanvas.value
  const ctx = canvas.getContext('2d')
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  const particles = []
  let shouldCreateFireworks = true // 控制是否继续创建新烟花
  
  // 5秒后停止创建新烟花
  setTimeout(() => {
    shouldCreateFireworks = false
  }, 5000)
  
  class Particle {
    constructor(x, y, color) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 8
      this.vy = (Math.random() - 0.5) * 8
      this.life = 1.0
      this.decay = Math.random() * 0.02 + 0.01
      this.color = color
      this.size = Math.random() * 3 + 1
    }
    
    update() {
      this.x += this.vx
      this.y += this.vy
      this.vy += 0.1
      this.life -= this.decay
      this.vx *= 0.99
      this.vy *= 0.99
    }
    
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = this.life
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }
  
  const createFirework = (x, y) => {
    // ADX主题色彩的烟花
    const colors = ['#ff6b35', '#f7931e', '#ffb347', '#ffd700', '#ff4757', '#ff3838']
    const particleCount = 20 // 比默认模板更多粒子
    
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push(new Particle(x, y, color))
    }
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.update()
      particle.draw(ctx)
      
      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    }
    
    // 只在允许的时间内创建新烟花
    if (shouldCreateFireworks && Math.random() < 0.05) {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6
      )
    }
    
    // 如果还有粒子存在或者仍在创建新烟花，继续动画
    if (particles.length > 0 || shouldCreateFireworks) {
      animationId = requestAnimationFrame(animate)
    } else {
      // 所有粒子都消失且不再创建新烟花时，停止动画
      animationId = null
    }
  }
  
  animate()
}

onMounted(() => {
  initFireworks()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.adx-template {
  font-family: 'Orbitron', monospace;
}

/* ADX 烟花特效 Canvas - 最高层级 */
.adx-fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000; /* 最高层级，确保烟花在所有内容前面 */
}

/* ADX 模板的背景特效 */
.adx-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(2px 2px at 20px 30px, #ff6b35, transparent),
              radial-gradient(2px 2px at 40px 70px, #f7931e, transparent),
              radial-gradient(1px 1px at 90px 40px, #ffb347, transparent),
              radial-gradient(1px 1px at 130px 80px, #ffd700, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: float 20s linear infinite;
}

.glow-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.glow-orbs::before,
.glow-orbs::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  animation: glow-pulse 4s ease-in-out infinite alternate;
}

.glow-orbs::before {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.glow-orbs::after {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(247, 147, 30, 0.3), transparent);
  bottom: 30%;
  right: 15%;
  animation-delay: 2s;
}

@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(0px) translateX(10px); }
  75% { transform: translateY(10px) translateX(5px); }
  100% { transform: translateY(0px) translateX(0px); }
}

@keyframes glow-pulse {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(1.2); }
}

.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px 20px;
  margin: 2rem 20px;
  border-radius: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 107, 53, 0.3);
  background: rgba(26, 26, 26, 0.9);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}

/* ADX 模板专属的 Tabbar 样式 */
.adx-tabbar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 3;
}

.adx-tabbar-container {
  margin: 0 20px;
  border-radius: 25px;
  padding: 10px 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 107, 53, 0.3);
  background: rgba(26, 26, 26, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.adx-tabbar {
  display: flex;
  gap: 15px;
}

.adx-tab-item {
  width: 12px;
  height: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.adx-tab-item:hover {
  transform: scale(1.2);
}

.adx-tab-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 107, 53, 0.5);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.adx-tab-item.active .adx-tab-dot {
  background: #ff6b35;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.8);
  border-color: #ff6b35;
}

.adx-nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: #ff6b35;
  color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  border: 2px solid rgba(255, 107, 53, 0.5);
}

.adx-nav-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
  background: #f7931e;
}

.adx-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  background: rgba(255, 107, 53, 0.3);
}

.adx-nav-btn:disabled:hover {
  transform: none;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  background: rgba(255, 107, 53, 0.3);
}

@media (max-width: 768px) {
  .home-page {
    margin: 2rem 10px;
    padding: 30px 15px 15px;
  }
  
  .adx-tabbar-section {
    padding: 15px;
  }
  
  .adx-nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .adx-tabbar-container {
    margin: 0 15px;
    padding: 8px 15px;
  }
}
</style>
