<template>
  <div class="page-container">
    <div class="welcome-page">
      <h1 class="welcome-title">欢迎! Welcome!</h1>
      <p class="welcome-text">
        This is the main entry page.
      </p>
      <p class="welcome-text">
        To view a profile, navigate to a URL like:
        <br>
        <NuxtLink to="/bracelet/12345">
          <code>/bracelet/12345</code>
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple page
</script>

<style scoped>
/* 页面容器 - 固定高度，防止滚动 */
.page-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%);
  padding: 1rem;
  box-sizing: border-box;
}

.welcome-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: clamp(1rem, 4vw, 2rem);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: clamp(10px, 3vw, 20px);
  border: 2px solid #555;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: min(90vw, 400px);
  max-height: 80vh;
  font-family: 'ZCOOL KuaiLe', sans-serif;
  text-align: center;
}

.welcome-title {
  font-size: clamp(2rem, 6vw, 3rem);
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.welcome-text {
  font-size: clamp(1rem, 3.5vw, 1.5rem);
  margin-top: 1rem;
  font-family: 'Indie Flower', cursive;
  line-height: 1.5;
  word-wrap: break-word;
}

.welcome-text code {
  background-color: #e0e0e0;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-family: monospace;
  color: #c7254e;
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  display: inline-block;
  margin-top: 0.5rem;
}

.welcome-text a {
  text-decoration: none;
}

.welcome-text a:hover code {
  background-color: #d0d0d0;
  transform: scale(1.05);
  transition: all 0.2s ease;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .page-container {
    padding: 0.5rem;
  }
  
  .welcome-page {
    width: 95vw;
    padding: 1.5rem 1rem;
  }
  
  .welcome-title {
    margin-bottom: 0.8rem;
  }
  
  .welcome-text {
    margin-top: 0.8rem;
  }
}

@media (max-width: 320px) {
  .welcome-page {
    width: 98vw;
    padding: 1rem 0.8rem;
  }
}

/* 超小屏设备 */
@media (max-height: 600px) {
  .welcome-page {
    max-height: 90vh;
    padding: 1rem;
  }
  
  .welcome-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
  }
  
  .welcome-text {
    font-size: clamp(0.9rem, 3vw, 1.3rem);
    margin-top: 0.8rem;
  }
}
</style>
