<template>
  <div class="minimal-template">
    <!-- Animated background with large, drifting circles -->
    <div class="minimal-bg">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>
    
    <!-- Main content card with entry animation -->
    <main class="home-card">
      
      <!-- Custom Avatar Section with breathing animation -->
      <div class="avatar-section">
        <div class="pig-avatar">
          <!-- Pig Head -->
          <div class="pig-head">
            <div class="eye left"></div>
            <div class="eye right"></div>
          </div>
          <!-- Ears -->
          <div class="ear left"></div>
          <div class="ear right"></div>
          
          <!-- Social Bubbles with staggered pop-in animation -->
          <div class="social-bubble github">Github</div>
          <div class="social-bubble wechat">Wechat</div>
          <div class="social-bubble linkedin">领英</div>
        </div>
      </div>

      <!-- Introduction Text with fade-in animation -->
      <div class="intro-section">
        <h2 class="greeting">{{ templateData.greeting || "Hi, I'm Lambert :)" }}</h2>
        <p v-for="desc in (templateData.description || ['fullstack dev', 'fandom of Muelle'])" :key="desc" class="description">{{ desc }}</p>
      </div>

      <!-- Tags Section with fade-in animation -->
      <div class="tags-section">
        <span v-for="tag in (templateData.tags || ['技术', '产品', '后端', '增长'])" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <!-- Carousel Controls with fade-in animation -->
      <div class="carousel-controls">
        <button class="arrow-btn">
          <span class="arrow left"></span>
        </button>
        <div class="dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <button class="arrow-btn">
          <span class="arrow right"></span>
        </button>
      </div>
    </main>

    <!-- This slot will render the tab bar on the right -->
    <slot name="tabbar"></slot>
  </div>
</template>

<script setup>
// Props remain the same to accept data from the parent
defineProps({
  braceletId: String,
  templateData: Object,
  title: String
})
</script>

<style scoped>
/* Import a font that matches the hand-drawn style */
@import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Noto+Sans+SC:wght@400;500&display=swap');

.minimal-template {
  font-family: 'Noto Sans SC', 'Inter', sans-serif;
  background-color: #eef2f9; /* Light blue-grey background */
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Background shapes */
.minimal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background-color: #dbe2f1; /* Color of the background circles */
  animation: drift 30s ease-in-out infinite alternate;
}

.shape-1 {
  width: 40vw;
  height: 40vw;
  max-width: 300px;
  max-height: 300px;
  top: 5%;
  left: -10vw;
  animation-delay: -5s;
}

.shape-2 {
  width: 50vw;
  height: 50vw;
  max-width: 400px;
  max-height: 400px;
  bottom: 15%;
  right: -15vw;
}

/* Main card styling */
.home-card {
  width: 100%;
  max-width: 370px;
  height: calc(100% - 80px);
  max-height: 700px;
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 30px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.08);
  /* Entry Animation */
  animation: card-enter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* --- AVATAR & SOCIALS --- */
.avatar-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.pig-avatar {
  position: relative;
  width: 100px;
  height: 100px;
  /* Breathing Animation */
  animation: avatar-float 5s ease-in-out infinite;
}

.pig-head {
  width: 100px;
  height: 100px;
  background: #fff;
  border: 3px solid #000;
  border-radius: 50%;
  position: relative;
}

.eye {
  position: absolute;
  width: 8px;
  height: 20px;
  background-color: #000;
  top: 45%;
}
.eye.left { left: 30px; }
.eye.right { right: 30px; }

.ear {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #000;
  top: -12px;
}
.ear.left { left: 10px; transform: rotate(-20deg); }
.ear.right { right: 10px; transform: rotate(20deg); }

.social-bubble {
  position: absolute;
  background: #fff;
  border: 2px solid #000;
  border-radius: 16px;
  padding: 6px 14px;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  opacity: 0; /* Initially hidden for animation */
  /* Pop-in animation */
  animation: bubble-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.social-bubble::after { /* The little triangle pointer */
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
}

.social-bubble.github { top: 0px; left: -65px; animation-delay: 0.6s; }
.social-bubble.github::after { right: -14px; top: 6px; border-left-color: #000; }

.social-bubble.wechat { top: 10px; right: -80px; animation-delay: 0.8s; }
.social-bubble.wechat::after { left: -14px; top: 8px; border-right-color: #000; }

.social-bubble.linkedin { bottom: -5px; right: -40px; font-family: 'Noto Sans SC', sans-serif; padding: 6px 12px; animation-delay: 1.0s; }
.social-bubble.linkedin::after { left: 10px; top: -14px; border-bottom-color: #000; }


/* --- TEXT & TAGS --- */
.intro-section, .tags-section, .carousel-controls {
  opacity: 0; /* Initially hidden */
  animation: fade-in-up 0.6s ease-out forwards;
}
.intro-section { margin: 1rem 0; animation-delay: 1.2s; }
.tags-section { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 2rem 0; animation-delay: 1.4s; }
.carousel-controls { width: 100%; display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 1rem; animation-delay: 1.6s; }

.greeting {
  font-family: 'Gaegu', cursive;
  font-size: 26px;
  font-weight: 700;
  color: #000;
  margin: 0 0 10px 0;
  position: relative;
}
.greeting::before { content: '✦'; margin-right: 8px; }

.description { font-size: 16px; color: #000; margin: 2px 0; }

.tag {
  background: #fff;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 6px 18px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  transition: transform 0.2s ease-in-out, background-color 0.2s;
}
.tag:hover {
  transform: translateY(-3px) scale(1.05);
  background-color: #fafafa;
}

/* --- CAROUSEL CONTROLS --- */
.arrow-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.arrow-btn:hover { transform: scale(1.1); }
.arrow-btn:active { transform: scale(0.95); transition-duration: 0.1s; }

.arrow { width: 10px; height: 10px; border-top: 3px solid #000; border-right: 3px solid #000; }
.arrow.left { transform: rotate(-135deg); margin-left: 4px; }
.arrow.right { transform: rotate(45deg); margin-right: 4px; }

.dots { display: flex; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background-color: #d9d9d9; }
.dot.active { background-color: #000; }

/* --- KEYFRAME ANIMATIONS --- */
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bubble-pop-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes avatar-float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

@keyframes drift {
  from {
    transform: translateX(-10vw) translateY(-5vh) rotate(0deg);
  }
  to {
    transform: translateX(10vw) translateY(5vh) rotate(30deg);
  }
}
</style>