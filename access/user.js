module.exports = ({request, response, users}) => {
  const {token} = request.cookie
  if (!token) return
  const user = users.find(user => user.token == token)
  if (!user) return
  response.setCookie('token', token)
  return user
}