module.exports = async ({request, response, db}) => {
  const {token} = request.cookie
  if (!token) return

  const user = await db.collection('users').findOne({token})
  if (!user) return response.delCookie('token')

  response.setCookie('token', token)
  return user
}
