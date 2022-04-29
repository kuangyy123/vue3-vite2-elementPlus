import request from '../request'

export function goodlists() {
    return request({
      url: '/api/goodlist',
      method: 'get'
     
    })
  }