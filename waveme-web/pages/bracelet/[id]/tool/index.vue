<template>
  <div class="tool-container">
    <header class="tool-header">
      <h1>工具页面</h1>
      <p>手环ID: {{ braceletId }}</p>
    </header>
    
    <div class="tool-grid">
      <div class="tool-item">
        <h3>数据分析</h3>
        <p>查看您的健康数据趋势</p>
      </div>
      <div class="tool-item">
        <h3>运动记录</h3>
        <p>记录您的运动轨迹</p>
      </div>
      <div class="tool-item">
        <h3>心率监测</h3>
        <p>实时监测心率变化</p>
      </div>
      <div class="tool-item">
        <h3>睡眠分析</h3>
        <p>分析您的睡眠质量</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const route = useRoute();
const braceletId = computed(() => route.params.id);
</script>

<style scoped>
.tool-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tool-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tool-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.tool-header p {
  font-size: 1.1rem;
  color: #666;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.tool-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tool-item:hover {
  transform: translateY(-5px);
}

.tool-item h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.8rem;
}

.tool-item p {
  color: #666;
  line-height: 1.5;
}
</style>
