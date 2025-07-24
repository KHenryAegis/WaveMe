import { http } from '@/utils/http'
export interface IJienalianxi {
  userId: string
  date: string
  name: string
  qingjing: string
  ganshou: string
  xingdong: string
  zhidao: string
  gaosu: string
}

export interface IJienalianxiReturn {
  jienaId: string
  userId: string
  date: string
  name: string
  qingjing: string
  ganshou: string
  xingdong: string
  zhidao: string
  gaosu: string
  recordId: number
}

export const getAllUserJienalianxi = () => {
  return http.post<IJienalianxiReturn[]>('/jienalianxi/getAllUserJienalianxi', {}, {})
}

export const submitJienalianxi = (submitObj: IJienalianxi) => {
  return http.post('/jienalianxi/submitJienalianxi', submitObj, {})
}
