import { http } from '@/utils/http'
export interface IHuibidangan {
  userId: string
  date: string
  huibiName: string
  qingjing: string
  ganshou: string
  changshi: string
  yingxiang: string
  zenme: string
}

export interface IHuibidanganReturn {
  huibiId: string
  userId: string
  date: string
  huibiName: string
  qingjing: string
  ganshou: string
  changshi: string
  yingxiang: string
  zenme: string
  recordId: number
}

export const getAllUserHuibidangan = () => {
  return http.post<IHuibidanganReturn[]>('/huibidangan/getAllUserHuibidangan', {}, {})
}

export const submitHuibidangan = (submitObj: IHuibidangan) => {
  return http.post('/huibidangan/submitHuibidangan', submitObj, {})
}
