<script setup lang="ts">
// 在 Nuxt 3 中，ref, reactive, onMounted 等 Vue API 会被自动导入，无需手动 import。

// --- 状态管理 ---
const form = reactive({
  phone: '',
  bracelet_color: '',
  bracelet_id: ''
});
const error = ref<string | null>(null);
const success = ref(false);
const isLoading = ref(false); // 添加加载状态，提升用户体验

// --- 辅助函数 ---
function generateUUID() {
  // 在现代浏览器和 Node.js 环境中，crypto.randomUUID 是可用的
  // Nuxt 服务端和客户端都支持
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // 回退方案
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// --- 事件处理函数 ---
function handleGenerateId() {
  form.bracelet_id = generateUUID();
}

async function handleSubmit() {
  if (isLoading.value) return; // 防止重复提交

  if (!form.phone || !form.bracelet_color || !form.bracelet_id) {
    error.value = 'Phone、Color、String ID 必填';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    // 读取环境变量
    const apiBase = useRuntimeConfig().public.API_BASE || 'http://localhost:8080/api';
    console.log(form)
    const response = await $fetch(`${apiBase}/users/create`, {
      method: 'POST',
      body: form
    });

    console.log(response);

    success.value = true;
    Object.assign(form, { phone: '', bracelet_color: '', bracelet_id: '' });

    setTimeout(() => {
      success.value = false;
    }, 1500);

  } catch (e: any) {
    error.value = e.data?.message || '提交失败，请稍后重试。';
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="main-bg min-h-screen flex flex-col justify-center items-center py-16">
    <div class="card-container w-full max-w-md mx-auto p-8">
      <h2 class="title mb-10">新增用户</h2>

      <div v-if="error" class="error-alert mb-6">{{ error }}</div>

      <form @submit.prevent="handleSubmit" class="form-box mb-10 space-y-7">
        <div class="space-y-6">
          <input
            v-model="form.phone"
            name="phone"
            placeholder="Phone"
            required
            class="input-box w-full"
          />
          <select
            v-model="form.bracelet_color"
            name="bracelet_color"
            required
            class="input-box w-full"
          >
            <option value="" disabled>选择颜色</option>
            <option value="black">黑色</option>
            <option value="blue">蓝色</option>
          </select>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button type="button" @click="handleGenerateId" class="genid-btn flex-shrink-0 w-full sm:w-auto">
            生成 String ID
          </button>
          <span class="text-orange-400 break-all font-mono text-sm w-full sm:w-auto text-center">{{ form.bracelet_id }}</span>
        </div>

        <button type="submit" class="submit-btn w-full mt-2" :disabled="!form.bracelet_id || isLoading">
          <span class="flex items-center justify-center gap-2">
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {{ isLoading ? '添加中...' : '添加用户' }}
          </span>
        </button>
      </form>

      <button
        @click="navigateTo('/user/list')"
        class="list-btn w-full"
      >
        查看用户列表
      </button>

      <Transition name="fade">
        <div v-if="success" class="success-modal">
          <div class="success-content">
            <svg class="mr-2 h-6 w-6 text-white inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            用户添加成功！
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.main-bg {
  background: linear-gradient(135deg, #181818 60%, #232323 100%);
  min-height: 100vh;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
.card-container {
  background: rgba(24, 24, 24, 0.98);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(255, 136, 0, 0.15), 0 1.5px 8px 0 #000;
  border: 1.5px solid #232323;
}
.title {
  font-size: 2.2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #ff8800 30%, #ffb347 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: 1px;
  text-align: center;
}
.form-box {
  background: rgba(35, 35, 35, 0.95);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(255, 136, 0, 0.08);
}
.input-box {
  background: #232323;
  border: 1.5px solid #333;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px 0 rgba(255, 136, 0, 0.05);
}
.input-box:focus {
  border-color: #ff8800;
  box-shadow: 0 0 0 2px #ff880055;
  outline: none;
}
.genid-btn {
  background: linear-gradient(90deg, #ff8800 60%, #ffb347 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 2px 8px 0 rgba(255, 136, 0, 0.12);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  cursor: pointer;
}
.genid-btn:hover {
  background: linear-gradient(90deg, #ff8800 80%, #ffb347 100%);
  box-shadow: 0 4px 16px 0 rgba(255, 136, 0, 0.18);
  transform: translateY(-2px) scale(1.03);
}
.submit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #ff8800 60%, #ffb347 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px 0 rgba(255, 136, 0, 0.13);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  cursor: pointer;
}
.submit-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #ff8800 80%, #ffb347 100%);
  box-shadow: 0 4px 16px 0 rgba(255, 136, 0, 0.20);
  transform: translateY(-2px) scale(1.04);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.list-btn {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 0;
  border-radius: 0.9rem;
  background: linear-gradient(90deg, #232323 60%, #ff8800 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px 0 rgba(255, 136, 0, 0.10);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  cursor: pointer;
}
.list-btn:hover {
  background: linear-gradient(90deg, #ff8800 80%, #232323 100%);
  box-shadow: 0 4px 16px 0 rgba(255, 136, 0, 0.18);
  transform: translateY(-2px) scale(1.02);
}
.error-alert {
  background: linear-gradient(90deg, #ff3c00 60%, #ff8800 100%);
  border-radius: 0.7rem;
  color: #fff;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px 0 rgba(255, 60, 0, 0.10);
  border: none;
}
.success-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: rgba(24, 24, 24, 0.7);
  backdrop-filter: blur(2px);
}
.success-content {
  background: linear-gradient(90deg, #22c55e 60%, #16a34a 100%);
  color: #fff;
  padding: 1.2rem 2.5rem;
  border-radius: 1.2rem;
  font-size: 1.3rem;
  font-weight: 700;
  box-shadow: 0 4px 24px 0 rgba(34, 197, 94, 0.18);
  display: flex;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>