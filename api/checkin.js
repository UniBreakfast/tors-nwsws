const check = require('../access/user')

exports.get = {
  access: 'guest',
  handler: async (props) => ({session: !! await check(props)})
}
