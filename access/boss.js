module.exports = async ({request, response, boss}) => {
  if ((await request.data).pass == boss && boss) return 'boss!'
}
