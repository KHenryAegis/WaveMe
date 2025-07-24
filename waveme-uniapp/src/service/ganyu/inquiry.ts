import { http } from '@/utils/http'
export interface InquiryOption {
  text: string
  score: number
}

export interface InquiryItem {
  groupId: string
  groupIndex: string
  inquiryId: number
  options: InquiryOption[]
  position: string
  question: string
}

export interface InquiryResultItem {
  //   userId: string
  inquiryId: number
  position: string
  score: number
  interId: number
}

export type InquiryResultArray = InquiryResultItem[]

/** POST 请求 */
export const getInquiryByPos = (pos: string) => {
  return http.post<InquiryItem[]>(`/inquiry/getAll?position=${pos}`, {}, {})
}

export const submitInquiry = (data: InquiryResultArray) => {
  return http.post<InquiryItem[]>(`/inquiry/submit`, data)
}
