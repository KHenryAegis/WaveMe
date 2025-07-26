<template>
  <div class="designer-container">
    <!-- 顶部操作栏 -->
    <header class="designer-header">
      <h1 class="title">默认模板设计器</h1>
      <button class="save-button" @click="saveChanges">
        ✨ 保存设计
      </button>
    </header>

    <!-- 编辑表单网格布局 -->
    <main class="editor-grid">
      <!-- 左侧：基本信息和头像 -->
      <div class="grid-left">
        <!-- 基本信息卡片 -->
        <div class="editor-card">
          <h2 class="card-title">基本信息</h2>
          <div class="form-group">
            <label>页面大标题</label>
            <input type="text" v-model="designData.title" placeholder="例如：Home Page" />
          </div>
          <div class="form-group">
            <label>问候语</label>
            <input type="text" v-model="designData.greeting" placeholder="例如：Hi, I'm Wave! :)" />
          </div>
        </div>

        <!-- 头像与社交链接卡片 -->
        <div class="editor-card">
          <h2 class="card-title">头像与社交链接</h2>
          <div class="avatar-editor">
            <div class="avatar-preview-wrapper">
              <!-- 在这里显示SVG或图片预览 -->
              <img :src="designData.avatarUrl" alt="Avatar Preview" v-if="designData.avatarUrl" class="avatar-preview-img" />
              <svg v-else class="avatar-preview-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#e0e7ff" stroke="#a5b4fc" stroke-width="2"/>
                <path d="M30 50 Q30 20 50 25 Q70 20 70 50" fill="none" stroke="#6366f1" stroke-width="2"/>
              </svg>
            </div>
            <button class="change-avatar-button">更换头像</button>
          </div>
          
          <div class="form-group">
            <label>社交链接</label>
            <div v-for="(social, index) in designData.socials" :key="index" class="list-item">
              <input type="text" v-model="social.name" placeholder="名称 (如 Github)" />
              <input type="url" v-model="social.url" placeholder="链接 (https://...)" />
              <button @click="removeSocial(index)" class="delete-button">-</button>
            </div>
            <button @click="addSocial" class="add-button">＋ 添加链接</button>
          </div>
        </div>
      </div>

      <!-- 右侧：描述和标签 -->
      <div class="grid-right">
        <!-- 描述内容卡片 -->
        <div class="editor-card">
          <h2 class="card-title">描述内容</h2>
          <div class="form-group">
            <label>个人描述 (每行一个输入框)</label>
            <div v-for="(line, index) in designData.description" :key="index" class="list-item">
              <input type="text" v-model="designData.description[index]" :placeholder="`描述 #${index + 1}`" />
              <button @click="removeDescriptionLine(index)" class="delete-button">-</button>
            </div>
            <button @click="addDescriptionLine" class="add-button">＋ 添加一行描述</button>
          </div>
        </div>

        <!-- 技能标签卡片 -->
        <div class="editor-card">
          <h2 class="card-title">技能标签</h2>
          <div class="form-group">
            <label>添加新标签</label>
            <div class="pills-input-wrapper">
              <input type="text" v-model="newTag" @keyup.enter="addTag" placeholder="输入后按回车或点击添加" />
              <button @click="addTag">添加</button>
            </div>
          </div>
          <div class="pills-preview-wrapper">
            <transition-group name="pill-fade">
              <div v-for="(tag, index) in designData.tags" :key="tag" class="pill">
                <span>{{ tag }}</span>
                <button @click="removeTag(index)" class="pill-delete-button">×</button>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newTag = ref('');
const designData = ref({
  title: 'Home Page',
  greeting: "Hi, I'm Wave! :)",
  description: ['随身艺术', '自在终端'],
  tags: ['双NFC手饰', '个性化模版定制', '你的艺术终端'],
  avatarUrl: '', // 用于存储上传后的头像URL，或保留为空以显示默认SVG
  socials: [
    { name: 'Github', url: 'https://github.com' },
    { name: 'Wechat', url: '#' },
    { name: '领英', url: 'https://linkedin.com' },
  ]
});

// --- 方法 ---
const addSocial = () => designData.value.socials.push({ name: '', url: '' });
const removeSocial = (index) => designData.value.socials.splice(index, 1);

const addDescriptionLine = () => designData.value.description.push('');
const removeDescriptionLine = (index) => designData.value.description.splice(index, 1);

const addTag = () => {
  if (newTag.value && !designData.value.tags.includes(newTag.value)) {
    designData.value.tags.push(newTag.value.trim());
    newTag.value = ''; // 清空输入框
  }
};
const removeTag = (index) => designData.value.tags.splice(index, 1);

const saveChanges = () => {
  console.log('正在保存的数据:', JSON.parse(JSON.stringify(designData.value)));
  alert('设计已保存到控制台！');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Noto+Sans+SC:wght@400;500;700&display=swap');

.designer-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
}

.designer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
}
.title {
  font-family: 'Indie Flower', cursive;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}
.save-button {
  font-family: 'Indie Flower', cursive;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border-radius: 99px;
  border: none;
  background: #667eea;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.2s ease;
}
.save-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); }
.save-button:active { transform: translateY(0); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }

.editor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.grid-left, .grid-right { display: flex; flex-direction: column; gap: 2rem; }

.editor-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-family: 'Indie Flower', cursive;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px dashed #d1c4e9;
  color: #5e35b1;
}

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: 500; color: #444; margin-bottom: 0.5rem; }
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid #d1c4e9;
  background-color: #f3e5f5;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.form-group input:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.avatar-editor { text-align: center; margin-bottom: 1rem; }
.avatar-preview-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
  background-color: #f3e5f5;
  border: 2px dashed #b39ddb;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.avatar-preview-img, .avatar-preview-svg { width: 100%; height: 100%; object-fit: cover; }
.change-avatar-button { /* style similarly to add-button */ }

.list-item { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
.list-item input { flex-grow: 1; }
.delete-button, .add-button {
  flex-shrink: 0;
  padding: 0.5rem 0.8rem;
  border: 1px solid #b39ddb;
  background-color: #ede7f6;
  color: #5e35b1;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.delete-button { background-color: #ffcdd2; color: #c62828; border-color: #ef9a9a; }
.delete-button:hover { background-color: #ef9a9a; }
.add-button:hover { background-color: #d1c4e9; }

/* Pill / Tag Input Styles */
.pills-input-wrapper { display: flex; gap: 0.5rem; }
.pills-input-wrapper input { flex-grow: 1; }
.pills-input-wrapper button { /* style like add-button */ }
.pills-preview-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
.pill {
  display: flex; align-items: center; gap: 0.5rem;
  background-color: #667eea; color: white;
  padding: 0.5rem 1rem; border-radius: 20px;
  font-size: 0.875rem; font-weight: 500;
}
.pill-delete-button {
  width: 18px; height: 18px; border-radius: 50%; border: none;
  background-color: rgba(255, 255, 255, 0.3); color: white;
  cursor: pointer; transition: background-color 0.2s;
}
.pill-delete-button:hover { background-color: rgba(255, 255, 255, 0.5); }

/* 动画 */
.pill-fade-enter-active, .pill-fade-leave-active { transition: all 0.3s ease; }
.pill-fade-enter-from, .pill-fade-leave-to { opacity: 0; transform: scale(0.5); }

/* 响应式设计 */
@media (max-width: 768px) {
  .designer-container { padding: 1rem; }
  .designer-header { flex-direction: column; gap: 1rem; text-align: center; }
  .title { font-size: 2rem; }
  .editor-grid { grid-template-columns: 1fr; }
}
</style>