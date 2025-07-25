<template>
  <div class="adx-tools">
    <h2 class="section-title">{{ toolsData.title }}</h2>
    <p class="section-subtitle">{{ toolsData.subtitle }}</p>
    
    <div class="tools-grid">
      <div 
        v-for="tool in toolsData.tools" 
        :key="tool.id"
        :class="['tool-item', `status-${tool.status}`]"
        @click="openToolDetail(tool)"
      >
        <div class="tool-icon">
          <i :class="tool.icon"></i>
        </div>
        <div class="tool-content">
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <div class="tool-meta">
            <span class="usage-count">使用次数: {{ tool.usageCount }}</span>
            <span :class="['tool-status', `status-${tool.status}`]">
              {{ getStatusText(tool.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具详情弹窗 -->
    <div v-if="selectedTool" class="tool-modal" @click="closeToolDetail">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeToolDetail">&times;</button>
        <div class="modal-header">
          <i :class="selectedTool.icon" class="modal-icon"></i>
          <h3>{{ selectedTool.name }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ selectedTool.description }}</p>
          <div class="features-list">
            <h4>主要功能：</h4>
            <ul>
              <li v-for="feature in selectedTool.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
          <div class="tool-stats">
            <div class="stat-item">
              <span class="stat-label">使用次数</span>
              <span class="stat-value">{{ selectedTool.usageCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">状态</span>
              <span :class="['stat-value', `status-${selectedTool.status}`]">
                {{ getStatusText(selectedTool.status) }}
              </span>
            </div>
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

const selectedTool = ref(null)

const openToolDetail = (tool) => {
  selectedTool.value = tool
}

const closeToolDetail = () => {
  selectedTool.value = null
}

const getStatusText = (status) => {
  const statusMap = {
    active: '活跃',
    maintenance: '维护中',
    coming_soon: '即将上线'
  }
  return statusMap[status] || '未知'
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.adx-tools {
  padding: 20px;
  height: 100%;
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
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tool-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
  border-color: #ff6b35;
}

.tool-item.status-maintenance {
  border-color: rgba(255, 193, 7, 0.5);
}

.tool-item.status-coming_soon {
  border-color: rgba(108, 117, 125, 0.5);
  opacity: 0.7;
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

.tool-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.usage-count {
  color: #f7931e;
  font-weight: 500;
}

.tool-status {
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.7rem;
}

.tool-status.status-active {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
  border: 1px solid #28a745;
}

.tool-status.status-maintenance {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid #ffc107;
}

.tool-status.status-coming_soon {
  background: rgba(108, 117, 125, 0.2);
  color: #6c757d;
  border: 1px solid #6c757d;
}

/* 弹窗样式 */
.tool-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: 600px;
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  border: 2px solid rgba(255, 107, 53, 0.5);
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: #ff6b35;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(26, 26, 26, 0.8);
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  transform: scale(1.1);
}

.modal-header {
  text-align: center;
  padding: 30px 20px 20px;
  border-bottom: 1px solid rgba(255, 107, 53, 0.3);
}

.modal-icon {
  font-size: 3rem;
  color: #ff6b35;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.5));
}

.modal-header h3 {
  color: #ff6b35;
  font-size: 1.8rem;
  font-weight: 700;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.6;
}

.features-list h4 {
  color: #ff6b35;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.features-list ul {
  list-style: none;
  padding: 0;
}

.features-list li {
  color: #ffffff;
  padding: 5px 0;
  position: relative;
  padding-left: 20px;
}

.features-list li::before {
  content: '▸';
  color: #ff6b35;
  position: absolute;
  left: 0;
}

.tool-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.stat-item {
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
}

.stat-label {
  display: block;
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 5px;
  opacity: 0.8;
}

.stat-value {
  display: block;
  color: #ff6b35;
  font-size: 1.2rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .tool-stats {
    grid-template-columns: 1fr;
  }
}
</style>
