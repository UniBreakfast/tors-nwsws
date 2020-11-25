exports.get = {
  access: 'user',
  handler: ({db}) => db.collection('users').find().toArray()
}
