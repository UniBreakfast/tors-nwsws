const { MongoClient, ObjectId } = require('mongodb')

const {MONGO_HOST, MONGO_DB_NAME, MONGO_DB_USER, MONGO_DB_PASS} = process.env

const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${
                MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }


module.exports = {connect, ObjectId}


function connect() {
  return new Promise((resolve, reject) => new MongoClient(uri, options)
    .connect().then(client => resolve(client.db(MONGO_DB_NAME))).catch(reject))
}
