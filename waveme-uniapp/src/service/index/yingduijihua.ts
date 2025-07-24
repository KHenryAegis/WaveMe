import { http } from '@/utils/http'
export interface IYingduijihua {
  userId: string
  date: string
  jihuaName: string
  qingjing: string
  celue: string
  duanqi: string
  changqi: string
}

export interface IYingduijihuahuaReturn {
  yingduiId: string
  userId: string
  date: string
  jihuaName: string
  qingjing: string
  celue: string
  duanqi: string
  changqi: string
  recordId: number
}

export const getAllUserYingduijihua = () => {
  return http.post<IYingduijihuahuaReturn[]>('/yingduijihua/getAllUserYingduijihua', {}, {})
}

export const submitYingduijihua = (submitObj: IYingduijihua) => {
  return http.post('/yingduijihua/submitYingduijihua', submitObj, {})
}
