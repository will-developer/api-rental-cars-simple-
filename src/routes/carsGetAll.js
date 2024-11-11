const carService = require('../services/carService')
const handleError = require('../errors/errorHandler')

module.exports = (app) => {
  app.get('/api/v1/cars/:id', async (req, res) => {
    try {
      const { id } = req.params
      const car = await carService.findCarById(id)

      if (!car) {
        return res.status(404).json({ errors: ['car not found'] })
      }

      const carItems = await carService.findCarItems(id)

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
