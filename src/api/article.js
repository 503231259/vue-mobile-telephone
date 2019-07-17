// 封装文章相关接口

import request from '../utils/request'

export const getArticles = ({
  channelId, // 频道
  timestamp, // 时间戳
  withTop // 置顶
}) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
