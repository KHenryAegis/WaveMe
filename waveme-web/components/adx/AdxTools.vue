<template>
  <div class="adx-tools">
    <h2 class="section-title">{{ toolsData.title }}</h2>
    <p class="section-subtitle">{{ toolsData.subtitle }}</p>
    
    <div class="tools-grid">
      <div 
        v-for="tool in toolsData.tools" 
        :key="tool.id"
        class="tool-item"
      >
        <div class="tool-icon">
          
          <img 
            v-if="tool.icon.startsWith('http') || tool.icon.startsWith('/')" 
            :src="tool.icon" 
            :alt="tool.icon"
            class="tool-icon-image"
          />
          <i v-else :class="tool.icon"></i>
        </div>
        <div class="tool-content">
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <div class="tool-actions">
            <button 
              @click.stop="copyUrl(tool)"
              class="action-btn doc-btn"
            >
              📋 复制{{ tool.type === 'web' ? '体验地址' : '说明文档地址' }}
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
  toolsData: {
    type: Object,
    required: true
  }
})


const copyUrl = async (tool) => {
  try {
    await navigator.clipboard.writeText(tool.docUrl)
    const messageType = tool.type === 'web' ? '体验地址' : '说明文档地址'
    alert(`${messageType}已复制到剪贴板！`)
  } catch (err) {
    console.error('复制失败:', err)
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = tool.docUrl
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    const messageType = tool.type === 'web' ? '体验地址' : '说明文档地址'
    alert(`${messageType}已复制到剪贴板！`)
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.adx-tools {
  /* padding: 20px; */
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

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.tool-item {
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tool-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
  border-color: #ff6b35;
}

.tool-icon {
  text-align: center;
  margin-bottom: 15px;
}

.tool-icon i {
  font-size: 2.5rem;
  color: #ff6b35;
  filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
}

.tool-icon-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.tool-icon-image:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.7));
}

.tool-content {
  text-align: center;
}

.tool-name {
  color: #ff6b35;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.tool-description {
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 15px;
  opacity: 0.9;
  line-height: 1.4;
}

.tool-actions {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 107, 53, 0.2);
  color: #ff6b35;
  border: 2px solid rgba(255, 107, 53, 0.5);
}

.action-btn:hover {
  background: rgba(255, 107, 53, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.doc-btn:hover {
  background: rgba(52, 152, 219, 0.3);
  color: #3498db;
  border-color: #3498db;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .action-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
