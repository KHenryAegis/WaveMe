<template>
  <div class="academic-intro">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- 个人信息头部 -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div class="flex flex-col md:flex-row items-center">
          <div class="mb-4 md:mb-0 md:mr-6">
            <div class="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mx-auto md:mx-0 flex items-center justify-center text-gray-500">
              <span class="text-4xl">👨‍🔬</span>
            </div>
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold">{{ profileData.name }}</h1>
            <p class="text-blue-100 mt-1">{{ profileData.position }}</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span 
                v-for="tag in profileData.tags" 
                :key="tag"
                class="bg-blue-400/30 px-3 py-1 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 个人信息内容 -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 个人介绍 -->
          <div class="md:col-span-2">
            <h2 class="text-xl font-bold text-gray-800 mb-3">个人简介</h2>
            <p class="text-gray-600 leading-relaxed">
              {{ profileData.introduction }}
            </p>
          </div>

          <!-- 联系方式 -->
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-3">联系方式</h2>
            <ul class="space-y-2">
              <li v-for="contact in profileData.contacts" :key="contact.type" class="flex items-center">
                <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path :d="contact.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <span>{{ contact.value }}</span>
              </li>
            </ul>
          </div>

          <!-- 学术见解 -->
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-3">学术见解</h2>
            <div class="bg-blue-50 rounded-xl p-4">
              <p class="text-gray-700 italic">
                "{{ profileData.academicInsight }}"
              </p>
            </div>
          </div>
        </div>

        <!-- 研究亮点 -->
        <div class="mt-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">研究亮点</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div
              v-for="(highlight, i) in profileData.highlights"
              :key="i"
              class="bg-white rounded-xl shadow-md p-5 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div class="text-3xl mb-3">{{ highlight.icon }}</div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ highlight.title }}</h3>
              <p class="text-sm text-gray-600">{{ highlight.content }}</p>
            </div>
          </div>
        </div>

        <!-- 行动按钮 -->
        <div class="mt-8 flex justify-center gap-4">
          <button 
            v-for="action in profileData.actions" 
            :key="action.label"
            :class="action.class"
            @click="handleAction(action.type)"
          >
            <span class="mr-2">{{ action.icon }}</span>
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profileData = ref({
  name: '张伟博士',
  position: '材料科学与工程 · 麻省理工学院',
  tags: ['纳米材料', '能源存储', '计算材料学'],
  introduction: '张伟博士是麻省理工学院材料科学与工程系的博士后研究员，专注于新型能源存储材料的设计与开发。他的研究结合了计算材料学与实验方法，致力于开发高性能锂离子电池和固态电池材料。在博士期间，他开发了一种新型纳米结构电极材料，显著提高了电池的能量密度和循环寿命。',
  contacts: [
    {
      type: 'email',
      value: 'zhang.wei@mit.edu',
      iconPath: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      type: 'phone',
      value: '+1 (617) 555-0123',
      iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    },
    {
      type: 'location',
      value: '麻省理工学院材料科学实验室',
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      type: 'linkedin',
      value: 'linkedin.com/in/zhangwei',
      iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
    }
  ],
  academicInsight: '下一代能源存储技术的突破将依赖于材料界面的精确控制和多尺度模拟的结合。我们正处在材料科学革命的边缘，计算指导的实验方法将大大加速新材料的发现过程。',
  highlights: [
    { icon: '🔬', title: '新型纳米结构电极', content: '开发了具有分级孔隙结构的硅碳复合材料，显著提高锂离子电池容量和循环稳定性' },
    { icon: '⚡', title: '固态电解质界面', content: '通过原子层沉积技术构建稳定的固态电解质界面层，解决锂金属负极的枝晶问题' },
    { icon: '🤖', title: '机器学习材料筛选', content: '开发了基于机器学习的材料筛选框架，加速新型电池材料的发现过程' }
  ],
  actions: [
    {
      type: 'download',
      label: '下载完整简历',
      icon: '📄',
      class: 'px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-lg flex items-center transition-transform transform hover:scale-105 active:scale-95'
    },
    {
      type: 'contact',
      label: '联系我',
      icon: '📧',
      class: 'px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-transform transform hover:scale-105 active:scale-95 flex items-center shadow-md hover:shadow-lg'
    }
  ]
})

const handleAction = (type) => {
  if (type === 'download') {
    console.log('下载简历')
    // 这里可以添加下载逻辑
  } else if (type === 'contact') {
    console.log('联系我')
    // 这里可以添加联系逻辑
  }
}
</script>

<style scoped>
.academic-intro {
  width: 100%;
}
</style>
