const express = require('express')
const router = express.Router()

router.post('/api/v1/cars', (req, res) => {
  const { brand, model, year, plate } = req.body

  if (!brand || !model || !year || !plate) {
    return res.status(400).json({ errors: ['All fields are required'] })
  }

  res.status(201).json({ message: 'Car added successfully' })
})

module.exports = router
