<template>
  <div class="min-h-screen bg-black text-gray-200 p-8 font-sans selection:bg-yellow-400 selection:text-black">
    <!-- 顶部标题 -->
    <header class="text-center mb-16">
      <h1 class="text-5xl font-thin tracking-widest text-gray-300 animate-fade-in-down">
        MY INTERESTS
      </h1>
      <p class="text-gray-500 mt-2 text-sm animate-fade-in-down" style="animation-delay: 0.2s;">点击图标查看更多</p>
    </header>

    <!-- 兴趣图标网格 -->
    <main class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 max-w-5xl mx-auto">
      <div
        v-for="(hobby, index) in hobbies"
        :key="hobby.id"
        class="flex flex-col items-center justify-center cursor-pointer group animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.05}s` }"
        @click="openModal(hobby)"
      >
        <img
          :src="hobby.icon"
          :alt="hobby.title"
          class="w-24 h-24 object-contain transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:drop-shadow-glow"
        />
        <span class="mt-4 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {{ hobby.title }}
        </span>
      </div>
    </main>

    <!-- 详情模态框 -->
    <transition name="modal-fade">
      <div
        v-if="selectedHobby"
        class="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
        @click="closeModal"
      >
        <transition name="modal-scale">
          <div
            v-if="selectedHobby"
            class="relative bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-11/12 max-w-lg p-8 m-4"
            @click.stop
          >
            <!-- 关闭按钮 -->
            <button
              class="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-3xl"
              @click="closeModal"
            >
              ×
            </button>
            
            <!-- 模态框内容 -->
            <div class="flex flex-col items-center text-center">
              <img :src="selectedHobby.icon" :alt="selectedHobby.title" class="w-32 h-32 mb-6 drop-shadow-glow-strong" />
              <h2 class="text-3xl font-bold text-yellow-400 mb-4">{{ selectedHobby.title }}</h2>
              <p class="text-gray-300 leading-relaxed whitespace-pre-line">{{ selectedHobby.description }}</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// 用于模态框的状态
const selectedHobby = ref(null);

// 我们的兴趣数据，已根据参考图片更新
// 注意：icon路径是占位符，您需要替换为自己的图标文件路径
const hobbies = ref([
  {
    id: 'pet',
    title: '宠物',
    icon: '/icons/logo-02.png',
    description: '这是我的猫，一只特立独行的思考者。\n每天的大部分时间都在睡觉、吃饭和思考喵生。'
  },
  {
    id: 'work',
    title: '工作与学习',
    icon: '/icons/logo-03.png',
    description: '作为一名开发者，笔记本电脑是我连接数字世界的窗口。\n最近专注于研究前端性能优化和交互设计。'
  },
  {
    id: 'film',
    title: '电影',
    icon: '/icons/logo-04.png',
    description: '沉迷于光影构建的故事。无论是经典老片还是前沿科幻，都能让我暂时脱离现实，进入另一个世界。'
  },
  {
    id: 'sports',
    title: '羽毛球',
    icon: '/icons/logo-05.png',
    description: '在球场上挥洒汗水的感觉无与伦比。\n速度、策略和反应的结合，是最好的解压方式。'
  },
  {
    id: 'food',
    title: '美食',
    icon: '/icons/logo-06.png',
    description: '生活中的小确幸，从一个完美的煎蛋开始。\n探索和制作美食是我的一大乐趣。'
  },
  {
    id: 'canned-cat',
    title: '猫罐头哲学',
    icon: '/icons/logo-07.png',
    description: '有时候，快乐就像一个等待开启的猫罐头，充满期待。\n这更像是一种生活的隐喻。'
  },
  {
    id: 'photography',
    title: '摄影',
    icon: '/icons/logo-08.png',
    description: '用镜头捕捉生活中的决定性瞬间。\n我相信每张照片背后都有一个值得讲述的故事。'
  },
  {
    id: 'drawing',
    title: '涂鸦',
    icon: '/icons/logo-09.png',
    description: '在纸上随意涂抹，是对思绪的整理，也是一种创造性的放松。花朵是最近常画的主题。'
  },
  {
    id: 'cat-stretch',
    title: '观察猫',
    icon: '/icons/logo-10.png',
    description: '猫的每一个姿态都充满了优雅和神秘感。\n观察它们，就像在阅读一本无字的诗集。'
  },
  {
    id: 'reading',
    title: '阅读',
    icon: '/icons/logo-11.png',
    description: '无论是新闻、书籍还是文章，阅读是获取知识和拓宽视野最直接的方式。'
  },
  {
    id: 'diving',
    title: '潜水',
    icon: '/icons/logo-12.png',
    description: '探索水下的静谧世界，那里的色彩和生命形态与陆地截然不同，是一种独特的冥想体验。'
  },
   {
    id: 'mystery',
    title: '未知',
    icon: '/icons/logo-13.png',
    description: '保持好奇心，永远对未知的领域充满探索的欲望。下一个兴趣会是什么呢？'
  },
]);

// 打开和关闭模态框的函数
const openModal = (hobby) => {
  selectedHobby.value = hobby;
};

const closeModal = () => {
  selectedHobby.value = null;
};
</script>
<style scoped>
/* 定义全局字体和动画 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400&display=swap');
.font-sans { font-family: 'Noto Sans SC', sans-serif; }

/* 自定义辉光效果 */
.drop-shadow-glow {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
}
.drop-shadow-glow-strong {
  filter: drop-shadow(0 0 15px rgba(255, 235, 59, 0.6));
}

/* 页面进入动画 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0; /* 动画开始前隐藏 */
  animation: fadeInUp 0.5s ease-out forwards;
}

/* 模态框过渡动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s ease-in-out;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* 为了让空白描述换行生效 */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>