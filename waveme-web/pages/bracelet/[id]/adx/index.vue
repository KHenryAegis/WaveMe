<template>
  <div class="adx-container">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在验证权限...</p>
    </div>

    <!-- 无权限时显示默认内容 -->
    <div v-else-if="!hasPermission" class="no-permission-container">
      <div class="no-permission-content">
        <div class="lock-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
          </svg>
        </div>
        <h2>访问受限</h2>
        <p>抱歉，您没有访问此照片墙模板的权限</p>
        <p class="bracelet-id">手环ID: {{ braceletId }}</p>
        <div class="default-actions">
          <button @click="router.push('/')" class="btn-home">返回首页</button>
          <button @click="retryPermissionCheck" class="btn-retry">重新检查</button>
        </div>
      </div>
    </div>

    <!-- 有权限时显示照片墙内容 -->
    <div v-else class="photo-wall-container">
      <header class="wall-header">
        <h1>我的照片墙</h1>
        <p>记录生活中的每一个精彩瞬间</p>
        <p class="bracelet-info">手环ID: {{ braceletId }}</p>
      </header>
      <div class="photo-grid">
        <div 
          v-for="photo in photos" 
          :key="photo.id" 
          class="photo-item"
        >
          <img :src="photo.url" :alt="photo.title" @error="onImageError">
          <div class="overlay">
            <h3>{{ photo.title }}</h3>
            <p>{{ photo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// 获取路由参数
const route = useRoute();
const router = useRouter();
const braceletId = computed(() => route.params.id);

// 权限验证相关状态
const hasPermission = ref(null); // null: 加载中, true: 有权限, false: 无权限
const isLoading = ref(true);

// 模拟后端API调用检查权限
const checkTemplatePermission = async (id) => {
  try {
    isLoading.value = true;
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟后端逻辑：这里可以根据ID来模拟不同的权限结果
    // 例如：ID为偶数时有权限，奇数时无权限
    const idNumber = parseInt(id);
    const permission = isNaN(idNumber) ? false : idNumber % 2 === 0;
    
    // 实际项目中这里应该是真实的API调用
    // const response = await fetch(`/api/check-adx-permission/${id}`);
    // const result = await response.json();
    // return result.hasPermission;
    
    return permission;
  } catch (error) {
    console.error('ADX权限检查失败:', error);
    return false;
  } finally {
    isLoading.value = false;
  }
};

// 重新检查权限
const retryPermissionCheck = async () => {
  const permission = await checkTemplatePermission(braceletId.value);
  hasPermission.value = permission;
};

// 照片数据
const photos = ref([
  { id: 1, title: '城市夜景', description: '霓虹闪烁的夜晚', url: 'https://placehold.co/600x800/1a1a1a/ff7f50?text=城市夜景' },
  { id: 2, title: '静谧森林', description: '阳光穿过树叶', url: 'https://placehold.co/600x400/1a1a1a/ff7f50?text=静谧森林' },
  { id: 3, title: '雪山之巅', description: '纯净的白色世界', url: 'https://placehold.co/600x600/1a1a1a/ff7f50?text=雪山之巅' },
  { id: 4, title: '蔚蓝海岸', description: '海风拂面', url: 'https://placehold.co/800x600/1a1a1a/ff7f50?text=蔚蓝海岸' },
  { id: 5, title: '街头艺术', description: '墙上的色彩', url: 'https://placehold.co/400x600/1a1a1a/ff7f50?text=街头艺术' },
  { id: 6, title: '美味咖啡', description: '午后的悠闲时光', url: 'https://placehold.co/600x600/1a1a1a/ff7f50?text=美味咖啡' },
  { id: 7, title: '可爱猫咪', description: '家里的治愈大师', url: 'https://placehold.co/600x800/1a1a1a/ff7f50?text=可爱猫咪' },
  { id: 8, title: '沙漠驼铃', description: '一望无际的金色', url: 'https://placehold.co/800x600/1a1a1a/ff7f50?text=沙漠驼铃' },
]);

// 图片加载失败时的处理函数
const onImageError = (e) => {
  e.target.src = 'https://placehold.co/600x600/2c2c2c/f0f0f0?text=图片加载失败';
};

// 页面加载时检查权限
onMounted(async () => {
  console.log("adx")
  const permission = await checkTemplatePermission(braceletId.value);
  hasPermission.value = permission;
});
</script>

<style scoped>
/* 引入手写字体 */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

:root {
  --font-handwriting-en: 'Indie Flower', cursive;
  --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
  --primary-color: #ff7f50;
  --text-color: #333;
  --card-background: #fff;
}

.adx-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%);
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(74, 144, 226, 0.3);
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 1.2rem;
  color: #4a90e2;
  font-family: var(--font-handwriting-zh);
}

/* 无权限状态样式 */
.no-permission-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #e17055 100%);
}

.no-permission-content {
  background: rgba(255, 255, 255, 0.95);
  border: 3px solid #ff6b6b;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.lock-icon {
  margin-bottom: 1.5rem;
  animation: shake 2s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.no-permission-content h2 {
  font-size: 2rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-family: var(--font-handwriting-zh);
}

.no-permission-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.bracelet-id {
  font-weight: bold;
  color: #ff6b6b !important;
  font-family: var(--font-handwriting-zh);
}

.default-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-home, .btn-retry {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: var(--font-handwriting-zh);
}

.btn-home {
  background: #4a90e2;
  color: white;
}

.btn-home:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.btn-retry {
  background: #ff6b6b;
  color: white;
}

.btn-retry:hover {
  background: #ee5a52;
  transform: translateY(-2px);
}

/* 照片墙样式 */
.photo-wall-container {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.wall-header {
  margin-bottom: 3rem;
  text-align: center;
}

.wall-header h1 {
  font-size: 3rem;
  color: var(--primary-color);
  font-family: 'ZCOOL KuaiLe', sans-serif; /* 使用艺术字体 */
  margin-bottom: 0.5rem;
}

.wall-header p {
  font-size: 1.2rem;
  color: var(--text-color);
}

.bracelet-info {
  font-size: 1rem !important;
  color: #4a90e2 !important;
  font-weight: bold;
  margin-top: 1rem;
  font-family: var(--font-handwriting-zh);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background-color: var(--card-background);
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.3s ease, border-color 0.3s ease;
  aspect-ratio: 3 / 4; /* 保持照片比例 */
}

.photo-item:hover {
  transform: translateY(-10px) scale(1.03);
  border-color: var(--primary-color);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.photo-item:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  padding: 3rem 1.5rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.4s ease-out;
}

.photo-item:hover .overlay {
  transform: translateY(0);
}

.overlay h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.overlay p {
  margin: 0;
  font-size: 1rem;
}
</style>
