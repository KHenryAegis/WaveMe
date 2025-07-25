<template>
  <div class="minimal-template" :style="containerStyle">
    <div class="minimal-bg">
      <div class="geometric-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
    
    <main class="home-page">
      <h1 class="title">{{ title }}</h1>

      <div class="profile-section">
        <div class="avatar-container minimal-avatar">
          <!-- 简约的头像设计 -->
          <div class="avatar-circle">
            <div class="avatar-inner">
              <span class="initial">{{ getInitial(templateData.greeting) }}</span>
            </div>
          </div>
          
          <!-- 简约的社交链接 -->
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-link">G</a>
            <a href="#" class="social-link">W</a>
            <a href="https://www.linkedin.com" target="_blank" class="social-link">L</a>
          </div>
        </div>

        <div class="intro-text">
          <p class="greeting">{{ templateData.greeting }}</p>
          <p v-for="desc in templateData.description" :key="desc" class="description">{{ desc }}</p>
          <p class="bracelet-info">{{ braceletId }}</p>
        </div>
      </div>

      <div class="tags-section">
        <span v-for="tag in templateData.tags" :key="tag" class="tag minimal-tag">{{ tag }}</span>
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
    default: 'Minimal Design'
  }
})

const containerStyle = computed(() => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  fontFamily: "'Inter', sans-serif",
  textAlign: 'center',
  color: '#2d3748',
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : 'M'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.minimal-template {
  font-family: 'Inter', sans-serif;
}

.minimal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.geometric-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float-minimal 15s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: #667eea;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: #764ba2;
  bottom: 20%;
  right: 15%;
  animation-delay: 5s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background: #f093fb;
  top: 60%;
  left: 70%;
  animation-delay: 10s;
}

@keyframes float-minimal {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px 20px;
  margin: 2rem 20px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.title {
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 30px;
  color: #2d3748;
  letter-spacing: -0.5px;
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

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;
}

.avatar-circle:hover {
  transform: scale(1.05);
}

.avatar-inner {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initial {
  font-size: 2rem;
  font-weight: 600;
  color: #667eea;
}

.social-links {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.social-link {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #667eea;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.intro-text {
  text-align: center;
}

.greeting {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #2d3748;
}

.description {
  font-size: 0.95rem;
  margin-bottom: 5px;
  opacity: 0.7;
  color: #4a5568;
}

.bracelet-info {
  font-size: 0.85rem;
  font-weight: 400;
  margin-top: 10px;
  color: #667eea;
  font-family: 'Monaco', monospace;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  display: inline-block;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 400;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.tag:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .home-page {
    margin: 2rem 10px;
    padding: 30px 15px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .avatar-circle {
    width: 80px;
    height: 80px;
  }
  
  .avatar-inner {
    width: 72px;
    height: 72px;
  }
  
  .initial {
    font-size: 1.5rem;
  }
  
  .greeting {
    font-size: 1.1rem;
  }
  
  .tag {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
