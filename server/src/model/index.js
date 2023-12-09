const mongoose = require("mongoose");
// mongoose.connect(`mongodb://super:makealotmoney@database:27017/admin`);
mongoose.connect(`mongodb://localhost:27017/`);
mongoose.Promise = global.Promise;

const log = console.log.bind(console);

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', async () => {
//   try {
//     // const r = await main()
//     log('connection success')
//   } catch (error) {
//     log('connection error', error)
//   }
// })

module.exports = db;
