/** 小程序快捷登录 请求参数类型 */
export type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/** 小程序账号密码登录 请求参数类型 */
export type LoginTraditionalParams = {
  account: string
  password: string
}

/** 小程序登录 登录用户信息 */
export type LoginResult = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}

/** 小程序账号密码登录 登录用户信息 */
export type LoginTraditionalResult = {
  id: number
  mobile: string
  token: string
  nickname: string
  avatar: string
  gender: string
  birthday: string
  cityCode: string
  provinceCode: string
  profession: string
}
