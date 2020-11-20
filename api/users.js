exports.get = {
  access: 'user',
  handler: ({users, granted}) => [users, granted]
}
