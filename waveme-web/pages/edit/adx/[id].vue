<template>
  <div id="app-container">
    <canvas ref="fireworksCanvas" class="fireworks-canvas"></canvas>

    <main class="adx-editor">
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
            <h1 class="title">ADX 模板编辑</h1>
            <p class="subtitle">编辑您的个性化内容</p>
          </div>
        </div>
        
        <div class="header-actions">
          <button @click="previewMode = !previewMode" :class="['preview-btn', { active: previewMode }]">
            <span class="btn-icon">{{ previewMode ? '✏️' : '👁️' }}</span>
            {{ previewMode ? '编辑模式' : '预览模式' }}
          </button>
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

      <div class="editor-content">
        <!-- 左侧编辑面板 -->
        <div v-if="!previewMode" class="edit-panel">
          <div class="section-tabs">
            <button 
              v-for="section in editSections" 
              :key="section.key"
              :class="['tab-btn', { active: activeSection === section.key }]"
              @click="activeSection = section.key"
            >
              <span class="tab-icon">{{ section.icon }}</span>
              {{ section.name }}
            </button>
          </div>

          <div class="edit-content">
            <!-- 首页编辑 -->
            <div v-if="activeSection === 'home'" class="edit-section">
              <h3 class="section-title">首页信息</h3>
              
              <div class="form-group">
                <label>页面标题</label>
                <input v-model="editData.home.title" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>问候语</label>
                <input v-model="editData.home.greeting" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>个人描述</label>
                <div class="description-list">
                  <div v-for="(desc, index) in editData.home.description" :key="index" class="description-item">
                    <input v-model="editData.home.description[index]" type="text" class="form-input" />
                    <button @click="removeDescription(index)" class="remove-btn" :disabled="editData.home.description.length <= 1">
                      ❌
                    </button>
                  </div>
                  <button @click="addDescription" class="add-btn">➕ 添加描述</button>
                </div>
              </div>

              <div class="form-group">
                <label>手环信息</label>
                <input v-model="editData.home.braceletInfo" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>社交链接</label>
                <div class="social-links">
                  <div v-for="(link, index) in editData.home.socialLinks" :key="index" class="social-item">
                    <input v-model="link.label" placeholder="标签" class="form-input small" />
                    <input v-model="link.url" placeholder="链接" class="form-input" />
                    <button @click="removeSocialLink(index)" class="remove-btn">❌</button>
                  </div>
                  <button @click="addSocialLink" class="add-btn">➕ 添加链接</button>
                </div>
              </div>

              <div class="form-group">
                <label>标签</label>
                <div class="tags-edit">
                  <div v-for="(tag, index) in editData.home.tags" :key="index" class="tag-item">
                    <input v-model="editData.home.tags[index]" type="text" class="form-input small" />
                    <button @click="removeTag(index)" class="remove-btn" :disabled="editData.home.tags.length <= 1">
                      ❌
                    </button>
                  </div>
                  <button @click="addTag" class="add-btn">➕ 添加标签</button>
                </div>
              </div>
            </div>

            <!-- 照片墙编辑 -->
            <div v-if="activeSection === 'photos'" class="edit-section">
              <h3 class="section-title">照片墙</h3>
              
              <div class="form-group">
                <label>标题</label>
                <input v-model="editData.photos.title" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>副标题</label>
                <input v-model="editData.photos.subtitle" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>照片列表</label>
                <div class="photos-list">
                  <div v-for="(photo, index) in editData.photos.photos" :key="index" class="photo-item">
                    <div class="photo-preview">
                      <img :src="photo.url" :alt="photo.title" class="preview-img" @error="handleImageError" />
                    </div>
                    <div class="photo-form">
                      <input v-model="photo.title" placeholder="照片标题" class="form-input small" />
                      <input v-model="photo.description" placeholder="照片描述" class="form-input small" />
                      <input v-model="photo.date" placeholder="日期" class="form-input small" />
                      <input v-model="photo.url" placeholder="图片链接" class="form-input" />
                      <button @click="removePhoto(index)" class="remove-btn">❌</button>
                    </div>
                  </div>
                  <button @click="addPhoto" class="add-btn full-width">➕ 添加照片</button>
                </div>
              </div>
            </div>

            <!-- 工具编辑 -->
            <div v-if="activeSection === 'tools'" class="edit-section">
              <h3 class="section-title">工具</h3>
              
              <div class="form-group">
                <label>标题</label>
                <input v-model="editData.tools.title" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>副标题</label>
                <input v-model="editData.tools.subtitle" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>工具列表</label>
                <div class="tools-list">
                  <div v-for="(tool, index) in editData.tools.tools" :key="index" class="tool-item">
                    <div class="tool-form">
                      <input v-model="tool.name" placeholder="工具名称" class="form-input small" />
                      <input v-model="tool.description" placeholder="工具描述" class="form-input" />
                      <input v-model="tool.icon" placeholder="图标类名" class="form-input small" />
                      <select v-model="tool.status" class="form-select small">
                        <option value="active">可用</option>
                        <option value="maintenance">维护中</option>
                        <option value="disabled">已禁用</option>
                      </select>
                      <input v-model.number="tool.usageCount" type="number" placeholder="使用次数" class="form-input small" />
                      <button @click="removeTool(index)" class="remove-btn">❌</button>
                    </div>
                  </div>
                  <button @click="addTool" class="add-btn full-width">➕ 添加工具</button>
                </div>
              </div>
            </div>

            <!-- 设置编辑 -->
            <div v-if="activeSection === 'settings'" class="edit-section">
              <h3 class="section-title">设置</h3>
              
              <div class="form-group">
                <label>标题</label>
                <input v-model="editData.settings.title" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>副标题</label>
                <input v-model="editData.settings.subtitle" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>设置分组</label>
                <div class="settings-groups">
                  <div v-for="(section, sectionIndex) in editData.settings.sections" :key="sectionIndex" class="settings-group">
                    <div class="group-header">
                      <input v-model="section.name" placeholder="分组名称" class="form-input small" />
                      <input v-model="section.icon" placeholder="图标类名" class="form-input small" />
                      <button @click="removeSettingsSection(sectionIndex)" class="remove-btn">❌</button>
                    </div>
                    
                    <div class="group-settings">
                      <div v-for="(setting, settingIndex) in section.settings" :key="settingIndex" class="setting-form">
                        <input v-model="setting.name" placeholder="设置名称" class="form-input small" />
                        <input v-model="setting.description" placeholder="设置描述" class="form-input" />
                        <select v-model="setting.type" class="form-select small">
                          <option value="switch">开关</option>
                          <option value="select">选择</option>
                          <option value="input">输入</option>
                        </select>
                        <button @click="removeSetting(sectionIndex, settingIndex)" class="remove-btn">❌</button>
                      </div>
                      <button @click="addSetting(sectionIndex)" class="add-btn">➕ 添加设置</button>
                    </div>
                  </div>
                  <button @click="addSettingsSection" class="add-btn full-width">➕ 添加分组</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧预览面板 -->
        <div class="preview-panel">
          <div class="preview-container">
            <div class="preview-header">
              <h3>{{ previewMode ? '完整预览' : '实时预览' }}</h3>
              <div class="preview-tabs">
                <button 
                  v-for="section in editSections" 
                  :key="section.key"
                  :class="['preview-tab', { active: previewSection === section.key }]"
                  @click="previewSection = section.key"
                >
                  {{ section.icon }}
                </button>
              </div>
            </div>
            
            <div class="preview-content">
              <!-- 使用实际的ADX组件进行预览 -->
              <component 
                :is="getPreviewComponent(previewSection)" 
                :home-data="editData.home"
                :photo-data="editData.photos"
                :tools-data="editData.tools"
                :settings-data="editData.settings"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import AdxHomePage from '~/components/adx/AdxHomePage.vue';
import AdxPhotoWall from '~/components/adx/AdxPhotoWall.vue';
import AdxTools from '~/components/adx/AdxTools.vue';
import AdxSettings from '~/components/adx/AdxSettings.vue';

// 获取路由参数
const route = useRoute();
const router = useRouter();
const braceletId = computed(() => route.params.id);

// 获取画布元素的引用
const fireworksCanvas = ref(null);

// 页面状态
const previewMode = ref(false);
const activeSection = ref('home');
const previewSection = ref('home');
const isSaving = ref(false);
const saveMessage = ref('');

// 编辑区域配置
const editSections = ref([
  { key: 'home', name: '首页', icon: '🏠' },
  { key: 'photos', name: '照片墙', icon: '📸' },
  { key: 'tools', name: '工具', icon: '🔧' },
  { key: 'settings', name: '设置', icon: '⚙️' }
]);

// 编辑数据
const editData = ref({
  home: {
    title: 'ADX Creative Space',
    greeting: 'Hey, I\'m Alex! 👨‍💻',
    description: [
      'Full-stack developer & Designer',
      'Passionate about creating amazing experiences'
    ],
    braceletInfo: '这是我的数字手环展示页面',
    socialLinks: [
      { name: 'github', label: 'GitHub', url: 'https://github.com' },
      { name: 'dribbble', label: 'Dribbble', url: 'https://dribbble.com' },
      { name: 'behance', label: 'Behance', url: 'https://behance.net' }
    ],
    tags: ['创意', '设计', '开发', '科技', '艺术']
  },
  photos: {
    title: 'Creative Gallery',
    subtitle: '我的创作与灵感瞬间',
    photos: [
      {
        title: '项目展示 1',
        description: '最新的创意项目展示',
        date: '2024-01',
        url: '/api/placeholder/400/300?text=Project+1'
      },
      {
        title: '设计作品',
        description: 'UI/UX 设计案例',
        date: '2024-02',
        url: '/api/placeholder/400/300?text=Design+Work'
      },
      {
        title: '技术分享',
        description: '开发技术研究',
        date: '2024-03',
        url: '/api/placeholder/400/300?text=Tech+Share'
      }
    ]
  },
  tools: {
    title: 'Developer Tools',
    subtitle: '我常用的开发工具和资源',
    tools: [
      {
        id: 1,
        name: 'Code Generator',
        description: '快速生成代码模板',
        icon: 'fas fa-code',
        status: 'active',
        usageCount: 156
      },
      {
        id: 2,
        name: 'Color Palette',
        description: '色彩搭配工具',
        icon: 'fas fa-palette',
        status: 'active',
        usageCount: 89
      },
      {
        id: 3,
        name: 'API Tester',
        description: 'API 接口测试工具',
        icon: 'fas fa-plug',
        status: 'maintenance',
        usageCount: 234
      }
    ]
  },
  settings: {
    title: 'Preferences',
    subtitle: '个性化设置选项',
    sections: [
      {
        id: 'appearance',
        name: '外观设置',
        icon: 'fas fa-paint-brush',
        settings: [
          {
            id: 'dark_mode',
            name: '深色模式',
            description: '启用深色主题',
            type: 'switch',
            value: false
          },
          {
            id: 'theme_color',
            name: '主题色彩',
            description: '选择您喜欢的主题颜色',
            type: 'select',
            value: 'orange',
            options: ['orange', 'blue', 'green', 'purple']
          }
        ]
      },
      {
        id: 'behavior',
        name: '行为设置',
        icon: 'fas fa-cogs',
        settings: [
          {
            id: 'auto_save',
            name: '自动保存',
            description: '自动保存编辑内容',
            type: 'switch',
            value: true
          }
        ]
      }
    ]
  }
});

// 预览组件映射
const getPreviewComponent = (section) => {
  const componentMap = {
    home: AdxHomePage,
    photos: AdxPhotoWall,
    tools: AdxTools,
    settings: AdxSettings
  };
  return componentMap[section] || AdxHomePage;
};

// 返回上一页
const goBack = () => {
  router.push(`/edit/${braceletId.value}`);
};

// 保存更改
const saveChanges = async () => {
  isSaving.value = true;
  saveMessage.value = '';
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟保存成功/失败
    if (Math.random() > 0.1) {
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

// 首页编辑方法
const addDescription = () => {
  editData.value.home.description.push('新描述');
};

const removeDescription = (index) => {
  if (editData.value.home.description.length > 1) {
    editData.value.home.description.splice(index, 1);
  }
};

const addSocialLink = () => {
  editData.value.home.socialLinks.push({
    name: 'new',
    label: '新链接',
    url: 'https://example.com'
  });
};

const removeSocialLink = (index) => {
  editData.value.home.socialLinks.splice(index, 1);
};

const addTag = () => {
  editData.value.home.tags.push('新标签');
};

const removeTag = (index) => {
  if (editData.value.home.tags.length > 1) {
    editData.value.home.tags.splice(index, 1);
  }
};

// 照片墙编辑方法
const addPhoto = () => {
  editData.value.photos.photos.push({
    title: '新照片',
    description: '照片描述',
    date: new Date().toISOString().substr(0, 7),
    url: '/api/placeholder/400/300?text=New+Photo'
  });
};

const removePhoto = (index) => {
  editData.value.photos.photos.splice(index, 1);
};

const handleImageError = (event) => {
  event.target.src = '/api/placeholder/400/300?text=Image+Error';
};

// 工具编辑方法
const addTool = () => {
  editData.value.tools.tools.push({
    id: Date.now(),
    name: '新工具',
    description: '工具描述',
    icon: 'fas fa-wrench',
    status: 'active',
    usageCount: 0
  });
};

const removeTool = (index) => {
  editData.value.tools.tools.splice(index, 1);
};

// 设置编辑方法
const addSettingsSection = () => {
  editData.value.settings.sections.push({
    id: `section_${Date.now()}`,
    name: '新分组',
    icon: 'fas fa-cog',
    settings: []
  });
};

const removeSettingsSection = (index) => {
  editData.value.settings.sections.splice(index, 1);
};

const addSetting = (sectionIndex) => {
  editData.value.settings.sections[sectionIndex].settings.push({
    id: `setting_${Date.now()}`,
    name: '新设置',
    description: '设置描述',
    type: 'switch',
    value: false
  });
};

const removeSetting = (sectionIndex, settingIndex) => {
  editData.value.settings.sections[sectionIndex].settings.splice(settingIndex, 1);
};

onMounted(() => {
  console.log('ADX编辑器已加载，手环ID:', braceletId.value);
});

onUnmounted(() => {
  // 清理工作
});
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Indie+Flower&display=swap');

:root {
  --font-handwriting-en: 'Indie Flower', cursive;
  --font-handwriting-zh: 'ZCOOL KuaiLe', sans-serif;
  --primary-color: #ff6b35;
  --secondary-color: #f7931e;
  --success-color: #4caf50;
  --error-color: #f44336;
  --text-color: #ffffff;
  --bg-dark: #1a1a1a;
  --bg-card: rgba(26, 26, 26, 0.9);
}

#app-container {
  font-family: var(--font-handwriting-en);
  color: var(--text-color);
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #1a1a1a 50%, #0f0f0f 75%, #000000 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.fireworks-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
}

.adx-editor {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 20px;
}

/* 编辑器头部 */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 15px;
  border: 2px solid rgba(255, 107, 53, 0.3);
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
  background: rgba(255, 107, 53, 0.2);
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
  color: white;
  transform: translateX(-5px);
}

.page-info .title {
  font-size: 2rem;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
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

.header-actions {
  display: flex;
  gap: 15px;
}

.preview-btn, .save-btn {
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
}

.preview-btn {
  background: rgba(247, 147, 30, 0.2);
  border: 2px solid var(--secondary-color);
  color: var(--secondary-color);
}

.preview-btn:hover, .preview-btn.active {
  background: var(--secondary-color);
  color: white;
}

.save-btn {
  background: var(--success-color);
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.save-btn:disabled {
  background: #666;
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
  background: rgba(76, 175, 80, 0.2);
  color: var(--success-color);
  border: 2px solid var(--success-color);
}

.save-message.error {
  background: rgba(244, 67, 54, 0.2);
  color: var(--error-color);
  border: 2px solid var(--error-color);
}

/* 编辑器内容 */
.editor-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-height: calc(100vh - 200px);
}

/* 编辑面板 */
.edit-panel {
  background: var(--bg-card);
  border-radius: 15px;
  border: 2px solid rgba(255, 107, 53, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.section-tabs {
  display: flex;
  background: rgba(255, 107, 53, 0.1);
  border-bottom: 2px solid rgba(255, 107, 53, 0.3);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-handwriting-zh);
}

.tab-btn:hover, .tab-btn.active {
  background: rgba(255, 107, 53, 0.3);
  color: var(--primary-color);
}

.edit-content {
  padding: 25px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

.edit-section .section-title {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-family: var(--font-handwriting-zh);
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-color);
  font-family: var(--font-handwriting-zh);
  font-weight: bold;
}

.form-input, .form-select {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--font-handwriting-en);
  transition: border-color 0.3s ease;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
}

.form-input.small {
  width: auto;
  min-width: 120px;
}

/* 特殊列表样式 */
.description-list, .social-links, .tags-edit, .photos-list, .tools-list, .settings-groups {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.description-item, .social-item, .tag-item, .photo-item, .tool-item, .settings-group {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 53, 0.2);
}

.photo-item {
  align-items: flex-start;
}

.photo-preview {
  width: 80px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-form, .tool-form, .setting-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
}

.add-btn, .remove-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-handwriting-zh);
}

.add-btn {
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid var(--success-color);
  color: var(--success-color);
}

.add-btn:hover {
  background: var(--success-color);
  color: white;
}

.add-btn.full-width {
  width: 100%;
  padding: 12px;
}

.remove-btn {
  background: rgba(244, 67, 54, 0.2);
  border: 2px solid var(--error-color);
  color: var(--error-color);
}

.remove-btn:hover:not(:disabled) {
  background: var(--error-color);
  color: white;
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 预览面板 */
.preview-panel {
  background: var(--bg-card);
  border-radius: 15px;
  border: 2px solid rgba(255, 107, 53, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 107, 53, 0.1);
  border-bottom: 2px solid rgba(255, 107, 53, 0.3);
}

.preview-header h3 {
  margin: 0;
  color: var(--primary-color);
  font-family: var(--font-handwriting-zh);
}

.preview-tabs {
  display: flex;
  gap: 10px;
}

.preview-tab {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 107, 53, 0.2);
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.preview-tab:hover, .preview-tab.active {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.preview-content {
  padding: 20px;
  max-height: calc(100vh - 350px);
  overflow-y: auto;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
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
@media (max-width: 1200px) {
  .editor-content {
    grid-template-columns: 1fr;
  }
  
  .edit-panel {
    order: 2;
  }
  
  .preview-panel {
    order: 1;
  }
}

@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .header-left {
    flex-direction: column;
    gap: 10px;
  }
  
  .section-tabs {
    flex-wrap: wrap;
  }
  
  .tab-btn {
    flex: none;
    min-width: 120px;
  }
  
  .adx-editor {
    padding: 10px;
  }
}
</style>
