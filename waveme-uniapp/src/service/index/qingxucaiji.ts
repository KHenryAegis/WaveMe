import { http } from '@/utils/http'
export interface IQingxucaiji {
  userId: string
  date: string
  feelingUrl: string
  feelingName: string
  renzhi: string
  xingwei: string
  shengli: string
  chansheng: string
  yingdui: string
  qixiao: string
}

export interface IQingxucaijiReturn {
  qingxuId: string
  userId: string
  date: string
  feelingUrl: string
  feelingName: string
  renzhi: string
  xingwei: string
  shengli: string
  chansheng: string
  yingdui: string
  qixiao: string
  recordId: number
}

export const getAllUserQingxucaiji = () => {
  return http.post<IQingxucaijiReturn[]>('/qingxucaiji/getAllUserQingxucaiji', {}, {})
}

export const submitQingxucaiji = (submitObj: IQingxucaiji) => {
  return http.post('/qingxucaiji/submitQingxucaiji', submitObj, {})
}
