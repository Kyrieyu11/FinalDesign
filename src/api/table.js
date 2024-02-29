import request from '@/utils/request'

export function getList(studentID) { // 需要提交学生ID号，查询提交情况
  return request({
    url: '/system/studenthomework/all',
    method: 'get',
    params: { Id: studentID }
  })
}
export function addHomework(data) { // 需要提交data数据
  return request({
    url: '/system/assignmenttable/add',
    method: 'post',
    data
  })
}
export function getHomeworkForModify() { // 修改作业界面查询
  return request({
    url: '/system/assignmenttable/getHomeworkForModify',
    method: 'get'
  })
}
export function modifyHomework(data) { // 修改作业标单
  return request({
    url: '/system/assignmenttable/modifyHomework',
    method: 'post',
    data
  })
}
export function deleteHomework(assignId) {
  return request({
    url: '/system/assignmenttable/delete',
    method: 'get',
    params: { AssignId: assignId }
  })
}
export function getAllAssignments() { // 查看页面
  return request({
    url: '/system/assignmenttable/complishment',
    method: 'get'
  })
}
export function getAllScore(id) { // 查看页面
  return request({
    url: '/system/rate/getAllScore',
    method: 'get',
    params: { assignId: id }
  })
}
