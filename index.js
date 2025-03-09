const express = require('express')
const { getConnection } = require('./db/connect-mongo')
require('dotenv').config()


const app = express()
const port = process.env.PORT;

getConnection();

app.use(express.json());

app.use('/director', require('./routes/director'))
app.use('/gender', require('./routes/gender'))
app.use('/type', require('./routes/type'))
app.use('/media', require('./routes/media'))
app.use('/producer', require('./routes/produc'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})