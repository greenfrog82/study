const express = require('express')
const app = express()

app.get('/api/hello', (req, res) => res.send('Hello World!'))
app.get('/api/version', (req, res) => res.send('1.0.0'))

app.listen(80, () => console.log('Example app listening on port 80!'))