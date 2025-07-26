<template>
  <div class="default-template" :style="containerStyle">
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
          <!-- <p class="bracelet-info">手环ID: {{ braceletId }}</p> -->
        </div>
      </div>

      <div class="tags-section">
        <span v-for="tag in templateData.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </main>

    <!-- Default 模板内置的 Tabbar -->
    <div class="default-tabbar-section">
      <button 
        class="default-nav-btn prev-btn" 
        @click="prevTab" 
        :disabled="currentTabIndex === 0"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <div class="default-tabbar-container">
        <div class="default-tabbar">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['default-tab-item', { active: currentTabIndex === index }]"
            @click="switchToTab(index)"
          >
            <div class="default-tab-dot"></div>
          </div>
        </div>
      </div>

      <button 
        class="default-nav-btn next-btn" 
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
import { computed } from 'vue'

const props = defineProps({
  braceletId: String,
  templateData: Object,
  title: {
    type: String,
    default: 'Home Page'
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

const containerStyle = computed(() => ({
  background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 50%, #e1f5fe 100%)',
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
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.default-template {
  font-family: 'Indie Flower', cursive;
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

/* Default 模板专属的 Tabbar 样式 */
.default-tabbar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 3;
}

.default-tabbar-container {
  margin: 0 20px;
  border-radius: 25px;
  padding: 10px 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.default-tabbar {
  display: flex;
  gap: 15px;
}

.default-tab-item {
  width: 12px;
  height: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.default-tab-item:hover {
  transform: scale(1.2);
}

.default-tab-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.5);
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.default-tab-item.active .default-tab-dot {
  background: #667eea;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.5);
  border-color: #667eea;
}

.default-nav-btn {
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
  background: #667eea;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.default-nav-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  background: #764ba2;
}

.default-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  background: rgba(102, 126, 234, 0.3);
}

.default-nav-btn:disabled:hover {
  transform: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.3);
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
  
  .default-tabbar-section {
    padding: 15px;
  }
  
  .default-nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .default-tabbar-container {
    margin: 0 15px;
    padding: 8px 15px;
  }
}
</style>
