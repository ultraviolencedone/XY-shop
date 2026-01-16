import { PutMemberProfile } from './member'
import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

// 添加收货地址
export const PostMemberAddressAPI = (data: AddressParams) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

// 获取收获地址列表
export const GetMemberAddresAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

// 获取收货地址列表
export const GetMemberAddresByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

// 修改收货地址
export const PutMemberAddressById = (id: string, data: AddressParams) => {
  return http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}

// 删除收货地址
export const DelMemberAddressById = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
