let express = require('./express')
let app = express()

app.get('/name', function (req, res, next) {
    res.end('susie');
})

app.post('/age', function (req, res) {
    res.end('9')
})

app.all('*', function (req, res) {
    res.end(req.method + 'user')
})

app.listen(3000, function () {
    console.log('server start');
    
})