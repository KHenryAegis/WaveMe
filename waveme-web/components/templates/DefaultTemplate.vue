<template>
  <div class="default-template" :style="containerStyle">
    <canvas ref="fireworksCanvas" class="fireworks-canvas"></canvas>
    
    <main class="home-page">
      <h1 class="title">{{ title }}</h1>

      <div class="profile-section">
        <div class="avatar-container">
          <a href="https://github.com" target="_blank" class="speech-bubble github">Github</a>
          <a href="#" class="speech-bubble wechat">Wechat</a>
          <a href="https://www.linkedin.com" target="_blank" class="speech-bubble linkedin">领英</a>

          <svg class="avatar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#333333" stroke-width="3"/>
            <path d="M30 50 Q30 20 50 25 Q70 20 70 50" fill="none" stroke="#333333" stroke-width="3"/>
            <path d="M25 40 L35 15 L45 40 Z" fill="#ffffff" stroke="#333333" stroke-width="3"/>
            <path d="M75 40 L65 15 L55 40 Z" fill="#ffffff" stroke="#333333" stroke-width="3"/>
            <rect x="38" y="55" width="8" height="15" fill="#333333"/>
            <rect x="54" y="55" width="8" height="15" fill="#333333"/>
          </svg>
        </div>

        <div class="intro-text">
          <p class="greeting">{{ templateData.greeting }}</p>
          <p v-for="desc in templateData.description" :key="desc" class="description">{{ desc }}</p>
          <p class="bracelet-info">手环ID: {{ braceletId }}</p>
        </div>
      </div>

      <div class="tags-section">
        <span v-for="tag in templateData.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </main>

    <slot name="tabbar"></slot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  braceletId: String,
  templateData: Object,
  title: {
    type: String,
    default: 'Home Page'
  }
})

const fireworksCanvas = ref(null)
let animationId = null

const containerStyle = computed(() => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontFamily: "'Indie Flower', cursive",
  textAlign: 'center',
  color: '#333',
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

// 烟花效果
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
    const colors = ['#667eea', '#764ba2', '#ffc048', '#ff9ff3', '#54a0ff']
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
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.default-template {
  font-family: 'Indie Flower', cursive;
}

.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}

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

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

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

.intro-text {
  text-align: center;
}

.greeting {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.description {
  font-size: 1rem;
  margin-bottom: 5px;
  opacity: 0.8;
  color: #333;
}

.bracelet-info {
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
  color: #667eea;
}

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
  background: #667eea;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .home-page {
    margin: 2rem 10px;
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
</style>
