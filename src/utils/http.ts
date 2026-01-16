import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // request 触发前拼接 url
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 设置请求超时时间为10秒
    options.timeout = 10000
    // 添加请求头
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: number
  message: string
  result: T
}

// 封装请求函数
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          uni.showToast({
            icon: 'none',
            title: '请重新登录',
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).message || '请求失败',
          })
          reject(res.data)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}
