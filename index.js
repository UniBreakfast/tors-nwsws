global.users = [
  {login: 'admin', name: 'Administrator', password: 'qwerty'},
  {login: 'bob', name: 'Robert', password:'asdf'},
]

const { server, c } = require('node-web-server-with-stuff')


server.run({given: {users}})
