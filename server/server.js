process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const db = require('./database/database')

const authRouter = require('./routes/auth.route')
const folderRouter = require('./routes/folder.route')

const app = express()
app.use(express.static('zules'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// db.connect((err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('MySql Connected...');
// })

// app.post('/upload-video', upload.single('my-video'), (req, res) => {
//     console.log(`Video uploaded: ${req.file}`)
// })

app.use('/api', authRouter)
app.use('/api/folder', folderRouter)


app.listen(process.env.PORT, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`))