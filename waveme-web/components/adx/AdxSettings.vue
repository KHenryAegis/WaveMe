<template>
  <div class="adx-settings">
    <h2 class="section-title">{{ settingsData.title }}</h2>
    <p class="section-subtitle">{{ settingsData.subtitle }}</p>
    
    <div class="settings-container">
      <div 
        v-for="section in settingsData.sections" 
        :key="section.id"
        class="settings-section"
      >
        <div class="section-header">
          <i :class="section.icon" class="section-icon"></i>
          <h3 class="section-name">{{ section.name }}</h3>
        </div>
        
        <div class="settings-list">
          <div 
            v-for="setting in section.settings" 
            :key="setting.id"
            class="setting-item"
          >
            <div class="setting-info">
              <h4 class="setting-name">{{ setting.name }}</h4>
              <p class="setting-description">{{ setting.description }}</p>
            </div>
            
            <div class="setting-control">
              <!-- 开关类型 -->
              <label v-if="setting.type === 'switch'" class="switch">
                <input 
                  type="checkbox" 
                  :checked="setting.value"
                  @change="updateSetting(setting.id, $event.target.checked)"
                >
                <span class="slider"></span>
              </label>
              
              <!-- 选择类型 -->
              <select 
                v-else-if="setting.type === 'select'"
                :value="setting.value"
                @change="updateSetting(setting.id, $event.target.value)"
                class="select-control"
              >
                <option 
                  v-for="option in setting.options" 
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  settingsData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateSetting'])

const updateSetting = (settingId, value) => {
  emit('updateSetting', { settingId, value })
  console.log(`设置 ${settingId} 更新为:`, value)
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.adx-settings {
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

.settings-container {
  max-width: 600px;
  margin: 0 auto;
}

.settings-section {
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 15px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 107, 53, 0.1);
  border-bottom: 1px solid rgba(255, 107, 53, 0.3);
}

.section-icon {
  font-size: 1.5rem;
  color: #ff6b35;
  margin-right: 15px;
  filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.5));
}

.section-name {
  color: #ff6b35;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.settings-list {
  padding: 0;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 107, 53, 0.1);
  transition: background 0.3s ease;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item:hover {
  background: rgba(255, 107, 53, 0.05);
}

.setting-info {
  flex: 1;
  margin-right: 20px;
}

.setting-name {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.setting-description {
  color: #ffffff;
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
  line-height: 1.4;
}

.setting-control {
  flex-shrink: 0;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.3s;
  border-radius: 26px;
  border: 2px solid rgba(255, 107, 53, 0.3);
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  background-color: #ff6b35;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

input:checked + .slider {
  background-color: rgba(255, 107, 53, 0.3);
  border-color: #ff6b35;
}

input:checked + .slider:before {
  transform: translateX(24px);
  background-color: #ff6b35;
  box-shadow: 0 2px 10px rgba(255, 107, 53, 0.5);
}

/* 选择框样式 */
.select-control {
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 8px;
  color: #ffffff;
  padding: 8px 12px;
  font-size: 0.9rem;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-control:focus {
  outline: none;
  border-color: #ff6b35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
}

.select-control option {
  background: #1a1a1a;
  color: #ffffff;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .setting-info {
    margin-right: 0;
  }
  
  .setting-control {
    align-self: flex-end;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .section-icon {
    margin-right: 0;
  }
}
</style>
