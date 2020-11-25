try { require('./stuff.cjs') }
catch { console.warn("No stuff.cjs found in root. It's ok if you have all appropriate system variables set. Otherwise you supposed to create a stuff.сjs by the stuff_template.cjs example you have in root.") }


global.users = [
  {login: 'admin', name: 'Administrator', password: 'qwerty'},
  {login: 'bob', name: 'Robert', password:'asdf'},
]

const { server, c } = require('node-web-server-with-stuff')
const {hash, verify} = require('./hashVerify.cjs')
const {connect, ObjectId} = require('./useMongo.cjs')
const db = connect()

const given = {users, hash, verify, db, ObjectId}

server.run({given})


db.then(db => global.db = db)
