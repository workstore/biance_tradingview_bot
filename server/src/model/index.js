const mongoose = require("mongoose");
mongoose.connect(`mongodb://super:3dx@database:27017/admin`);
mongoose.Promise = global.Promise;

const log = console.log.bind(console);

// const main = () => {
//     const EmailSchema = mongoose.Schema({
//         address: String,
//     })

//     kittySchema.methods.speak = function() {
//         const greeting = this.name ? `Meow name is ${this.name}` : "I don't have a name"
//         log('greeting', greeting)
//     }
//     const Kitten = mongoose.model('Kitten', kittySchema)
//     const silence = new Kitten({
//         name: 'Silence'
//     })

//     const fluffy = new Kitten({
//         name: 'fluffy',
//     })
//     log(silence.name)
//     fluffy.speak()

//     Kitten.findOne({
//         name: 'p1',
//     }).then((d) => {
//         log('debug d', d)
//     })
// }

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
