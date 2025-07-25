<template>
  <div class="settings-container">
    <header class="settings-header">
      <h1>设置</h1>
      <p>手环ID: {{ braceletId }}</p>
    </header>
    
    <div class="settings-content">
      <div class="setting-section">
        <h3>设备设置</h3>
        <div class="setting-item">
          <label>设备名称</label>
          <input v-model="deviceName" type="text" placeholder="输入设备名称">
        </div>
        <div class="setting-item">
          <label>自动同步</label>
          <input v-model="autoSync" type="checkbox">
        </div>
      </div>
      
      <div class="setting-section">
        <h3>通知设置</h3>
        <div class="setting-item">
          <label>运动提醒</label>
          <input v-model="exerciseReminder" type="checkbox">
        </div>
        <div class="setting-item">
          <label>睡眠提醒</label>
          <input v-model="sleepReminder" type="checkbox">
        </div>
      </div>
      
      <div class="setting-section">
        <h3>数据管理</h3>
        <button class="btn-primary">导出数据</button>
        <button class="btn-secondary">清除缓存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const route = useRoute();
const braceletId = computed(() => route.params.id);

// 设置项
const deviceName = ref('我的智能手环');
const autoSync = ref(true);
const exerciseReminder = ref(true);
const sleepReminder = ref(false);
</script>

<style scoped>
.settings-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.settings-header {
  text-align: center;
  margin-bottom: 3rem;
}

.settings-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.settings-header p {
  font-size: 1.1rem;
  color: #666;
}

.setting-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.setting-section h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem 0;
}

.setting-item label {
  font-weight: 500;
  color: #333;
}

.setting-item input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 200px;
}

.setting-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.btn-primary, .btn-secondary {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>
