exports.post = {
  access: 'guest',
  handler: async ({req: {data}, users}) => {
    users.push(await data)
    return {success: true}
  }
}
