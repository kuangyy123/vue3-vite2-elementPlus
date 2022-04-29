import request from '../request'

export function personalCenter(data) {
    return request({
      url: '/agent/login',
      method: 'post',
      data:data
    })
  }