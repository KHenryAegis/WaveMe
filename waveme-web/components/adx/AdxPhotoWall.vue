<template>
  <div class="adx-photo-wall">
    <h2 class="section-title">{{ photoData.title }}</h2>
    <p class="section-subtitle">{{ photoData.subtitle }}</p>
    
    <div class="carousel-container">
      <!-- 轮播图主体 -->
      <div class="carousel-wrapper" :style="{ transform: `translateY(-${currentIndex * 100}%)` }">
        <div 
          v-for="(photo, index) in photoData.photos" 
          :key="index"
          class="carousel-slide"
          @click="openPhoto(photo)"
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
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <button 
        v-if="currentIndex > 0"
        class="nav-btn nav-up" 
        @click="goToPrevious"
      >
        ↑
      </button>
      <button 
        v-if="currentIndex < photoData.photos.length - 1"
        class="nav-btn nav-down" 
        @click="goToNext"
      >
        ↓
      </button>
      
      <!-- 指示器 -->
      <div class="carousel-indicators">
        <div 
          v-for="(photo, index) in photoData.photos" 
          :key="index"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>

    <!-- 照片详情弹窗 -->
    <div v-if="selectedPhoto" class="photo-modal" @click="closePhoto">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closePhoto">&times;</button>
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="modal-image">
        <div class="modal-info">
          <h3>{{ selectedPhoto.title }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <span class="modal-date">{{ selectedPhoto.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  photoData: {
    type: Object,
    required: true
  }
})

const selectedPhoto = ref(null)
const imageLoaded = reactive({})
const currentIndex = ref(0)

// 轮播控制
const goToNext = () => {
  if (currentIndex.value < props.photoData.photos.length - 1) {
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
  autoPlayTimer = setInterval(() => {
    if (currentIndex.value < props.photoData.photos.length - 1) {
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

// 触摸滑动支持
let startY = 0
let endY = 0

const handleTouchStart = (e) => {
  startY = e.touches[0].clientY
  stopAutoPlay()
}

const handleTouchMove = (e) => {
  e.preventDefault()
}

const handleTouchEnd = (e) => {
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

const openPhoto = (photo) => {
  selectedPhoto.value = photo
  stopAutoPlay()
}

const closePhoto = () => {
  selectedPhoto.value = null
  startAutoPlay()
}

const onImageLoad = (index) => {
  imageLoaded[index] = true
}

const onImageError = (index) => {
  imageLoaded[index] = true
}

onMounted(() => {
  startAutoPlay()
  // 添加触摸事件监听
  const carousel = document.querySelector('.carousel-container')
  if (carousel) {
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false })
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false })
    carousel.addEventListener('touchend', handleTouchEnd, { passive: false })
  }
})

onUnmounted(() => {
  stopAutoPlay()
  // 移除触摸事件监听
  const carousel = document.querySelector('.carousel-container')
  if (carousel) {
    carousel.removeEventListener('touchstart', handleTouchStart)
    carousel.removeEventListener('touchmove', handleTouchMove)
    carousel.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style scoped>
.adx-photo-wall {
  padding: 20px;
  height: 100%;
  overflow: hidden; /* 防止轮播时出现滚动条 */
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

/* 弹窗样式 */
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
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(255, 107, 53, 0.5);
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

.modal-image {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
}

.modal-info {
  padding: 20px;
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

/* 移动端弹窗优化 */
@media (max-width: 768px) {
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
}

@media (max-width: 768px) {
  .adx-photo-wall {
    padding: 4vw;
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
