global.users = [
  {login: 'admin', name: 'Administrator', token: 'qwerty'},
  {login: 'bob', name: 'Robert', token:'asdfgh'},
]


// require('node-web-server-with-stuff').server.run({dev: false, secureCookie: false, given: {users}})
require('node-web-server-with-stuff').server.run({given: {users, boss: 'Tom'}})
