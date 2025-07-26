<template>
  <div class="designer-container">
    <!-- 顶部固定头部 -->
    <header class="designer-header">
      <div class="header-content">
        <h1 class="title">学术档案设计器</h1>
        <p class="subtitle">实时编辑您的个人学术主页</p>
      </div>
      <button class="save-button" @click="saveChanges">
        <span class="icon">💾</span> 保存全部更改
      </button>
    </header>

    <!-- 主编辑区 -->
    <main class="main-content">
      <!-- 导航标签 -->
      <nav class="panel-nav">
        <button
          v-for="panel in panels"
          :key="panel.id"
          @click="currentPanel = panel.id"
          :class="{ 'active': currentPanel === panel.id }"
        >
          {{ panel.icon }} {{ panel.title }}
        </button>
      </nav>

      <!-- 编辑面板内容 -->
      <div class="panel-content">
        <!-- 面板1: 学术简介 -->
        <section v-show="currentPanel === 'intro'">
          <div class="form-section">
            <h2 class="section-title">👤 个人信息</h2>
            <div class="grid-form">
              <div class="form-group">
                <label>姓名</label>
                <input type="text" v-model="profile.intro.name" />
              </div>
              <div class="form-group">
                <label>职位/头衔</label>
                <input type="text" v-model="profile.intro.position" />
              </div>
            </div>
            <div class="form-group">
              <label>个人简介 (支持换行)</label>
              <textarea rows="5" v-model="profile.intro.introduction"></textarea>
            </div>
            <div class="form-group">
              <label>学术见解</label>
              <textarea rows="3" v-model="profile.intro.academicInsight"></textarea>
            </div>
            <DynamicListEditor title="标签" :items="profile.intro.tags" @update:items="profile.intro.tags = $event" :is-simple-list="true" />
          </div>
          <DynamicListEditor title="📞 联系方式" :items="profile.intro.contacts" @update:items="profile.intro.contacts = $event" item-singular="联系方式" :item-schema="{ type: 'email', value: '', iconPath: '' }" />
          <DynamicListEditor title="✨ 研究亮点" :items="profile.intro.highlights" @update:items="profile.intro.highlights = $event" item-singular="亮点" :item-schema="{ icon: '🔬', title: '', content: '' }" />
        </section>

        <!-- 面板2: 学术简历 -->
        <section v-show="currentPanel === 'resume'">
           <DynamicListEditor title="🎓 教育背景" :items="profile.resume.education" @update:items="profile.resume.education = $event" item-singular="教育经历" :item-schema="{ degree: '', institution: '', major: '', period: '', description: '' }" />
           <DynamicListEditor title="💼 工作经历" :items="profile.resume.experience" @update:items="profile.resume.experience = $event" item-singular="工作经历" :item-schema="{ position: '', institution: '', period: '', responsibilities: [''] }" />
           <DynamicListEditor title="🏆 荣誉奖项" :items="profile.resume.awards" @update:items="profile.resume.awards = $event" item-singular="奖项" :item-schema="{ name: '', organization: '', year: '', description: '' }" />
           <DynamicListEditor title="🛠️ 技能专长" :items="profile.resume.skills" @update:items="profile.resume.skills = $event" item-singular="技能类别" :item-schema="{ category: '', items: [{ name: '', level: 3 }] }" />
        </section>
        
        <!-- 面板3: 研究成果 -->
        <section v-show="currentPanel === 'publications'">
           <DynamicListEditor title="📈 统计概览" :items="profile.publications.stats" @update:items="profile.publications.stats = $event" item-singular="统计项" :item-schema="{ icon: '📄', value: '', label: '' }" />
           <DynamicListEditor title="📄 期刊论文" :items="profile.publications.journalPapers" @update:items="profile.publications.journalPapers = $event" item-singular="期刊论文" :item-schema="{ title: '', authors: '', journal: '', year: '', impactFactor: '', citations: '', keywords: [''], abstract: '' }" />
           <DynamicListEditor title="🎤 会议论文" :items="profile.publications.conferencePapers" @update:items="profile.publications.conferencePapers = $event" item-singular="会议论文" :item-schema="{ title: '', authors: '', conference: '', location: '', year: '', type: 'oral', keywords: [''], abstract: '' }" />
           <DynamicListEditor title="⚖️ 专利" :items="profile.publications.patents" @update:items="profile.publications.patents = $event" item-singular="专利" :item-schema="{ title: '', inventors: '', patentNumber: '', status: 'pending', year: '', abstract: '' }" />
           <DynamicListEditor title="🔬 研究项目" :items="profile.publications.projects" @update:items="profile.publications.projects = $event" item-singular="项目" :item-schema="{ title: '', role: '', funding: '', period: '', budget: '', description: '', outcomes: [''] }" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DynamicListEditor from './components/DynamicListEditor.vue'; // 引入可复用列表编辑器

// 导航面板数据
const panels = [
  { id: 'intro', title: '学术简介', icon: '📚' },
  { id: 'resume', title: '学术简历', icon: '📄' },
  { id: 'publications', title: '研究成果', icon: '🔬' }
];
const currentPanel = ref('intro');

// 将所有数据整合到一个响应式对象中
const profile = ref({
  intro: {
    name: '张伟博士',
    position: '材料科学与工程 · 麻省理工学院',
    tags: ['纳米材料', '能源存储', '计算材料学'],
    introduction: '张伟博士是麻省理工学院材料科学与工程系的博士后研究员...',
    academicInsight: '下一代能源存储技术的突破将依赖于材料界面的精确控制...',
    contacts: [
      { type: 'email', value: 'zhang.wei@mit.edu', iconPath: 'M3 8l...' },
      { type: 'phone', value: '+1 (617) 555-0123', iconPath: 'M3 5a2...' },
    ],
    highlights: [
      { icon: '🔬', title: '新型纳米结构电极', content: '开发了具有分级孔隙结构的硅碳复合材料...' },
      { icon: '⚡', title: '固态电解质界面', content: '通过原子层沉积技术构建稳定的固态电解质界面层...' },
    ],
  },
  resume: {
    education: [
      { degree: '博士学位 (Ph.D.)', institution: '斯坦福大学', major: '材料科学与工程', period: '2018-2022', description: '专注于纳米材料在能源存储中的应用...' },
    ],
    experience: [
      { position: '博士后研究员', institution: '麻省理工学院', period: '2022-至今', responsibilities: ['领导新型固态电池材料的研发项目', '指导3名博士生...'] },
    ],
    awards: [
        { name: 'Best Paper Award', organization: 'International Battery Conference 2023', year: '2023', description: '最佳论文奖...' }
    ],
    skills: [
        { name: '材料合成', level: 5 }, { name: '电化学测试', level: 5 } ,
        { name: 'Python编程', level: 4 }, { name: 'MATLAB', level: 4 }
    ]
  },
  publications: {
    stats: [
      { icon: '📄', value: '25', label: '期刊论文' },
      { icon: '🎤', value: '12', label: '会议论文' },
    ],
    journalPapers: [
      { title: 'High-Performance Silicon Nanowire Anodes...', authors: 'Wei Zhang, et al.', journal: 'Nature Materials', year: '2023', impactFactor: '39.2', citations: '156', keywords: ['硅纳米线', '锂离子电池'], abstract: '本研究开发了一种具有分级多孔结构的硅纳米线负极材料...' },
    ],
    conferencePapers: [
        { title: 'Computational Design of Next-Generation Battery Materials', authors: 'Wei Zhang, Jennifer Smith', conference: 'International Conference on Materials Science', location: 'Boston, USA', year: '2023', type: 'oral', keywords: ['计算材料学'], abstract: '介绍了基于第一性原理计算和机器学习的电池材料设计方法...' }
    ],
    patents: [
        { title: '具有分级多孔结构的硅基复合负极材料及其制备方法', inventors: '张伟, 史密斯詹妮弗', patentNumber: 'US11,234,567', status: 'granted', year: '2023', abstract: '本发明提供了一种具有分级多孔结构的硅基复合负极材料...' }
    ],
    projects: [
        { title: '下一代锂金属电池关键材料研发', role: '项目负责人', funding: 'NSF资助', period: '2022-2025', budget: '$850K', description: '开发高性能锂金属负极保护层...', outcomes: ['2篇Nature子刊', '3项专利申请'] }
    ]
  }
});

const saveChanges = () => {
  console.log('正在保存的数据:', JSON.parse(JSON.stringify(profile.value)));
  alert('数据已保存到控制台！');
};

</script>

<style scoped>
.designer-container {
  min-height: 100vh;
  background-color: #f8fafc; /* 淡雅的灰色背景 */
  padding: 1.5rem;
}

.designer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
}
.subtitle {
  color: #64748b;
  margin-top: 0.25rem;
}

.save-button {
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.panel-nav {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background-color: #e2e8f0;
  border-radius: 99px;
  padding: 0.5rem;
  display: inline-flex;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.panel-nav button {
  padding: 0.5rem 1.25rem;
  border: none;
  background-color: transparent;
  border-radius: 99px;
  cursor: pointer;
  font-weight: 500;
  color: #475569;
  transition: all 0.3s ease;
}
.panel-nav button.active {
  background-color: white;
  color: #3b82f6;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.panel-content {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}
.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 1.5rem;
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.5rem;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: white;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.form-group textarea { resize: vertical; }

/* 响应式设计 */
@media (max-width: 768px) {
  .designer-container {
    padding: 1rem;
  }
  .designer-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }
  .title {
    font-size: 1.5rem;
  }
  .panel-nav {
    flex-wrap: wrap;
    border-radius: 12px;
    justify-content: center;
  }
  .panel-nav button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  .panel-content {
    padding: 1.5rem;
  }
  .grid-form {
    grid-template-columns: 1fr;
  }
}
</style>