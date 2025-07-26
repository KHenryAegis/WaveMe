<template>
  <div class="app-container">
    <div class="stars-bg" ref="starsBg"></div>

    <div class="meteors-container">
      <div class="meteor" v-for="(meteor, index) in meteors" :key="index" :style="meteor.style"></div>
    </div>

    <div class="header">
      <h1 class="title">
        ✡️ 星运占卜 🌙
      </h1>
      <p class="subtitle">
        探索宇宙奥秘，揭示命运轨迹 - 输入您的星座和MBTI类型，获取今日专属运势预测
      </p>
    </div>

    <div class="divider"></div>

    <div class="content-container">
      <transition name="fade-out">
        <div class="input-section" v-show="!fortuneGenerated">
          <div class="input-group">
            <div class="input-card">
              <h3>🌠 星座运势</h3>
              <div class="select-container">
                <select v-model="selectedZodiac">
                  <option value="" disabled>请选择您的星座</option>
                  <option v-for="zodiac in zodiacSigns" :key="zodiac" :value="zodiac">{{ zodiac }}</option>
                </select>
              </div>
            </div>

            <div class="input-card">
              <h3>🧠 MBTI 运势</h3>
              <div class="select-container">
                <select v-model="selectedMbti">
                  <option value="" disabled>请选择您的 MBTI</option>
                  <option v-for="mbti in mbtiTypes" :key="mbti" :value="mbti">{{ mbti }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="date-display">{{ currentDate }}</div>

          <transition name="fade-in">
            <div v-if="validationMessage" class="validation-message">
              {{ validationMessage }}
            </div>
          </transition>

          <button class="btn-submit" @click="generateFortune">
            🔮 生成今日运势
          </button>
        </div>
      </transition>

      <transition name="fade-in">
        <div v-if="fortuneGenerated" class="result-section">
          <div class="zodiac-display pulse">
            ✨ {{ displayLabel }} 的今日运势 ✨
          </div>
          <div class="cards-container">
            <!-- 直接渲染 Emoji -->
            <div v-for="(info, type) in fortune" :key="type" class="fortune-card">
              <div class="card-header">
                <div class="card-icon">
                  {{ icons[type] }}
                </div>
                <h2 class="card-title">{{ labels[type] }}</h2>
              </div>
              <p class="card-content">{{ info.text }}</p>
              <!-- 运势星星已换成 Emoji -->
              <div class="rating">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= info.rating }">
                  {{ n <= info.rating ? '🌟' : '⭐' }}
                </span>
              </div>
            </div>
          </div>
          <button class="btn-back" @click="resetForm">
            🔄 再占一次
          </button>
        </div>
      </transition>
    </div>

    <div class="footer">
      <div class="constellation">
        <div class="star-footer" v-for="(star, idx) in constellationStars" :key="idx" :style="star.style"></div>
      </div>
      <p class="copyright">© 2025 星运占卜 | 仅供娱乐</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const zodiacSigns = [
      '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
      '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
    ];
    const mbtiTypes = [
      'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP',
      'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
      'ISTP', 'ISFP', 'ESTP', 'ESFP'
    ];

    const selectedZodiac = ref('');
    const selectedMbti = ref('');
    const fortuneGenerated = ref(false);
    const currentDate = ref('');
    const fortune = ref({});
    const meteors = ref([]);
    const constellationStars = ref([]);
    const validationMessage = ref('');
    let meteorInterval = null;

    const starsBg = ref(null);

    const displayLabel = computed(() => {
      const parts = [];
      if (selectedZodiac.value) parts.push(selectedZodiac.value);
      if (selectedMbti.value) parts.push(selectedMbti.value);
      return parts.join(' & ');
    });

    const labels = {
      love: '爱情运势', money: '财运运势', career: '事业运势', health: '健康运势'
    };

    // --- 图标已更新为 Emoji ---
    const icons = {
      love: '❤️',
      money: '💰',
      career: '💼',
      health: '💪' // 使用了更积极的“强壮”图标
    };

    const fortuneTexts = {
      love: [
        '今天你的爱情运势如春日暖阳，单身的你可能会在咖啡馆遇见让你心动的人，勇敢上前搭话吧！',
        '情侣间的默契度爆表，一个小小的惊喜礼物会让感情升温，晚餐后一起看星星会是不错的选择。',
        '感情需要用心经营，今天适合与伴侣进行深度交流，解开之前的小误会，关系会更进一步。',
        '爱情运势平稳，适合与朋友聚会，在社交场合中展现你的魅力，可能会吸引到潜在的发展对象。',
        '今天你的魅力值飙升，大胆表达你的情感，对方很可能会被你的真诚打动，收获甜蜜恋情。',
        '感情中需要更多耐心，给彼此一些空间，过度关注反而会让对方感到压力，保持适度距离。'
      ],
      money: [
        '财运亨通，可能会收到意外之财或奖金，但也要注意理性消费，避免冲动购物哦！',
        '投资运不错，适合研究新的理财项目，小额投资可能会有不错的回报，但切记不要贪心。',
        '今天在财务上需要谨慎，避免大额支出，检查账单可能会有意外发现，帮你节省开支。',
        '正财稳定，偏财运佳，可以尝试购买彩票或参与抽奖活动，说不定会有意外惊喜等着你。',
        '财务上可能会出现一些小波动，保持冷静，重新审视预算计划，避免不必要的开支。',
        '今天适合规划长期财务目标，与理财顾问聊聊可能会有新启发，为未来财富积累打下基础。'
      ],
      career: [
        '事业运势如日中天，你的努力将被上级看到，可能会获得晋升机会或重要项目委派，加油！',
        '团队合作是关键，今天适合主动协调资源，你的领导力会让项目推进更加顺利高效。',
        '工作中需要更多创意，尝试跳出常规思维，一个新颖的点子可能会解决困扰已久的问题。',
        '职场人际关系和谐，与同事的愉快交流可能会带来新的合作机会，拓展职业发展空间。',
        '面临工作挑战不要退缩，这正是展示你能力的好机会，沉着应对会让你获得更多认可。',
        '今天适合学习新技能，参加专业培训或在线课程，为未来的职业发展积累更多资本。'
      ],
      health: [
        '健康状态良好，精力充沛，适合尝试新的运动项目，比如攀岩或舞蹈，释放压力。',
        '注意饮食均衡，多吃蔬菜水果，避免过多油炸食品，清淡饮食会让你的身体感觉更舒适。',
        '精神略显疲惫，给自己安排一个放松的夜晚，泡澡、冥想或阅读都是不错的恢复方式。',
        '肩颈部位可能感到僵硬，每隔一小时起身活动5分钟，简单的伸展运动能有效缓解不适。',
        '今天适合进行户外活动，呼吸新鲜空气，阳光下的散步会提升你的心情和免疫力。',
        '睡眠质量需要关注，睡前远离电子设备，喝杯温牛奶或草本茶，帮助获得更深层的休息。'
      ],
    };

    function pickRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randRating() {
      return Math.floor(Math.random() * 3) + 3;
    }

    const generateFortune = () => {
      if (!selectedZodiac.value && !selectedMbti.value) {
        validationMessage.value = '请至少选择您的星座或 MBTI 类型';
        setTimeout(() => {
          validationMessage.value = '';
        }, 3000);
        return;
      }
      createMeteorShower(15);

      fortune.value = {
        love: { text: pickRandom(fortuneTexts.love), rating: randRating() },
        money: { text: pickRandom(fortuneTexts.money), rating: randRating() },
        career: { text: pickRandom(fortuneTexts.career), rating: randRating() },
        health: { text: pickRandom(fortuneTexts.health), rating: randRating() }
      };
      fortuneGenerated.value = true;
    };

    const resetForm = () => {
      fortuneGenerated.value = false;
      createMeteorShower(5);
    };

    const createStars = (container) => {
      if (!container) return;
      container.innerHTML = '';
      const count = 250;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
      }
    };

    const createMeteorShower = (count = 7) => {
      meteors.value = [];
      const numMeteors = Math.floor(Math.random() * 4) + count - 3;
      for (let i = 0; i < numMeteors; i++) {
        meteors.value.push({
          style: {
            top: `${-10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 80}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 2 + 1.5}s`,
            opacity: Math.random() * 0.4 + 0.5
          }
        });
      }
    };

    const createConstellation = () => {
      const count = 20;
      for (let i = 0; i < count; i++) {
        constellationStars.value.push({
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 8}s`
          }
        });
      }
    };

    const setCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      currentDate.value = `${year}年${String(month).padStart(2, '0')}月${String(day).padStart(2, '0')}日`;
    };

    onMounted(() => {
      createStars(starsBg.value);
      setCurrentDate();
      createMeteorShower();
      createConstellation();

      meteorInterval = setInterval(() => {
        if (!fortuneGenerated.value) {
          createMeteorShower();
        }
      }, 20000);
    });

    onUnmounted(() => {
        if(meteorInterval) {
            clearInterval(meteorInterval);
        }
    });

    return {
      zodiacSigns, mbtiTypes, selectedZodiac, selectedMbti,
      fortuneGenerated, currentDate, fortune, meteors, constellationStars,
      displayLabel, labels, icons, generateFortune, resetForm,
      starsBg,
      validationMessage
    };
  }
}
</script>

<style>
/* 引入外部字体，这个仍然保留 */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Noto+Sans+SC:wght@300;400&display=swap');

:root {
  --primary-glow-color: #f8cd5a;
  --secondary-glow-color: #9d50bb;
  --bg-dark-1: #0a0c1a;
  --bg-dark-2: #1a1c2e;
  --text-primary: #e6e6e6;
  --text-secondary: #b0b0d0;
  --border-color: rgba(157, 80, 187, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background: var(--bg-dark-1);
}

.app-container {
  background: var(--bg-dark-1);
  color: var(--text-primary);
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars-bg {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  overflow: hidden;
}

.stars-bg::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 120vmax; height: 120vmax;
  background-image:
    radial-gradient(circle at center, var(--primary-glow-color), transparent 40%),
    radial-gradient(circle at center, var(--secondary-glow-color), transparent 40%);
  background-blend-mode: screen; opacity: 0.1;
  transform-origin: center; animation: rotate 60s linear infinite alternate;
}

.star-particle {
  position: absolute; background: #fff; border-radius: 50%;
  box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.7);
  animation: twinkle 5s infinite ease-in-out;
}

.meteors-container {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 2; overflow: hidden;
}

.meteor {
  position: absolute; height: 2px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-45deg); animation: meteorFly 3s linear infinite;
  filter: drop-shadow(0 0 8px #fff);
}

.content-container {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; z-index: 10;
  width: 100%; max-width: 1100px; padding: 1rem;
}

.header {
  text-align: center; margin-bottom: 1.5rem; z-index: 10;
}

.header h1 {
  font-family: 'Cinzel', serif; font-size: clamp(2.2rem, 5vw, 3.5rem);
  margin-bottom: 1rem; font-weight: 700;
  background: linear-gradient(120deg, #f8e08e, #e48d75, #c881e4);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: titleGlow 4s infinite alternate;
}

.header h1 .fas {
  font-size: 0.8em; /* 调整图标大小以匹配Emoji */
}

.header .subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem); max-width: 650px;
  margin: 0 auto; color: var(--text-secondary); line-height: 1.7;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--primary-glow-color), var(--secondary-glow-color), transparent);
  margin: 1.5rem auto 2.5rem; width: 80%; max-width: 500px;
  animation: expandWidth 1.5s ease-out; opacity: 0.7;
}

.input-section {
  background: rgba(22, 24, 46, 0.7); border-radius: 20px;
  padding: 2.5rem; margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  animation: slideUp 0.8s ease-out forwards;
  max-width: 800px; width: 100%;
}

.input-group {
  display: flex; flex-wrap: wrap; gap: 2rem;
  justify-content: center; margin-bottom: 2rem;
}

.input-card {
  background: rgba(36, 39, 78, 0.8); border-radius: 15px;
  padding: 1.5rem; flex: 1; min-width: 280px;
  transition: all 0.4s ease;
  border: 1px solid rgba(157, 80, 187, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.input-card:hover {
  transform: translateY(-8px);
  border-color: rgba(248, 205, 90, 0.5);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.input-card h3 {
  font-family: 'Cinzel', serif; text-align: center;
  margin-bottom: 1.5rem; color: var(--primary-glow-color);
  font-size: 1.4rem; text-shadow: 0 0 10px rgba(248, 205, 90, 0.4);
}

.select-container { position: relative; }
.select-container select {
  width: 100%; padding: 0.8rem 1.2rem; background: rgba(10, 12, 26, 0.9);
  border: 1px solid var(--border-color); border-radius: 10px;
  color: var(--primary-glow-color); font-size: 1rem;
  font-family: 'Noto Sans SC', sans-serif; appearance: none;
  -webkit-appearance: none; cursor: pointer; transition: all 0.3s ease;
}
.select-container select:focus {
  border-color: var(--primary-glow-color); outline: none;
  box-shadow: 0 0 15px rgba(248, 205, 90, 0.4);
}
.select-container::after {
  content: '▼'; /* 使用更简单的字符作为箭头 */
  position: absolute; right: 18px; top: 50%;
  transform: translateY(-50%); color: var(--primary-glow-color);
  pointer-events: none; transition: transform 0.3s ease;
}

.date-display {
  text-align: center; font-size: 1rem; color: var(--text-secondary);
  margin: 1.5rem 0; opacity: 0.8;
}

.validation-message {
  text-align: center; color: #ff8a80; margin-bottom: 1.5rem;
  font-weight: 400; text-shadow: 0 0 5px rgba(255, 100, 100, 0.5);
}

.btn-submit {
  display: block; width: 100%; max-width: 300px; margin: 1rem auto 0;
  padding: 1rem;
  background: linear-gradient(120deg, var(--primary-glow-color), #e44d26, var(--secondary-glow-color));
  background-size: 200% 100%; border: none; border-radius: 50px;
  color: #fff; font-size: 1.1rem; font-weight: 600;
  letter-spacing: 1px; cursor: pointer; transition: all 0.4s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(248, 205, 90, 0.3);
}

.btn-submit:hover {
  transform: translateY(-5px); background-position: 100% 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(157, 80, 187, 0.5);
}

.result-section {
  background: rgba(22, 24, 46, 0.7); border-radius: 20px;
  padding: 2.5rem; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color); width: 100%;
}

.zodiac-display {
  text-align: center; margin: 0 auto 2.5rem;
  font-size: clamp(1.4rem, 4vw, 1.8rem); font-family: 'Cinzel', serif;
  color: var(--primary-glow-color); animation: pulse 2.5s infinite;
  padding: 0.8rem 2rem; background: rgba(36, 39, 78, 0.5);
  border-radius: 50px; display: inline-block;
  border: 1px solid var(--border-color); box-shadow: 0 0 20px rgba(0,0,0,0.5);
  width: fit-content;
}

.cards-container {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.fortune-card {
  background: rgba(30, 32, 60, 0.8); border-radius: 18px;
  padding: 2rem; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid var(--border-color); display: flex; flex-direction: column;
}

.fortune-card:hover {
  transform: translateY(-12px) perspective(1000px) rotateX(2deg) rotateY(4deg);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  border-color: var(--primary-glow-color);
}

.card-header {
  display: flex; align-items: center; margin-bottom: 1.2rem;
}

.card-icon {
  width: 50px; height: 50px; flex-shrink: 0;
  background: linear-gradient(135deg, rgba(248, 205, 90, 0.1), rgba(157, 80, 187, 0.1));
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-right: 1rem;
  /* 调整 Emoji 大小和居中 */
  font-size: 2rem;
  line-height: 1;
  color: var(--primary-glow-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(248, 205, 90, 0.2);
}

.card-title {
  font-family: 'Cinzel', serif; font-size: 1.5rem;
  color: var(--primary-glow-color); font-weight: 700;
}

.card-content {
  line-height: 1.8; font-size: 1rem; color: var(--text-secondary);
  flex-grow: 1; margin-bottom: 1rem;
}

.rating { display: flex; justify-content: flex-start; margin-top: auto; }

/* 调整星星 Emoji 的样式 */
.star {
  font-size: 1.4rem;
  margin-right: 0.3rem;
  transition: all 0.3s ease;
  opacity: 0.5; /* 未点亮的星星透明度降低 */
}

.star.filled {
  opacity: 1; /* 点亮的星星完全不透明 */
  text-shadow: 0 0 8px var(--primary-glow-color); /* 保留辉光效果 */
  transform: scale(1.1); /* 增加轻微放大效果 */
}

.btn-back {
  display: block; width: 100%; max-width: 220px;
  margin: 2.5rem auto 0; padding: 0.9rem; background: transparent;
  border: 1px solid var(--border-color); border-radius: 30px;
  color: var(--primary-glow-color); font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
}

.btn-back:hover {
  background: rgba(157, 80, 187, 0.2); transform: translateY(-3px);
  border-color: rgba(157, 80, 187, 0.7);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.footer {
  margin-top: 3rem; text-align: center; padding: 1.5rem 0;
  position: relative; color: rgba(180, 180, 220, 0.5);
  width: 100%; z-index: 10;
}

.constellation {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}
.constellation .star-footer {
  position: absolute; background: rgba(255, 255, 255, 0.5);
  border-radius: 50%; animation: twinkle 8s infinite alternate;
}

/* 动画部分保持不变 */
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(157, 80, 187, 0.5); }
}
@keyframes twinkle {
  from { opacity: 0.3; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1.2); }
}
@keyframes meteorFly {
  0% { transform: translate(200px, -200px) rotate(-45deg); opacity: 1; }
  100% { transform: translate(-100vw, 100vw) rotate(-45deg); opacity: 0; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes expandWidth {
  from { width: 0; }
  to { width: 80%; }
}
@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes titleGlow {
  from { text-shadow: 0 0 10px #f8e08e, 0 0 20px #e48d75, 0 0 30px #c881e4; }
  to { text-shadow: 0 0 20px #c881e4, 0 0 30px #f8e08e, 0 0 40px #e48d75; }
}
.fade-in-enter-active, .fade-out-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-leave-active, .fade-out-enter-active {
  transition: opacity 0.3s ease;
}
.fade-in-enter-from, .fade-out-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
.fade-in-leave-to, .fade-out-enter-from {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-container { padding: 1.5rem; }
  .input-section, .result-section { padding: 2rem; }
  .cards-container { grid-template-columns: 1fr; gap: 1.5rem; }
}
@media (max-width: 480px) {
  .app-container { padding: 1rem; }
  .input-section, .result-section { padding: 1.5rem; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  .input-card { min-width: unset; width: 100%; }
  .card-header { flex-direction: column; text-align: center; align-items: center; }
  .card-icon { margin: 0 0 1rem 0; }
  .rating { justify-content: center; }
}

</style>