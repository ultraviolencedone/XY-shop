import type { CategoryTopItem } from '@/types/category'
import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

// 分类-广告区域-小程序
// 参数为2
export const getCategoryBannerAPI = () => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite: 2,
    },
  })
}

// 分类列表-小程序
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
