exports.post = {
  access: 'guest',
  handler: async ({request: {data}, db, hash}) => {
    const {login, password, name} = await data
    const user = {login, password, name}
    const issues = await validate(user, db)
    if (issues.length) return {success: false, issues}

    delete user.password
    user.hash = await hash(password)
    const unique = ! await db.collection('users').findOne({login})
    if (unique) db.collection('users').insertOne(user)
    return {success: unique}
  }
}


async function validate(user, db) {
  const {login, password, name} = user
  const issues = new Issues

  if (!name) issues.require('name')
  else if (name.match(/[^A-Za-zА-Яа-яҐЄІЇЎґєіїў'`’ʼ. -]/))
    issues.add('name', 'only letters, spaces, dashes, dots and apostrophes')

  if (!login) issues.require('login')
  else if (!login.match(/^\w{2,32}$/))  issues.add('login',
    'only latin letters, numbers and underscore, from 2 to 32 characters')
  else if (await db.collection('users').findOne({login}))
    issues.add('login', 'occupied')

  if (!password) issues.require('password')
  else if (password.includes(' '))
    issues.add('password', 'should not include spaces')

  return issues
}


class Issues extends Array {
  add(name, issue) { this.push({name, issue}) }
  require(name) { this.push({name, issue: 'required'}) }
}
