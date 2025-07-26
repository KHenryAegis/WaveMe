/**
 * 用户相关的API接口
 */

/**
 * 检查用户是否存在
 * @param braceletId 手环ID
 * @returns Promise<boolean> 返回true表示用户存在，false表示不存在
 */
export const checkUserExists = async (braceletId: string): Promise<boolean> => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch<{ exists: number }>(`${config.public.API_BASE}/user/check`, {
      method: 'GET',
      params: {
        bracelet_id: braceletId
      }
    })
    
    // 后端返回1表示存在，0表示不存在
    return response.exists === 1
  } catch (error) {
    console.error('检查用户是否存在时发生错误:', error)
    // 发生错误时默认返回false
    return false
  }
}

/**
 * 获取用户信息
 * @param braceletId 手环ID
 * @returns Promise<UserInfo | null> 返回用户信息或null
 */
export interface UserInfo {
  id: string
  name: string
  bracelet_color: string
  avatar?: string
  created_at: string
  updated_at: string
}

export const getUserInfo = async (braceletId: string): Promise<UserInfo | null> => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch<UserInfo>(`${config.public.API_BASE}/user/${braceletId}`, {
      method: 'GET'
    })
    
    return response
  } catch (error) {
    console.error('获取用户信息时发生错误:', error)
    return null
  }
}

/**
 * 获取用户手环颜色
 * @param braceletId 手环ID
 * @returns Promise<string> 返回手环颜色，默认为'blue'
 */
export const getUserBraceletColor = async (braceletId: string): Promise<string> => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch<{ bracelet_color: string }>(`${config.public.API_BASE}/user/${braceletId}/color`, {
      method: 'GET'
    })
    
    return response.bracelet_color || 'blue'
  } catch (error) {
    console.error('获取用户手环颜色时发生错误:', error)
    // 发生错误时返回默认颜色
    return 'blue'
  }
}