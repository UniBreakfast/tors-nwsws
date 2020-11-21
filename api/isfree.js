exports.get = {
  access: 'guest',
  handler: ({request: {query: {login}}, users}) =>
    ({vacant: users.every(user => user.login!=login)})
}
