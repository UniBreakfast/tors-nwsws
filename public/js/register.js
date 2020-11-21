const {stringify} = JSON,  {values, fromEntries} = Object

regForm.onsubmit = async () => {
  const user = fromEntries(new FormData(regForm))
  const issues = await validate(user)
  if (issues.length) return issues.show()
  const request = {method: 'POST', body: stringify(user)}
  const response = await fetch('/api/register', request)
  const answer = await response.json()
  if (answer.success) goTo('login', 'right')
}

async function validate(user) {
  const {name, login, password, confirm} = user
  const issues = new Issues

  if (!name) issues.require('name')
  else if (name.match(/[^A-Za-zА-Яа-яҐЄІЇЎґєіїў'`’ʼ. -]/))
    issues.add('name', 'only letters, spaces, dashes, dots and apostrophes')

  if (!login) issues.require('login')
  else if (!login.match(/^\w{2,32}$/))  issues.add('login',
    'only latin letters, numbers and underscore, from 2 to 32 characters')
  else if (! await isFree(login)) issues.add('login', 'occupied')

  if (!password) issues.require('password')
  else if (password.includes(' '))
    issues.add('password', 'should not include spaces')

  if (!confirm) issues.require('confirm')
  else if (confirm != password)
    issues.add('confirm', 'should be equal to password')

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

async function isFree(login) {
  const response = await fetch('/api/isfree?login='+login)
  const answer = await response.json()
  return answer.vacant == true
}
