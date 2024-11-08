const carDatabase = require('../database/CarDatabase')

module.exports = (app) => {
  app.get('/api/v1/cars/:id', async (req, res) => {
    const { id } = req.params

    const car = await carDatabase.findCarById(id)
    if (!car) {
      return res.status(404).json({ errors: ['car not found'] })
    }

    return res.status(200).json('ok')
  })
}
