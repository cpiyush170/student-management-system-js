const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('class route')
  console.log(req.body)
})

module.exports = router;