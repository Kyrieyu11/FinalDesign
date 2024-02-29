const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  age: state => state.user.age,
  studentId: state => state.user.studentId,
  college: state => state.user.college,
  major: state => state.user.major,
  role: state => state.user.role,
  permission_routers: state => state.permission.routes
}
export default getters
