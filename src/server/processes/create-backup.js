module.exports = (app) => {
  app.post('/process/create-snapshot', handlePost)
}


function handlePost(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  res.write('{ success: false, error: "Not implemented yet" }')
  res.send()
}