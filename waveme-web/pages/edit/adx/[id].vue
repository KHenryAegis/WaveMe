<template>
  <div id="app-container">
    <main class="photo-editor">
      <div class="editor-header">
        <div class="header-left">
          <button @click="goBack" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="19,12 5,12"></polyline>
              <polyline points="12,19 5,12 12,5"></polyline>
            </svg>
            返回
          </button>
          <div class="page-info">
            <h1 class="title">照片墙编辑</h1>
            <p class="subtitle">管理您的照片展示</p>
          </div>
        </div>
        
        <div class="header-actions">
          <button @click="saveChanges" :disabled="isSaving" class="save-btn">
            <span v-if="isSaving" class="loading-spinner-small"></span>
            <span v-else class="btn-icon">💾</span>
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>

      <!-- 保存消息提示 -->
      <div v-if="saveMessage" class="save-message" :class="{ 'success': !saveMessage.includes('失败'), 'error': saveMessage.includes('失败') }">
        {{ saveMessage }}
      </div>

      <!-- 照片墙编辑区域 -->
      <div class="photo-wall-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-icon">📸</span>
            照片墙管理
          </h2>
          <p class="section-desc">上传和管理您的照片展示</p>
        </div>

        <!-- 照片上传区域 -->
        <div class="upload-section">
          <div class="upload-area" @click="triggerFileUpload" @dragover.prevent @drop.prevent="handleDrop">
            <input 
              ref="fileInput" 
              type="file" 
              multiple 
              accept="image/*" 
              @change="handleFileUpload" 
              style="display: none;"
            />
            <div class="upload-content">
              <div class="upload-icon">📁</div>
              <p class="upload-text">点击上传照片或拖拽图片到此处</p>
              <p class="upload-hint">支持 JPG、PNG 格式，最多上传 20 张照片</p>
            </div>
          </div>
        </div>

        <!-- 照片网格 -->
        <div class="photos-grid">
          <div 
            v-for="(photo, index) in photos" 
            :key="photo.id || index" 
            class="photo-card"
          >
            <div class="photo-preview">
              <img :src="photo.url || photo.preview" :alt="photo.title" class="photo-image" />
              <div class="photo-overlay">
                <button @click="editPhoto(index)" class="photo-action-btn edit-btn">
                  ✏️
                </button>
                <button @click="deletePhoto(index)" class="photo-action-btn delete-btn">
                  🗑️
                </button>
              </div>
            </div>
            
            <div class="photo-info">
              <input 
                v-model="photo.title" 
                placeholder="照片标题" 
                class="photo-input title-input"
                @blur="updatePhoto(index)"
              />
              <textarea 
                v-model="photo.description" 
                placeholder="照片描述"
                class="photo-input desc-input"
                rows="2"
                @blur="updatePhoto(index)"
              ></textarea>
              <!-- <input 
                v-model="photo.date" 
                type="date"
                class="photo-input date-input"
                @blur="updatePhoto(index)"
              /> -->
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="photos.length === 0" class="empty-state">
          <div class="empty-icon">📷</div>
          <h3 class="empty-title">还没有照片</h3>
          <p class="empty-desc">点击上方上传区域添加您的第一张照片</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 获取路由参数
const route = useRoute();
const router = useRouter();
const braceletId = route.params.id;

// 页面状态
const isSaving = ref(false);
const saveMessage = ref('');
const fileInput = ref(null);

// 照片数据
const photos = ref([]);

// 返回上一页
const goBack = () => {
  router.push(`/edit/${braceletId}`);
};

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click();
};

// 处理文件上传
const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    processFiles([...files]);
  }
};

// 处理拖拽上传
const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    processFiles([...files]);
  }
};

// 处理文件列表
const processFiles = (files) => {
  if (photos.value.length + files.length > 20) {
    alert('最多只能上传20张照片');
    return;
  }

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, ""), // 移除文件扩展名
          description: '',
          date: new Date().toISOString().split('T')[0], // 今天的日期
          preview: e.target.result, // 本地预览
          file: file, // 保存原始文件用于上传
          url: null // 上传后的URL
        };
        photos.value.push(newPhoto);
      };
      reader.readAsDataURL(file);
    }
  });
};

// 编辑照片
const editPhoto = (index) => {
  // 这里可以打开更详细的编辑模态框
  console.log('编辑照片:', photos.value[index]);
};

// 删除照片
const deletePhoto = (index) => {
  if (confirm('确定要删除这张照片吗？')) {
    photos.value.splice(index, 1);
  }
};

// 更新照片信息
const updatePhoto = (index) => {
  // 自动保存照片信息
  console.log('更新照片信息:', photos.value[index]);
};

// 保存更改
const saveChanges = async () => {
  isSaving.value = true;
  saveMessage.value = '';
  
  try {
    // 首先上传所有新照片
    const uploadPromises = photos.value
      .filter(photo => photo.file && !photo.url)
      .map(uploadPhoto);
    
    await Promise.all(uploadPromises);
    
    // 然后保存照片数据
    const photoData = photos.value.map(photo => ({
      title: photo.title,
      description: photo.description,
      date: photo.date,
      url: photo.url || photo.preview
    }));
    
    // 模拟API保存
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    saveMessage.value = '保存成功！';
    
    // 3秒后清除消息
    setTimeout(() => {
      saveMessage.value = '';
    }, 3000);
    
  } catch (error) {
    saveMessage.value = `保存失败: ${error.message}`;
  } finally {
    isSaving.value = false;
  }
};

// 上传单张照片
const uploadPhoto = async (photo) => {
  try {
    // 模拟文件上传API
    const formData = new FormData();
    formData.append('file', photo.file);
    
    // 这里应该调用真实的上传API
    // const response = await $fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // 模拟上传成功
    await new Promise(resolve => setTimeout(resolve, 1000));
    photo.url = `https://example.com/uploads/${photo.file.name}`;
    photo.file = null; // 清除本地文件引用
    
  } catch (error) {
    console.error('照片上传失败:', error);
    throw new Error(`照片 "${photo.title}" 上传失败`);
  }
};

// 页面初始化
onMounted(() => {
  console.log('照片墙编辑器已加载，手环ID:', braceletId);
  // 这里可以加载现有的照片数据
  loadExistingPhotos();
});

// 加载现有照片
const loadExistingPhotos = async () => {
  try {
    // 模拟从API加载现有照片
    const mockPhotos = [
      {
        id: 1,
        title: '示例照片 1',
        description: '这是一张示例照片',
        date: '2024-01-15',
        url: 'https://picsum.photos/400/300?random=1'
      },
      {
        id: 2,
        title: '示例照片 2',
        description: '另一张示例照片',
        date: '2024-01-20',
        url: 'https://picsum.photos/400/300?random=2'
      }
    ];
    
    photos.value = mockPhotos;
  } catch (error) {
    console.error('加载照片失败:', error);
  }
};
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

:root {
  --font-handwriting-en: 'Indie Flower', cursive;
  --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
  --primary-color: #ff8c00;
  --secondary-color: #ff6b00;
  --accent-color: #ffa500;
  --success-color: #ff9500;
  --error-color: #ff4500;
  --text-color: #ffffff;
  --bg-dark: #1a0a00;
  --bg-secondary: #2d1a0a;
  --bg-card: rgba(26, 10, 0, 0.85);
  --border-color: rgba(255, 140, 0, 0.4);
  --hover-bg: rgba(255, 140, 0, 0.15);
}

#app-container {
  font-family: var(--font-handwriting-en);
  color: var(--text-color);
  background: linear-gradient(135deg, #ff4500 0%, #ff6b00 15%, #ff8c00 30%, #ffa500 45%, #ff8c00 60%, #ff6b00 75%, #ff4500 90%, #cc3300 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.photo-editor {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 编辑器头部 */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 15px;
  border: 2px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--hover-bg);
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-handwriting-zh);
}

.back-btn:hover {
  background: var(--primary-color);
  color: var(--bg-dark);
  transform: translateX(-5px);
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
}

.page-info .title {
  font-size: 2rem;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-info .subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 5px 0 0 0;
  font-family: var(--font-handwriting-zh);
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-handwriting-zh);
  font-weight: bold;
  background: var(--success-color);
  color: var(--bg-dark);
}

.save-btn:hover:not(:disabled) {
  background: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}

.save-btn:disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}

/* 保存消息 */
.save-message {
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-family: var(--font-handwriting-zh);
  text-align: center;
  font-weight: bold;
}

.save-message.success {
  background: rgba(255, 149, 0, 0.2);
  color: var(--success-color);
  border: 2px solid var(--success-color);
}

.save-message.error {
  background: rgba(255, 69, 0, 0.2);
  color: var(--error-color);
  border: 2px solid var(--error-color);
}

/* 照片墙区域 */
.photo-wall-section {
  background: var(--bg-card);
  border-radius: 15px;
  border: 2px solid var(--border-color);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.section-header {
  padding: 30px;
  background: var(--hover-bg);
  border-bottom: 2px solid var(--border-color);
  text-align: center;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-family: var(--font-handwriting-zh);
}

.title-icon {
  font-size: 2.5rem;
}

.section-desc {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-family: var(--font-handwriting-zh);
}

/* 上传区域 */
.upload-section {
  padding: 30px;
  border-bottom: 2px solid var(--border-color);
}

.upload-area {
  border: 3px dashed var(--border-color);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--hover-bg);
}

.upload-area:hover {
  border-color: var(--primary-color);
  background: rgba(255, 140, 0, 0.15);
  transform: translateY(-2px);
}

.upload-content .upload-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.upload-text {
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  color: var(--text-color);
  font-family: var(--font-handwriting-zh);
}

.upload-hint {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 0.9rem;
}

/* 照片网格 */
.photos-grid {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.photo-card {
  background: rgba(26, 10, 0, 0.8);
  border-radius: 15px;
  border: 2px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.photo-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 140, 0, 0.4);
}

.photo-preview {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-action-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.edit-btn {
  background: rgba(255, 149, 0, 0.9);
  color: var(--bg-dark);
}

.edit-btn:hover {
  background: var(--success-color);
  transform: scale(1.1);
}

.delete-btn {
  background: rgba(255, 69, 0, 0.9);
  color: white;
}

.delete-btn:hover {
  background: var(--error-color);
  transform: scale(1.1);
}

.photo-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-input {
  width: 100%;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--font-handwriting-en);
  transition: border-color 0.3s ease;
}

.photo-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(255, 140, 0, 0.3);
}

.title-input {
  font-weight: bold;
  font-size: 1.1rem;
}

.desc-input {
  resize: vertical;
  min-height: 60px;
  font-family: var(--font-handwriting-zh);
}

.date-input {
  font-size: 0.9rem;
}

/* 空状态 */
.empty-state {
  padding: 60px 30px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-handwriting-zh);
}

.empty-desc {
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-family: var(--font-handwriting-zh);
}

/* 加载动画 */
.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-editor {
    padding: 15px;
  }
  
  .editor-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .header-left {
    flex-direction: column;
    gap: 10px;
  }
  
  .section-header {
    padding: 20px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .upload-section, .photos-grid {
    padding: 20px;
  }
  
  .upload-area {
    padding: 30px 20px;
  }
  
  .photos-grid {
    grid-template-columns: 1fr;
  }
  
  .photo-overlay {
    opacity: 1; /* 移动端始终显示操作按钮 */
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.3rem;
    flex-direction: column;
    gap: 5px;
  }
  
  .upload-area {
    padding: 20px 15px;
  }
  
  .upload-text {
    font-size: 1rem;
  }
  
  .photos-grid {
    padding: 15px;
    gap: 15px;
  }
}
</style>
