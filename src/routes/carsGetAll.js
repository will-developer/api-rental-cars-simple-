const carsServices = require('../services/carsServices')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.get('/api/v1/cars/:id', async (req, res) => {
    try {
      throw new Error('Simulated internal server error')
      const { id } = req.params
      const car = await carsServices.findCarById(id)

      if (!car) {
        return res.status(404).json({ errors: ['car not found'] })
      }

      const carItems = await carsServices.findCarItems(id)

      return res.status(200).json({
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
        created_at: car.created_at,
        items: (carItems && carItems.map((item) => item.name)) || []
      })
    } catch (error) {
      handleError(res, error)
    }
  })
}
