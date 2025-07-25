<template>
  <div id="app-container">
    <canvas ref="fireworksCanvas" class="fireworks-canvas"></canvas>

    <main class="home-page">
      <h1 class="title">Home Page</h1>

      <div class="profile-section">
        <div class="avatar-container">
          <a href="https://github.com" target="_blank" class="speech-bubble github">Github</a>
          <a href="#" class="speech-bubble wechat">Wechat</a>
          <a href="https://www.linkedin.com" target="_blank" class="speech-bubble linkedin">领英</a>

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
          <p class="greeting">Hi, I'm Lambert :)</p>
          <p class="description">fullstack dev</p>
          <p class="description">fandom of Muelle</p>
          <p class="bracelet-info">手环ID: {{ braceletId }}</p>
        </div>
      </div>

      <div class="tags-section">
        <span class="tag">技术</span>
        <span class="tag">产品</span>
        <span class="tag">后端</span>
        <span class="tag">站长</span>
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


// 先请求后端，得到展示模版，


const fetchTemplate = async (id) => {
  try {
    const response = await fetch(`/api/user/getTemplate?id=${id}`);
    const result = await response.json();
    return result.template;
  } catch (error) {
    //失败走默认的个人展示
    console.error('获取展示模版失败:', error);
    return null;
  }
};

// 获取路由参数
const route = useRoute();
const router = useRouter();
const braceletId = computed(() => route.params.id);

console.log(`Bracelet ID: ${braceletId.value}`);

// 获取画布元素的引用
const fireworksCanvas = ref(null);
let fireworks;

// Tabbar 相关状态
const currentTabIndex = ref(0);
const tabs = computed(() => [
  { name: '首页', icon: 'home', path: '/' },
  { name: '用户', icon: 'user', path: `/bracelet/${braceletId.value}/adx` },
  { name: '工具', icon: 'tool', path: `/bracelet/${braceletId.value}/tool` },
  { name: '设置', icon: 'settings', path: `/bracelet/${braceletId.value}/settings` }
]);

// Tabbar 切换函数
const switchToTab = (index) => {
  currentTabIndex.value = index;
  console.log(`切换到标签页: ${tabs.value[index].name}`);
  
  // 跳转到对应路由
  router.push(tabs.value[index].path);
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

onMounted(async () => {

  const res= await fetchTemplate(braceletId.value);
  if (res) {
    console.log('获取到自定义模版:', res);
    // 这里可以根据模版内容进行相应的处理
  } else {
    console.log('使用默认模版');
  }
  if (fireworksCanvas.value) {
    // 初始化烟花效果
    fireworks = new Fireworks(fireworksCanvas.value, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.02,
      friction: 0.97,
      gravity: 1.5,
      particles: 75,
      traceSpeed: 5,
      explosion: 6,
      intensity: 20,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 30,
        max: 60
      },
      rocketsPoint: {
        min: 50,
        max: 50
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: true,
        move: false,
        max: 1
      }
    });
    fireworks.start();
  }
});

onUnmounted(() => {
  // 组件卸载时停止烟花效果，防止内存泄漏
  if (fireworks) {
    fireworks.stop();
  }
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

/* 手环ID显示样式 */
.bracelet-info {
  font-size: 1rem !important;
  color: #4a90e2 !important;
  font-weight: bold;
  margin-top: 1rem;
  font-family: var(--font-handwriting-zh);
}
</style>