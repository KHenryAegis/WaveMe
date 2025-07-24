import { http } from '@/utils/http'

export interface User {
  userId: string
  username: string
  phone: string
  currProgress: number
  avatar: string
  role: string
  groupId: number
}

export const getPhoneNumberApi = (openid: string, code: string) => {
  return http.post<User>('/getphone', { openid, code }, {})
}

export const getUserInfo = (token: string) => {
  return http.post<User>('/user/getUserInfo', { token }, {})
}

export const getAllUserInfo = () => {
  return http.post<User>('/user/getAllUser', {}, {})
}

export const getAllPreUserInfo = () => {
  return http.post<User>('/user/getPreUser', {}, {})
}

export const logout = () => {
  return http.post<null>('/logout', {}, {})
}

export const test = () => {
  return http.post('/question/test', {}, {})
}

export const setUserAvatar = (avatar: string) => {
  return http.post<User>('/user/setAvatar', { url: avatar }, {})
}

export const setUserName = (name: string) => {
  return http.post<User>(`/user/setName?name=${name}`, {}, {})
}

export const evalRole = (key: string) => {
  return http.post(`/user/evalRole?key=${key}`, {}, {})
}

export const setRole = (role: string) => {
  return http.post(`/user/setRole?role=${role}`, {}, {})
}
