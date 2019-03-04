let express = require('express')
let app = express()
app.get('/name', function (req, res, next) {
    res.end('susie');
})
app.get('age', function (req, res) {
    res.end('9')
})
app.listen(3000, function () {
    console.log('server start');
    
})