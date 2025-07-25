<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-4 sm:p-8 font-['Exo_2']">
    <!-- 顶部导航 -->
    <nav class="flex justify-center mb-8 z-10">
      <div class="flex bg-white rounded-full shadow-md p-1">
        <button
          v-for="panel in panels"
          :key="panel.id"
          @click="switchPanel(panel.id)"
          :class="[
            'flex items-center px-4 py-2 rounded-full transition-all duration-300',
            currentPanel === panel.id
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-inner'
              : 'text-gray-600 hover:text-blue-600'
          ]"
        >
          <span :class="['mr-2 text-lg', currentPanel === panel.id ? 'text-white' : 'text-blue-500']">
            {{ panel.icon }}
          </span>
          <span class="font-medium">{{ panel.title }}</span>
        </button>
      </div>
    </nav>

    <!-- 内容区域 -->
    <div class="w-full max-w-6xl mx-auto">
      <transition name="panel-fade" mode="out-in">
        <!-- 学术简介面板 -->
        <AcademicIntro v-if="currentPanel === 'intro'" key="intro" />
        
        <!-- 学术简历面板 -->
        <AcademicResume v-else-if="currentPanel === 'resume'" key="resume" />

        <!-- 研究成果面板 -->
        <AcademicPublications v-else key="publications" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AcademicIntro from '~/components/academic/AcademicIntro.vue'
import AcademicResume from '~/components/academic/AcademicResume.vue'
import AcademicPublications from '~/components/academic/AcademicPublications.vue'

const panels = [
  { id: 'intro', title: '学术简介', icon: '📚' },
  { id: 'resume', title: '学术简历', icon: '📄' },
  { id: 'publications', title: '研究成果', icon: '🔬' }
]

const currentPanel = ref('intro')
const switchPanel = (panelId) => {
  currentPanel.value = panelId
}
</script>

<style scoped>
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: all 0.4s ease;
}
.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
