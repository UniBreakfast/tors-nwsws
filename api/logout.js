exports.get = {
  access: 'user',
  handler: ({response, grant: user, db}) => {
    db.collection('users').findOneAndUpdate(user, {$unset: {token: ''}})
    response.delCookie('token')
    return {success: true}
  }
}
