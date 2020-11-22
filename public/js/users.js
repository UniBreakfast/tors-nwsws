on('load', getUsers)


async function getUsers() {
  const response = await fetch('/api/users')
  if (!response.ok) return goTo('/')

  const users = await response.json()
  userTable.tBodies[0].innerHTML = users.map(buildRow).join('')
}

function buildRow(user) {
  return `<tr><td>${user.login}</td><td>${user.name}</td></tr>`
}

async function logOut() {
  await fetch('/api/logout')
}
