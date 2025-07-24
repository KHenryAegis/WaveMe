import { http } from '@/utils/http'
export interface ISanjianxiaoshi {
  userId: string
  date: string
  statusUrl: string
  one: string
  two: string
  three: string
}

export interface ISanjianxiaoshiReturn {
  sanjianId: string
  userId: string
  date: string
  statusUrl: string
  one: string
  two: string
  three: string
}

export const getAllUserSanjianxiaoshi = () => {
  return http.post<ISanjianxiaoshiReturn[]>('/sanjianxiaoshi/getAllUserSanjianxiaoshi', {}, {})
}

export const submitSanjianxiaoshi = (submitObj: ISanjianxiaoshi) => {
  return http.post('/sanjianxiaoshi/submitSanjianxiaoshi', submitObj, {})
}
