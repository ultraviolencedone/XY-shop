import type {
  LoginParams,
  LoginResult,
  LoginTraditionalParams,
  LoginTraditionalResult,
} from '@/types/login'
import { http } from '@/utils/http'

// 小程序登录（一键登录）
export const PostLoginWxMin = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
// 模拟快捷登录
export const PostLoginWxMinSimple = () => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber: '15520031020',
    },
  })
}
// 传统登录-用户名+密码
export const PostLogin = (data: LoginTraditionalParams) => {
  return http<LoginTraditionalResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data,
  })
}
