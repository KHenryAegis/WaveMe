<template>
  <div class="adx-settings">
    <h2 class="section-title">{{ settingsData.title }}</h2>
    <p class="section-subtitle">{{ settingsData.subtitle }}</p>
    
    <div class="settings-grid">
      <div 
        v-for="person in settingsData.settings" 
        :key="person.id"
        class="person-item"
      >
        <div class="person-avatar">
          <img 
            v-if="person.avatar" 
            :src="person.avatar" 
            :alt="person.nickname"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <div class="person-content">
          <h3 class="person-name">{{ person.nickname }}</h3>
          <p class="person-bio">{{ person.bio || '这个人很神秘，什么都没有留下...' }}</p>
          <div class="person-actions">
            <button 
              v-if="person.wechat"
              @click.stop="copyWechat(person.wechat)"
              class="action-btn wechat-btn"
            >
              📱 复制微信号
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  settingsData: {
    type: Object,
    required: true
  }
})

const copyWechat = async (wechat) => {
  try {
    await navigator.clipboard.writeText(wechat)
    alert('微信号已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = wechat
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('微信号已复制到剪贴板！')
  }
}

onMounted(() => {
  // 这里可以添加一些初始化逻辑
  console.log(props.settingsData)
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.adx-settings {
  height: 100%;
  width: 75vw;
  overflow-y: auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 900;
  color: #ff6b35;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(255, 107, 53, 0.5);
}

.section-subtitle {
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
  opacity: 0.9;
}

.settings-grid {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.person-item {
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.person-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
  border-color: #ff6b35;
}

.person-avatar {
  margin-bottom: 20px;
}

.avatar-image, .avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 107, 53, 0.5);
  object-fit: cover;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.3);
}

.avatar-placeholder {
  background: rgba(255, 107, 53, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b35;
  font-size: 2rem;
}

.person-content {
  flex: 1;
  width: 100%;
}

.person-name {
  color: #ff6b35;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(255, 107, 53, 0.3);
}

.person-bio {
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.person-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  width: 100%;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 107, 53, 0.2);
  color: #ff6b35;
  border: 2px solid rgba(255, 107, 53, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  text-align: center;
}

.action-btn:hover {
  background: rgba(255, 107, 53, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.wechat-btn {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border-color: rgba(76, 175, 80, 0.5);
}

.wechat-btn:hover {
  background: rgba(76, 175, 80, 0.3);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .person-item {
    padding: 20px;
  }
  
  .avatar-image, .avatar-placeholder {
    width: 70px;
    height: 70px;
  }
  
  .person-name {
    font-size: 1.2rem;
  }
  
  .person-bio {
    font-size: 0.9rem;
    min-height: 50px;
  }
  
  .action-btn {
    width: 100%;
    max-width: 200px;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .adx-settings {
    width: 95vw;
  }
  
  .person-item {
    padding: 15px;
  }
  
  .avatar-image, .avatar-placeholder {
    width: 60px;
    height: 60px;
  }
  
  .person-name {
    font-size: 1.1rem;
  }
}
</style>
