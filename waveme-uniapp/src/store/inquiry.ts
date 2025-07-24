import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { nickname: '', avatar: '' }

const initState = {
  positions: {
    '0-pre': {},
    '0-post': {},
    '1-post': {},
    '2-pre': {},
    '2-post': {},
    '3-pre': {},
    '3-post': {},
    '4-pre': {},
    '4-post': {},
    '5-pre': {},
    '5-post': {},
    '6-pre': {},
    '6-post': {},
    '7-pre': {},
    '7-post': {},
    // Add more positions as needed
  },
}

export const useInquiryStore = defineStore(
  'inquiry',
  () => {
    const AnsInfo = ref({ ...initState })

    const setInquiryInfo = (val) => {
      console.log('val', val)
      AnsInfo.value = { ...val }
      console.log('AnsInfo.value', AnsInfo.value)
    }

    // const isLogined = computed(() => !!userInfo.value.token)

    return {
      AnsInfo,
      setInquiryInfo,
    }
  },
  {
    persist: true,
  },
)
