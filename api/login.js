exports.post = {
  access: 'guest',
  handler: async ({request: {data}, response, db, verify}) => {
    const {login, password} = await data
    let user = {login, password}
    const issues = validate(user)
    if (issues.length) return {success: false, issues}

    user = await db.collection('users').findOne({login})
    if (!user) issues.add('login', 'user not found')
    else if (! await verify(password, user.hash))
      issues.add('password', 'incorrect')

    if (issues.length) return {success: false, issues}

    const token = generateDashedToken()
    db.collection('users').findOneAndUpdate({login}, {$set: {token}})
    response.setCookie('token', token)
    return {success: true}
  }
}


function validate(user) {
  const {login, password} = user
  const issues = new Issues

  if (!login) issues.require('login')
  else if (login.length>100)  issues.add('login',
    'would not be that long')

  if (!password) issues.require('password')

  return issues
}


function generateToken (n=42, l='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij'
  + 'klmnopqrstuvwxyz--', s='') {
  for (; n; --n) s += l[Math.random() * 62 | 0]
  return s
}

function generateDashedToken() {
  return generateToken(36).match(/\w{6}/g).join('-')
}


class Issues extends Array {
  add(name, issue) { this.push({name, issue}) }
  require(name) { this.push({name, issue: 'required'}) }
}
