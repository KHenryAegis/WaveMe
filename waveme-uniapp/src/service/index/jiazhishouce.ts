import { http } from '@/utils/http'
export interface IJiazhishouce {
  userId: string
  date: string
  lingyu: string
  miaoshu: string
  yitu: string
  pingjia: string
  shiqing: string
}

export interface IJiazhishouceReturn {
  jiazhiId: string
  userId: string
  date: string
  lingyu: string
  miaoshu: string
  yitu: string
  pingjia: string
  shiqing: string
  recordId: number
}

export const getAllUserJiazhishouce = () => {
  return http.post<IJiazhishouceReturn[]>('/jiazhishouce/getAllUserJiazhishouce', {}, {})
}

export const submitJiazhishouce = (submitObj: IJiazhishouce) => {
  return http.post('/jiazhishouce/submitJiazhishouce', submitObj, {})
}
