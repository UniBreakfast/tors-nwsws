global.users = [
  {login: 'admin', name: 'Administrator', password: 'qwerty'},
  {login: 'bob', name: 'Robert', password:'asdf'},
]

const { server, c } = require('node-web-server-with-stuff')
const {hash, verify} = require('./hashVerify.cjs')


server.run({given: {users, hash, verify}})
