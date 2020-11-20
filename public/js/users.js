function repeatUsers(num) {
  const tbody = usersTable.tBodies[0]
  tbody.innerHTML = tbody.innerHTML.repeat(num)
}
