const CarDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  // just for testing...
  // app.get('/api/v1/status', (req, res) => {
  //   res.json({ message: 'API is running' })
  // })

  app.post('/api/v1/cars', async (req, res) => {
    const { brand, model, year, plate } = req.body

    if (!brand || !model || !year || !plate) {
      return res.status(400).json({ errors: ['All fields are required'] })
    }

    try {
      const newCar = await CarDatabase.addCar({ brand, model, year, plate })
      res.status(201).json(newCar)
    } catch (error) {
      res
        .status(500)
        .json({ errors: ['An error occurred while adding the car'] })
    }
  })
}
