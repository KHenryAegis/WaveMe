import { http } from '@/utils/http'

export const uploadImg = (data) => {
  return http.post('/upload/img', { data }, {})
}
