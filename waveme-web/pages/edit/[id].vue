<template>
  <div id="app-container">
    <canvas ref="fireworksCanvas" class="fireworks-canvas"></canvas>

    <main class="home-page">
      <div class="page-header">
        <h1 class="title">{{ isEditing ? '编辑资料' : '个人资料' }}</h1>
        
        <!-- 编辑控制按钮 -->
        <div class="edit-controls" v-if="!isEditing">
          <button @click="startEdit" class="edit-btn">
            <span class="edit-icon">✏️</span>
            编辑资料
          </button>
        </div>
        
        <!-- 保存/取消按钮 -->
        <div class="save-controls" v-if="isEditing">
          <button @click="saveEdit" :disabled="isSaving" class="save-btn">
            <span v-if="isSaving" class="loading-spinner-small"></span>
            <span v-else>💾</span>
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
          <button @click="cancelEdit" :disabled="isSaving" class="cancel-btn">
            ❌ 取消
          </button>
        </div>
      </div>

      <!-- 保存消息提示 -->
      <div v-if="saveMessage" class="save-message" :class="{ 'success': !saveMessage.includes('失败'), 'error': saveMessage.includes('失败') }">
        {{ saveMessage }}
      </div>

      <!-- 显示模式 -->
      <div v-if="!isEditing" class="view-mode">
        <div class="profile-section">
          <div class="avatar-container">
            <a :href="originalProfile.social.github" target="_blank" class="speech-bubble github">Github</a>
            <a :href="originalProfile.social.wechat" class="speech-bubble wechat">Wechat</a>
            <a :href="originalProfile.social.linkedin" target="_blank" class="speech-bubble linkedin">领英</a>

            <svg class="avatar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#fff" stroke="#333" stroke-width="3"/>
              <path d="M30 50 Q30 20 50 25 Q70 20 70 50" fill="none" stroke="#333" stroke-width="3"/>
              <path d="M25 40 L35 15 L45 40 Z" fill="#fff" stroke="#333" stroke-width="3"/>
              <path d="M75 40 L65 15 L55 40 Z" fill="#fff" stroke="#333" stroke-width="3"/>
              <rect x="38" y="55" width="8" height="15" fill="#333"/>
              <rect x="54" y="55" width="8" height="15" fill="#333"/>
            </svg>
          </div>

          <div class="intro-text">
            <p class="greeting">Hi, I'm {{ originalProfile.name }} :)</p>
            <p class="description">{{ originalProfile.title }}</p>
            <p class="description">{{ originalProfile.subtitle }}</p>
          </div>
        </div>

        <div class="tags-section">
          <span v-for="tag in originalProfile.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- 编辑模式 -->
      <div v-if="isEditing" class="edit-mode">
        <div class="edit-section">
          <label class="edit-label">姓名</label>
          <input v-model="editingProfile.name" type="text" class="edit-input" placeholder="请输入姓名" />
        </div>

        <div class="edit-section">
          <label class="edit-label">职业</label>
          <input v-model="editingProfile.title" type="text" class="edit-input" placeholder="请输入职业" />
        </div>

        <div class="edit-section">
          <label class="edit-label">描述</label>
          <input v-model="editingProfile.subtitle" type="text" class="edit-input" placeholder="请输入个人描述" />
        </div>

        <div class="edit-section">
          <label class="edit-label">GitHub链接</label>
          <input v-model="editingProfile.social.github" type="url" class="edit-input" placeholder="https://github.com/username" />
        </div>

        <div class="edit-section">
          <label class="edit-label">微信</label>
          <input v-model="editingProfile.social.wechat" type="text" class="edit-input" placeholder="微信号或链接" />
        </div>

        <div class="edit-section">
          <label class="edit-label">LinkedIn链接</label>
          <input v-model="editingProfile.social.linkedin" type="url" class="edit-input" placeholder="https://linkedin.com/in/username" />
        </div>

        <div class="edit-section">
          <div class="tags-edit-header">
            <label class="edit-label">标签</label>
            <button @click="addTag" class="add-tag-btn" :disabled="editingProfile.tags.length >= 8">
              ➕ 添加
            </button>
          </div>
          <div class="tags-edit-container">
            <div v-for="(tag, index) in editingProfile.tags" :key="index" class="tag-edit-item">
              <input v-model="editingProfile.tags[index]" type="text" class="tag-input" />
              <button @click="removeTag(index)" class="remove-tag-btn" :disabled="editingProfile.tags.length <= 1">
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <footer class="footer">
        *....
      </footer> -->
    </main>

    <!-- Tabbar 切换区域 -->
    <div class="tabbar-section">
      <button class="nav-btn prev-btn" @click="prevTab" :disabled="currentTabIndex === 0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <div class="tabbar-container">
        <div class="tabbar">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['tab-item', { active: currentTabIndex === index }]"
            @click="switchToTab(index)"
          >
            <div class="tab-dot"></div>
          </div>
        </div>
      </div>

      <button class="nav-btn next-btn" @click="nextTab" :disabled="currentTabIndex === tabs.length - 1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Fireworks } from 'fireworks-js';

// 获取路由参数
const route = useRoute();
const router = useRouter();
const braceletId = computed(() => route.params.id);

// 获取画布元素的引用
const fireworksCanvas = ref(null);
let fireworks;

// 编辑状态
const isEditing = ref(false);
const isSaving = ref(false);
const saveMessage = ref('');

// 用户资料数据
const originalProfile = ref({
  name: 'Lambert',
  title: 'fullstack dev',
  subtitle: 'fandom of Muelle',
  tags: ['技术', '产品', '后端', '站长'],
  social: {
    github: 'https://github.com',
    wechat: '#',
    linkedin: 'https://www.linkedin.com'
  }
});

// 编辑中的数据（深拷贝原始数据）
const editingProfile = ref({});

// 初始化编辑数据
const initEditingData = () => {
  editingProfile.value = JSON.parse(JSON.stringify(originalProfile.value));
};

// 开始编辑
const startEdit = () => {
  initEditingData();
  isEditing.value = true;
  saveMessage.value = '';
};

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false;
  saveMessage.value = '';
  initEditingData();
};

// 保存编辑
const saveEdit = async () => {
  isSaving.value = true;
  saveMessage.value = '';
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟保存成功/失败
    if (Math.random() > 0.1) { // 90%成功率
      originalProfile.value = JSON.parse(JSON.stringify(editingProfile.value));
      isEditing.value = false;
      saveMessage.value = '保存成功！';
      
      // 3秒后清除消息
      setTimeout(() => {
        saveMessage.value = '';
      }, 3000);
    } else {
      throw new Error('网络错误，请稍后重试');
    }
  } catch (error) {
    saveMessage.value = `保存失败: ${error.message}`;
  } finally {
    isSaving.value = false;
  }
};

// 添加标签
const addTag = () => {
  if (editingProfile.value.tags.length < 8) {
    editingProfile.value.tags.push('新标签');
  }
};

// 删除标签
const removeTag = (index) => {
  if (editingProfile.value.tags.length > 1) {
    editingProfile.value.tags.splice(index, 1);
  }
};

// Tabbar 相关状态
const currentTabIndex = ref(0);
const tabs = ref([
  { name: '首页', icon: 'home', path: '/' },
  { name: '用户', icon: 'user', path: '/user' },
  { name: '工具', icon: 'tool', path: '/tool' },
  { name: '设置', icon: 'settings', path: '/settings' }
]);

// Tabbar 切换函数
const switchToTab = (index) => {
  currentTabIndex.value = index;
  console.log(`切换到标签页: ${tabs.value[index].name}`);
  
  // 如果正在编辑，询问是否保存
  if (isEditing.value) {
    if (confirm('您有未保存的更改，是否要保存？')) {
      saveEdit().then(() => {
        router.push(tabs.value[index].path);
      });
    } else {
      cancelEdit();
      router.push(tabs.value[index].path);
    }
  } else {
    router.push(tabs.value[index].path);
  }
};

const prevTab = () => {
  if (currentTabIndex.value > 0) {
    currentTabIndex.value--;
    switchToTab(currentTabIndex.value);
  }
};

const nextTab = () => {
  if (currentTabIndex.value < tabs.value.length - 1) {
    currentTabIndex.value++;
    switchToTab(currentTabIndex.value);
  }
};

onMounted(() => {
  // 初始化编辑数据
  initEditingData();
  
//   
});

onUnmounted(() => {
  // 组件卸载时停止烟花效果，防止内存泄漏
  
});
</script>

<style>
/* 引入手写字体 */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

:root {
  --font-handwriting-en: 'Indie Flower', cursive;
  --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
  --text-color: #333;
}

#app-container {
  font-family: var(--font-handwriting-en);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 隐藏滚动条 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  box-sizing: border-box;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%);
}

.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 置于底层 */
}

.home-page {
  position: relative;
  z-index: 1; /* 内容在烟花之上 */
  border: 3px solid #555;
  padding: 1.5rem;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.85); /* 半透明背景，让烟花透出来 */
  max-width: 90%;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  flex-shrink: 1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 编辑控制按钮 */
.edit-controls, .save-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit-btn, .save-btn, .cancel-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-family: var(--font-handwriting-zh);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #4a90e2;
  color: white;
}

.edit-btn:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.save-btn {
  background: #4caf50;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.save-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.cancel-btn:hover:not(:disabled) {
  background: #da190b;
  transform: translateY(-2px);
}

.cancel-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

/* 小型加载动画 */
.loading-spinner-small {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

/* 保存消息提示 */
.save-message {
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: var(--font-handwriting-zh);
  text-align: center;
  font-weight: bold;
}

.save-message.success {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.save-message.error {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid #f44336;
}

/* 编辑模式样式 */
.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-label {
  font-family: var(--font-handwriting-zh);
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}

.edit-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--font-handwriting-en);
  transition: border-color 0.3s ease;
}

.edit-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

/* 标签编辑 */
.tags-edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-tag-btn {
  padding: 0.3rem 0.8rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: var(--font-handwriting-zh);
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-tag-btn:hover:not(:disabled) {
  background: #357abd;
}

.add-tag-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.tags-edit-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag-edit-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tag-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: var(--font-handwriting-zh);
}

.tag-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.remove-tag-btn {
  padding: 0.3rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.remove-tag-btn:hover:not(:disabled) {
  background: #da190b;
}

.remove-tag-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.title {
  font-size: 2.5rem;
  font-weight: normal;
  margin-top: 0;
}

.profile-section {
  margin-top: 2rem;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.avatar {
  width: 100%;
  height: 100%;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.speech-bubble {
  position: absolute;
  background: #fff;
  border: 2px solid var(--text-color);
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.2s;
}
.speech-bubble:hover {
    transform: scale(1.1);
}

/* 泡泡的小尾巴 */
.speech-bubble::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: #fff transparent; /* 尾巴颜色 */
    display: block;
    width: 0;
    z-index: 1;
}
.speech-bubble::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: var(--text-color) transparent; /* 尾巴边框颜色 */
    display: block;
    width: 0;
    z-index: 0;
}

.github {
  top: -10px;
  left: -50px;
}
.github::after {
    bottom: -9px;
    left: 20px;
    border-width: 10px 10px 0;
}
.github::before {
    bottom: -12px;
    left: 18px;
    border-width: 12px 12px 0;
}


.wechat {
  top: -10px;
  right: -50px;
}
.wechat::after {
    bottom: -9px;
    right: 20px;
    border-width: 10px 10px 0;
}
.wechat::before {
    bottom: -12px;
    right: 18px;
    border-width: 12px 12px 0;
}

.linkedin {
  top: 50%;
  right: -55px;
  font-family: var(--font-handwriting-zh);
}
.linkedin::after {
    left: -9px;
    top: 50%;
    margin-top: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent #fff;
}
.linkedin::before {
    left: -12px;
    top: 50%;
    margin-top: -12px;
    border-width: 12px 12px 12px 0;
    border-color: transparent var(--text-color);
}

.intro-text {
  margin-top: 2.5rem;
}

.greeting {
  font-size: 1.8rem;
  margin: 0;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
  margin: 5px 0;
  color: #555;
}

.tags-section {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background-color: #fff;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  padding: 5px 15px;
  font-family: var(--font-handwriting-zh);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.tag:hover {
    background-color: var(--text-color);
    color: #fff;
}

.footer {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #888;
}

/* Tabbar 样式 */
.tabbar-section {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  flex-shrink: 0;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #4a90e2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4a90e2;
}

.nav-btn:hover:not(:disabled) {
  background: #4a90e2;
  color: white;
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

.tabbar-container {
  background: rgba(255, 255, 255, 0.95);
  border: 3px solid #4a90e2;
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(74, 144, 226, 0.2);
}

.tabbar {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
}

.tab-item:hover {
  background: rgba(74, 144, 226, 0.1);
  transform: scale(1.1);
}

.tab-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #90caf9, #64b5f6);
  border: 2px solid #42a5f5;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tab-dot::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ffffff, #e3f2fd);
  border-radius: 50%;
  opacity: 0.8;
}

.tab-item.active .tab-dot {
  background: linear-gradient(135deg, #4a90e2, #2196f3);
  border: 2px solid #1976d2;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(74, 144, 226, 0.6);
}

.tab-item.active .tab-dot::before {
  background: linear-gradient(135deg, #ffffff, #bbdefb);
  animation: sparkle 2s infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}
</style>