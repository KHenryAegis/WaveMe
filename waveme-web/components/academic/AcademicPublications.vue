<template>
  <div class="academic-publications">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div class="p-6">
        <!-- 页面标题 -->
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">研究成果</h1>
          <p class="text-gray-600">Publications & Research Achievements</p>
        </div>

        <!-- 统计概览 -->
        <section class="mb-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              v-for="stat in publicationsData.stats" 
              :key="stat.label"
              class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center border border-blue-100"
            >
              <div class="text-2xl mb-2">{{ stat.icon }}</div>
              <div class="text-2xl font-bold text-blue-600">{{ stat.value }}</div>
              <div class="text-sm text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </section>

        <!-- 期刊论文 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            <span class="mr-3">📄</span>
            期刊论文
          </h2>
          <div class="space-y-4">
            <div 
              v-for="(paper, index) in publicationsData.journalPapers" 
              :key="index"
              class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800 mb-2">{{ paper.title }}</h3>
                  <p class="text-blue-600 font-medium mb-1">{{ paper.authors }}</p>
                  <p class="text-gray-600 italic mb-2">{{ paper.journal }}, {{ paper.year }}</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span 
                      v-for="keyword in paper.keywords" 
                      :key="keyword"
                      class="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">{{ paper.abstract }}</p>
                </div>
                <div class="mt-3 md:mt-0 md:ml-4 flex flex-col gap-2">
                  <span class="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full text-center">
                    IF: {{ paper.impactFactor }}
                  </span>
                  <span class="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-center">
                    引用: {{ paper.citations }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 会议论文 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-green-600 mb-4 flex items-center">
            <span class="mr-3">🎤</span>
            会议论文
          </h2>
          <div class="space-y-4">
            <div 
              v-for="(paper, index) in publicationsData.conferencePapers" 
              :key="index"
              class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800 mb-2">{{ paper.title }}</h3>
                  <p class="text-green-600 font-medium mb-1">{{ paper.authors }}</p>
                  <p class="text-gray-600 italic mb-2">{{ paper.conference }}, {{ paper.location }}, {{ paper.year }}</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span 
                      v-for="keyword in paper.keywords" 
                      :key="keyword"
                      class="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">{{ paper.abstract }}</p>
                </div>
                <div class="mt-3 md:mt-0 md:ml-4">
                  <span 
                    :class="[
                      'text-sm font-medium px-3 py-1 rounded-full text-center',
                      paper.type === 'oral' ? 'text-purple-600 bg-purple-100' : 'text-gray-600 bg-gray-100'
                    ]"
                  >
                    {{ paper.type === 'oral' ? '口头报告' : '海报展示' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 专利 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <span class="mr-3">⚖️</span>
            专利
          </h2>
          <div class="space-y-4">
            <div 
              v-for="(patent, index) in publicationsData.patents" 
              :key="index"
              class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800 mb-2">{{ patent.title }}</h3>
                  <p class="text-purple-600 font-medium mb-1">发明人: {{ patent.inventors }}</p>
                  <p class="text-gray-600 mb-2">专利号: {{ patent.patentNumber }}</p>
                  <p class="text-sm text-gray-600">{{ patent.abstract }}</p>
                </div>
                <div class="mt-3 md:mt-0 md:ml-4 flex flex-col gap-2">
                  <span 
                    :class="[
                      'text-sm font-medium px-3 py-1 rounded-full text-center',
                      patent.status === 'granted' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'
                    ]"
                  >
                    {{ patent.status === 'granted' ? '已授权' : '申请中' }}
                  </span>
                  <span class="text-sm text-gray-600 text-center">{{ patent.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 研究项目 -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-orange-600 mb-4 flex items-center">
            <span class="mr-3">🔬</span>
            研究项目
          </h2>
          <div class="space-y-4">
            <div 
              v-for="(project, index) in publicationsData.projects" 
              :key="index"
              class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800 mb-2">{{ project.title }}</h3>
                  <p class="text-orange-600 font-medium mb-1">{{ project.role }} · {{ project.funding }}</p>
                  <p class="text-gray-600 mb-2">{{ project.period }}</p>
                  <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="outcome in project.outcomes" 
                      :key="outcome"
                      class="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full"
                    >
                      {{ outcome }}
                    </span>
                  </div>
                </div>
                <div class="mt-3 md:mt-0 md:ml-4">
                  <span class="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                    {{ project.budget }}
                  </span>
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

const publicationsData = ref({
  stats: [
    { icon: '📄', value: '25', label: '期刊论文' },
    { icon: '🎤', value: '12', label: '会议论文' },
    { icon: '⚖️', value: '5', label: '专利' },
    { icon: '📈', value: '850', label: '总引用' }
  ],
  journalPapers: [
    {
      title: 'High-Performance Silicon Nanowire Anodes with Hierarchical Porous Structure for Lithium-Ion Batteries',
      authors: 'Wei Zhang, Jennifer Smith, Michael Johnson, et al.',
      journal: 'Nature Materials',
      year: '2023',
      impactFactor: '39.2',
      citations: '156',
      keywords: ['硅纳米线', '锂离子电池', '分级结构'],
      abstract: '本研究开发了一种具有分级多孔结构的硅纳米线负极材料，通过精确控制孔隙结构，显著提高了材料的电化学性能和循环稳定性。'
    },
    {
      title: 'Machine Learning-Accelerated Discovery of Novel Solid-State Electrolytes',
      authors: 'Wei Zhang, David Chen, Sarah Williams, Jennifer Smith',
      journal: 'Energy & Environmental Science',
      year: '2023',
      impactFactor: '32.5',
      citations: '89',
      keywords: ['机器学习', '固态电解质', '材料发现'],
      abstract: '利用机器学习算法筛选和设计新型固态电解质材料，建立了包含10万种化合物的材料数据库，成功预测并验证了3种高性能电解质。'
    },
    {
      title: 'Interface Engineering of Lithium Metal Anodes via Atomic Layer Deposition',
      authors: 'Wei Zhang, Robert Miller, Jennifer Smith',
      journal: 'Nature Energy',
      year: '2022',
      impactFactor: '60.9',
      citations: '203',
      keywords: ['锂金属', '界面工程', '原子层沉积'],
      abstract: '通过原子层沉积技术在锂金属表面构建人工SEI层，有效抑制枝晶生长，将锂金属电池的循环寿命提高了300%。'
    }
  ],
  conferencePapers: [
    {
      title: 'Computational Design of Next-Generation Battery Materials',
      authors: 'Wei Zhang, Jennifer Smith',
      conference: 'International Conference on Materials Science',
      location: 'Boston, USA',
      year: '2023',
      type: 'oral',
      keywords: ['计算材料学', '电池材料', '高通量筛选'],
      abstract: '介绍了基于第一性原理计算和机器学习的电池材料设计方法，展示了在快离子导体筛选中的应用。'
    },
    {
      title: 'In-Situ Characterization of Battery Material Degradation',
      authors: 'Wei Zhang, Michael Johnson, Jennifer Smith',
      conference: 'American Chemical Society Meeting',
      location: 'San Francisco, USA',
      year: '2022',
      type: 'poster',
      keywords: ['原位表征', '材料降解', '电化学'],
      abstract: '开发了原位X射线衍射和拉曼光谱联用技术，实时监测电池材料在充放电过程中的结构演化。'
    }
  ],
  patents: [
    {
      title: '具有分级多孔结构的硅基复合负极材料及其制备方法',
      inventors: '张伟, 史密斯詹妮弗, 约翰逊迈克尔',
      patentNumber: 'US11,234,567',
      status: 'granted',
      year: '2023',
      abstract: '本发明提供了一种具有分级多孔结构的硅基复合负极材料，通过模板法制备，具有高容量和优异的循环稳定性。'
    },
    {
      title: '基于机器学习的固态电解质筛选方法',
      inventors: '张伟, 陈大卫, 史密斯詹妮弗',
      patentNumber: 'CN202310123456.7',
      status: 'pending',
      year: '2023',
      abstract: '本发明提供了一种基于机器学习算法的固态电解质材料高通量筛选方法，能够快速预测材料的离子导电性。'
    }
  ],
  projects: [
    {
      title: '下一代锂金属电池关键材料研发',
      role: '项目负责人',
      funding: 'NSF资助',
      period: '2022-2025',
      budget: '$850K',
      description: '开发高性能锂金属负极保护层和匹配的电解质系统，实现锂金属电池的实用化。',
      outcomes: ['2篇Nature子刊', '3项专利申请', '1个技术转化']
    },
    {
      title: '人工智能驱动的电池材料发现',
      role: '共同研究者',
      funding: 'DOE资助',
      period: '2021-2024',
      budget: '$1.2M',
      description: '建立基于机器学习的电池材料设计平台，加速新材料的发现和优化过程。',
      outcomes: ['机器学习框架', '材料数据库', '5篇高影响论文']
    },
    {
      title: '固态电池产业化关键技术',
      role: '技术顾问',
      funding: '企业合作',
      period: '2023-2024',
      budget: '$500K',
      description: '与工业界合作，解决固态电池大规模生产中的技术难题，推动技术产业化。',
      outcomes: ['中试线建设', '工艺优化', '成本降低30%']
    }
  ]
})
</script>

<style scoped>
.academic-publications {
  width: 100%;
}
</style>
