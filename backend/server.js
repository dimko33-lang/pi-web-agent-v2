
const express = require('express')
const cors = require('cors')
const { runAgent } = require('./agent')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  const { message } = req.body

  const result = await runAgent(message)

  res.json(result)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
