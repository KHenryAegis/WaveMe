<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-4 sm:p-8 flex flex-col font-['Exo_2']">
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
          <span :class="['mr-2', currentPanel === panel.id ? 'text-white' : 'text-blue-500']">
            <component :is="panel.icon" />
          </span>
          <span class="font-medium">{{ panel.title }}</span>
        </button>
      </div>
    </nav>

    <!-- 内容区域 -->
    <div class="flex-1 w-full max-w-5xl mx-auto">
      <transition name="panel-fade" mode="out-in">
        <!-- 学术简介面板 -->
        <div v-if="currentPanel === 'intro'" key="intro" class="h-full flex flex-col">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
            <!-- 个人信息头部 -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div class="flex flex-col md:flex-row items-center">
                <div class="mb-4 md:mb-0 md:mr-6">
                  <div class="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mx-auto md:mx-0" />
                </div>
                <div class="text-center md:text-left">
                  <h1 class="text-3xl font-bold">张伟博士</h1>
                  <p class="text-blue-100 mt-1">材料科学与工程 · 麻省理工学院</p>
                  <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <span class="bg-blue-400/30 px-3 py-1 rounded-full text-sm">纳米材料</span>
                    <span class="bg-blue-400/30 px-3 py-1 rounded-full text-sm">能源存储</span>
                    <span class="bg-blue-400/30 px-3 py-1 rounded-full text-sm">计算材料学</span>
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
                    张伟博士是麻省理工学院材料科学与工程系的博士后研究员，专注于新型能源存储材料的设计与开发。
                    他的研究结合了计算材料学与实验方法，致力于开发高性能锂离子电池和固态电池材料。
                    在博士期间，他开发了一种新型纳米结构电极材料，显著提高了电池的能量密度和循环寿命。
                  </p>
                </div>

                <!-- 联系方式 -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-3">联系方式</h2>
                  <ul class="space-y-2">
                    <li class="flex items-center">
                      <EmailIcon class="h-5 w-5 text-blue-500 mr-2" />
                      <span>zhang.wei@mit.edu</span>
                    </li>
                    <li class="flex items-center">
                      <PhoneIcon class="h-5 w-5 text-blue-500 mr-2" />
                      <span>+1 (617) 555-0123</span>
                    </li>
                    <li class="flex items-center">
                      <LocationIcon class="h-5 w-5 text-blue-500 mr-2" />
                      <span>麻省理工学院材料科学实验室</span>
                    </li>
                    <li class="flex items-center">
                      <LinkIcon class="h-5 w-5 text-blue-500 mr-2" />
                      <span>linkedin.com/in/zhangwei</span>
                    </li>
                  </ul>
                </div>

                <!-- 学术见解 -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-3">学术见解</h2>
                  <div class="bg-blue-50 rounded-xl p-4">
                    <p class="text-gray-700 italic">
                      "下一代能源存储技术的突破将依赖于材料界面的精确控制和多尺度模拟的结合。
                      我们正处在材料科学革命的边缘，计算指导的实验方法将大大加速新材料的发现过程。"
                    </p>
                  </div>
                </div>
              </div>

              <!-- 研究亮点 -->
              <div class="mt-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">研究亮点</h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div
                    v-for="(item, i) in highlights"
                    :key="i"
                    class="bg-white rounded-xl shadow-md p-5 text-center border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div class="text-3xl mb-3">{{ item.icon }}</div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.title }}</h3>
                    <p class="text-sm text-gray-600">{{ item.content }}</p>
                  </div>
                </div>
              </div>

              <!-- 行动按钮 -->
              <div class="mt-8 flex justify-center gap-4">
                <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-lg flex items-center transition-transform transform hover:scale-105 active:scale-95">
                  <DownloadIcon class="h-5 w-5 mr-2" />
                  下载完整简历
                </button>
                <button class="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-transform transform hover:scale-105 active:scale-95 flex items-center shadow-md hover:shadow-lg">
                  <ContactIcon class="h-5 w-5 mr-2" />
                  联系我
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 学术简历面板 -->
        <div v-else-if="currentPanel === 'resume'" key="resume" class="h-full flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden">
          <!-- 略：同上转换，省略长篇，完整示例会按同样方式转换 resume 和 publications 板块 -->
        </div>

        <!-- 研究成果面板 -->
        <div v-else key="publications" class="h-full flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden">
          <!-- 略：同上转换 publications 板块 -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EmailIcon from '@/components/icons/EmailIcon.vue';
import PhoneIcon from '@/components/icons/PhoneIcon.vue';
import LocationIcon from '@/components/icons/LocationIcon.vue';
import LinkIcon from '@/components/icons/LinkIcon.vue';
import DownloadIcon from '@/components/icons/DownloadIcon.vue';
import ContactIcon from '@/components/icons/ContactIcon.vue';

const panels = [
  { id: 'intro', title: '学术简介', icon: 'IntroIcon' },
  { id: 'resume', title: '学术简历', icon: 'ResumeIcon' },
  { id: 'publications', title: '研究成果', icon: 'PublicationsIcon' }
];

const currentPanel = ref('intro');
const switchPanel = (panelId) => {
  currentPanel.value = panelId;
};

const highlights = [
  { icon: '🔬', title: '新型纳米结构电极', content: '开发了具有分级孔隙结构的硅碳复合材料，显著提高锂离子电池容量和循环稳定性' },
  { icon: '⚡', title: '固态电解质界面', content: '通过原子层沉积技术构建稳定的固态电解质界面层，解决锂金属负极的枝晶问题' },
  { icon: '🤖', title: '机器学习材料筛选', content: '开发了基于机器学习的材料筛选框架，加速新型电池材料的发现过程' }
];
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
