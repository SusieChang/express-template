let http = require('http')
let url = require('url')
function createApplication() {
  let app = (req, res) => {
    /**
     * 初始化，匹配中间件，匹配路由，调用绑定回调函数
     */
    let m = req.method.toLowerCase(),
      {pathname} = url.parse(req.url, true),
      index = 0
    function next(err) {
      if (index === app.routes.length) {
        return res.end(`cannot ${m} ${pathname}`)
      }
      let {method, path, handler} = app.routes[index++]
      if (method === 'middle') {
        //处理路由
        if (
          path === '/' ||
          path === pathname ||
          pathname.startsWith(path + '/')
        ) {
          handler(req, res, next)
        } else {
          next()
        }
      } else {
        if (
          (method === m || method === 'all') &&
          (path === pathname || path === '*')
        ) {
          handler(req, res)
        } else {
          next()
        }
      }
    }
    next()
  }

  /**
   * 为所有方法匹配一个函数
   */
  app.routes = []

  app.use = function(path, handler) {
    if (typeof handler !== 'function') {
      handler = path
      path = '/'
    }
    let layer = {
      method: 'middle',
      path,
      handler
    }
    app.routes.push(layer)
  }
  let [...methods] = [...http.METHODS, 'ALL']
  methods.forEach(method => {
    method = method.toLowerCase()
    app[method] = function(path, handler) {
      let layer = {
        method: method,
        path,
        handler
      }
      app.routes.push(layer)
    }
  })

  /**
   * 监听端口
   */
  app.listen = function() {
    let server = http.createServer(app)
    server.listen(...arguments)
  }
  return app
}

createApplication.prototype.init = function() {}

module.exports = createApplication
