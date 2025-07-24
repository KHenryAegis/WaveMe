import { http } from '@/utils/http'
export interface IZhengnianlianxi {
  userId: string
  date: string
  qingjing: string
  qingxu: string
  bianhua: string
  zenyang: string
  ganshou: string
}

export interface IZhengnianlianxiReturn {
  zhengnianId: string
  userId: string
  date: string
  qingjing: string
  qingxu: string
  bianhua: string
  zenyang: string
  ganshou: string
  recordId: number
}

export const getAllUserZhengnianlianxi = () => {
  return http.post<IZhengnianlianxiReturn[]>('/zhengnianlianxi/getAllUserZhengnianlianxi', {}, {})
}

export const submitZhengnianlianxi = (submitObj: IZhengnianlianxi) => {
  return http.post('/zhengnianlianxi/submitZhengnianlianxi', submitObj, {})
}
