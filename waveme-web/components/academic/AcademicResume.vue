<template>
  <div class="academic-resume">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div class="p-6">
        <!-- 页面标题 -->
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">学术简历</h1>
          <p class="text-gray-600">Academic Curriculum Vitae</p>
        </div>

        <!-- 教育背景 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            <span class="mr-3">🎓</span>
            教育背景
          </h2>
          <div class="space-y-4">
            <div 
              v-for="edu in resumeData.education" 
              :key="edu.degree"
              class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ edu.degree }}</h3>
                  <p class="text-blue-600 font-medium">{{ edu.institution }}</p>
                  <p class="text-gray-600">{{ edu.major }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ edu.description }}</p>
                </div>
                <div class="mt-2 md:mt-0 text-right">
                  <span class="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full">
                    {{ edu.period }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作经历 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-green-600 mb-4 flex items-center">
            <span class="mr-3">💼</span>
            工作经历
          </h2>
          <div class="space-y-4">
            <div 
              v-for="work in resumeData.experience" 
              :key="work.position"
              class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ work.position }}</h3>
                  <p class="text-green-600 font-medium">{{ work.institution }}</p>
                  <ul class="text-sm text-gray-600 mt-2 space-y-1">
                    <li v-for="task in work.responsibilities" :key="task" class="flex items-start">
                      <span class="mr-2 text-green-500">•</span>
                      {{ task }}
                    </li>
                  </ul>
                </div>
                <div class="mt-2 md:mt-0 text-right">
                  <span class="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full">
                    {{ work.period }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 技能专长 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <span class="mr-3">🛠️</span>
            技能专长
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="skillCategory in resumeData.skills" 
              :key="skillCategory.category"
              class="bg-purple-50 rounded-lg p-4"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-3">{{ skillCategory.category }}</h3>
              <div class="space-y-2">
                <div 
                  v-for="skill in skillCategory.items" 
                  :key="skill.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-700">{{ skill.name }}</span>
                  <div class="flex space-x-1">
                    <div 
                      v-for="i in 5" 
                      :key="i"
                      :class="[
                        'w-3 h-3 rounded-full',
                        i <= skill.level ? 'bg-purple-500' : 'bg-gray-300'
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 荣誉奖项 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-orange-600 mb-4 flex items-center">
            <span class="mr-3">🏆</span>
            荣誉奖项
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="award in resumeData.awards" 
              :key="award.name"
              class="bg-orange-50 rounded-lg p-4 border border-orange-200"
            >
              <div class="flex items-start">
                <span class="text-2xl mr-3">🏅</span>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ award.name }}</h3>
                  <p class="text-orange-600 font-medium">{{ award.organization }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ award.description }}</p>
                  <span class="text-xs text-gray-500 mt-2 inline-block">{{ award.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resumeData = ref({
  education: [
    {
      degree: '博士学位 (Ph.D.)',
      institution: '斯坦福大学',
      major: '材料科学与工程',
      period: '2018-2022',
      description: '专注于纳米材料在能源存储中的应用，导师：Prof. Jennifer Smith'
    },
    {
      degree: '硕士学位 (M.S.)',
      institution: '清华大学',
      major: '材料科学与工程',
      period: '2016-2018',
      description: '研究方向：锂离子电池电极材料，GPA: 3.9/4.0'
    },
    {
      degree: '学士学位 (B.S.)',
      institution: '北京理工大学',
      major: '材料科学与工程',
      period: '2012-2016',
      description: '优秀毕业生，专业排名前5%'
    }
  ],
  experience: [
    {
      position: '博士后研究员',
      institution: '麻省理工学院',
      period: '2022-至今',
      responsibilities: [
        '领导新型固态电池材料的研发项目',
        '指导3名博士生和2名硕士生的研究工作',
        '与工业界合作伙伴开展技术转化项目',
        '发表高影响因子学术论文15篇'
      ]
    },
    {
      position: '研究助理',
      institution: '斯坦福大学',
      period: '2018-2022',
      responsibilities: [
        '设计和合成新型纳米结构电极材料',
        '开发先进的材料表征技术',
        '建立电池性能测试平台',
        '参与多项NSF和DOE资助项目'
      ]
    }
  ],
  skills: [
    {
      category: '实验技能',
      items: [
        { name: '材料合成', level: 5 },
        { name: '电化学测试', level: 5 },
        { name: 'XRD分析', level: 4 },
        { name: 'SEM/TEM', level: 4 },
        { name: 'XPS光谱', level: 3 }
      ]
    },
    {
      category: '计算技能',
      items: [
        { name: 'Python编程', level: 4 },
        { name: 'MATLAB', level: 4 },
        { name: 'DFT计算', level: 3 },
        { name: '机器学习', level: 3 },
        { name: 'Origin绘图', level: 5 }
      ]
    },
    {
      category: '语言能力',
      items: [
        { name: '中文', level: 5 },
        { name: '英文', level: 4 },
        { name: '日文', level: 2 }
      ]
    },
    {
      category: '软技能',
      items: [
        { name: '项目管理', level: 4 },
        { name: '团队协作', level: 5 },
        { name: '学术写作', level: 4 },
        { name: '演讲展示', level: 4 }
      ]
    }
  ],
  awards: [
    {
      name: 'Best Paper Award',
      organization: 'International Battery Conference 2023',
      year: '2023',
      description: '最佳论文奖，表彰在固态电池界面研究方面的杰出贡献'
    },
    {
      name: 'Outstanding Postdoc Fellow',
      organization: 'MIT Materials Science',
      year: '2023',
      description: '优秀博士后研究员，表彰在研究和指导方面的卓越表现'
    },
    {
      name: 'Graduate Research Excellence Award',
      organization: 'Stanford University',
      year: '2022',
      description: '研究生卓越研究奖，表彰博士期间的突出研究成果'
    },
    {
      name: 'National Scholarship',
      organization: '中国教育部',
      year: '2017',
      description: '国家奖学金，表彰学术成绩优异'
    }
  ]
})
</script>

<style scoped>
.academic-resume {
  width: 100%;
}
</style>
