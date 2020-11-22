const { c } = require("node-web-server-with-stuff")

module.exports = ({request, response, users}) => { c('users', users)
  const {token} = request.cookie.c()
  if (!token) return
c('token')
  const user = users.find(user => user.token == token)
  if (!user) return response.delCookie('token')
c('user')
  response.setCookie('token', token)
  return user
}
