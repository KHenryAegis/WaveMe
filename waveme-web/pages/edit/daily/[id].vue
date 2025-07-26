<template>
  <div class="designer-container">
    <!-- 顶部操作栏 -->
    <header class="designer-header">
      <div class="header-content">
        <h1 class="title">兴趣页面设计器</h1>
        <p class="subtitle">在这里编辑你的手绘兴趣展示页内容</p>
      </div>
      <button class="save-button" @click="saveChanges">
        <span class="icon">💾</span> 保存更改
      </button>
    </header>

    <!-- 兴趣卡片网格 -->
    <main class="cards-grid">
      <!-- 循环渲染每个兴趣的编辑卡片 -->
      <div v-for="(hobby, index) in hobbies" :key="hobby.id" class="hobby-card">
        <button class="delete-button" @click="deleteHobby(hobby.id)">×</button>
        
        <div class="card-content">
          <!-- 左侧：图标区域 -->
          <div class="icon-area">
            <div class="icon-preview-wrapper">
              <img :src="hobby.icon" :alt="hobby.title" class="icon-preview" />
            </div>
            <button class="change-icon-button" @click="triggerIconUpload(hobby)">更换图标</button>
          </div>

          <!-- 右侧：信息编辑区域 -->
          <div class="details-area">
            <div class="form-group">
              <label :for="'title-' + hobby.id">标题</label>
              <input
                :id="'title-' + hobby.id"
                type="text"
                v-model="hobby.title"
                placeholder="例如：宠物"
              />
            </div>
            <div class="form-group">
              <label :for="'desc-' + hobby.id">描述</label>
              <textarea
                :id="'desc-' + hobby.id"
                v-model="hobby.description"
                rows="4"
                placeholder="描述一下你的兴趣..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加新兴趣的按钮 -->
      <div class="add-new-card" @click="addHobby">
        <div class="plus-icon">+</div>
        <p>添加新兴趣</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 初始兴趣数据 (这应该与展示页面的数据源相同)
const initialHobbies = [
  { id: 'pet', title: '宠物', icon: '/icons/logo-02.png', description: '这是我的猫，一只特立独行的思考者。\n每天的大部分时间都在睡觉、吃饭和思考喵生。' },
  { id: 'work', title: '工作与学习', icon: '/icons/logo-03.png', description: '作为一名开发者，笔记本电脑是我连接数字世界的窗口。\n最近专注于研究前端性能优化和交互设计。' },
  // ... 其他兴趣数据
];
const hobbies = ref(JSON.parse(JSON.stringify(initialHobbies)));

const addHobby = () => {
  const newHobby = {
    id: `new-${Date.now()}`,
    title: '',
    icon: '/icons/logo-13.png',
    description: '',
  };
  hobbies.value.push(newHobby);
};

const deleteHobby = (idToDelete) => {
  hobbies.value = hobbies.value.filter(hobby => hobby.id !== idToDelete);
};

const triggerIconUpload = (hobby) => {
  alert(`正在为 "${hobby.title}" 更换图标...\n(这只是一个演示功能)`);
};

const saveChanges = () => {
  console.log('正在保存的数据:', hobbies.value);
  alert('更改已保存到控制台！请按F12查看。');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&family=Noto+Sans+SC:wght@400;500&display=swap');

.designer-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f4f1ea;
  background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  padding: 2rem 3rem;
}

.designer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px dashed #dcd1c1;
}

.title {
  font-family: 'Zhi Mang Xing', cursive;
  font-size: 3rem;
  color: #3d3d3d;
  font-weight: normal;
  line-height: 1;
}
.subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  color: #7a7a7a;
  margin-top: 0.5rem;
}

.save-button {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: 2px solid #5d5d5d;
  background-color: #f6e05e;
  color: #3d3d3d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #c0b49c;
}
.save-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #c0b49c;
}
.save-button:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.cards-grid {
  display: grid;
  /* 核心：在桌面端使用自适应多列布局 */
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.hobby-card, .add-new-card {
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 12px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  position: relative;
}
.hobby-card:hover {
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: flex;
  padding: 1.5rem;
  gap: 1.5rem;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  color: #999;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}
.delete-button:hover {
  background-color: #e53e3e;
  border-color: #c53030;
  color: #fff;
  transform: rotate(90deg) scale(1.1);
}

.icon-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.icon-preview-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #ccc;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.change-icon-button {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f7fafc;
  cursor: pointer;
}
.change-icon-button:hover {
  background-color: #edf2f7;
}

.details-area {
  flex: 1;
  font-family: 'Noto Sans SC', sans-serif;
}

.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f7fafc;
  transition: all 0.2s ease;
  box-sizing: border-box; /* 确保 padding 不会撑大宽度 */
}
.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #f6e05e;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(246, 224, 94, 0.4);
}
.form-group textarea {
  resize: vertical;
  line-height: 1.6;
}

.add-new-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 240px;
  border-style: dashed;
  color: #aaa;
  cursor: pointer;
  transition: all 0.3s ease;
}
.add-new-card:hover {
  background-color: #fcfcfc;
  border-color: #f6e05e;
  color: #3d3d3d;
}
.plus-icon {
  font-size: 4rem;
  font-weight: 100;
  line-height: 1;
  margin-bottom: 1rem;
}

/* --- 移动端响应式设计 --- */
@media (max-width: 768px) {
  .designer-container {
    padding: 1.5rem 1rem; /* 减少移动端边距 */
  }

  .designer-header {
    flex-direction: column; /* 垂直堆叠头部 */
    align-items: center;
    gap: 1.5rem;
    text-align: center;
  }
  
  .title {
    font-size: 2.5rem; /* 调整标题大小 */
  }

  .save-button {
    width: 100%;
    max-width: 300px;
    padding: 1rem; /* 增大点击区域 */
    justify-content: center;
  }

  .cards-grid {
    grid-template-columns: 1fr; /* 核心：在移动端变为单列布局 */
    gap: 1.5rem;
  }

  .card-content {
    flex-direction: column; /* 核心：卡片内容垂直堆叠 */
    align-items: center;
    text-align: center;
  }
  
  .details-area {
    width: 100%; /* 确保编辑区占满宽度 */
  }

  .form-group label {
    text-align: left; /* 标签保持左对齐，更易读 */
  }
}
</style>