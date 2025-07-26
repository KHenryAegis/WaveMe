<template>
  <div class="adx-photo-wall">
    <!-- 数据加载状态 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>正在加载模板数据...</p>
      </div>
    </div>

    <!-- 全局编辑模式切换和保存/取消按钮 -->
    <div class="edit-controls-global">
      <button @click="toggleEditMode" class="btn-toggle-edit">
        {{ isEditMode ? '退出编辑' : '进入编辑' }}
      </button>
      <button v-if="isEditMode" @click="saveChanges" class="btn-save">保存所有更改</button>
      <button v-if="isEditMode" @click="cancelEdit" class="btn-cancel">取消</button>
    </div>

    <!-- 标题和副标题 (编辑模式下可编辑) -->
    <!-- <input 
      v-if="isEditMode" 
      type="text" 
      v-model="editablePhotoData.title" 
      class="section-title-input" 
      placeholder="输入标题"
    />
    <h2 v-else-if="editablePhotoData.title" class="section-title">{{ editablePhotoData.title }}</h2>
    <h2 v-else class="section-title placeholder-title">照片墙标题</h2>

    <input 
      v-if="isEditMode" 
      type="text" 
      v-model="editablePhotoData.subtitle" 
      class="section-subtitle-input" 
      placeholder="输入副标题"
    />
    <p v-else-if="editablePhotoData.subtitle" class="section-subtitle">{{ editablePhotoData.subtitle }}</p>
    <p v-else class="section-subtitle placeholder-subtitle">在这里添加副标题描述</p> -->
    
    <div class="carousel-container">
      <!-- 空状态显示 -->
      <div v-if="!editablePhotoData.photos || editablePhotoData.photos.length === 0" class="empty-state">
        <div class="empty-content">
          <i class="fas fa-image empty-icon"></i>
          <h3 class="empty-title">暂无照片</h3>
          <p class="empty-description">{{ isEditMode ? '点击下方"添加新图片"按钮开始创建照片墙' : '请编辑添加照片' }}</p>
        </div>
      </div>

      <!-- 轮播图主体 -->
      <div v-else class="carousel-wrapper" :style="{ transform: `translateY(-${currentIndex * 100}%)` }">
        <div 
          v-for="(photo, index) in editablePhotoData.photos" 
          :key="photo.id || index"
          class="carousel-slide"
          @click="isEditMode ? openEditPhotoModal(photo, index) : openViewPhotoModal(photo)"
        >
          <div class="photo-container">
            <img 
              :src="photo.url" 
              :alt="photo.title" 
              class="photo-image"
              @load="onImageLoad(index)"
              @error="onImageError(index)"
            >
            <div class="image-placeholder" v-if="!imageLoaded[index]">
              <div class="loading-animation"></div>
            </div>
          </div>
          
          <div class="photo-overlay">
            <h3 class="photo-title">{{ photo.title }}</h3>
            <p class="photo-description">{{ photo.description }}</p>
            <span class="photo-date">{{ photo.date }}</span>
          </div>

          <!-- 编辑模式下的操作按钮 -->
          <div v-if="isEditMode" class="photo-edit-actions">
            <button @click.stop="openEditPhotoModal(photo, index)" class="edit-btn action-btn">
              <i class="fas fa-edit"></i> <!-- Font Awesome icon for edit -->
            </button>
            <button @click.stop="deletePhoto(index)" class="delete-btn action-btn">
              <i class="fas fa-trash-alt"></i> <!-- Font Awesome icon for delete -->
            </button>
            <button 
              v-if="index > 0" 
              @click.stop="movePhoto(index, -1)" 
              class="move-up-btn action-btn"
            >
              <i class="fas fa-arrow-up"></i>
            </button>
            <button 
              v-if="index < editablePhotoData.photos.length - 1" 
              @click.stop="movePhoto(index, 1)" 
              class="move-down-btn action-btn"
            >
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 导航按钮 (编辑模式下隐藏或禁用) -->
      <button 
        v-if="!isEditMode && currentIndex > 0"
        class="nav-btn nav-up" 
        @click="goToPrevious"
      >
        ↑
      </button>
      <button 
        v-if="!isEditMode && currentIndex < editablePhotoData.photos.length - 1"
        class="nav-btn nav-down" 
        @click="goToNext"
      >
        ↓
      </button>
      
      <!-- 指示器 (编辑模式下隐藏或禁用) -->
      <div v-if="!isEditMode" class="carousel-indicators">
        <div 
          v-for="(photo, index) in editablePhotoData.photos" 
          :key="photo.id || index"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></div>
      </div>

      <!-- 添加新图片按钮 -->
      <button v-if="isEditMode" @click="addNewPhoto" class="btn-add-photo">
        + 添加新图片
      </button>
    </div>

    <!-- 照片详情弹窗 (查看模式) -->
    <div v-if="selectedPhoto" class="photo-modal" @click="closeViewPhotoModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeViewPhotoModal">×</button>
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="modal-image">
        <div class="modal-info">
          <h3>{{ selectedPhoto.title }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <span class="modal-date">{{ selectedPhoto.date }}</span>
        </div>
      </div>
    </div>

    <!-- 图片编辑弹窗 (编辑模式) -->
    <div v-if="editingPhoto" class="photo-modal edit-modal" @click="cancelPhotoEdit">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="cancelPhotoEdit">×</button>
        <h3>{{ isNewPhoto ? '添加新图片' : '编辑图片' }}</h3>
        
        <!-- 图片上传区域 (仅新增时显示) -->
        <div v-if="isNewPhoto" class="form-group">
          <label for="photoFile">选择图片文件:</label>
          <div class="file-upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
            <input 
              type="file" 
              id="photoFile" 
              ref="fileInput"
              @change="handleFileSelect" 
              accept="image/*" 
              style="display: none;"
            >
            <div v-if="!selectedFile && !previewUrl" class="upload-placeholder">
              <i class="fas fa-cloud-upload-alt"></i>
              <p>点击选择图片或拖拽图片到此处</p>
              <p class="upload-hint">支持 JPG、PNG、GIF 格式</p>
            </div>
            <div v-else-if="previewUrl" class="image-preview">
              <img :src="previewUrl" alt="预览图片" class="preview-image">
              <button type="button" @click.stop="removeSelectedFile" class="remove-file-btn">×</button>
            </div>
            <div v-else-if="selectedFile" class="file-info">
              <i class="fas fa-file-image"></i>
              <span>{{ selectedFile.name }}</span>
              <button type="button" @click.stop="removeSelectedFile" class="remove-file-btn">×</button>
            </div>
          </div>
        </div>

        <!-- 图片URL (编辑已有图片时显示) -->
        <div v-if="!isNewPhoto" class="form-group">
          <label for="photoUrl">图片URL:</label>
          <input type="url" id="photoUrl" v-model="editingPhotoTemp.url" placeholder="http://example.com/image.jpg" required>
        </div>

        <!-- <div class="form-group">
          <label for="photoTitle">标题:</label>
          <input type="text" id="photoTitle" v-model="editingPhotoTemp.title" placeholder="图片标题（可选）">
        </div> -->
        <div class="form-group">
          <label for="photoDescription">描述:</label>
          <textarea id="photoDescription" v-model="editingPhotoTemp.description" placeholder="图片详细描述"></textarea>
        </div>
        <div class="modal-actions">
          <button @click="savePhotoEdit" class="btn-save-photo" :disabled="isUploading">
            {{ isUploading ? '上传中...' : '保存' }}
          </button>
          <button @click="cancelPhotoEdit" class="btn-cancel-photo">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  braceletId: {
    type: String,
    required: true
  }
})

const config = useRuntimeConfig()
const emit = defineEmits(['save', 'cancel']) // 暴露保存和取消事件

const isEditMode = ref(false)
const editablePhotoData = ref({
  photos: []
}) // 用于编辑的本地数据副本
const originalPhotoData = ref({
  photos: []
}) // 用于取消操作时恢复的原始数据

const selectedPhoto = ref(null) // 用于查看模式的弹窗
const editingPhoto = ref(null) // 用于编辑模式的弹窗
const editingPhotoTemp = ref({}) // 临时存储正在编辑的图片数据
const editingPhotoIndex = ref(-1) // 正在编辑的图片的索引
const isNewPhoto = ref(false) // 标记是否为新增图片

// 文件上传相关
const selectedFile = ref(null) // 选中的文件
const previewUrl = ref('') // 预览图片URL
const isUploading = ref(false) // 上传状态
const fileInput = ref(null) // 文件输入框引用
const isLoading = ref(false) // 数据加载状态

const imageLoaded = reactive({})
const currentIndex = ref(0)

// 请求模板数据
const fetchTemplateData = async () => {
  // console.log(props.braceletId)
  // if (!props.braceletId) return
  
  isLoading.value = true
  try {
    // 请求后端获取 photos 数据
    const response = await fetch(`${config.public.API_BASE}/templates/${props.braceletId}/adx/gallery?style=limit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Template data response:', response)
    
    if (response.ok) {
      const photosData = await response.json()
      console.log('获取的照片数据:', photosData)
      
      // 更新照片数据
      if (photosData && photosData.length > 0) {
        // 有数据时使用后端数据
        editablePhotoData.value = {
          photos: photosData
        }
        originalPhotoData.value = {
          photos: JSON.parse(JSON.stringify(photosData))
        }
        
        // 确保每个图片有一个唯一的ID
        ensureUniqueIds(editablePhotoData.value.photos)
      } else {
        // 后端数据为空时，保持空白状态
        console.log('后端返回空数据，显示空白模板')
        editablePhotoData.value = {
          photos: []
        }
        originalPhotoData.value = {
          photos: []
        }
      }
    } else {
      console.warn('获取照片数据失败，使用空白状态')
      editablePhotoData.value = {
        photos: []
      }
      originalPhotoData.value = {
        photos: []
      }
    }
  } catch (error) {
    console.error('请求照片数据时出错:', error)
    // 请求失败时也显示空白，不影响用户使用
    console.log('请求失败，显示空白模板')
    editablePhotoData.value = {
      photos: []
    }
    originalPhotoData.value = {
      photos: []
    }
    // 可以选择是否显示错误提示
    // alert(`获取模板数据失败: ${error.message}`)
  } finally {
    isLoading.value = false
  }
}

// 确保每个图片有一个唯一的ID，方便跟踪
const ensureUniqueIds = (photos) => {
  if (photos && Array.isArray(photos)) {
    photos.forEach(photo => {
      if (!photo.id) {
        photo.id = Date.now() + Math.random().toString(36).substr(2, 9);
      }
    });
  }
}


// --- 全局编辑模式控制 ---
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  if (isEditMode.value) {
    stopAutoPlay() // 进入编辑模式停止自动轮播
    // 确保数据是最新的深拷贝
    originalPhotoData.value = JSON.parse(JSON.stringify(editablePhotoData.value));
  } else {
    // 退出编辑模式（非保存操作），恢复原始数据
    cancelEdit() 
    startAutoPlay() // 退出编辑模式重新开始自动轮播
  }
}

const saveChanges = async () => {
  try {
    // 从 editablePhotoData 中提取所有照片的 id
    const photoIds = editablePhotoData.value.photos.map(photo => photo.id).filter(id => id);
    
    // 构建要发送到后端的数据
    const saveData = {
      style: "limit",
      data: photoIds
    };
    
    console.log('准备保存的数据:', saveData);
    
    // 发送到后端
    const apiUrl = `${config.public.API_BASE}/templates/${props.braceletId}/adx/gallery`;
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveData)
    });
    
    if (!response.ok) {
      throw new Error(`保存失败: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('保存结果:', result);
    
    // 保存成功后的处理
    isEditMode.value = false;
    startAutoPlay(); // 保存后退出编辑模式并恢复自动播放
    // 更新原始数据，以便下次取消时能恢复到本次保存后的状态
    originalPhotoData.value = JSON.parse(JSON.stringify(editablePhotoData.value));
    
    alert('所有更改已保存！');
    
  } catch (error) {
    console.error('保存错误:', error);
    alert(`保存失败: ${error.message}`);
  }
}

const cancelEdit = () => {
  editablePhotoData.value = JSON.parse(JSON.stringify(originalPhotoData.value))
  isEditMode.value = false
  startAutoPlay() // 取消后退出编辑模式并恢复自动播放
  alert('所有更改已取消！') // 简单提示
}

// --- 轮播控制 (非编辑模式下启用) ---
const goToNext = () => {
  if (currentIndex.value < editablePhotoData.value.photos.length - 1) {
    currentIndex.value++
  }
}

const goToPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// 自动轮播
let autoPlayTimer = null
const startAutoPlay = () => {
  if (isEditMode.value || editablePhotoData.value.photos.length <= 1) return // 编辑模式或只有一张图时禁用
  stopAutoPlay() // 先清除已有的计时器
  autoPlayTimer = setInterval(() => {
    if (currentIndex.value < editablePhotoData.value.photos.length - 1) {
      goToNext()
    } else {
      currentIndex.value = 0
    }
  }, 4000) // 4秒切换一次
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// --- 触摸滑动支持 ---
let startY = 0
let endY = 0
let carouselElement = null // 存储 carousel 元素的引用

const handleTouchStart = (e) => {
  if (isEditMode.value) return; // 编辑模式禁用触摸滑动
  startY = e.touches[0].clientY
  stopAutoPlay()
}

const handleTouchMove = (e) => {
  if (isEditMode.value) return; // 编辑模式禁用触摸滑动
  e.preventDefault() // 阻止默认的滚动行为
}

const handleTouchEnd = (e) => {
  if (isEditMode.value) return; // 编辑模式禁用触摸滑动
  endY = e.changedTouches[0].clientY
  const diff = startY - endY
  
  if (Math.abs(diff) > 50) { // 滑动距离大于50px才触发
    if (diff > 0) {
      goToNext() // 向上滑动，显示下一张
    } else {
      goToPrevious() // 向下滑动，显示上一张
    }
  }
  
  startAutoPlay()
}

// --- 图片查看弹窗 ---
const openViewPhotoModal = (photo) => {
  selectedPhoto.value = photo
  stopAutoPlay()
}

const closeViewPhotoModal = () => {
  selectedPhoto.value = null
  startAutoPlay()
}

// --- 图片编辑功能 ---
const openEditPhotoModal = (photo, index) => {
  stopAutoPlay(); // 停止自动轮播
  editingPhoto.value = photo; // 引用当前图片对象
  editingPhotoTemp.value = JSON.parse(JSON.stringify(photo)); // 创建临时副本进行编辑
  editingPhotoIndex.value = index;
  isNewPhoto.value = false;
}

const addNewPhoto = () => {
  stopAutoPlay();
  const newId = Date.now() + Math.random().toString(36).substr(2, 9);
  editingPhotoTemp.value = {
    id: newId,
    url: '',
    title: '',
    description: ''
  };
  editingPhoto.value = {}; // 仅用于触发弹窗显示
  editingPhotoIndex.value = -1; // 标记为新增
  isNewPhoto.value = true;
  // 重置文件上传相关状态
  selectedFile.value = null;
  previewUrl.value = '';
  isUploading.value = false;
}

// 文件上传相关方法
const triggerFileInput = () => {
  fileInput.value?.click();
}

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
}

const handleFileDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    setSelectedFile(files[0]);
  }
}

const setSelectedFile = (file) => {
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件！');
    return;
  }
  
  // 验证文件大小 (限制为5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('图片文件大小不能超过5MB！');
    return;
  }
  
  selectedFile.value = file;
  
  // 创建预览URL
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

const removeSelectedFile = () => {
  selectedFile.value = null;
  previewUrl.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

// 上传图片到后端
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', editingPhotoTemp.value.description || '');
  
  try {
    // 使用config中配置的baseURL
    const apiUrl = `${config.public.API_BASE}/files/upload`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    });

    const responseData = await response.json();
    
    return responseData;

  } catch (error) {
    console.error('图片上传错误:', error);
    throw error;
  }
}

const savePhotoEdit = async () => {
  // 基础验证
  if (isNewPhoto.value && !selectedFile.value) {
    alert('请选择要上传的图片文件！');
    return;
  }

  if (!isNewPhoto.value && !editingPhotoTemp.value.url) {
    alert('图片URL是必填项！');
    return;
  }

  if (isNewPhoto.value && selectedFile.value) {
    // 新增图片，需要上传文件
    isUploading.value = true;
    try {
      const uploadResult = await uploadImage(selectedFile.value);
      console.log("上传结果:", uploadResult)
      
      // 根据后端返回的数据结构构建新图片对象
      const newPhoto = {
        id: uploadResult.id,
        description: uploadResult.description, // 使用后端返回的描述
        url: uploadResult.url,
        name: uploadResult.name,
      };
      
      editablePhotoData.value.photos.push(newPhoto);
      console.log("照片列表已更新:", editablePhotoData.value.photos)
      currentIndex.value = editablePhotoData.value.photos.length - 1; // 自动跳到新添加的图片
      
      alert('图片上传成功！');
      
    } catch (error) {
      alert(`上传失败: ${error.message}`);
      return;
    } finally {
      isUploading.value = false;
    }
  } else {
    // 编辑已有图片，直接更新数据
    Object.assign(editablePhotoData.value.photos[editingPhotoIndex.value], editingPhotoTemp.value);
  }
  
  cancelPhotoEdit(); // 关闭弹窗
  startAutoPlay(); // 恢复自动轮播
}

const cancelPhotoEdit = () => {
  editingPhoto.value = null;
  editingPhotoTemp.value = {};
  editingPhotoIndex.value = -1;
  isNewPhoto.value = false;
  // 重置文件上传相关状态
  selectedFile.value = null;
  previewUrl.value = '';
  isUploading.value = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  startAutoPlay(); // 恢复自动轮播
}

const deletePhoto = (index) => {
  if (confirm(`确定要删除图片 "${editablePhotoData.value.photos[index].title}" 吗？`)) {
    editablePhotoData.value.photos.splice(index, 1);
    if (currentIndex.value >= editablePhotoData.value.photos.length && currentIndex.value > 0) {
      currentIndex.value--; // 如果删除的是当前或后面的图片，调整索引
    }
    // 删除后图片数量不足以轮播时，重置 currentIndex
    if (editablePhotoData.value.photos.length === 0) {
      currentIndex.value = 0;
    }
  }
}

const movePhoto = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < editablePhotoData.value.photos.length) {
    const photo = editablePhotoData.value.photos.splice(index, 1)[0];
    editablePhotoData.value.photos.splice(newIndex, 0, photo);
    currentIndex.value = newIndex; // 移动后，当前视图聚焦到被移动的图片
  }
}

// --- 图片加载状态 ---
const onImageLoad = (index) => {
  imageLoaded[index] = true
}

const onImageError = (index) => {
  // 即使加载失败也标记为已加载，防止无限显示占位符
  imageLoaded[index] = true
  console.error(`图片加载失败: ${editablePhotoData.value.photos[index]?.url}`);
}

// --- 生命周期钩子 ---
onMounted(async () => {
  // 先请求模板数据
  const res=await fetchTemplateData()
  console.log('模板数据加载完成:', res)
  // 然后启动自动轮播
  startAutoPlay()
  
  // 设置触摸事件监听器
  carouselElement = document.querySelector('.carousel-container')
  if (carouselElement) {
    carouselElement.addEventListener('touchstart', handleTouchStart, { passive: false })
    carouselElement.addEventListener('touchmove', handleTouchMove, { passive: false })
    carouselElement.addEventListener('touchend', handleTouchEnd, { passive: false })
  }
})

onUnmounted(() => {
  stopAutoPlay()
  if (carouselElement) {
    carouselElement.removeEventListener('touchstart', handleTouchStart)
    carouselElement.removeEventListener('touchmove', handleTouchMove)
    carouselElement.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style scoped>
/* 引入 Font Awesome 样式，如果你的项目没有引入，请自行引入 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.adx-photo-wall {
  padding: 20px;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  background-color: #1a1a1a; /* 更深的背景，衬托内容 */
  min-height: 100vh; /* 确保占据整个视口高度 */
  display: flex;
  flex-direction: column;
  position: relative; /* 为加载覆盖层提供定位基准 */
}

/* 数据加载状态覆盖层 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 26, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  backdrop-filter: blur(10px);
}

.loading-spinner {
  text-align: center;
  color: #ffffff;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 107, 53, 0.3);
  border-top: 4px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-spinner p {
  font-size: 1.1rem;
  color: #ff6b35;
  margin: 0;
}

/* 全局编辑控制按钮 */
.edit-controls-global {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
  padding: 10px;
  background: rgba(26, 26, 26, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.btn-toggle-edit, .btn-save, .btn-cancel, .btn-add-photo {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-toggle-edit {
  background: #f7931e;
  color: #fff;
  border: 2px solid #f7931e;
}
.btn-toggle-edit:hover {
  background: #e07b0c;
  box-shadow: 0 0 15px rgba(247, 147, 30, 0.6);
}

.btn-save {
  background: #28a745;
  color: #fff;
  border: 2px solid #28a745;
}
.btn-save:hover {
  background: #218838;
  box-shadow: 0 0 15px rgba(40, 167, 69, 0.6);
}

.btn-cancel {
  background: #dc3545;
  color: #fff;
  border: 2px solid #dc3545;
}
.btn-cancel:hover {
  background: #c82333;
  box-shadow: 0 0 15px rgba(220, 53, 69, 0.6);
}

.btn-add-photo {
  position: absolute; /* 相对于 carousel-container 定位 */
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #007bff; /* 蓝色更适合添加按钮 */
  color: #fff;
  border: 2px solid #007bff;
  padding: 12px 25px;
  font-size: 1.1rem;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}
.btn-add-photo:hover {
  background: #0056b3;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.6);
}


/* 标题和副标题输入框 */
.section-title-input, .section-subtitle-input {
  width: calc(100% - 40px);
  max-width: 800px;
  margin: 0 auto 15px;
  padding: 12px 20px;
  border: 2px solid rgba(255, 107, 53, 0.4);
  border-radius: 8px;
  background-color: rgba(26, 26, 26, 0.9);
  color: #fff;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease;
  box-sizing: border-box; /* 包含 padding 和 border 在宽度内 */
}

.section-title-input {
  font-size: 2rem;
  font-weight: 900;
  color: #ff6b35;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
  margin-top: 10px;
}

.section-subtitle-input {
  font-size: 1.1rem;
  color: #ffffff;
  opacity: 0.9;
  margin-bottom: 30px;
}

.section-title-input:focus, .section-subtitle-input:focus {
  border-color: #ff6b35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.6);
  outline: none;
  background-color: rgba(26, 26, 26, 0.95);
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

/* 占位符样式 */
.placeholder-title {
  opacity: 0.6;
  font-style: italic;
}

.placeholder-subtitle {
  opacity: 0.5;
  font-style: italic;
}

/* 空状态样式 */
.empty-state {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
}

.empty-content {
  text-align: center;
  color: #ffffff;
}

.empty-icon {
  font-size: 4rem;
  color: rgba(255, 107, 53, 0.6);
  margin-bottom: 20px;
}

.empty-title {
  font-size: 1.5rem;
  color: #ff6b35;
  margin-bottom: 10px;
  font-weight: 600;
}

.empty-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  max-width: 300px;
}

/* 轮播图容器 */
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  border: 2px solid rgba(255, 107, 53, 0.3);
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  flex-grow: 1; /* 占据可用空间 */
}

.carousel-wrapper {
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
}

.photo-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-slide:hover .photo-image {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 26, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.loading-animation {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 107, 53, 0.3);
  border-top: 3px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(26, 26, 26, 0.95));
  padding: 30px 20px 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.carousel-slide:hover .photo-overlay {
  transform: translateY(0);
}

.photo-title {
  color: #ff6b35;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.photo-description {
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 8px;
  opacity: 0.9;
  line-height: 1.5;
}

.photo-date {
  color: #f7931e;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(255, 107, 53, 0.5);
  color: #ff6b35;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.nav-up {
  top: 20px;
  right: 20px;
}

.nav-down {
  bottom: 20px;
  right: 20px;
}

.nav-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
  transform: scale(1.1);
}

/* 指示器 */
.carousel-indicators {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.indicator.active {
  background: #ff6b35;
  border-color: #ff6b35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

.indicator:hover {
  background: rgba(255, 107, 53, 0.6);
  transform: scale(1.2);
}

/* 编辑模式下的图片操作按钮 */
.photo-edit-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 8px; /* 按钮间距 */
  z-index: 10; /* 确保在图片和覆盖层之上 */
  opacity: 0; /* 默认隐藏 */
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateX(10px); /* 初始稍微偏移 */
}

.carousel-slide:hover .photo-edit-actions {
  opacity: 1; /* 悬停时显示 */
  transform: translateX(0);
}

.action-btn {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 107, 53, 0.5);
  color: #ff6b35;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.action-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.edit-btn { color: #f7931e; border-color: #f7931e;}
.edit-btn:hover { background: rgba(247, 147, 30, 0.2); }

.delete-btn { color: #dc3545; border-color: #dc3545;}
.delete-btn:hover { background: rgba(220, 53, 69, 0.2); }

.move-up-btn, .move-down-btn { color: #007bff; border-color: #007bff;}
.move-up-btn:hover, .move-down-btn:hover { background: rgba(0, 123, 255, 0.2); }


/* 弹窗样式 (查看和编辑共享基础样式) */
.photo-modal {
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
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(26, 26, 26, 0.98);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(255, 107, 53, 0.5);
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.close-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

/* 查看模式弹窗特有样式 */
.modal-image {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-bottom: 1px solid rgba(255, 107, 53, 0.2);
}

.modal-info {
  padding: 20px;
  flex-grow: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 允许内容滚动 */
}

.modal-info h3 {
  color: #ff6b35;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.modal-info p {
  color: #ffffff;
  margin-bottom: 10px;
  line-height: 1.6;
}

.modal-date {
  color: #f7931e;
  font-weight: 500;
}

/* 编辑模式弹窗特有样式 */
.edit-modal .modal-content {
  padding: 30px;
  max-width: 600px; /* 编辑弹窗可以窄一些 */
  max-height: 80vh;
}

.edit-modal h3 {
  color: #ff6b35;
  font-size: 1.8rem;
  margin-bottom: 25px;
  text-align: center;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #f7931e;
  font-size: 0.95rem;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="url"],
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(255, 107, 53, 0.4);
  border-radius: 8px;
  background-color: rgba(26, 26, 26, 0.7);
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input[type="text"]:focus,
.form-group input[type="url"]:focus,
.form-group textarea:focus {
  border-color: #ff6b35;
  box-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
  outline: none;
  background-color: rgba(26, 26, 26, 0.85);
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
}

/* 文件上传区域样式 */
.file-upload-area {
  border: 2px dashed rgba(255, 107, 53, 0.4);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(26, 26, 26, 0.5);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload-area:hover {
  border-color: #ff6b35;
  background: rgba(26, 26, 26, 0.7);
}

.file-upload-area.dragover {
  border-color: #ff6b35;
  background: rgba(255, 107, 53, 0.1);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-placeholder i {
  font-size: 2.5rem;
  color: #ff6b35;
  margin-bottom: 10px;
}

.upload-placeholder p {
  color: #ffffff;
  margin: 5px 0;
  font-size: 1rem;
}

.upload-hint {
  font-size: 0.8rem !important;
  opacity: 0.7;
}

.image-preview {
  position: relative;
  max-width: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 107, 53, 0.1);
  border-radius: 8px;
  color: #ffffff;
}

.file-info i {
  font-size: 1.5rem;
  color: #ff6b35;
}

.remove-file-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-file-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

.file-info .remove-file-btn {
  position: static;
  margin-left: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.btn-save-photo, .btn-cancel-photo {
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-save-photo {
  background: #ff6b35;
  color: #fff;
  box-shadow: 0 4px 10px rgba(255, 107, 53, 0.4);
}
.btn-save-photo:hover:not(:disabled) {
  background: #e05e2e;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.6);
}
.btn-save-photo:disabled {
  background: #666;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-cancel-photo {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 107, 53, 0.3);
}
.btn-cancel-photo:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ff6b35;
}


/* 移动端适配 */
@media (max-width: 768px) {
  .adx-photo-wall {
    padding: 4vw;
  }
  
  .edit-controls-global {
    flex-wrap: wrap; /* 按钮换行 */
    gap: 10px;
    margin-bottom: 20px;
  }
  .btn-toggle-edit, .btn-save, .btn-cancel, .btn-add-photo {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .section-title-input, .section-subtitle-input {
    font-size: 4.5vw;
    padding: 3vw 4vw;
    margin-bottom: 3vw;
  }
  .section-title-input {
    font-size: 6vw;
    margin-bottom: 2vw;
  }
  
  .section-title {
    font-size: 6vw;
    margin-bottom: 2vw;
    letter-spacing: 1px;
  }
  
  .section-subtitle {
    font-size: 3.5vw;
    margin-bottom: 6vw;
  }
  
  .carousel-container {
    max-width: 96vw;
    height: 50vh;
    border-radius: 3vw;
  }
  
  .photo-overlay {
    padding: 4vw 3vw 3vw;
  }
  
  .photo-title {
    font-size: 4vw;
    margin-bottom: 1vw;
  }
  
  .photo-description {
    font-size: 3vw;
    margin-bottom: 1vw;
  }
  
  .photo-date {
    font-size: 2.5vw;
  }
  
  .nav-btn {
    width: 10vw;
    height: 10vw;
    font-size: 4vw;
  }
  
  .nav-up {
    top: 3vw;
    right: 3vw;
  }
  
  .nav-down {
    bottom: 3vw;
    right: 3vw;
  }
  
  .carousel-indicators {
    right: 3vw;
    gap: 2vw;
  }
  
  .indicator {
    width: 3vw;
    height: 3vw;
  }
  
  .loading-animation {
    width: 8vw;
    height: 8vw;
    border-width: 2px;
  }

  .photo-edit-actions {
    top: 3vw;
    right: 3vw;
    gap: 2vw;
  }
  .action-btn {
    width: 8vw;
    height: 8vw;
    font-size: 3.5vw;
  }

  .modal-content {
    max-width: 95vw;
    max-height: 85vh;
    border-radius: 4vw;
  }
  
  .close-btn {
    top: 3vw;
    right: 3vw;
    width: 8vw;
    height: 8vw;
    font-size: 5vw;
  }
  
  .modal-image {
    max-height: 50vh;
  }
  
  .modal-info {
    padding: 4vw;
  }
  
  .modal-info h3 {
    font-size: 5vw;
    margin-bottom: 2vw;
  }
  
  .modal-info p {
    font-size: 3.5vw;
    margin-bottom: 2vw;
    line-height: 1.5;
  }
  
  .modal-date {
    font-size: 3vw;
  }

  .edit-modal .modal-content {
    padding: 6vw;
    max-width: 90vw;
  }
  .edit-modal h3 {
    font-size: 6vw;
    margin-bottom: 4vw;
  }
  .form-group label {
    font-size: 3.5vw;
    margin-bottom: 1.5vw;
  }
  .form-group input, .form-group textarea {
    padding: 3vw 4vw;
    font-size: 4vw;
  }
  .form-group textarea {
    min-height: 20vw;
  }
  .modal-actions {
    margin-top: 5vw;
    gap: 3vw;
    justify-content: space-around; /* 移动端按钮居中 */
  }
  .btn-save-photo, .btn-cancel-photo {
    padding: 3vw 6vw;
    font-size: 4vw;
  }

  .file-upload-area {
    min-height: 30vw;
    padding: 4vw;
  }

  .upload-placeholder i {
    font-size: 8vw;
    margin-bottom: 2vw;
  }

  .upload-placeholder p {
    font-size: 3.5vw;
    margin: 1vw 0;
  }

  .upload-hint {
    font-size: 3vw !important;
  }

  .preview-image {
    max-height: 40vw;
  }

  .file-info {
    padding: 3vw;
    gap: 2vw;
  }

  .file-info i {
    font-size: 5vw;
  }

  .remove-file-btn {
    width: 6vw;
    height: 6vw;
    font-size: 4vw;
  }
}

/* 小屏手机适配 (iPhone SE等) */
@media (max-width: 480px) {
  .adx-photo-wall {
    padding: 3vw;
  }
  
  .section-title {
    font-size: 7vw;
    margin-bottom: 2vw;
  }
  
  .section-subtitle {
    font-size: 4vw;
    margin-bottom: 5vw;
  }
  
  .carousel-container {
    max-width: 97vw;
    height: 45vh;
    border-radius: 2.5vw;
  }
  
  .photo-overlay {
    padding: 3vw 2.5vw 2.5vw;
  }
  
  .photo-title {
    font-size: 4.5vw;
  }
  
  .photo-description {
    font-size: 3.2vw;
  }
  
  .photo-date {
    font-size: 2.8vw;
  }
  
  .nav-btn {
    width: 12vw;
    height: 12vw;
    font-size: 5vw;
  }
  
  .indicator {
    width: 3.5vw;
    height: 3.5vw;
  }
  
  .loading-animation {
    width: 10vw;
    height: 10vw;
  }

  .action-btn {
    width: 10vw;
    height: 10vw;
    font-size: 4vw;
  }

  .btn-add-photo {
    padding: 10px 20px;
    font-size: 1rem;
  }
}

/* 大屏手机适配 (iPhone Pro Max等) */
@media (min-width: 414px) and (max-width: 768px) {
  .carousel-container {
    height: 55vh;
    max-width: 94vw;
  }
  
  .section-title {
    font-size: 5.5vw;
  }
  
  .section-subtitle {
    font-size: 3.2vw;
  }
  
  .photo-title {
    font-size: 3.5vw;
  }
  
  .photo-description {
    font-size: 2.8vw;
  }
  
  .photo-date {
    font-size: 2.2vw;
  }
  
  .nav-btn {
    width: 8vw;
    height: 8vw;
    font-size: 3.5vw;
  }
}
</style>