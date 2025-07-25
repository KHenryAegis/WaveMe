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
        
        <!-- 照片加载状态 -->
        <div v-if="photosLoading" class="photos-loading">
          <div class="photos-loading-spinner"></div>
          <p>正在加载照片...</p>
        </div>
        
        <!-- 照片网格 -->
        <div v-else class="photo-grid">
          <div 
            v-for="photo in photos" 
            :key="photo.id" 
            class="photo-item"
          >
            <img :src="photo.url" :alt="photo.title" @error="onImageError">
            <div class="overlay">
              <h3>{{ photo.title }}</h3>
              <p>{{ photo.description }}</p>
              <span class="upload-time">{{ photo.uploadTime }}</span>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="!photosLoading && photos.length === 0" class="empty-state">
          <p>暂无照片</p>
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
  const photosLoading = ref(false);
  
  // 照片数据
  const photos = ref([]);
  
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
      
      return true;
    } catch (error) {
      console.error('ADX权限检查失败:', error);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // 从后端获取照片数据
  const fetchPhotos = async (id) => {
    try {
      photosLoading.value = true;
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟后端API调用获取照片
      // const response = await fetch(`/api/bracelet/${id}/photos`);
      // const result = await response.json();
      // return result.photos;
      
      // Mock数据模拟后端返回
      const mockPhotos = [
        { 
          id: 1, 
          title: '夕阳西下', 
          description: '城市的黄昏时刻',
          url: `https://picsum.photos/400/500?random=1&t=${Date.now()}`,
          uploadTime: '2024-01-15'
        },
        { 
          id: 2, 
          title: '星空漫步', 
          description: '夜晚的星光点点',
          url: `https://picsum.photos/400/500?random=2&t=${Date.now()}`,
          uploadTime: '2024-01-20'
        },
        { 
          id: 3, 
          title: '晨光初现', 
          description: '清晨的第一缕阳光',
          url: `https://picsum.photos/400/500?random=3&t=${Date.now()}`,
          uploadTime: '2024-01-25'
        },
        { 
          id: 4, 
          title: '雨后彩虹', 
          description: '雨过天晴的美好',
          url: `https://picsum.photos/400/500?random=4&t=${Date.now()}`,
          uploadTime: '2024-02-01'
        },
        { 
          id: 5, 
          title: '秋叶飘零', 
          description: '金秋的落叶时节',
          url: `https://picsum.photos/400/500?random=5&t=${Date.now()}`,
          uploadTime: '2024-02-05'
        },
        { 
          id: 6, 
          title: '冬日暖阳', 
          description: '冬天里的温暖阳光',
          url: `https://picsum.photos/400/500?random=6&t=${Date.now()}`,
          uploadTime: '2024-02-10'
        }
      ];
      
      return mockPhotos;
    } catch (error) {
      console.error('获取照片失败:', error);
      return [];
    } finally {
      photosLoading.value = false;
    }
  };
  
  // 重新检查权限
  const retryPermissionCheck = async () => {
    const permission = await checkTemplatePermission(braceletId.value);
    hasPermission.value = permission;
    
    // 如果获得权限，则加载照片
    if (permission) {
      const photoData = await fetchPhotos(braceletId.value);
      photos.value = photoData;
    }
  };

  // 图片加载失败时的处理函数
  const onImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x500/2c2c2c/f0f0f0?text=图片加载失败';
  };

  // 页面加载时检查权限
  onMounted(async () => {
    console.log("adx页面加载");
    const permission = await checkTemplatePermission(braceletId.value);
    hasPermission.value = permission;
    
    // 如果有权限，则加载照片数据
    if (permission) {
      const photoData = await fetchPhotos(braceletId.value);
      photos.value = photoData;
    }
  });
  </script>
  
  <style scoped>
  /* 引入手写字体 */
  @import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');
  
  :root {
    --font-handwriting-en: 'Indie Flower', cursive;
    --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
    --primary-color: #ff7f50;
    --secondary-color: #1a1a1a;
    --text-color: #fff;
    --card-background: #2c2c2c;
    --accent-color: #ff6b35;
  }
  
  .adx-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ff7f50 0%, #ff6b35 25%, #e55d25 50%, #cc4a00 75%, #1a1a1a 100%);
    transition: all 0.3s ease;
  }
  
  /* 加载状态样式 */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* background: inherit; 继承父容器的背景 */
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 127, 80, 0.3);
    border-top: 4px solid #ff7f50;
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
    color: #ff7f50;
    font-family: var(--font-handwriting-zh);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  
  /* 无权限状态样式 */
  .no-permission-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #333 50%, #ff7f50 100%);
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
    color: var(--text-color);
    font-family: 'ZCOOL KuaiLe', sans-serif;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  
  .wall-header p {
    font-size: 1.2rem;
    color: var(--text-color);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  
  .bracelet-info {
    font-size: 1rem !important;
    color: var(--accent-color) !important;
    font-weight: bold;
    margin-top: 1rem;
    font-family: var(--font-handwriting-zh);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }

  /* 照片加载状态 */
  .photos-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    margin: 2rem 0;
  }

  .photos-loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 127, 80, 0.3);
    border-top: 3px solid #ff7f50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  .photos-loading p {
    color: var(--text-color);
    font-size: 1.1rem;
    font-family: var(--font-handwriting-zh);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }

  /* 空状态 */
  .empty-state {
    text-align: center;
    padding: 3rem 0;
    color: var(--text-color);
    font-size: 1.2rem;
    font-family: var(--font-handwriting-zh);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 一排两个照片 */
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    .photo-grid {
      grid-template-columns: 1fr; /* 移动端单列显示 */
      gap: 1.5rem;
    }
  }
  
  .photo-item {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    background-color: var(--card-background);
    cursor: pointer;
    border: 3px solid transparent;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    aspect-ratio: 4 / 5; /* 调整照片比例 */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  .photo-item:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: var(--accent-color);
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
  }
  
  .photo-item:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: var(--accent-color);
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
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
    background: linear-gradient(to top, rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.7), transparent);
    color: white;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    transform: translateY(100%);
    transition: transform 0.4s ease-out;
  }
  
  .photo-item:hover .overlay {
    transform: translateY(0);
  }
  
  .overlay h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.4rem;
    color: var(--accent-color);
    font-family: var(--font-handwriting-zh);
  }
  
  .overlay p {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .upload-time {
    font-size: 0.85rem;
    color: #ccc;
    font-style: italic;
  }
  </style>
  