const {stringify} = JSON,  {fromEntries} = Object

regForm.onsubmit = async () => {
  const user = fromEntries(new FormData(regForm))
  const request = {method: 'POST', body: stringify(user)}
  const response = await fetch('/api/register', request)
  const answer = await response.json()
  if (answer.success) goTo('login', 'right')
}
