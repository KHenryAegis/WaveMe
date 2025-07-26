<template>
  <div class="form-section">
    <div class="list-header">
      <h3 class="section-title">{{ title }}</h3>
      <button @click="addItem" class="add-button">＋ {{ addLabel }}</button>
    </div>

    <div v-if="localItems.length === 0" class="empty-state">
      暂无{{ itemSingular }}，点击右上角按钮添加。
    </div>

    <transition-group name="list-anim" tag="div" class="list-container">
      <div v-for="(item, index) in localItems" :key="index" class="list-item">
        <button @click="removeItem(index)" class="delete-button">×</button>

        <div v-if="isSimpleList" class="simple-list-item">
          <input
            type="text"
            v-model="localItems[index]"
            placeholder="输入标签..."
          />
        </div>

        <div v-else class="complex-list-item">
          <div
            v-for="(value, key) in item"
            :key="key"
            class="form-group"
          >
            <label>{{ key }}</label>
            <textarea
              v-if="['description','abstract','content'].includes(key)"
              rows="3"
              v-model="item[key]"
            ></textarea>

            <div v-else-if="Array.isArray(value)" class="sub-list">
              <div
                v-for="(subItem, subIndex) in value"
                :key="subIndex"
                class="sub-list-item"
              >
                <input type="text" v-model="value[subIndex]" />
                <button
                  @click="removeSubItem(item, key, subIndex)"
                  class="sub-delete-button"
                >-</button>
              </div>
              <button
                @click="addSubItem(item, key)"
                class="sub-add-button"
              >+ 添加</button>
            </div>

            <select
              v-else-if="key === 'type' && title.includes('会议')"
              v-model="item[key]"
            >
              <option value="oral">口头报告</option>
              <option value="poster">海报展示</option>
            </select>

            <select v-else-if="key === 'status'" v-model="item[key]">
              <option value="granted">已授权</option>
              <option value="pending">申请中</option>
            </select>

            <input v-else type="text" v-model="item[key]" />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  title: String,
  items: Array,
  itemSingular: { type: String, default: '项' },
  itemSchema: [Object, String],
  isSimpleList: { type: Boolean, default: false }
});
const emit = defineEmits(['update:items']);

const localItems = ref(JSON.parse(JSON.stringify(props.items)));
watch(
  localItems,
  (newVal) => emit('update:items', newVal),
  { deep: true }
);

const addLabel = computed(() => `添加${props.itemSingular}`);
const addItem = () => {
  const newItem = props.isSimpleList
    ? ''
    : JSON.parse(JSON.stringify(props.itemSchema));
  localItems.value.push(newItem);
};
const removeItem = (i) => localItems.value.splice(i, 1);
const addSubItem = (item, key) => item[key].push('');
const removeSubItem = (item, key, idx) => item[key].splice(idx, 1);
</script>

<style scoped>
.form-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.list-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}
.add-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.add-button:hover {
  background-color: #2563eb;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  color: #6b7280;
}

.list-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.list-item {
  /* 去除默认列表标记 */
  list-style: none;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
.list-item::marker {
  content: none;
}

.delete-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.delete-button:hover {
  transform: scale(1.1);
}

.simple-list-item input,
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  margin-top: 0.25rem;
}

.complex-list-item {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sub-list-item {
  display: flex;
  gap: 0.5rem;
}
.sub-delete-button,
.sub-add-button {
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
}
.sub-delete-button {
  color: #dc2626;
}
.sub-add-button {
  color: #2563eb;
}

/* 动画 */
.list-anim-enter-active,
.list-anim-leave-active {
  transition: all 0.3s ease;
}
.list-anim-enter-from,
.list-anim-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 640px) {
  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .add-button {
    width: 100%;
    text-align: center;
  }
}
</style>
