import { http } from '@/utils/http'
export interface IQuestionItem {
  questionId: number
  content: string
  options: string
  questionType: string
  url: string
  interId: string
}

export interface IStartInter {
  userId: string
  interId: number
  startTime: string
}

export interface ISubmitInter {
  userId: string
  interId: number
  endTime: string
  inputPages: string
  inputContent: string
}

type IInterPageReturn = {
  interId: number
  recordId: number
  interPages: Array<IInterPage>
}

type IInterPage = {
  pageId: number
  interId: number
  imgUrl: string
  textContent: string
  navbarTitle: string
  operationIcon: string
  operationText: string
  slideImages: Array<string>
  inputQuestions: Array<string>
  inputPlaceholders: Array<string>
  buttonUrls: Array<string>
  audioUrls: Array<string>
  selectUrls: Array<string>
  specialPage: string
  pageType: string
}

/** POST 请求 */
export const getPagesByInterId = (interId: number) => {
  return http.post<IQuestionItem[]>(`/inter/getAllInterPages?interId=${interId}`, {}, {})
}

export const getPageByInterId = (interId: number, pageId: number) => {
  return http.post<IInterPage>(
    `/inter/getInterPageById?interId=${interId}&pageId=${pageId}`,
    {},
    {},
  )
}

export const startInter = (startInter: IStartInter) => {
  return http.post<IInterPageReturn>(`/inter/startInter`, startInter, {})
}

export const submitInter = (submitInter: ISubmitInter) => {
  return http.post(`/inter/submitInter`, submitInter, {})
}

export const checkInterAvailability = (interId: number) => {
  return http.post(`/inter/checkInterAvailability?interId=${interId}`, {}, {})
}

export const getUserGoal = () => {
  return http.post<string>(`/inter/getUserGoal`, {}, {})
}
