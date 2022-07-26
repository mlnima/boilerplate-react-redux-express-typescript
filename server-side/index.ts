import express from "express";
import bodyParser from "body-parser";
// import mainRouter from './routes/mainRouter';
const app = express()

// declare const options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     // setHeaders (res, path, stat) {
//     //     res.set('x-timestamp', Date.now())
//     // }
// }


// @ts-ignore
// app.use(express.static('public', options))
app.use(bodyParser)
// app.get('/auth', (req, res) => mainRouter);
app.listen(3100)

//    "module": "commonjs",2
// "dev": "concurrently \"nodemon ./index.ts\" \"cd ./client-side && npm start\"",