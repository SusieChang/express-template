let express = require('./express')
let app = express()

app.use(function (req, res, next) {//path默认/
    res.setHeader('Content-Type', 'text/html;chart-set=utf-8')
    next()
})

app.use(function (req, res, next) {//path默认/
    res.setHeader('Cache-Control', 'max-age=0')
    next('error next')
})

app.post('/age', function (req, res) {
    res.end('9')
})

//错误中间件，中间发生错误，直接跳到最后一个中间件
app.use(function(err, req, res, next){
    console.log(err)
})

app.listen(8888, function () {
    console.log('server start');
    
})