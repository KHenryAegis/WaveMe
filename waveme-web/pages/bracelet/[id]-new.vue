<template>
  <div id="app-container" :style="containerStyle">
    <canvas v-if="templateConfig.enableFireworks" ref="fireworksCanvas" class="fireworks-canvas"></canvas>
    
    <!-- ADX模板的背景特效 -->
    <div v-if="currentTemplate === 'adxdefault'" class="adx-background-effects">
      <div class="floating-particles"></div>
      <div class="glow-orbs"></div>
    </div>

    <main class="home-page" :style="cardStyle">
      <h1 class="title" :style="titleStyle">
        {{ currentTemplate === 'adxdefault' ? 'ADX Creative Studio' : 'Home Page' }}
      </h1>

      <div class="profile-section">
        <div class="avatar-container" :class="{ 'adx-avatar': currentTemplate === 'adxdefault' }">
          <a href="https://github.com" target="_blank" class="speech-bubble github">Github</a>
          <a href="#" class="speech-bubble wechat">Wechat</a>
          <a href="https://www.linkedin.com" target="_blank" class="speech-bubble linkedin">领英</a>

          <svg class="avatar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" :fill="templateConfig.cardBackground" :stroke="templateConfig.borderColor" stroke-width="3"/>
            <path d="M30 50 Q30 20 50 25 Q70 20 70 50" fill="none" :stroke="templateConfig.borderColor" stroke-width="3"/>
            <path d="M25 40 L35 15 L45 40 Z" :fill="templateConfig.cardBackground" :stroke="templateConfig.borderColor" stroke-width="3"/>
            <path d="M75 40 L65 15 L55 40 Z" :fill="templateConfig.cardBackground" :stroke="templateConfig.borderColor" stroke-width="3"/>
            <rect x="38" y="55" width="8" height="15" :fill="templateConfig.borderColor"/>
            <rect x="54" y="55" width="8" height="15" :fill="templateConfig.borderColor"/>
          </svg>
        </div>

        <div class="intro-text">
          <p class="greeting" :style="textStyle">{{ templateConfig.profileConfig.greeting }}</p>
          <p v-for="desc in templateConfig.profileConfig.description" :key="desc" class="description" :style="textStyle">{{ desc }}</p>
          <p class="bracelet-info" :style="{ color: templateConfig.primaryColor }">手环ID: {{ braceletId }}</p>
        </div>
      </div>

      <div class="tags-section">
        <span 
          v-for="tag in templateConfig.profileConfig.tags" 
          :key="tag" 
          class="tag" 
          :class="{ 'adx-tag': currentTemplate === 'adxdefault' }"
          :style="tagStyle"
        >
          {{ tag }}
        </span>
      </div>
    </main>

    <!-- Tabbar 切换区域 -->
    <div class="tabbar-section">
      <button class="nav-btn prev-btn" @click="prevTab" :disabled="currentTabIndex === 0" :style="navBtnStyle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <div class="tabbar-container" :style="tabbarStyle">
        <div class="tabbar">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['tab-item', { active: currentTabIndex === index }]"
            @click="switchToTab(index)"
          >
            <div class="tab-dot" :class="{ 'adx-dot': currentTemplate === 'adxdefault' }"></div>
          </div>
        </div>
      </div>

      <button class="nav-btn next-btn" @click="nextTab" :disabled="currentTabIndex === tabs.length - 1" :style="navBtnStyle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const fireworksCanvas = ref(null)

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

// 模板配置
const templateConfigs = {
  default: {
    enableFireworks: true,
    containerBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: '#ffffff',
    borderColor: '#333333',
    primaryColor: '#667eea',
    textColor: '#333333',
    tabbarBackground: 'rgba(255, 255, 255, 0.9)',
    tabDotColor: '#667eea',
    profileConfig: {
      greeting: "Hi, I'm Lambert :)",
      description: ['fullstack dev', 'fandom of Muelle'],
      tags: ['技术', '产品', '后端', '站长']
    }
  },
  adxdefault: {
    enableFireworks: false,
    containerBackground: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%)',
    cardBackground: '#1a1a1a',
    borderColor: '#ff6b35',
    primaryColor: '#ff6b35',
    textColor: '#ffffff',
    tabbarBackground: 'rgba(26, 26, 26, 0.9)',
    tabDotColor: '#ff6b35',
    profileConfig: {
      greeting: "Welcome to ADX Creative Studio",
      description: ['Creative Design & Development', 'Digital Innovation Hub'],
      tags: ['创意', '设计', 'ADX', '视觉']
    }
  }
}

// 计算属性
const templateConfig = computed(() => templateConfigs[currentTemplate.value] || templateConfigs.default)

const containerStyle = computed(() => ({
  background: templateConfig.value.containerBackground
}))

const cardStyle = computed(() => ({
  backgroundColor: templateConfig.value.cardBackground,
  borderColor: templateConfig.value.borderColor
}))

const titleStyle = computed(() => ({
  color: templateConfig.value.textColor
}))

const textStyle = computed(() => ({
  color: templateConfig.value.textColor
}))

const tagStyle = computed(() => ({
  backgroundColor: templateConfig.value.primaryColor,
  color: templateConfig.value.cardBackground
}))

const tabbarStyle = computed(() => ({
  backgroundColor: templateConfig.value.tabbarBackground
}))

const navBtnStyle = computed(() => ({
  backgroundColor: templateConfig.value.primaryColor,
  color: templateConfig.value.cardBackground
}))

// 获取模板信息
const fetchTemplate = async () => {
  try {
    // 模拟API调用
    const mockResponse = {
      template: braceletId === 'adx001' ? 'adxdefault' : 'default'
    }
    
    currentTemplate.value = mockResponse.template
    console.log('使用模板:', currentTemplate.value)
    
    // 初始化特效
    initializeEffects()
  } catch (error) {
    console.error('Failed to fetch template:', error)
    currentTemplate.value = 'default'
  }
}

// 初始化特效
const initializeEffects = () => {
  if (templateConfig.value.enableFireworks) {
    initFireworks()
  }
}

// 烟花效果
let animationId = null
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
    const colors = ['#ff6b35', '#f7931e', '#ffc048', '#ff9ff3', '#54a0ff']
    const particleCount = 15
    
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
    
    if (Math.random() < 0.03) {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.5
      )
    }
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
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

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style>
/* 引入手写字体 */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

:root {
  --font-handwriting-en: 'Indie Flower', cursive;
  --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
  --text-color: #333;
}

#app-container {
  font-family: var(--font-handwriting-en);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

/* 烟花画布 */
.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* 主页面容器 */
.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px 20px;
  margin: 0 20px;
  border-radius: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

/* 标题样式 */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

/* 头像区域 */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.avatar-container {
  position: relative;
  margin-bottom: 20px;
}

/* ADX 模板的头像特效 */
.avatar-container.adx-avatar {
  position: relative;
}

.avatar-container.adx-avatar::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: conic-gradient(from 0deg, #ff6b35, #f7931e, #ffb347, #ffd700, #ff6b35);
  border-radius: 50%;
  z-index: -1;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

/* 对话气泡 */
.speech-bubble {
  position: absolute;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  text-decoration: none;
  color: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: 10;
}

.avatar-container:hover .speech-bubble {
  opacity: 1;
  transform: scale(1);
}

.speech-bubble.github {
  background: #333;
  top: -40px;
  left: -30px;
}

.speech-bubble.wechat {
  background: #1aad19;
  top: -40px;
  right: -30px;
}

.speech-bubble.linkedin {
  background: #0077b5;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%) scale(0);
}

.avatar-container:hover .speech-bubble.linkedin {
  transform: translateX(-50%) scale(1);
}

/* 介绍文字 */
.intro-text {
  text-align: center;
}

.greeting {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: var(--font-handwriting-en);
}

.description {
  font-size: 1rem;
  margin-bottom: 5px;
  opacity: 0.8;
}

.bracelet-info {
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
}

/* 标签区域 */
.tags-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ADX 模板的标签特效 */
.tag.adx-tag {
  position: relative;
  overflow: hidden;
}

.tag.adx-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.tag.adx-tag:hover::before {
  left: 100%;
}

/* Tabbar 区域 */
.tabbar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 3;
}

.tabbar-container {
  margin: 0 20px;
  border-radius: 25px;
  padding: 10px 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tabbar {
  display: flex;
  gap: 15px;
}

.tab-item {
  width: 12px;
  height: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.tab-item:hover {
  transform: scale(1.2);
}

.tab-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.tab-item.active .tab-dot {
  background: #667eea;
  transform: scale(1.3);
}

/* ADX 模板的 tab 特效 */
.tab-dot.adx-dot {
  background: rgba(255, 107, 53, 0.5);
}

.tab-item.active .tab-dot.adx-dot {
  background: #ff6b35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

/* 导航按钮 */
.nav-btn {
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.nav-btn:disabled:hover {
  transform: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-page {
    margin: 0 10px;
    padding: 30px 15px 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .greeting {
    font-size: 1.2rem;
  }
  
  .tag {
    padding: 6px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .tabbar-section {
    padding: 15px;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .tabbar-container {
    margin: 0 15px;
    padding: 8px 15px;
  }
}
</style>
