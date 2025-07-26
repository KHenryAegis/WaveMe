/**
 * API 工具函数
 */

/**
 * 上传文件到服务器
 * @param file 要上传的文件
 * @param description 文件描述（可选）
 * @param additionalData 额外的表单数据（可选）
 * @returns Promise<any> 上传结果
 */
export const uploadFile = async (
  file: File, 
  description?: string, 
  additionalData?: Record<string, string>
) => {
  const config = useRuntimeConfig()
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    // 添加描述信息
    if (description) {
      formData.append('description', description)
    }
    
    // 添加额外的数据
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }
    
    // 使用config中配置的baseURL
    const apiUrl = `${config.public.API_BASE}/files/upload`
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    console.log('Upload response:', response)
    
    if (!response.ok) {
      throw new Error(`上传失败: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('图片上传错误:', error)
    throw error
  }
}

/**
 * 上传图片文件（专门用于图片上传的便捷方法）
 * @param file 图片文件
 * @param title 图片标题
 * @param description 图片描述
 * @param date 日期
 * @returns Promise<any> 上传结果
 */
export const uploadImage = async (
  file: File,
  title: string,
  description?: string,
  date?: string
) => {
  const additionalData: Record<string, string> = {
    title
  }
  
  if (date) {
    additionalData.date = date
  }
  
  return uploadFile(file, description, additionalData)
}

/**
 * 通用的API请求函数
 * @param endpoint API端点（相对路径）
 * @param options fetch选项
 * @returns Promise<any> 请求结果
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const config = useRuntimeConfig()
  
  try {
    const apiUrl = `${config.public.API_BASE}${endpoint}`
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    console.log(`API request to ${apiUrl}:`, response)
    
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error(`API请求错误 (${endpoint}):`, error)
    throw error
  }
}

/**
 * GET请求
 */
export const apiGet = (endpoint: string) => {
  return apiRequest(endpoint, { method: 'GET' })
}

/**
 * POST请求
 */
export const apiPost = (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * PUT请求
 */
export const apiPut = (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

/**
 * DELETE请求
 */
export const apiDelete = (endpoint: string) => {
  return apiRequest(endpoint, { method: 'DELETE' })
}
