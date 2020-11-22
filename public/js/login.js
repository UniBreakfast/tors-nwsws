const {stringify} = JSON,  {values, fromEntries} = Object

loginForm.onsubmit = async () => {
  const user = fromEntries(new FormData(loginForm))
  const issues = await validate(user)
  if (issues.length) return issues.show()

  const request = {method: 'POST', body: stringify(user)}
  const response = await fetch('/api/login', request)
  const answer = await response.json()
  if (answer.success) return goTo('users', 'down')
  else new Issues(...answer.issues).show()
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


class Issues extends Array {
  add(name, issue) { this.push({name, issue}) }
  require(name) { this.push({name, issue: 'required'}) }

  show() {
    if (Issues.last) Issues.last.style.animationName = "issues-off"
    const issues = Issues.last = document.createElement('ul')
    issues.classList.add('issues')
    issues.append(...this.map(issue => assign(document.createElement('li'),
      {innerText: values(issue).join(': ')})))
    body.append(issues)
    issues.onanimationend = () => issues.remove()
  }
}
