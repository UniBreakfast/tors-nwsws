const check = require('../access/user')

exports.get = {
  access: 'guest',
  handler: (props) => ({session: !!check(props)})
}
