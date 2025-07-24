import { http } from '@/utils/http'
export interface IXingdongjihua {
  userId: string
  date: string
  jihuaName: string
  lingyu: string
  jiazhi: string
  yitu: string
  mubiao: string
  xingdong: string
  xingdongTime: string
  zhangai: string
  yingdui: string
}

export interface IXingdongjihuaReturn {
  xingdongId: string
  userId: string
  date: string
  jihuaName: string
  lingyu: string
  jiazhi: string
  yitu: string
  mubiao: string
  xingdong: string
  xingdongTime: string
  zhangai: string
  yingdui: string
  recordId: number
}

export const getAllUserXingdongjihua = () => {
  return http.post<IXingdongjihuaReturn[]>('/xingdongjihua/getAllUserXingdongjihua', {}, {})
}

export const submitXingdongjihua = (submitObj: IXingdongjihua) => {
  return http.post('/xingdongjihua/submitXingdongjihua', submitObj, {})
}
