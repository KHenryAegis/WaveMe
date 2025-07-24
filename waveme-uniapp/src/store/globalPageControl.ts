import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  toDaolanHome: false,
  firstStepPage6_2: false,
  firstStepPage15_2: false,
  firstStepPage24_2: false,
  secondStepPage24_2: false,
  firstStepPage27_3: false,
  secondStepPage27_3: false,
  firstStepPage37_4: false,
  secondStepPage37_4: false,
  firstStepPage18_5: false,
}

// 命名规则: xxxStepPage(page_id)_(inter_id)
type IGlobalPageState = {
  toDaolanHome: boolean
  firstStepPage6_2: boolean
  firstStepPage15_2: boolean
  firstStepPage24_2: boolean
  secondStepPage24_2: boolean
  firstStepPage27_3: boolean
  secondStepPage27_3: boolean
  firstStepPage37_4: boolean
  secondStepPage37_4: boolean
  firstStepPage18_5: boolean
}

export const useGlobalPageControlStore = defineStore(
  'globalPageControl',
  () => {
    const globalPageControlInfo = ref<IGlobalPageState>({ ...initState })

    const setInterInfo = (val: IGlobalPageState) => {
      globalPageControlInfo.value = val
    }

    const clearInternfo = () => {
      globalPageControlInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      globalPageControlInfo.value = { ...initState }
    }

    return {
      globalPageControlInfo,
      setInterInfo,
      clearInternfo,
      reset,
    }
  },
  {
    persist: true,
  },
)
