import request from '@/utils/request'

export function getList() { // 查询作业信息
  return request({
    url: '/system/rate/getAllAssignment',
    method: 'get'
  })
}

export function userRateFile(AssignId) { // 查询作业信息
  return request({
    url: '/system/rate/useRatingFiles',
    method: 'get',
    params: { assignId: AssignId }
  })
}


export function sendRequest(data) { // 查询作业信息
  return request({
    url: '/system/rate/sendRequest',
    method: 'post',
    data
  })
}
