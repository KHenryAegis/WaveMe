import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { nickname: '', avatar: '' }
const initState = {
  userId: '1',
  username: '未登录用户',
  phone: '1234567890',
  currProgress: 0,
  avatar: 'http://115.159.83.61:9000/common/avatar.png',
  role: 'user',
  groupId: 0,
  token: '',
  // 这个字段记录，下一次应该解锁的时间
  lockTime: -1,
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = { ...val }
    }

    const setUserToken = (token: string) => {
      userInfo.value.token = token
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }

    const setLockTime = () => {
      // 24小时后解锁
      userInfo.value.lockTime = new Date().getTime() + 24 * 60 * 60 * 1000
    }

    const setRole = (role) => {
      // 24小时后解锁
      userInfo.value.role = role
    }
    const addProgress = () => {
      userInfo.value.currProgress = userInfo.value.currProgress + 1
    }
    // const isLogined = computed(() => !!userInfo.value.token)
    const isLogined = computed(() => userInfo.value.token !== '' && userInfo.value.token !== null)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      setUserToken,
      addProgress,
      setLockTime,
      setRole,
    }
  },
  {
    persist: true,
  },
)
