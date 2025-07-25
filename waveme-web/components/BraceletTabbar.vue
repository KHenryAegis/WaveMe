<template>
  <div class="tabbar-section">
    <button 
      class="nav-btn prev-btn" 
      @click="prevTab" 
      :disabled="currentTabIndex === 0" 
      :style="navBtnStyle"
    >
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
          <div class="tab-dot" :class="{ 'adx-dot': templateType === 'adx' }"></div>
        </div>
      </div>
    </div>

    <button 
      class="nav-btn next-btn" 
      @click="nextTab" 
      :disabled="currentTabIndex === tabs.length - 1" 
      :style="navBtnStyle"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9,18 15,12 9,6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentTabIndex: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => []
  },
  templateType: {
    type: String,
    default: 'default'
  },
  styleConfig: {
    type: Object,
    default: () => ({
      tabbarBackground: 'rgba(255, 255, 255, 0.9)',
      primaryColor: '#667eea',
      cardBackground: '#ffffff'
    })
  }
})

const emit = defineEmits(['switchTab', 'prevTab', 'nextTab'])

const tabbarStyle = computed(() => ({
  backgroundColor: props.styleConfig.tabbarBackground
}))

const navBtnStyle = computed(() => ({
  backgroundColor: props.styleConfig.primaryColor,
  color: props.styleConfig.cardBackground
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
