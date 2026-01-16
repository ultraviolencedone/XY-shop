import { http } from '@/utils/http'
import type { HotResult } from '@/types/hot'

type HotParams = {
  subType?: string
  pageSize?: number
  page?: number
}
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
