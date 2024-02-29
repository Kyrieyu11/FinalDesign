import request from '@/utils/request'

export function modifyHomework(data) { // 学生
  return request({
    url: '/system/studenthomework/modify',
    method: 'post',
    data
  })
}
