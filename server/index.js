const express = require('express')
const app = express()
const port = 3200

function getRandom() {
  const min = 500;
  const max = 2000;
  return Math.floor(Math.random() * (max - min) + min)
}

app.get('/hello', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader("Access-Control-Allow-Origin", "*");
  setTimeout(() =>{
    res.send(JSON.stringify({body: "Hello World!"}))
  }, getRandom())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})