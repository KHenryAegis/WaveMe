<template>
  <div class="home-page">
    <!-- <header class="header">
      <button class="select-template-btn" @click="selectCurrentTemplate">选择此模板</button>
    </header> -->

    <main class="main-content">
      <div 
        class="carousel-wrapper"
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
        @mouseenter="isWrapperHovered = true"
        @mouseleave="isWrapperHovered = false"
      >
        <div class="carousel-inner">
          <div
            v-for="(template, index) in templates"
            :key="template.id"
            class="template-card"
            :style="getCardStyle(index)"
            :class="{ 
              'is-active-hover': isWrapperHovered && index === currentIndex,
              'is-selected': template.id === selectedTemplateId
            }"
          >
            <div class="card-content">
              <div class="avatar-container">
                <img v-if="template.avatar" :src="template.avatar" alt="avatar" class="avatar-image" />
                <div v-else class="avatar-placeholder"></div>
              </div>

              <div class="text-content">
                <h2 class="greeting">{{ template.name }}</h2>
                <p class="description">{{ template.greeting }}</p>
                <p v-if="template.description" class="description detail">{{ template.description }}</p>
              </div>
            </div>

            <div class="hover-overlay">
                <button class="edit-btn" @click.stop="editTemplate(template)">编辑</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 选择模版按钮区域 -->
      <div class="template-action-area">
        <button 
          v-if="selectedTemplateId === templates[currentIndex].id"
          class="template-action-btn current-template"
          disabled
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          当前使用的模版
        </button>
        <button 
          v-else
          class="template-action-btn select-template"
          @click="selectTemplate(templates[currentIndex])"
        >
          选择此模版
        </button>
      </div>

      

      <nav class="dots-nav">
        <button 
          class="nav-arrow nav-left" 
          @click="goToPrevious" 
          :disabled="currentIndex === 0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <div class="dots-container">
          <span
            v-for="(template, index) in templates"
            :key="`dot-${template.id}`"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>
        
        <button 
          class="nav-arrow nav-right" 
          @click="goToNext" 
          :disabled="currentIndex === templates.length - 1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </nav>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { checkUserExists, getUserBraceletColor } from '~/api/user';

// 获取运行时配置
const config = useRuntimeConfig()
const route = useRoute()
console.log(route.params.id)
// 获取当前用户ID，添加空值检查
const userId = computed(() => {
  if (!route.params || !route.params.id) return null
  return typeof route.params.id === 'string' ? route.params.id : String(route.params.id)
})

// 用户状态
const userExists = ref(null) // null表示还未检查，true存在，false不存在
const isCheckingUser = ref(false)

// --- 数据模型 ---
const templates = ref([
  {
    id: 1,
    name: '默认主题',
    greeting: "设置你的个人主页",
    description: '个人介绍、作品集展示',
    avatar: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
  },
  {
    id: 2,
    name: '学术主题',
    greeting: "学术社交必备",
    description: '学术简介、学术简历、研究成果',
    avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
  },
  {
    id: 3,
    name: 'AdventureX 2025限定主题',
    greeting: "为创造失眠",
    description: '纪念页面、照片墙、创造集、事件记录',
    avatar: `${config.public.minioBase}/adx-icon.jpg`,
  },
  {
    id: 4,
    name: '兴趣主题',
    greeting: "记录你的热爱",
    description: '音乐集、影评、书评、旅行日记',
    avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
  }
]);

console.log(templates)

// --- 轮播图核心逻辑 ---
const currentIndex = ref(1); // 修改：默认从中间的模板开始（索引1）
const isWrapperHovered = ref(false); // 新增：用于检测鼠标是否在整个轮播区域

// 当前选中的模版ID (mock数据)
const selectedTemplateId = ref(2); // 假设用户当前使用的是"兴趣爱好"模版

/**
 * 根据卡片索引计算其3D样式
 */
const getCardStyle = (index) => {
  const offset = index - currentIndex.value;
  if (Math.abs(offset) > 1) {
    return { 
      opacity: 0, 
      transform: `translateX(calc(-50% + ${offset * 100}px)) scale(0.5)`, 
      pointerEvents: 'none' 
    };
  }
  
  const scale = 1 - Math.abs(offset) * 0.15;
  const rotateY = -offset * 35;
  const translateX = offset * 65; 
  const zIndex = 100 - Math.abs(offset);
  const opacity = 1 - Math.abs(offset) * 0.2;

  return {
    transform: `translateX(calc(-50% + ${translateX}%)) perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex: zIndex,
    opacity: opacity,
  };
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

// 添加左右切换函数
const goToPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToNext = () => {
  if (currentIndex.value < templates.value.length - 1) {
    currentIndex.value++;
  }
};

// --- 触摸滑动逻辑 ---
const touchStartX = ref(0);
const touchMoveX = ref(0);

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  touchMoveX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (touchMoveX.value === 0) return;
  const diff = touchStartX.value - touchMoveX.value;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex.value = Math.min(currentIndex.value + 1, templates.value.length - 1);
    } else {
      currentIndex.value = Math.max(currentIndex.value - 1, 0);
    }
  }
  touchStartX.value = 0;
  touchMoveX.value = 0;
};

// --- 事件处理 ---
/**
 * 检查用户是否存在
 */
const checkUser = async () => {
  if (!userId.value) return
  
  isCheckingUser.value = true
  try {
    const exists = await checkUserExists(userId.value)
    userExists.value = exists
    
    if (!exists) {
      console.warn(`用户 ${userId.value} 不存在`)
      // 可以在这里添加用户不存在的处理逻辑，比如跳转到404页面
    } else {
      console.log(`用户 ${userId.value} 存在`)
      // 用户存在，可以继续加载用户相关数据
      await loadUserData()
    }
  } catch (error) {
    console.error('检查用户时发生错误:', error)
    userExists.value = false
  } finally {
    isCheckingUser.value = false
  }
}

/**
 * 加载用户数据
 */
const loadUserData = async () => {
  if (!userId.value) return
  
  try {
    // 获取用户手环颜色
    const braceletColor = await getUserBraceletColor(userId.value)
    console.log(`用户手环颜色: ${braceletColor}`)
    
    // 可以在这里更新相关的用户数据
    // 比如更新背景颜色、主题等
    
  } catch (error) {
    console.error('加载用户数据时发生错误:', error)
  }
}

const selectTemplate = (template) => {
  selectedTemplateId.value = template.id;
  console.log(`用户选择了模版: ${template.name}`);
  // 这里可以添加保存到后端的逻辑
  // await saveSelectedTemplate(template.id);
};

const selectCurrentTemplate = () => {
  const selected = templates.value[currentIndex.value];
  alert(`您已选择模板: "${selected.name}"`);
};

const editTemplate = (template) => {
  // 确保只有当前激活的卡片能触发编辑
  if (template.id !== templates.value[currentIndex.value].id) return;
  
  console.log(`用户点击了编辑按钮，准备进入编辑页面: ${template.name}`);
  
  // 获取当前路由的ID参数
  const currentUserId = userId.value;
  if (!currentUserId) {
    console.error('无法获取用户ID');
    return;
  }
  
  // 根据模板ID跳转到不同的编辑页面，使用当前用户ID作为路由参数
  let editUrl = '';
  switch (template.id) {
    case 1:
      editUrl = `/edit/default/${currentUserId}`;
      break;
    case 2:
      editUrl = `/edit/academic/${currentUserId}`;
      break;
    case 3:
      editUrl = `/edit/adx/${currentUserId}`;
      break;
    case 4:
      editUrl = `/edit/interest/${currentUserId}`;
      break;
    default:
      editUrl = `/edit/template${template.id}/${currentUserId}`;
  }
  
  // 使用Nuxt的navigateTo进行页面跳转
  navigateTo(editUrl);
};

// 页面初始化时检查用户
onMounted(() => {
  // checkUser()
})

</script>

<style scoped>
/* 主页面容器，去除背景和边框，使其融入页面 */
.home-page {
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  box-sizing: border-box;
}

.header {
  text-align: right;
  padding: 1rem 2rem;
  flex-shrink: 0;
  z-index: 200;
}

.select-template-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.select-template-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.template-card {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 480px;
  max-width: calc(100vw - 40px);
  
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  border-radius: 30px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
}

.template-card.is-active-hover {
  transform: translateY(-15px) scale(1.05) !important;
  box-shadow: 0 20px 40px rgba(31, 38, 135, 0.3);
}

.template-card.is-active-hover .hover-overlay {
  opacity: 1;
  pointer-events: auto;
}

.card-content {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-content { 
  color: #333; 
}

.greeting { 
  font-size: 1.5em; 
  font-weight: 700; 
  margin: 0 0 0.5rem 0; 
  color: #1a202c; 
}

.description { 
  font-size: 1em; 
  margin: 0; 
  color: #4a5568; 
}

.description.detail { 
  font-size: 0.9em; 
  color: #718096; 
  margin-top: 4px; 
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.edit-btn {
  padding: 14px 32px;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.template-card.is-active-hover .edit-btn {
  transform: scale(1);
  opacity: 1;
  transition-delay: 0.1s;
}

.template-card.is-selected {
  background: rgba(102, 126, 234, 0.15);
  border: 2px solid #667eea;
  box-shadow: 0 8px 32px 0 rgba(102, 126, 234, 0.25);
}

.template-card.is-selected .greeting {
  color: #667eea;
}

.template-action-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  flex-shrink: 0;
}

.template-action-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
  justify-content: center;
}

.template-action-btn.select-template {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
}

.template-action-btn.select-template:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
}

.template-action-btn.current-template {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border: 2px solid #6366f1;
  cursor: default;
}

.template-action-btn.current-template svg {
  color: #6366f1;
}

.dots-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 1rem 0;
  flex-shrink: 0;
  gap: 1.5rem;
}

.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #dbeafe;
  cursor: pointer;
  transition: all 0.4s ease;
}

.dot.active {
  background-color: #667eea;
  transform: scale(1.4);
}

.nav-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #667eea;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-arrow:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

.nav-arrow svg {
  width: 16px;
  height: 16px;
}

/* 移动端响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    text-align: center;
  }
  
  .select-template-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
    width: auto;
    min-width: 120px;
  }
  
  .carousel-wrapper {
    height: 450px;
    padding: 0 15px;
  }
  
  .template-card {
    width: 280px;
    height: 400px;
    max-width: calc(100vw - 30px);
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .avatar-container {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
  }
  
  .greeting {
    font-size: 1.3em;
  }
  
  .description {
    font-size: 0.9em;
  }
  
  .description.detail {
    font-size: 0.8em;
  }
  
  .edit-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
  
  .dots-nav {
    padding: 1.5rem 0 1rem 0;
    gap: 1rem;
  }
  
  .template-action-area {
    padding: 1rem 15px;
  }
  
  .template-action-btn {
    padding: 10px 24px;
    font-size: 0.9rem;
    min-width: 160px;
  }
  
  .nav-arrow {
    width: 32px;
    height: 32px;
  }
  
  .nav-arrow svg {
    width: 14px;
    height: 14px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
  }
}

/* 小屏手机适配 */
@media (max-width: 480px) {
  .header {
    padding: 0.8rem;
  }
  
  .select-template-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
    border-radius: 20px;
  }
  
  .carousel-wrapper {
    height: 380px;
    padding: 0 10px;
  }
  
  .template-card {
    width: 250px;
    height: 350px;
    max-width: calc(100vw - 20px);
    border-radius: 20px;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .avatar-container {
    width: 70px;
    height: 70px;
    margin-bottom: 0.8rem;
  }
  
  .greeting {
    font-size: 1.2em;
    margin-bottom: 0.3rem;
  }
  
  .description {
    font-size: 0.85em;
    line-height: 1.3;
  }
  
  .description.detail {
    font-size: 0.75em;
    margin-top: 2px;
  }
  
  .edit-btn {
    padding: 10px 20px;
    font-size: 0.85rem;
    border-radius: 20px;
  }
  
  .dots-nav {
    padding: 1rem 0 0.8rem 0;
    gap: 0.8rem;
  }
  
  .template-action-area {
    padding: 0.8rem 10px;
  }
  
  .template-action-btn {
    padding: 9px 20px;
    font-size: 0.85rem;
    min-width: 140px;
    border-radius: 20px;
  }
  
  .nav-arrow {
    width: 28px;
    height: 28px;
  }
  
  .nav-arrow svg {
    width: 12px;
    height: 12px;
  }
  
  .dot {
    width: 7px;
    height: 7px;
  }
}

/* 超小屏幕适配 */
@media (max-width: 360px) {
  .carousel-wrapper {
    height: 320px;
    padding: 0 5px;
  }
  
  .template-card {
    width: 220px;
    height: 300px;
    max-width: calc(100vw - 10px);
  }
  
  .card-content {
    padding: 0.8rem;
  }
  
  .avatar-container {
    width: 60px;
    height: 60px;
    margin-bottom: 0.6rem;
  }
  
  .greeting {
    font-size: 1.1em;
  }
  
  .description {
    font-size: 0.8em;
  }
  
  .description.detail {
    font-size: 0.7em;
  }
  
  .edit-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
  
  .template-action-area {
    padding: 0.6rem 5px;
  }
  
  .template-action-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
    min-width: 120px;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .template-card .hover-overlay {
    opacity: 0.8;
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .template-card .edit-btn {
    transform: scale(1);
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
  }
  
  .select-template-btn:hover {
    transform: none; /* 移除悬停动画 */
  }
}

/* 横屏模式优化 */
@media (max-height: 600px) and (orientation: landscape) {
  .header {
    padding: 0.5rem 1rem;
  }
  
  .carousel-wrapper {
    height: calc(100vh - 120px);
    min-height: 250px;
  }
  
  .template-card {
    height: 280px;
  }
  
  .dots-nav {
    padding: 0.8rem 0;
    gap: 0.6rem;
  }
  
  .nav-arrow {
    width: 24px;
    height: 24px;
    border-width: 1px;
  }
  
  .nav-arrow svg {
    width: 10px;
    height: 10px;
  }
}
</style>