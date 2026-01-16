<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { PostLogin, PostLoginWxMin, PostLoginWxMinSimple } from '@/services/login'
import type { LoginResult, LoginTraditionalParams } from '@/types/login'
import { useMemberStore } from '@/stores/modules/member'
import { ref } from 'vue'
import { GetMemberAddresAPI } from '@/services/address'
import { useAddressStore } from '@/stores/modules/address'
import type { AddressItem } from '@/types/address'

// 获得登录所需code
let code = ''
// 获取手机号(个人开发无法使用该api)
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const encryptedData = ev.detail.encryptedData!
  const iv = ev.detail.iv!
  // 小程序手机号快捷登录
  await PostLoginWxMin({ code, encryptedData, iv })
  uni.showToast({
    icon: 'none',
    title: '登录成功',
  })
}
// 模拟快捷登录
const LoginWxMinSimple = async () => {
  const res = await PostLoginWxMinSimple()
  // 触发登录成功事件
  loginSuccess(res.result)
}
// 登录成功
const loginSuccess = async (profile: LoginResult) => {
  // 使用pinia存储
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  const res = await GetMemberAddresAPI()

  // 把默认地址存入store
  const addressStore = useAddressStore()
  const defaultAddress = res.result.find((v: AddressItem) => v.isDefault === 1)
  if (defaultAddress) {
    addressStore.changeSelectedAddress(defaultAddress)
  }

  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
// 账号密码登录
const isTraditional = ref(false)
const userInfo = ref<LoginTraditionalParams>({
  account: '',
  password: '',
})
const onLoginTraditional = async () => {
  await PostLogin(userInfo.value)
  uni.showToast({ icon: 'success', title: '登陆成功' })
  // 由于我不知道账号密码，所以我也不写存储pinia之类的了
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="/src/static/images/Xy-logo.png"></image>
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <template v-if="isTraditional">
        <input
          v-model="userInfo.account"
          class="input"
          type="text"
          placeholder="请输入用户名/手机号码"
        />
        <input
          v-model="userInfo.password"
          class="input"
          type="text"
          password
          placeholder="请输入密码"
        />
        <button class="button phone" @tap="onLoginTraditional">登录</button>
        <br />
        <button class="button phone" @tap="isTraditional = false">返回</button>
      </template>

      <!-- 小程序端授权登录 -->
      <template v-else>
        <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
          <text class="icon icon-phone"></text>
          手机号快捷登录
        </button>
        <view class="extra">
          <view class="caption">
            <text>其他登录方式</text>
          </view>
          <view class="options">
            <!-- 通用模拟登录 -->
            <button @tap="LoginWxMinSimple">
              <text class="icon icon-weixin">模拟快捷登录</text>
            </button>
            <button @tap="isTraditional = true">
              <text class="icon icon-user">账号密码登录</text>
            </button>
          </view>
        </view>
      </template>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
    margin-bottom: 10px;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
