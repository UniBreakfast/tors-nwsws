exports.get = {
  access: 'user',
  handler: ({response, grant}) => {
    delete grant.token
    response.delCookie('token')
    return {success: true}
  }
}
