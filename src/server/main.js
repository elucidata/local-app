const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/database.json')
const middlewares = jsonServer.defaults({
  // static: '../../public',
  static: '_not_a_real_path_',
})

const sirv = require('sirv');

const assets = sirv(path.resolve(__dirname, '../../public'), {
  dev: true
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(assets)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  else if (req.method === 'PUT') {
    req.body.updatedAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})


// Use default router
server.use('/api', router)

require('./processes/create-backup.js')(server)

// Handle every other route with index.html, which will contain a script tag to your application's JavaScript file(s).
// server.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../public/index.html'));
// });

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
