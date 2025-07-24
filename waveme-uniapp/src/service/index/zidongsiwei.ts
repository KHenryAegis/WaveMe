import { http } from '@/utils/http'
export interface IZidongsiwei {
  userId: string
  date: string
  qingjing: string
  ganshou: string
  zidongsiwei: string
  houxuyingxiang: string
  siweiName: string
  monsterUrl: string
  ruheshibie: string
}

export interface IZidongsiweiReturn {
  siweiId: string
  userId: string
  date: string
  qingjing: string
  ganshou: string
  zidongsiwei: string
  houxuyingxiang: string
  siweiName: string
  monsterUrl: string
  ruheshibie: string
  recordId: number
}

export const getAllUserZidongsiwei = () => {
  return http.post<IZidongsiweiReturn[]>('/zidongsiwei/getAllUserZidongsiwei', {}, {})
}

export const submitZidongsiwei = (submitObj: IZidongsiwei) => {
  return http.post('/zidongsiwei/submitZidongsiwei', submitObj, {})
}
