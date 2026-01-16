<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { GetMemberProfileAPI, PutMemberProfile } from '@/services/member'
import type { Gender, ProfileDetail } from '@/types/member'
import { useMemberStore } from '@/stores'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 响应式数据
const profileDetail = ref<ProfileDetail>()

// 计算属性：昵称（处理可选链，避免 v-model 错误）
const nickname = computed({
  get: () => profileDetail.value?.nickname || '',
  set: (value: string) => {
    if (profileDetail.value) {
      profileDetail.value.nickname = value
    }
  },
})

// 计算属性：昵称（处理可选链，避免 v-model 错误）
const profession = computed({
  get: () => profileDetail.value?.profession || '',
  set: (value: string) => {
    if (profileDetail.value) {
      profileDetail.value.profession = value
    }
  },
})

// 页面加载时获取用户信息
onLoad(async () => {
  const res = await GetMemberProfileAPI()
  profileDetail.value = res.result
})

//修改性别
const onChangeGender: UniHelper.RadioGroupOnChange = (ev) => {
  if (profileDetail.value) {
    profileDetail.value.gender = ev.detail.value as Gender
  }
}

//修改生日
const onBirthdayChange: UniHelper.DatePickerOnChange = (ev) => {
  if (profileDetail.value) {
    profileDetail.value.birthday = ev.detail.value as string
  }
}

// 修改城市
let cityName: [string, string, string] = ['', '', '']
const onChangeCity: UniHelper.RegionPickerOnChange = (ev) => {
  if (profileDetail.value) {
    cityName = ev.detail.code!
    profileDetail.value.fullLocation = ev.detail.value.join(' ')
  }
}

const memberStore = useMemberStore()

// 修改个人信息
const updateProfile = async () => {
  if (!profileDetail.value) return
  const { gender, birthday } = profileDetail.value
  await PutMemberProfile({
    nickname: nickname.value,
    gender,
    birthday,
    profession: profession.value,
    provinceCode: cityName[0],
    cityCode: cityName[1],
    countyCode: cityName[2],
  })
  memberStore.profile!.nickname = nickname.value
  uni.showToast({ icon: 'none', title: '保存成功' })
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: (safeAreaInsets?.top || 0) + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content">
        <image class="image" :src="profileDetail?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profileDetail ? profileDetail.account : '账号名' }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onChangeGender">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profileDetail?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profileDetail?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            @change="onBirthdayChange"
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profileDetail?.birthday"
          >
            <view v-if="profileDetail?.birthday">{{ profileDetail?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            @change="onChangeCity"
            class="picker"
            mode="region"
            :value="profileDetail?.fullLocation?.split(' ')"
          >
            <view v-if="profileDetail?.fullLocation">{{ profileDetail?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="updateProfile">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
