// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

// type IUserInfo = {
//   nickname?: string
//   avatar?: string
//   /** 微信的 openid，非微信没有这个字段 */
//   openid?: string
//   token?: string
// }

type IUserInfo = {
  userId: string
  username: string
  phone: string
  currProgress: number
  avatar: string
  role: string
  groupId: number
  token: string
  lockTime: number
}

// export interface User {
//   userId: string
//   username: string
//   wechatId: string
//   wechatName: string
//   phone: string
//   currProgress: number
//   avatar: string
// }

enum TestEnum {
  A = 'a',
  B = 'b',
}
