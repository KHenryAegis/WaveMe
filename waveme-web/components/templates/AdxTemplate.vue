<template>
  <div class="adx-template" :style="containerStyle">
    <!-- ADX背景特效 -->
    <div class="adx-background-effects">
      <div class="floating-particles"></div>
      <div class="glow-orbs"></div>
    </div>
    
    <main class="home-page">
      <h1 class="title">{{ title }}</h1>

      <div class="profile-section">
        <div class="avatar-container adx-avatar">
          <a href="https://github.com" target="_blank" class="speech-bubble github">Github</a>
          <a href="#" class="speech-bubble wechat">Wechat</a>
          <a href="https://www.linkedin.com" target="_blank" class="speech-bubble linkedin">领英</a>

          <svg class="avatar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#ff6b35" stroke-width="3"/>
            <path d="M30 50 Q30 20 50 25 Q70 20 70 50" fill="none" stroke="#ff6b35" stroke-width="3"/>
            <path d="M25 40 L35 15 L45 40 Z" fill="#1a1a1a" stroke="#ff6b35" stroke-width="3"/>
            <path d="M75 40 L65 15 L55 40 Z" fill="#1a1a1a" stroke="#ff6b35" stroke-width="3"/>
            <rect x="38" y="55" width="8" height="15" fill="#ff6b35"/>
            <rect x="54" y="55" width="8" height="15" fill="#ff6b35"/>
          </svg>
        </div>

        <div class="intro-text">
          <p class="greeting">{{ templateData.greeting }}</p>
          <p v-for="desc in templateData.description" :key="desc" class="description">{{ desc }}</p>
          <p class="bracelet-info">手环ID: {{ braceletId }}</p>
        </div>
      </div>

      <div class="tags-section">
        <span v-for="tag in templateData.tags" :key="tag" class="tag adx-tag">{{ tag }}</span>
      </div>
    </main>

    <slot name="tabbar"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  braceletId: String,
  templateData: Object,
  title: {
    type: String,
    default: 'ADX Creative Studio'
  }
})

const containerStyle = computed(() => ({
  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%)',
  fontFamily: "'Orbitron', monospace",
  textAlign: 'center',
  color: '#fff',
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.adx-template {
  font-family: 'Orbitron', monospace;
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
}

.title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 30px;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
  color: #ff6b35;
  letter-spacing: 2px;
  text-transform: uppercase;
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
  filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.5));
}

.avatar:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 25px rgba(255, 107, 53, 0.8));
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
  border: 1px solid rgba(255, 107, 53, 0.5);
  background: rgba(26, 26, 26, 0.9);
}

.avatar-container:hover .speech-bubble {
  opacity: 1;
  transform: scale(1);
}

.speech-bubble.github {
  top: -40px;
  left: -30px;
}

.speech-bubble.wechat {
  top: -40px;
  right: -30px;
}

.speech-bubble.linkedin {
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
  font-weight: 700;
  margin-bottom: 10px;
  color: #ff6b35;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

.description {
  font-size: 1rem;
  margin-bottom: 5px;
  opacity: 0.9;
  color: #ffffff;
}

.bracelet-info {
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
  color: #ff6b35;
  text-shadow: 0 0 8px rgba(255, 107, 53, 0.5);
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
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: #1a1a1a;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 107, 53, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
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
