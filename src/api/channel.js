// 封装频道相关接口的请求函数
import request from '@/utils/request.js'

// 频道列表
export const channelList = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
