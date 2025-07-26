# 用户API使用说明

## 概述

本文档描述了用户相关API的使用方法，包括检查用户是否存在、获取用户信息等功能。

## API方法

### checkUserExists(braceletId: string): Promise<boolean>

检查指定手环ID的用户是否存在。

**参数:**
- `braceletId`: 手环ID (字符串)

**返回值:**
- `Promise<boolean>`: 返回Promise，解析为布尔值
  - `true`: 用户存在
  - `false`: 用户不存在或发生错误

**使用示例:**

```typescript
import { checkUserExists } from '~/api/user'

// 在组件中使用
const checkUser = async (braceletId: string) => {
  try {
    const exists = await checkUserExists(braceletId)
    if (exists) {
      console.log('用户存在')
      // 执行用户存在的逻辑
    } else {
      console.log('用户不存在')
      // 执行用户不存在的逻辑，比如跳转到404页面
    }
  } catch (error) {
    console.error('检查用户时发生错误:', error)
  }
}
```

### getUserBraceletColor(braceletId: string): Promise<string>

获取用户的手环颜色。

**参数:**
- `braceletId`: 手环ID (字符串)

**返回值:**
- `Promise<string>`: 返回Promise，解析为颜色字符串，默认为'blue'

**使用示例:**

```typescript
import { getUserBraceletColor } from '~/api/user'

const getUserColor = async (braceletId: string) => {
  try {
    const color = await getUserBraceletColor(braceletId)
    console.log(`用户手环颜色: ${color}`)
    // 根据颜色设置主题
  } catch (error) {
    console.error('获取手环颜色时发生错误:', error)
  }
}
```

### getUserInfo(braceletId: string): Promise<UserInfo | null>

获取完整的用户信息。

**参数:**
- `braceletId`: 手环ID (字符串)

**返回值:**
- `Promise<UserInfo | null>`: 返回Promise，解析为用户信息对象或null

**UserInfo接口:**

```typescript
interface UserInfo {
  id: string
  name: string
  bracelet_color: string
  avatar?: string
  created_at: string
  updated_at: string
}
```

**使用示例:**

```typescript
import { getUserInfo } from '~/api/user'

const loadUserInfo = async (braceletId: string) => {
  try {
    const userInfo = await getUserInfo(braceletId)
    if (userInfo) {
      console.log('用户信息:', userInfo)
      // 使用用户信息更新UI
    } else {
      console.log('未找到用户信息')
    }
  } catch (error) {
    console.error('获取用户信息时发生错误:', error)
  }
}
```

## 在Vue组件中的完整使用示例

```vue
<template>
  <div>
    <div v-if="isCheckingUser" class="loading">
      检查用户中...
    </div>
    <div v-else-if="userExists === false" class="error">
      用户不存在
    </div>
    <div v-else-if="userExists === true" class="content">
      <!-- 用户存在时显示的内容 -->
      <h1>欢迎回来！</h1>
      <p>手环颜色: {{ braceletColor }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { checkUserExists, getUserBraceletColor } from '~/api/user'

const route = useRoute()
const userId = computed(() => route.params.id)

const userExists = ref(null) // null: 未检查, true: 存在, false: 不存在
const isCheckingUser = ref(false)
const braceletColor = ref('blue')

const checkUser = async () => {
  if (!userId.value) return
  
  isCheckingUser.value = true
  try {
    const exists = await checkUserExists(userId.value)
    userExists.value = exists
    
    if (exists) {
      // 用户存在，加载用户数据
      const color = await getUserBraceletColor(userId.value)
      braceletColor.value = color
    }
  } catch (error) {
    console.error('检查用户时发生错误:', error)
    userExists.value = false
  } finally {
    isCheckingUser.value = false
  }
}

onMounted(() => {
  checkUser()
})
</script>
```

## 后端API接口规范

这些前端方法对应的后端接口规范：

### 检查用户是否存在
- **路径**: `GET /api/user/check`
- **参数**: `bracelet_id` (query参数)
- **响应**: `{ "exists": 1 }` 或 `{ "exists": 0 }`

### 获取用户手环颜色
- **路径**: `GET /api/user/{bracelet_id}/color`
- **响应**: `{ "bracelet_color": "blue" }`

### 获取用户信息
- **路径**: `GET /api/user/{bracelet_id}`
- **响应**: UserInfo对象

## 错误处理

所有API方法都包含了错误处理：
- 网络错误会被捕获并记录到控制台
- 检查用户存在失败时默认返回false
- 获取颜色失败时默认返回'blue'
- 获取用户信息失败时返回null
